const AllEchartDataModel = require('../../models/echarts/echart_ground.js')
const AllMap = require('../../models/common/Map.js')

const assess_type_Map = new Map([[1, '初次调查'], [2, '详细调查'], [3, '修复调查'] ])

var reference_17_ground_Map, element_Map, unit_Map

AllMap.then(data=>{
reference_17_ground_Map = data.reference_17_ground_Map
element_Map = data.element_Map
unit_Map = data.unit_Map
})


class echart_Controller{

  static async getHistogramData(ctx) {
    
    let SingleElementOptions = ctx.request.body //从前端传入的数据
    let { point_num,element } = SingleElementOptions //将传入的数据将进行定义
    let res = await AllEchartDataModel.getHistogramElement(point_num,element)//通过point_num,assess_type,element将数据库中的数据取出
   
    let  DifferentDepthData = res.map(item => {
      return item = item.dataValues
    })
    
    console.log('我是51',DifferentDepthData) 
    let Type = res.map(item => {
      return item = item.dataValues.assess_type
    })//从数据库中取出的调查类型的数据
  
    Type = Type.filter((item, index, self) => {
      return index == self.indexOf(item)
    })
     //将得到的调查类型进行去重
    
    let TypeList=[]
    Type.forEach((item) => { //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      if (item && assess_type_Map.has(item)) {
        TypeList.push(assess_type_Map.get(item))
      }  
    })

    let mean_value1 = []
    let mean_value2 = []

    DifferentDepthData.forEach((item) => {
        
        if (item['statistic_value'] == 'mean_value') {
          if(item[element]!=0){
            mean_value1.push(item[element])
          }
        }else if (item['statistic_value'] == 'max_value'){
          if(item[element]!=0){
            mean_value2.push(item[element]) 
          }
        }
    })//将不同深度的想对应元素的数据取出放入一个数组中
    let ElementList = []
    ElementList.push( {assess_type:TypeList}, {mean_value: ['平均值','最大值']} ,{mean_value: '平均值' ,value:mean_value1},{max:'最大值', value:mean_value2} ) 
  
