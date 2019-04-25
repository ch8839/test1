import request2 from '../../utils/request2'

export function getLabWaterList(TableOptions){
    return request2.post('/water/getLabWaterList', TableOptions)   
}

export function getDetWaterList(TableOptions){
    return request2.post('/water/getDetWaterList', TableOptions)   
}

export function getLabWaterReference(sample_num){
    return request2.get('/water/getLabWaterReference/' + sample_num)   
}

