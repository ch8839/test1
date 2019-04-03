import request2 from '../utils/request2'

export function getAll(){
    return request2.get('/project/getAll')
}
