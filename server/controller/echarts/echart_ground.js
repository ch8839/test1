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
  
    // console.log("我是雷达的point_num")
    let FrontElement = ctx.request.body //从前端传入的数据
    // let { point_num,assess_type,reference_num,type} = FrontElement//将传入的数据将进行定义
    let { point_num,assess_type,type} = FrontElement//将传入的数据将进行定义
    
    // console.log("我是雷达的", point_num,assess_type)
    let res = await AllEchartDataModel.getData(point_num,assess_type)
    let resDatar_arr = await AllEchartDataModel.getAllRadarData(type)
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
      
    })
    // console.log(4865963, Threshold) 
    // console.log(7569869696,ThresholdMax) 
    let Echart_arr = res.map(item => {
      return item = item.dataValues
    })
    //  console.log(55555555555,Echart_arr)
    let sample_depth = res.map(item => {
      return item = item.dataValues.sample_depth
    })
    sample_depth = sample_depth.filter((item, index, self) => {
        return index == self.indexOf(item)
      })//将得到的深度进行去重
    // console.log("我是深度2",sample_depth)

   if(assess_type == 1  ){
  
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

   

    let AllData =[]
    let AllRadarData = []
    let all =[]
    let arr1 =[]
    let arr2 =[]
    let arr3 =[]
    let arr4 =[]
    let arr5 =[]
    // AllData.push(Threshold17[0],Threshold18[0],depth1[0],depth2[0],depth3[0])
    AllData.push(Threshold17[0],depth1[0],depth2[0],depth3[0])
    
    for(let i=0;i<AllData.length;i++){
            for(let key in AllData[0] ){
              if(AllData[1][key]=='0'&& AllData[2][key] =='0'&& AllData[3][key] =='0'){
              //  arr119.push({text:key,max:AllData[0][key]});
                  delete AllData[0][key];
                  delete AllData[1][key];
                  delete AllData[2][key];
                  delete AllData[3][key];
                  // delete AllData[4][key];
               } 
             }
    }
    
    console.log(3333333333333,AllData)
    // let obj_max = AllData.reduce((acu, cur)=>{
    //     for(let key in cur){
    //      acu[key] = Number(cur[key])>Number(acu[key]) ?  cur[key]: acu[key]
    //         // console.log(999999999,acu)
    //     }
        
    //     return acu
    // })
    // console.log(11111111,obj_max)
   
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
  
    console.log(222222222222,obj_max)
  
   

    for (let key in AllData[0]) {
      if (AllData[0][key] && element_Map.has(key)) {
        if (AllData[0][key] && element_Map.get(key)) {
           AllRadarData.push({ text: element_Map.get(key), max: Number(obj_max[key]) })
          // AllRadarData.push({ text: element_Map.get(key) })
        } else {
           AllRadarData.push({ text: element_Map.get(key), max:  Number(obj_max[key]) })
          // AllRadarData.push({ text: element_Map.get(key) })
        }
      }
      arr1.push( Number(AllData[0][key]));
      arr2.push( Number(AllData[1][key]));
      arr3.push( Number(AllData[2][key]));
      arr4.push( Number(AllData[3][key]));
      // arr5.push( Number(AllData[4][key]));
     
    }

    // all.push({max:AllRadarData,Threshold17:arr1,Threshold18:arr2,depth1:arr3,depth2:arr4,depth3:arr5})
    all.push({max:AllRadarData,Threshold17:arr1,depth1:arr2,depth2:arr3,depth3:arr4})
    
   
    ctx.body = {
      success: true,
      res:all,
      msg: '获取成功'
    }
  }else if(assess_type == 2){

    let res2 = await AllEchartDataModel.RadarEachDepthValue(assess_type,point_num)
    console.log(56586556,assess_type,point_num)
    
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
    let arr5 =[]
    let arr6 =[]
    // AllData.push(Threshold17[0],Threshold18[0],depth1[0],depth2[0],depth3[0],depth4[0])
    AllData.push(Threshold17[0],depth1[0],depth2[0],depth3[0],depth4[0])
    

    for(let i=0;i<AllData.length;i++){
      for(let key in AllData[0] ){
        if(AllData[1][key]=='0'&& AllData[2][key] =='0'&& AllData[3][key] =='0'&& AllData[4][key] =='0'){
        //  arr119.push({text:key,max:AllData[0][key]});
            delete AllData[0][key];
            delete AllData[1][key];
            delete AllData[2][key];
            delete AllData[3][key];
            delete AllData[4][key];
            // delete AllData[5][key];
            
        } 
      }
    }
    console.log(8888888888888888,AllData)

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
      }})
      console.log(66666666666,AllData)

    for (let key in AllData[0]) {
      if (AllData[0][key] && element_Map.has(key)) {
        if (AllData[0][key] && element_Map.get(key)) {
           AllRadarData.push({ text: element_Map.get(key), max:  Number(obj_max[key]) })
          // AllRadarData.push({ text: element_Map.get(key) })
        } else {
           AllRadarData.push({ text: element_Map.get(key), max:  Number(obj_max[key]) })
          // AllRadarData.push({ text: element_Map.get(key)})
        }
      }
      arr1.push( Number(AllData[0][key]));
      arr2.push( Number(AllData[1][key]));
      arr3.push( Number(AllData[2][key]));
      arr4.push( Number(AllData[3][key]));
      arr5.push( Number(AllData[4][key]));
      // arr6.push( Number(AllData[5][key]));
    }

    // all.push({max:AllRadarData,Threshold17:arr1,Threshold18:arr2,depth1:arr3,depth2:arr4,depth3:arr5,depth4:arr6})
    all.push({max:AllRadarData,Threshold17:arr1,depth1:arr2,depth2:arr3,depth3:arr4,depth4:arr5})
    

      ctx.body = {
        success: true,
        res:all,
        msg: '获取成功'
      }
  }else if(assess_type == 3){
    let res3 = await AllEchartDataModel.RadarEachDepthValue(assess_type,point_num)
    console.log(56586556,assess_type,point_num)
    let Echart_arr3 = res3.map(item => {
      return item = item.dataValues
    })
    let type3Data=[]
    
    Echart_arr3.forEach((item)=>{
      if(item.statistic_value=='max_value'){
          delete item.statistic_value;
          delete item.sample_depth;
          type3Data.push(item)
          
      }
    })
  
    let all =[]
    let arr1 =[]
    let arr2 =[]
    let arr3 =[]
    let AllData =[]
    let AllRadarData = []
    // AllData.push(Threshold17[0],Threshold18[0],type3Data[0])
    AllData.push(Threshold17[0],type3Data[0])
    
    for(let i=0;i<AllData.length;i++){
      for(let key in AllData[0] ){
        if(AllData[1][key]=='0'){
        //  arr119.push({text:key,max:AllData[0][key]});
            delete AllData[0][key];
            delete AllData[1][key]; 
            // delete AllData[2][key];
           
            
        } 
      }
    }

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
          AllRadarData.push({ text: element_Map.get(key), max: Number( obj_max[key]) })
        } else {
          AllRadarData.push({ text: element_Map.get(key), max:  Number(obj_max[key]) })
        }
      }
      arr1.push( Number(AllData[0][key]));
      arr2.push( Number(AllData[1][key]));
      // arr3.push( Number(AllData[2][key]));
     
    }

    // all.push({max:AllRadarData,Threshold17:arr1,Threshold18:arr2,depth1:arr3})
    all.push({max:AllRadarData,Threshold17:arr1,depth1:arr2})
    ctx.body = {
      success: true,
      res:all,
      msg: '获取成功'
    }

  }
    
 };//对应于雷达图里面的在一个调查类型下的一个监测点位中的不同深度的数据值


 static async getAllFoldData(ctx) {
  
  let SingleElementOptions = ctx.request.body //从前端传入的数据
  let { point_num,assess_type,element } = SingleElementOptions //将传入的数据将进行定义
  let statistic_value= 'mean_value'
  let res = await AllEchartDataModel.getFoldElement(point_num,assess_type,element)//通过point_num,assess_type,element将数据库中的数据取出
  let res2 = await AllEchartDataModel.getFoldElementMean(point_num,assess_type,element,statistic_value)//通过point_num,essess_type将数据库中取出 
  
  console.log(2222222, assess_type)
  let res3 = res2.map(item => {
    return item = item.dataValues
  })
  console.log(666666666, res3)

  let res1 = res.map(item => {
    return item = item.dataValues
  })
  
  let sample_depth = res.map(item => {
    return item = item.dataValues.sample_depth
  })
  console.log(11111111, sample_depth)

  let sample_num = res.map(item => {
    return item = item.dataValues.sample_num
  })//将不同监测点位下以及不同评估类型下的样本取出

  console.log(333333333, sample_num)
 
  let Sample = []
  for (let i=0;i<sample_num.length;i++){
    let x ;
    x = i  ;
    Sample.push('样本'+'-'+ sample_depth[x]);
  }//转换形式
  // sample_depth.forEach((item)=>{
    
  // })

  let Element_arr = []
  let Element_arr2 = []
  res1.forEach((item)=>{
    for(let key in item){
      delete item.sample_num
      delete item.sample_depth
      if(item[key]==-1){
        item[key]='0'
      }
      Element_arr.push(item[key])
    } 
  })
  // console.log(999999,Element_arr)
  res3.forEach((item)=>{
    for(let key in item){
      for(let i=0;i<Element_arr.length;i++){
        Element_arr2.push(item[key])
      }
      
    } 
  })

  let reference_value = []
  for(let i=0;i<Element_arr.length;i++){
    reference_value.push(reference_17_ground_Map.get(element))
  }
  console.log(4444444,reference_value)
   

 
  let FoldData_arr = []
  FoldData_arr.push({sample: Sample,data1: Element_arr ,mean_value:Element_arr2, reference_value:reference_value,unit:unit_Map.get(element)})
  // 监之前的数据全部push到数组里面
 
  ctx.body = {
    success: true,
    res:FoldData_arr,
    msg: '获取成功'
  }
};

  
}

module.exports = echart_Controller