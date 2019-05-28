import request2 from '../../utils/request2'

export function getProjectInfo(){
    return request2.get('/project/getProjectInfo')
}

export function getPointOptions(project_num){
    return request2.get('/project/getPointOptions/' + project_num)
}

export function getMarkerList(project_num){
    return request2.get('/project/getMarkerList/' + project_num)   
}
