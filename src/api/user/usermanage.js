import request2 from '@/utils/request2'

export function getUserList() {
  return request2.get('/user2/getUserList')   
}


export function getProjectList() {
  return request2.get('/user2/getProjectList')   
}

export function addUser(data) {
  return request2.post('/user2/addUser', data)  
}

export function updateUser(data) {
  return request2.post('/user2/updateUser/' + data.id, data)  
}

export function deleteUser(userId) {
  return request2.delete('/user2/deleteUser/' + userId)  
}