    ctx.body = {
      success: true,
      res:ElementList,
      msg: '获取成功'
    }
  };//对应于柱状图的数据是将不同调查类型下的不同元素在不同深度的数据进行处理
  
  
  static async getRadarEachDepthValue(ctx) {
  
    let FrontElement = ctx.request.body //从前端传入的数据
    let { point_num,assess_type,reference_num,type} = FrontElement //将传入的数据将进行定义
    
    console.log("我是雷达的", point_num,assess_type)
    let res = await AllEchartDataModel.getFoldData(point_num,assess_type)

    let Echart_arr = res.map(item => {
      return item = item.dataValues
    })
    //  console.log("我是深度",Echart_arr)
    let sample_depth = res.map(item => {
      return item = item.dataValues.sample_depth
    })
    sample_depth = sample_depth.filter((item, index, self) => {
        return index == self.indexOf(item)
      })//将得到的深度进行去重

   if(assess_type == 1&&reference_num == 'max' && type == 'ground'){
  
    let depth1 = []
    let depth2 = []
    let depth3 = []

    
    Echart_arr.forEach((item) => {
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      
        for(let key in item)
          if (item["sample_depth"] == sample_depth[0]) {
            delete item.sample_depth;
            for(let key in item){
              if(item[key]== -1 ){ 
                item[key] = '0'}
            }
            depth1.push( item )
          }else if(item["sample_depth"] ==sample_depth[1]){
            delete item.sample_depth;
            for(let key in item){
              if(item[key]==-1){
                item[key] ='0'}
            }
            depth2.push( item )
          }else if(item["sample_depth"] == sample_depth[2]){
            delete item.sample_depth;
            for(let key in item){
              if(item[key]==-1 ){
                item[key] = '0' }
            }
            depth3.push( item )
          }
    })

    let resDatar_arr = await AllEchartDataModel.getAllRadarData(reference_num,type)
    let Datar_arr = resDatar_arr.map(item => {
      return item = item.dataValues
    })

    let AllData =[]
    let AllRadarData = []
    let all =[]
    let arr1 =[]
    let arr2 =[]
    let arr3 =[]
    AllData.push(Datar_arr[0],depth1[0],depth2[0],depth3[0])

    for(let i=0;i<AllData.length;i++){
            for(let key in AllData[0] ){
              if(AllData[1][key]=='0'&& AllData[2][key] =='0'&& AllData[3][key] =='0'){
              //  arr119.push({text:key,max:AllData[0][key]});
              delete AllData[0][key];
              delete AllData[1][key];
              delete AllData[2][key];
              delete AllData[3][key];
               }
               
             }
      
    }

    for (let key in AllData[0]) {
      if (AllData[0][key] && element_Map.has(key)) {
        if (AllData[0][key] && element_Map.get(key)) {
          // AllRadarData.push({ text: element_Map.get(key), max: AllData[0][key] })
          AllRadarData.push({ text: element_Map.get(key)})
        } else {
          // AllRadarData.push({ text: element_Map.get(key), max: AllData[0][key] })
          AllRadarData.push({ text: element_Map.get(key)})
        }
      }
      arr1.push(AllData[1][key]);
      arr2.push(AllData[2][key]);
      arr3.push(AllData[3][key]);
    }

    all.push({max:AllRadarData,depth1:arr1,depth2:arr2,depth3:arr3})

    ctx.body = {
      success: true,
      res:all,
      msg: '获取成功'
    }
  }else if(assess_type == 2&& reference_num == 'max' && type == 'ground'){

    let res2 = await AllEchartDataModel.RadarEachDepthValue(point_num)
    let resDatar_arr = await AllEchartDataModel.getAllRadarData(reference_num,type)
    
    let Echart_arr2 = res2.map(item => {
      return item = item.dataValues
    })
    console.log("96936",Echart_arr2)
    let sample_depth = res2.map(item => {
      return item = item.dataValues.sample_depth
    })
    sample_depth = sample_depth.filter((item, index, self) => {
        return index == self.indexOf(item)
      })//将得到的深度进行去重
    
    let Datar_arr = resDatar_arr.map(item => {
      return item = item.dataValues
    })

    let depth1 = []
    let depth2 = []
    let depth3 = []
    let depth4 = []
    Echart_arr2.forEach((item) => {
      delete item.point_num;
      if (item["sample_depth"] ==sample_depth[0]&& item['statistic_value']=='max_value') {
        delete item.statistic_value;
        delete item.sample_depth;
        for(let key in item ){
          if(item[key]==-1 ){
            item[key] = '0'}
            depth1.push( item )
          
        }
      }else if(item["sample_depth"] ==sample_depth[1]&& item['statistic_value']=='max_value'){
          delete item.statistic_value;
          delete item.sample_depth;
        for(let key in item ){
          if(item[key]==-1){
            item[key] ='0'}
            depth2.push( item )
          
        }
      }else if(item["sample_depth"] ==sample_depth[2]&& item['statistic_value']=='max_value'){
          delete item.statistic_value;
          delete item.sample_depth;
        for(let key in item ){
          if(item[key] ==-1  ){
            item[key] = '0' }
            depth3.push( item )
         
        }
      }else if(item["sample_depth"] ==sample_depth[3]&& item['statistic_value']=='max_value'){
          delete item.statistic_value;
          delete item.sample_depth;
          for(let key in item ){
            if(item[key]==-1 ){
              item[key] = '0'}
              depth4.push( item )
            
          }
      }
    })

    let AllData =[]
    let AllRadarData = []
    let all =[]
    let arr1 =[]
    let arr2 =[]
    let arr3 =[]
    let arr4 =[]
    AllData.push(Datar_arr[0],depth1[0],depth2[0],depth3[0],depth4[0])

    for(let i=0;i<AllData.length;i++){
            for(let key in AllData[0] ){
              if(AllData[1][key]=='0'&& AllData[2][key] =='0'&& AllData[3][key] =='0'&& AllData[4][key] =='0'){
              //  arr119.push({text:key,max:AllData[0][key]});
              delete AllData[0][key];
              delete AllData[1][key];
              delete AllData[2][key];
              delete AllData[3][key];
              delete AllData[4][key];
              }
               
             }
    }

    for (let key in AllData[0]) {
      if (AllData[0][key] && element_Map.has(key)) {
        if (AllData[0][key] && element_Map.get(key)) {
          AllRadarData.push({ text: element_Map.get(key), max: AllData[0][key] })
        } else {
          AllRadarData.push({ text: element_Map.get(key), max: AllData[0][key] })
        }
      }
      arr1.push(AllData[1][key]);
      arr2.push(AllData[2][key]);
      arr3.push(AllData[3][key]);
      arr4.push(AllData[4][key]);
    }

    all.push({max:AllRadarData,depth1:arr1,depth2:arr2,depth3:arr3,depth4:arr4})
    

      ctx.body = {
        success: true,
        res:all,
        msg: '获取成功'
      }
  }
    
 };//对应于雷达图里面的在一个调查类型下的一个监测点位中的不同深度的数据值
  
  static async GroundRadarThresholdData(ctx) {
  
    // const id = this.params.id
    let FrontElement = ctx.request.body //从前端传入的数据
    let { reference_num,type } = FrontElement
   
    console.log(99999, reference_num,typeof type);
    
      let resDatar_arr = await AllEchartDataModel.getAllRadarData(reference_num,type)
    if(reference_num == '17国标' && type == 'ground') {
     
  
      let Datar_arr = resDatar_arr.map(item => {
        return item = item.dataValues
      })
  
      let AllRadarData = []
      console.log('我是',Datar_arr)
  
  
      Datar_arr.forEach((item) => {
        //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
        for (let key in item) {
          if (item[key] && element_Map.has(key)) {
            if (item[key] && element_Map.get(key)) {
              AllRadarData.push(item[key])
            } else {
              AllRadarData.push(item[key])
            }
          }
        }
      })
 
        ctx.body = {
          success: true,
          resDatar_arr: AllRadarData,
          msg: '获取成功'
        }
    }
  };//得到国标值以及阈值
  
}

module.exports = echart_Controller