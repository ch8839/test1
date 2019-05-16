const AllEchartDataModel = require('../../models/echarts/echart_water.js')
const AllMap = require('../../models/common/Map.js')

const assess_type_Map = new Map([[1, '初次调查'], [2, '详细调查'], [3, '修复调查'] ])

var reference_17_ground_Map, element_Map, unit_Map

AllMap.then(data=>{
reference_17_ground_Map = data.reference_17_ground_Map
element_Map = data.element_Map
unit_Map = data.unit_Map
})


class echart_Controller{

  static async getWaterHistogramData(ctx) {
    
    let SingleElementOptions = ctx.request.body //从前端传入的数据
    let { point_num,element } = SingleElementOptions //将传入的数据将进行定义
    let res = await AllEchartDataModel.getWaterHistogramElement(point_num,element)//通过point_num,assess_type,element将数据库中的数据取出
   
    let  DifferentDepthData= res.map(item => {
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
  
  
  static async getRadarWaterEachDepthValue(ctx) {
  
    // console.log("我是雷达的point_num")
    let FrontElement = ctx.request.body //从前端传入的数据
    let { point_num,assess_type,reference_num,type } = FrontElement //将传入的数据将进行定义
    
    console.log("我是雷达的", point_num,assess_type)
    let res = await AllEchartDataModel.getRadartype1WaterElementDepthData(point_num,assess_type)
    let resDatar_arr = await AllEchartDataModel.getWaterRadarThresholdData(reference_num,type)
    console.log("我是雷达的22",res)
  
    let Echart_arr = res.map(item => {
      return item = item.dataValues
    })
    let Datar_arr = resDatar_arr.map(item => {
      return item = item.dataValues
    })
    console.log(95689,Datar_arr)
    let sample_depth = res.map(item => {
      return item = item.dataValues.sample_depth
    })
    sample_depth = sample_depth.filter((item, index, self) => {
        return index == self.indexOf(item)
      })//将得到的深度进行去重

   if(assess_type == 1&&reference_num == 'max' && type == 'water'){
  let depth1 = []
   
    Echart_arr.forEach((item) => {
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      
        if (item["sample_depth"] == sample_depth[0]) {
            delete item.sample_depth
            for(let key in item){
              if(item[key]==-1 ){
                item[key] = '0' 
              }  
            }
            depth1.push( item )  
           
        }
      
    })

  

    let AllData =[]
    let AllRadarData = []
    let all =[]
    let arr1 =[]
   
    AllData.push(Datar_arr[0],depth1[0])

    for(let i=0;i<AllData.length;i++){
      
            for(let key in AllData[0] ){
              if(AllData[1][key]=='0'){
                console.log(85239,AllData[0][key]) 
              //  arr119.push({text:key,max:AllData[0][key]});
              delete AllData[0][key];
              delete AllData[1][key];
              
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
   
      
    }

    all.push({max:AllRadarData,depth1:arr1})

    ctx.body = {
      success: true,
      res:all,
      msg: '获取成功'
    }
  }else if(assess_type == 2&& reference_num == 'max' && type == 'water'){

    let res2 = await AllEchartDataModel.RadarType2EachDepthValue(point_num)
    
    let Echart_arr2 = res2.map(item => {
      return item = item.dataValues
    })
    
    let sample_depth = res2.map(item => {
      return item = item.dataValues.sample_depth
    })
    sample_depth = sample_depth.filter((item, index, self) => {
        return index == self.indexOf(item)
      })//将得到的深度进行去重
   

    let depth1 = []
    let depth2 = []
   
    Echart_arr2.forEach((item) => {
      delete item.point_num;
      if (item["sample_depth"] ==sample_depth[0]&& item['statistic_value']=='max_value') {
        delete item.statistic_value;
        delete item.sample_depth;
        for(let key in item ){
          if(item[key] == -1  ){
            item[key] = '0' }
            depth1.push( item )
           
         
        }
      }else if(item["sample_depth"] ==sample_depth[1]&& item['statistic_value']=='max_value'){
        delete item.statistic_value;
        delete item.sample_depth;
        for(let key in item ){
          if(item[key] == -1  ){
            item[key] = '0' }
            depth2.push( item )  
        }
      }
    })

    let AllData =[]
    let AllRadarData = []
    let all =[]
    let arr1 =[]
    let arr2 =[]
    
    AllData.push(Datar_arr[0],depth1[0],depth2[0])
    console.log(95689,AllData)
 

    for(let i=0;i<AllData.length;i++){
            for(let key in AllData[0] ){
              if(AllData[2][key]!==null){
                if(AllData[1][key]== 0 && AllData[2][key] == 0){
                  console.log(95689,AllData[0][key])
                //  arr119.push({text:key,max:AllData[0][key]});
                delete AllData[0][key];
                delete AllData[1][key];
                delete AllData[2][key];
                
                }
              }else {
                if(AllData[1][key]== 0 ){
                  console.log(95689,AllData[0][key])
                //  arr119.push({text:key,max:AllData[0][key]});
                delete AllData[0][key];
                delete AllData[1][key];
              
                
                }
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
      if(AllData[2][key]!==null){
        arr1.push(AllData[1][key]);
        arr2.push(AllData[2][key]);
      }else {
        arr1.push(AllData[1][key]);
       
      }
    }
    console.log(15266,arr2)
    if(arr2.length!=0){
      all.push({max:AllRadarData,depth1:arr1,depth2:arr2})
    }else {
      all.push({max:AllRadarData,depth1:arr1})
    }
    ctx.body = {
      success: true,
      resDatar_arr: all,
      msg: '获取成功'
    }
      
        
      
  }
    
 };//对应于雷达图里面的在一个调查类型下的一个监测点位中的不同深度的数据值
  
 static async WaterRadarThresholdData(ctx) {
  
  // const id = this.params.id
  let FrontElement = ctx.request.body //从前端传入的数据
  let { reference_num,type } = FrontElement
 
  console.log(99999, reference_num,typeof type);
  
    let resDatar_arr = await AllEchartDataModel.getWaterRadarThresholdData(reference_num,type)
    if(reference_num == '17国标' && type == 'water') {
   

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