import request2 from '@/utils/request2'

export function getAllPieData(point_num) {
  return request2.get('/echart/getAllPieData/'+ point_num)
}

export function getPieDataName(point_num) {
  return request2.get('/echart/getPieDataName/'+ point_num)
}
