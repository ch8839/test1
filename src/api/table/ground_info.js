import request2 from '../../utils/request2'

export function getLabGroundList(TableOptions){
    return request2.post('/ground/getLabGroundList', TableOptions)   
}

export function getDetGroundList(TableOptions){
    return request2.post('/ground/getDetGroundList', TableOptions)   
}

export function getLabGroundReference(sample_num){
    return request2.get('/ground/getLabGroundReference/' + sample_num)   
}

