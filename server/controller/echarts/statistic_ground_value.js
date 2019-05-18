const AllEchartDataModel = require('../../models/echarts/echart_ground.js')
const AllMap = require('../../models/common/Map.js')
const sample_detector_lab_info_model=require('../../models/echarts/update.js')


var reference_17_ground_Map, element_Map, unit_Map

AllMap.then(data=>{
reference_17_ground_Map = data.reference_17_ground_Map
element_Map = data.element_Map
unit_Map = data.unit_Map
})

class echartCompute_Controller{

  static async ComputeHistogramElementValue(ctx){
    let UpdateOptions = ctx.request.body //从前端传入的数据
    let { assess_type,statistic_value } = UpdateOptions
    let res = await AllEchartDataModel.getElementData(assess_type)//得到所有的数据
    assess_type=Number(assess_type)
    // console.log('888',typeof assess_type)
    
    let res1 = res.map(item=>{
        return item = item.dataValues
    })

    function deepClone(obj) {
      let result = typeof  obj.splice === "function" ? [] : {};
      if (obj && typeof obj === 'object') {
          for (let key in obj) {
              if (obj[key] && typeof obj[key] === 'object') {
                  result[key] = deepClone(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
              } else {
                  result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
              }
  
          }
          return result;
      }
      return obj;
  }
      
     let map = ["PH",
                "arsenic",
                "cadmium",
                "chromium",
                "copper",
                "lead",
                "mercury", 
                "nickel", 
                "nickel",
                "antimony",
                "beryllium",
                "cobalt",
                "zinc",
                "silver",
                "thallium",
                "tin",
                "selenium",
                "molybdenum",
                "Alum"]
 
    let obj = {}
    res1.forEach(item=>{
     
          if(item['point_num'] in obj){
              let arr_temp = []
              map.forEach(ele=>{
                if(item[ele] !== '-1' && item[ele] !== '0' ){
                  arr_temp[ele] = item[ele]
                }else{
                  arr_temp[ele] = '0'
                }
                 
              })
              obj[item['point_num']].push(arr_temp)
          }else{
              obj[item['point_num']] = []
              let arr_temp = {}
              map.forEach(ele=>{
                if(item[ele] !== '-1' && item[ele] !== '0' ){
                  arr_temp[ele] = item[ele]
                }else{
                  arr_temp[ele] = '0'
                } 
              })
              obj[item['point_num']].push(arr_temp)
                    
          }
      
      })
 
   let arr_max = []
   for(let key in obj){
      let ele_list = obj[key]
      let obj_max = ele_list.reduce((acu, cur)=>{
          for(let key2 in cur){
              acu[key2] = cur[key2]>acu[key2] ? cur[key2]:acu[key2]
          }
          return acu
      })
      obj_max['point_num'] = key
      arr_max.push(obj_max)
    }
    // console.log('我是8585',arr_max)

    let obj2 = deepClone(obj);
    let arr_average = []
    for(let key in obj2){
        let ele_list = obj2[key]
        let obj_total = ele_list.reduce((acu, cur)=>{
         for(let key2 in cur){
          // console.log(131, cur[key2])
           
            acu[key2] = Number(acu[key2]) + Number(cur[key2])
            // console.log(acu[key2])
           
         }
         return acu
        })
        // console.log(8956,obj_total)
        
        // console.log(obj_total)
    for(let ele in obj_total){
        obj_total[ele] /=ele_list.length
        obj_total[ele] = obj_total[ele].toFixed(2)
    }
    obj_total['point_num'] = key
    
    arr_average.push(obj_total)
    
    } 
    for(let o=0;o<arr_max.length;o++){
     
      let  item = arr_max[o]
      let  item2=arr_average[o]
       
          if(statistic_value == 'max_value'){
            console.log('statistic_value',statistic_value)

            const arr5 = await sample_detector_lab_info_model.UpdateElementData(statistic_value,item['point_num'],assess_type,item)
           
          }else if(statistic_value == 'mean_value'){
            console.log('statistic_value2',statistic_value)
            const arr6 = await sample_detector_lab_info_model.UpdateElementData(statistic_value,item2['point_num'],assess_type,item2)
          }
 
     }
    
    
    ctx.body = {
      success: true,
      res: arr_max,
      msg: '获取成功'
    }
  };


  static async ComputeRadarElementEachDepthValue(ctx){
   
    let UpdateOptions = ctx.request.body //从前端传入的数据
    let { sample_depth,statistic_value } = UpdateOptions
    // console.log('888', statistic_value)
    let assess_type = 2
    console.log('888', statistic_value,sample_depth,assess_type)
    let res = await AllEchartDataModel.getFoldData(sample_depth,assess_type)//得到所有的数据
    assess_type=Number(assess_type)
    
    
    let res1 = res.map(item=>{
        return item = item.dataValues
    })

    function deepClone(obj) {
      let result = typeof  obj.splice === "function" ? [] : {};
      if (obj && typeof obj === 'object') {
          for (let key in obj) {
              if (obj[key] && typeof obj[key] === 'object') {
                  result[key] = deepClone(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
              } else {
                  result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
              }
  
          }
          return result;
      }
      return obj;
  }
    
      
     let map = ["PH",
                "arsenic",
                "cadmium",
                "chromium",
                "copper",
                "lead",
                "mercury", 
                "nickel", 
                "antimony",
                "beryllium",
                "cobalt",
                "zinc",
                "silver",
                "thallium",
                "tin",
                "selenium",
                "molybdenum",
                "Alum"]
   
    let obj = {}
    res1.forEach(item=>{
     
          if(item['point_num'] in obj){
              let arr_temp = []
              map.forEach(ele=>{
                if(item[ele] !== '-1' && item[ele] !== '0' ){
                  arr_temp[ele] = item[ele]
                }else{
                  arr_temp[ele] = '0'
                }
                 
              })
              obj[item['point_num']].push(arr_temp)
          }else{
              obj[item['point_num']] = []
              let arr_temp = {}
              map.forEach(ele=>{
                if(item[ele] !== '-1' && item[ele] !== '0' ){
                  arr_temp[ele] = item[ele]
                }else{
                  arr_temp[ele] = '0'
                } 
              })
              obj[item['point_num']].push(arr_temp)
                    
          }
      
      })
      
 
   let arr_max = []
   for(let key in obj){
      let ele_list = obj[key]
      let obj_max = ele_list.reduce((acu, cur)=>{
          for(let key2 in cur){
              acu[key2] = cur[key2]>acu[key2] ? cur[key2]:acu[key2]
          }
          return acu
      })
      obj_max['point_num'] = key
      arr_max.push(obj_max)
    }
    
   
    let obj2 = deepClone(obj);

    let arr_average = []
    for(let key in obj2){
        let ele_list = obj2[key]
        let obj_total = ele_list.reduce((acu, cur)=>{
         for(let key2 in cur){
          // console.log(131, cur[key2])
           
            acu[key2] = Number(acu[key2]) + Number(cur[key2])
            // console.log(acu[key2])
           
         }
         return acu
     })
        
    for(let ele in obj_total){
        obj_total[ele] /=ele_list.length
        obj_total[ele] = obj_total[ele].toFixed(2)
    }
    obj_total['point_num'] = key
    
    arr_average.push(obj_total)
    
    } 
    

    for(let o=0;o<arr_max.length;o++){
     
      let  item = arr_max[o]
      let  item2=arr_average[o]
       
          if(statistic_value == 'max_value'){
            console.log('statistic_value',statistic_value)

            const arr5 = await sample_detector_lab_info_model.UpdateType2ElementEachDepthData(statistic_value,item['point_num'],sample_depth,item)
           
          }else if(statistic_value == 'mean_value'){
            console.log('statistic_value2',statistic_value)
            const arr6 = await sample_detector_lab_info_model.UpdateType2ElementEachDepthData(statistic_value,item2['point_num'],sample_depth,item2)
          }
 
     }
   


    ctx.body = {
      success: true,
      res: arr_average,
      msg: '获取成功'
     }
  }

}
  module.exports = echartCompute_Controller





