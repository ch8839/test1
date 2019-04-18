const markerModel = require('../models/data.js')
const tableModel = require('../models/data.js');
const AllProjectDataModel = require('../models/projectInfo3.js')
const AllGroundDataModel = require('../models/groundInfo2.js')
const ReferenceDataMOdel=require('../models/reference.js')
const ElementDataModel=require('../models/elementInfo.js')



const getMarkerList = async function () {
    const ground_number = this.params.ground_number
   
    let res = await AllGroundDataModel.getPoingLocationByGroundnum(ground_number)
 
   
   
 
    // res.push(ground_name_point[ground_number])

    this.body = {
        success: true,
        res: res,
        msg: '获取成功'
      
    }


}




module.exports = {
    getMarkerList
  }
  