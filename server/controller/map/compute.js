const AllProjectDataModel = require('../../models/map/projectInfo3.js')
const AllGroundDataModel = require('../../models/map/groundInfo2.js')
const ReferenceDataMOdel = require('../../models/map/reference.js')
const ElementDataModel = require('../../models/map/elementInfo.js')
const PointInfoModel = require('../../models/map/pointInfo.js')
const sample_detector_ground_info_model=require('../../models/map/sample_detector_ground_info.js')
const common_model=require('../../models/common/Map.js')



var reference,element_Map

common_model.then(data=>{
  reference = data.reference_17_ground_Map
  element_Map=data.element_Map
})

// 计算所有的simple_count, detail_count,fixed_count,all_count
const ComputeCount = async function (ctx) {
  
    let res = await sample_detector_ground_info_model.getAlldata()//得到所有的数据
    let res2 = res.map(item=>{
        return item = item.dataValues
      })
      for (let x of res2) {
          var count=0
          for (let i in x){
        if ( (x[i] > reference.get(i))) {
         count+=1
        }
      }
      const res = await sample_detector_ground_info_model.UpdateCount(x.point_num, x.sample_num, x.assess_type,count)
    }//这个过程结束后sample_detector_ground_info_model每个样本的count都会重新更新一遍
// 接下来来更新project_info的count数据
       const res3 = await AllProjectDataModel.getAllProjectData()
       let res4 = res3.map(item=>{
        return item = item.dataValues
      })
      for (let item of res4) { 
        let Point_numList = await PointInfoModel.getPointnumByProjectnum(item.project_num)
        
          var simple_count=0
          var detail_count=0
          var fixed_count=0
         
        for (let x of Point_numList ){
            
        let data = await sample_detector_ground_info_model.getDataByPointnum(x)
        
        let res5 = data.map(item=>{
            return item = item.dataValues
          })
          //res5里是个列表，列表里放的数据都是同一个point_num
          var point_count=0
        for (let y of res5){

            if (y.assess_type==1 && y.project_num==item.project_num){
                  simple_count+=y.count
                  point_count+=y.count
            }
            if (y.assess_type==2 && y.project_num==item.project_num){
                detail_count+=y.count
                point_count+=y.count

            }
            if (y.assess_type==3 && y.project_num==item.project_num){
                fixed_count+=y.count
                point_count+=y.count

           }
        }
        all_count=simple_count+detail_count+fixed_count
        
        const res = await AllProjectDataModel.UpdatedifferentCount(item.project_num,simple_count, detail_count,fixed_count,all_count)
        const res10 = await PointInfoModel.UpdatedifferentCount(x,point_count)

        }
      }
    
  }


//   reference_Map = new Map(reference_Map_arr)//拿到国标的标准值
//   element_Map = new Map(element_Map_arr)//拿到中英文映射
//   unit_Map = new Map(unit_Map_arr)//拿到单位映射
  const ComputeAttention = async function (ctx) {
   
    let Alldata = await sample_detector_ground_info_model.getAlldata()
    let res = Alldata.map(item=>{
        return item = item.dataValues
      })
    for(let i of res){
        var chazhi=0
        var attention=[]
        for (let item in i ){
           
            if ((i[item]>reference.get(item))&&(i[item]-reference.get(item)>0)&&element_Map.get(item)){
                chazhi=i[item]-reference.get(item)
                attention.push(item)
            }

        }
        if (chazhi==0){
           var attention=[]
        }

        temp_attention = attention.join(",")
        let data = await sample_detector_ground_info_model.UpdateAttention(i.point_num,i.sample_num,temp_attention)

}

  }

  module.exports = {
    ComputeCount,
    ComputeAttention,
   
  }
  