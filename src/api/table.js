import request from '@/utils/request'
import request2 from '@/utils/request2'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getTableData(params) {
  return request2.post('/table/getTableData',params)
}

export function updateTable(params) {
  return request2.post('/table/updateTable',params)
}

export function deleteData(params) {
  return request2({
    url:'/table/deleteData',
    method:'post',
    data:{
      id:params
    }
  })
}addTableData

export function addTableData(tableInfo) {
  return request2({
    url:'/table/addTableData',
    method:'post',
    data:{
      data:tableInfo
    }
  })
}
