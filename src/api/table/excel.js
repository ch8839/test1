import request2 from '../../utils/request2'

export function uploadExcel(data, database_type){
    return request2.post('/excel/uploadExcel', { data, database_type })   
}