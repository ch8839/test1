import request2 from '@/utils/request2'

export function login(username, password) {
  return request2.post('/user2/login', {username, password})   
}

export function getInfo(token) {
  return request2.get('/user2/info/' + token)  
}

// export function logout() {
//   return request2({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
