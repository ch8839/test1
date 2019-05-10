const AllEchartDataModel = require('../../models/echarts/echart.js')
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
   
    let res1 = await AllEchartDataModel.getAllEchartData(point_num)
    let res = await AllEchartDataModel.getHistogramElement(point_num,element)//通过point_num,assess_type,element将数据库中的数据取出
    
    let  DifferentDepthData= res.map(item => {
      return item = item.dataValues
    })
    
    console.log('我是51',DifferentDepthData) 
    let Type = res1.map(item => {
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
    let mean_value3 = []

    DifferentDepthData.forEach((item) => {
        
        if (item['assess_type'] == Type[0] ) {
          mean_value1.push(item[element])
        }else if (item['assess_type'] == Type[1]){
          mean_value2.push(item[element])   
        }else if (item['assess_type'] == Type[2]){
          mean_value3.push(item[element])
          
        }
    })//将不同深度的想对应元素的数据取出放入一个数组中
     
    let mean_value_data1 = mean_value1.map(Number);//将数组内的对象字符型转换成数字
    let mean_value_data2 = mean_value2.map(Number);//将数组内的对象字符型转换成数字
    let mean_value_data3 = mean_value3.map(Number);//将数组内的对象字符型转换成数字
    let max1 = Math.max.apply(Math,mean_value_data1);
    let max2 = Math.max.apply(Math,mean_value_data2);
    let max3 = Math.max.apply(Math,mean_value_data3);
    console.log('mean_value3',max3)
   
    var avg =  function (array) {
      //将array的长度赋给len
      var len = array.length;
      var sum = 0;
      //利用for循环遍历数组的内容，利用sum累加求和
      for(var i = 0; i < len ; i++){
          sum += array[i];
      }
     //返回数组的和与长度求平均值
      return sum/len;
    }

    let mean_value_data = []
    let ElementList = []
    let max =[]
    
    if(mean_value_data3.length == 0){
        mean_value_data.push(avg(mean_value_data1).toFixed(2),avg(mean_value_data2).toFixed(2));
        max.push(max1,max2)
        console.log('mean_value_data',mean_value_data)
      }else if(mean_value_data3 !== 0 ){
        mean_value_data.push(avg(mean_value_data1).toFixed(2),avg(mean_value_data2).toFixed(2), avg(mean_value_data3).toFixed(2));
        max.push(max1,max2,max3)
    }
    ElementList.push( {assess_type:TypeList}, {mean_value: ['平均值','最大值']} ,{mean_value: '平均值' ,value:mean_value_data},{max:'最大值', value:max} ) 
      
 
    
    //将所需要的数据push到一个数组中去  
   
    if (ElementList) {
      ctx.body = {
        success: true,
        res: ElementList,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: true,
        res: [],
        msg: '获取失败'
      }
    }
  };//对应于柱状图的数据是将不同调查类型下的不同元素在不同深度的数据进行处理
  
  
  static async getRadarEachDepthValue(ctx) {
  
    // console.log("我是雷达的point_num")
    let FrontElement = ctx.request.body //从前端传入的数据
    let { point_num,assess_type } = FrontElement //将传入的数据将进行定义
    
    console.log("我是雷达的", point_num,assess_type)
    let res = await AllEchartDataModel.getFoldData(point_num,assess_type)
    console.log("我是雷达的22",res)
  
    let Echart_arr = res.map(item => {
      return item = item.dataValues
    })
    // console.log("我是深度",Echart_arr)
    let sample_depth = res.map(item => {
      return item = item.dataValues.sample_depth
    })
    sample_depth = sample_depth.filter((item, index, self) => {
        return index == self.indexOf(item)
      })//将得到的深度进行去重
    console.log("我是深度2",sample_depth)

   if(assess_type == 1){

    let AllEchartData = []
    
  
    Echart_arr.forEach((item) => {
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      for (let key in item) {
        if (item[key] && element_Map.has(key)) {
          if (item[key] && element_Map.get(key)) {
            AllEchartData.push({ text: element_Map.get(key),depth: item['sample_depth'], max: item[key] })
          } else {
            AllEchartData.push({ text: element_Map.get(key), depth: item['sample_depth'],max: item[key] })
          }
        }
      }
    })
    console.log(AllEchartData)
  
  
    let depth1 = []
    let depth2 = []
    let depth3 = []
    AllEchartData.forEach((item) => {
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      
        if (item["depth"] ==sample_depth[0]) {
          depth1.push( item["max"] )
        }else if(item["depth"] ==sample_depth[1]){
          depth2.push(  item["max"])
        }else if(item["depth"] ==sample_depth[2]){
          depth3.push(  item["max"])
        }
      
    })
  
    console.log("我是11",depth1)
  
    if (res) {
      ctx.body = {
        success: true,
        res: depth1,depth2,depth3,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '获取失败'
      }
    }
  }else if(assess_type == 2){

    let AllEchartData1 = []
    let AllEchartData2 = []
    let AllEchartData3 = []
    let AllEchartData4 = []
    // console.log(Echart_arr)
    
    Echart_arr.forEach((item) => {
      
        if (item['sample_depth'] == sample_depth[0] ) {
          
          AllEchartData1.push(item)
         
        }else if (item['sample_depth'] == sample_depth[1] ) {
          
          AllEchartData2.push(item)
         
        } if (item['sample_depth'] == sample_depth[2] ) {
          
          AllEchartData3.push(item)
         
        } if (item['sample_depth'] == sample_depth[3] ) {
          
          AllEchartData4.push(item)
         
        }
      
        
    })

    for(let i =0 ; i<AllEchartData1.length ; i++){
      delete AllEchartData1[i]['sample_num'];
      delete AllEchartData1[i]['assess_type'];
      delete AllEchartData1[i]['point_num'];
      delete AllEchartData1[i]['sample_depth'];
      delete AllEchartData1[i]['attention'];
      delete AllEchartData1[i]['lng'];
      delete AllEchartData1[i]['log'];
    }//删除特定属性

    let arry1 = []
    let depth1_mean_value = []

    for(let key in AllEchartData1[0] ){
              
      arry1 = ( Number(AllEchartData1[0][key]) + Number(AllEchartData1[1][key]) + Number(AllEchartData1[2][key]) + Number(AllEchartData1[3][key])) / 4 ;
              
      depth1_mean_value.push(arry1.toFixed(2));
            
      // console.log('我是队形属性',depth1_mean_value)
    }

    for(let i =0 ; i<AllEchartData2.length ; i++){
      delete AllEchartData2[i]['sample_num'];
      delete AllEchartData2[i]['assess_type'];
      delete AllEchartData2[i]['point_num'];
      delete AllEchartData2[i]['sample_depth'];
      delete AllEchartData2[i]['attention'];
      delete AllEchartData2[i]['lng'];
      delete AllEchartData2[i]['log'];
    }//删除特定属性
    
    let arry2 = []
    let depth2_mean_value = []

    for(let key in AllEchartData2[0] ){
              
      arry2 = ( Number(AllEchartData2[0][key]) + Number(AllEchartData2[1][key]) + Number(AllEchartData2[2][key]) + Number(AllEchartData2[3][key])) / 4 ;
              
      depth2_mean_value.push(arry2.toFixed(2));
            
      // console.log('我是队形属性',depth2_mean_value)
    }

    for(let i =0 ; i<AllEchartData3.length ; i++){
      delete AllEchartData3[i]['sample_num'];
      delete AllEchartData3[i]['assess_type'];
      delete AllEchartData3[i]['point_num'];
      delete AllEchartData3[i]['sample_depth'];
      delete AllEchartData3[i]['attention'];
      delete AllEchartData3[i]['lng'];
      delete AllEchartData3[i]['log'];
    }//删除特定属性
    
    let arry3 = []
    let depth3_mean_value = []

    for(let key in AllEchartData3[0] ){
              
      arry3 = ( Number(AllEchartData3[0][key]) + Number(AllEchartData3[1][key]) + Number(AllEchartData3[2][key]) + Number(AllEchartData3[3][key])) / 4 ;
              
      depth3_mean_value.push(arry3.toFixed(2));
            
      // console.log('我是队形属性',depth2_mean_value)
    }

    for(let i =0 ; i<AllEchartData4.length ; i++){
      delete AllEchartData4[i]['sample_num'];
      delete AllEchartData4[i]['assess_type'];
      delete AllEchartData4[i]['point_num'];
      delete AllEchartData4[i]['sample_depth'];
      delete AllEchartData4[i]['attention'];
      delete AllEchartData4[i]['lng'];
      delete AllEchartData4[i]['log'];
    }//删除特定属性
    
    let arry4 = []
    let depth4_mean_value = []

    for(let key in AllEchartData4[0] ){
              
      arry4 = ( Number(AllEchartData4[0][key]) + Number(AllEchartData4[1][key]) + Number(AllEchartData4[2][key]) + Number(AllEchartData4[3][key])) / 4 ;
              
      depth4_mean_value.push(arry4.toFixed(2));
            
      // console.log('我是队形属性',depth2_mean_value)
    }

    if (res) {
      ctx.body = {
        success: true,
        res: depth1_mean_value,depth2_mean_value,depth3_mean_value,depth4_mean_value,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '获取失败'
      }
    }
  }
    
  };//对应于雷达图里面的在一个调查类型下的一个监测点位中的不同深度的数据值
  
  static async getRadarData(ctx) {
  
    // const id = this.params.id
    let reference_num = ctx.params.reference_num;
    console.log("hellohello", reference_num);
    if (reference_num == 'max') {
      let resDatar_arr = await AllEchartDataModel.getAllRadarData(reference_num)
  
      let Datar_arr = resDatar_arr.map(item => {
        return item = item.dataValues
      })
  
      let AllRadarData = []
      console.log(Datar_arr)
  
  
      Datar_arr.forEach((item) => {
        //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
        for (let key in item) {
          if (item[key] && element_Map.has(key)) {
            if (item[key] && element_Map.get(key)) {
              AllRadarData.push({ text: element_Map.get(key), max: item[key] })
            } else {
              AllRadarData.push({ text: element_Map.get(key), max: item[key] })
            }
          }
        }
      })
      console.log("最大值", resDatar_arr)
  
      if (resDatar_arr) {
        ctx.body = {
          success: true,
          resDatar_arr: AllRadarData,
          msg: '获取成功'
        }
      } else {
        ctx.body = {
          success: false,
          msg: '获取失败'
        }
      }
  
    } else if(reference_num == '17国标') {
      let resDatar_arr = await AllEchartDataModel.getAllRadarData(reference_num)
  
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
  
      if (resDatar_arr) {
        ctx.body = {
          success: true,
          resDatar_arr: AllRadarData,
          msg: '获取成功'
        }
      } else {
        ctx.body = {
          success: false,
          msg: '获取失败'
        }
      }
    }
  };//得到国标值以及阈值
  
}

module.exports = echart_Controller