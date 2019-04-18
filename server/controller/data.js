const markerModel = require('../models/data.js')
const tableModel = require('../models/data.js');

const AllProjectDataModel = require('../models/projectInfo3.js')
const AllGroundDataModel = require('../models/groundInfo2.js')
const ReferenceDataMOdel=require('../models/reference.js')
const ElementDataModel=require('../models/elementInfo.js')

const getMarkerInfo = async function () {
  let res = await AllProjectDataModel.getAllProjectData()//得到所有的数据
  let reference=await ReferenceDataMOdel.getReferenceData()//得到所有的参考值数据
  let groundnumtopoint=[]
  let ground_numberList=[]
  let data=[]

for(let item of res){//遍历数据
let ground_name_point = await AllGroundDataModel.getPointnumByGroundnum(item.ground_num)
//  遍历数据，取出ground_num得到对应监测点位如{‘a’:['b','c','d']}
 data.push(item.dataValues)
 groundnumtopoint.push(ground_name_point)
 ground_numberList.push(item.ground_num)
}

// console.log(data)  //data放清洗完毕的所有数据
//groun_num对应point-num存储在 groundnumtopoint   ground_num存储在ground_numberList中

for(let i of data){
  if(!i.count){//如果count不存在，则计算一下，有的话就不用计算了
  item1=i.ground_num
  list=groundnumtopoint[ground_numberList.indexOf(item1)][item1]//list中存储着监测点位编号是一个数组
  var countall = 0
  if(list){
   for(let item of list){//item存放着监测点位的编号
     var count=0
      let resph = await AllProjectDataModel.getPhData(item)
      // console.log(11,resph)
             let PHdata = resph.map(item=>{
               return item = item.dataValues
             })
             
            //  console.log(11,PHdata)
                      for(let item of PHdata){//遍历检测点位不同深度的数据为item
                        // console.log(11,item)
                        for(let x in item){
                          if(item[x]&&reference[x]&&(item[x]>reference[x]))
                          {
                            count++;
                            countall++;
                             }
                        }
                        const res = await ElementDataModel.UpdateCount(item.point_num,item.point_depth, count)   
                        const res1 = await AllGroundDataModel.UpdateCount(item.point_num,item.point_depth, count)   
                        //将违规数目更新至ground_info和real_time_info中
                      }
                    //  console.log(item)
                    // const res = await ElementDataModel.UpdateCount(item.point_num,item.point_depth, count)   
                  }
            //从这里开始结束循环，计算出一个地块所有检测点位的count
            // console.log(countall)
            // console.log(item1)
            const res2 = await AllProjectDataModel.UpdateCount(item1, countall) 
            //将违规数目更新至project_info中
      }
// console.log(s)
}

}//此处循环结束

let Alldata = await AllProjectDataModel.getAllProjectData()//得到所有的数据

    this.body = {
            success: true,
            res: Alldata,
            msg: '获取成功'
          
        }

}

const getTableData = async function () {
  const res = await tableModel.getAllTableData()
  if (res) {
    this.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const updateTable = async function () {
  console.log(this.request.body)
  let id = this.request.body.id
  let data = this.request.body

  const res = await tableModel.updateTable(id, data)

  if (res) {
    this.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const deleteTableData = async function () {
  let id = this.request.body.id
  const res = await tableModel.deleteData(id)

  if (res) {
    this.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const addTableData = async function () {
  const data = this.request.body.data
  const res = await tableModel.addData(data)

  if (res) {
    this.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}


module.exports = {
  getMarkerInfo,
  getTableData,
  updateTable,
  deleteTableData,
  addTableData
}
