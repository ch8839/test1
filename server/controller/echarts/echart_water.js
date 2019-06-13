const AllEchartDataModel = require('../../models/echarts/echart_water.js')
const AllMap = require('../../models/common/Map.js')

const assess_type_Map = new Map([[1, '初次调查'], [2, '详细调查'], [3, '修复调查'] ])

var reference_17_water_Map, element_Map, unit_Map

AllMap.then(data=>{
reference_17_water_Map = data.reference_17_water_Map
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
    })//载数据库中取出在这个监测点位下的该元素的值
    
    console.log('我是51',DifferentDepthData) 
    let Type = res.map(item => {
      return item = item.dataValues.assess_type
    })//从数据库中取出的调查类型的数据
  
    Type = Type.filter((item, index, self) => {
      return index == self.indexOf(item)
    })
     //将得到的调查类型进行去重
    
    let TypeList=[]
    Type.forEach((item) => { 
      if (item && assess_type_Map.has(item)) {
        TypeList.push(assess_type_Map.get(item))
      }  
    })//将调查类型从数字变成中文显示

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
    })//将数据库中该元素的最大值取出来，通过判断统计类型
    let ElementList = []
    ElementList.push( {assess_type:TypeList}, {mean_value: ['平均值','最大值']} ,{mean_value: '平均值' ,value:mean_value1},{max:'最大值', value:mean_value2} )//将数据进行合并性成前端需要的形式 
  
    ctx.body = {
      success: true,
      res:ElementList,
      msg: '获取成功'
    }
  };//对应于柱状图的数据是将不同调查类型下的不同元素在不同深度的数据进行处理
  
  
  static async getRadarWaterEachDepthValue(ctx) {
  
    // console.log("我是雷达的point_num")
    let FrontElement = ctx.request.body //从前端传入的数据
    let { point_num,assess_type,type } = FrontElement //将传入的数据将进行定义
    
    // console.log("我是雷达的", point_num,assess_type)
    let res = await AllEchartDataModel.getRadartype1WaterElementDepthData(point_num,assess_type)//凑够数据库中取出在该调查类型下的这个监测点位下所有元素的值
    let resDatar_arr = await AllEchartDataModel.getWaterRadarThresholdData(type)//从类型的表里取出基准值
    //从数据库取出数据
  
    let Echart_arr = res.map(item => {
      return item = item.dataValues
    })
    let Datar_arr = resDatar_arr.map(item => {
      return item = item.dataValues
    })

    let Threshold17 = []
    let Threshold18 = []
  
    Datar_arr.forEach((item) =>{
      if(item.reference_num == '17国标'){
        delete item.reference_num;
        Threshold17.push(item)
    
      }
      // else if(item.reference_num == '18国标'){
      //   delete item.reference_num;
      //   Threshold18.push(item)
      // }
    })//取出在土壤的国标值以及最大值
 
    let sample_depth = res.map(item => {
      return item = item.dataValues.sample_depth
    })
    sample_depth = sample_depth.filter((item, index, self) => {
        return index == self.indexOf(item)
      })//将得到的深度并进行去重
  

   if(assess_type == 1){
     
    let depth1 = []
    Echart_arr.forEach((item) => {
      if (item["sample_depth"] == sample_depth[0]){
          delete item.sample_depth
          for(let key in item){
            if(item[key]==-1 ){
              item[key] = '0' 
            }  
          }
          depth1.push( item )  
      }
    })//将该深度下的所有元素的值从数据库取出来

    let all =[]
    let arr1 =[]
    let arr2 =[]
    let arr3 =[]
    let AllData =[]
    let AllRadarData = []
   
    // AllData.push(Threshold17[0],Threshold18[0],depth1[0])//将最大值和阈值以及深度的值统一放在一个数组里
    AllData.push(Threshold17[0],depth1[0])//将最大值和阈值以及深度的值统一放在一个数组里

    for(let i=0;i<AllData.length;i++){
      for(let key in AllData[0] ){
        if(AllData[1][key]=='0'){
          // console.log(85239,AllData[0][key]) 
        //  arr119.push({text:key,max:AllData[0][key]});
          delete AllData[0][key];
          delete AllData[1][key];
          // delete AllData[2][key];
          
        }  
      }
    }//将深度里面的元素的值==0的元素在最大值和阈值中进行删除

    // let obj_max = AllData.reduce((acu, cur)=>{
    //   for(let key in cur){
    //       acu[key] = Number(cur[key])>Number(acu[key]) ? cur[key]:acu[key]
    //   }
    //   return acu
    // })
    let obj_max = []
    for(let key in AllData[0]){
      obj_max[key] = (AllData[0][key]*5).toFixed(3)
      
    }

    AllData.forEach((item)=>{
      for(let key in item ){
        if(Number(item[key])> Number(obj_max[key])){
          item[key] = obj_max[key]
        }
      }
    })

    for (let key in AllData[0]) {
      if (AllData[0][key] && element_Map.has(key)) {
        if (AllData[0][key] && element_Map.get(key)) {
          AllRadarData.push({ text: element_Map.get(key), max: Number(obj_max[key]) })
        } else {
          AllRadarData.push({ text: element_Map.get(key), max: Number(obj_max[key]) })
        }
      }
      arr1.push( Number(AllData[0][key]));//只取出来元素的值不要元素名称
      arr2.push( Number(AllData[1][key]));
      // arr3.push( Number(AllData[2][key]));//只取出来元素的值不要元素名称
    }//将最大值的元素换成中文显示

    all.push({max:AllRadarData,Threshold17:arr1,depth1:arr2})//将所有数据进行push到一个数组中去
    
    ctx.body = {
      success: true,
      res:all,
      msg: '获取成功'
    }
  }else if(assess_type == 2){

    let res2 = await AllEchartDataModel.RadarType2EachDepthValue(point_num)
    
    let Echart_arr2 = res2.map(item => {
      return item = item.dataValues
    })
    let sample_depth = res2.map(item => {
      return item = item.dataValues.sample_depth
    })
    sample_depth = sample_depth.filter((item, index, self) => {
        return index == self.indexOf(item)
    })//将得到的深度并进行去重

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
    let arr3 =[]
    let arr4 =[]
    
    // AllData.push(Threshold17[0],Threshold18[0],depth1[0],depth2[0])
    AllData.push(Threshold17[0],depth1[0],depth2[0])
    console.log(95689,AllData)
 

    for(let i=0;i<AllData.length;i++){
      for(let key in AllData[0] ){
        if(AllData[2][key]!==null){
          if(AllData[1][key]== 0 && AllData[2][key] == 0){
            // console.log(95689,AllData[0][key])
          //  arr119.push({text:key,max:AllData[0][key]});
            delete AllData[0][key];
            delete AllData[1][key];
            delete AllData[2][key];
            // delete AllData[3][key];
            // delete AllData[4][key];
          }
        }else {
          if(AllData[1][key]== 0 ){
            console.log(95689,AllData[0][key])
          //  arr119.push({text:key,max:AllData[0][key]});
            delete AllData[0][key];
            delete AllData[1][key];
            // delete AllData[2][key];
           
          }
        }  
      }
    }

    // let obj_max = AllData.reduce((acu, cur)=>{
    //   for(let key in cur){
    //       acu[key] = Number(cur[key])>Number(acu[key]) ? cur[key]:acu[key]
    //   }
    //   return acu
    // })
    // console.log(11111111111111,obj_max)
    let obj_max = []
    for(let key in AllData[0]){
      obj_max[key] = (AllData[0][key]*5).toFixed(3)
      
    }

    AllData.forEach((item)=>{
      for(let key in item ){
        if(Number(item[key])> Number(obj_max[key])){
          item[key] = obj_max[key]
        }
      }
    })

    for (let key in AllData[0]) {
      if (AllData[0][key] && element_Map.has(key)) {
        if (AllData[0][key] && element_Map.get(key)) {
          AllRadarData.push({ text: element_Map.get(key),max: Number(obj_max[key]) })
        } else {
          AllRadarData.push({ text: element_Map.get(key),max: Number(obj_max[key]) })
        }
      }
      arr1.push( Number(AllData[0][key]));
      // arr2.push( Number(AllData[1][key]));
      if(AllData[2][key]!==null){
        arr3.push( Number(AllData[1][key]));
        arr4.push( Number(AllData[2][key]));
      }else {
        arr3.push( Number(AllData[1][key]));
       
      }
    }
    // console.log(15266,arr2)
    if(arr4.length!=0){
      // all.push({max:AllRadarData,Threshold17:arr1,Threshold18:arr2,depth1:arr3,depth2:arr4})
      all.push({max:AllRadarData,Threshold17:arr1,depth1:arr3,depth2:arr4})
    }else {
      all.push({max:AllRadarData,Threshold17:arr1,depth1:arr3})
    }
    ctx.body = {
      success: true,
      res: all,
      msg: '获取成功'
    }
  }
 };//对应于雷达图里面的在一个调查类型下的一个监测点位中的不同深度的数据值

 static async getAllWaterFoldData(ctx) {
  
  let SingleElementOptions = ctx.request.body //从前端传入的数据
  let { point_num,assess_type,element } = SingleElementOptions //将传入的数据将进行定义
  let statistic_value= 'mean_value'
  let res = await AllEchartDataModel.getFoldWaterElement(point_num,assess_type,element)//通过point_num,assess_type,element将数据库中的数据取出
  let res2 = await AllEchartDataModel.getWaterFoldElementMean(point_num,assess_type,element,statistic_value)//通过point_num,essess_type将数据库中取出 
  
  console.log(333333333,  point_num,assess_type,element,statistic_value)

  console.log(2222222, assess_type)
  let res3 = res2.map(item => {
    return item = item.dataValues
  })
  console.log(666666666, res3)
  let sample_depth = res.map(item => {
    return item = item.dataValues.sample_depth
  })
  console.log(77777777, sample_depth)
  let res1 = res.map(item => {
    return item = item.dataValues
  })
  console.log(11111111, res1)

  let sample_num = res.map(item => {
    return item = item.dataValues.sample_num
  })//将不同监测点位下以及不同评估类型下的样本取出


 
  let Sample = []
  for (let i=0;i<sample_num.length;i++){
    let x ;
    x = i  ;
    Sample.push('样本'+'-'+ sample_depth[x]);
  }

  let Element_arr = []
  let Element_arr2 = []
  res1.forEach((item)=>{
    for(let key in item){
      delete item.sample_num
      delete item.sample_depth
      Element_arr.push(item[key])
    } 
  })
  res3.forEach((item)=>{
    for(let key in item){
      for(let i=0;i<Element_arr.length;i++){
        Element_arr2.push(item[key])
      }
      
    } 
  })

 
  let FoldData_arr = []
  FoldData_arr.push({sample: Sample,data1: Element_arr ,mean_value:Element_arr2, reference_value:reference_17_water_Map.get(element),unit:unit_Map.get(element)})
  // 监之前的数据全部push到数组里面
 
  ctx.body = {
    success: true,
    res:FoldData_arr,
    msg: '获取成功'
  }
};
  

  
}

module.exports = echart_Controller