function formatNumber(n){
 const str = n.toString()
 return str[1]? str: `0${str}`
}

const formatTime = function(time){
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    
    const t1 = [year, month, day].map(formatNumber).join('-')
    const t2 = [hour, minute, second].map(formatNumber).join(':')
    return `${t1} ${t2}`
}
const formatTime2 = function(time){
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()    
    
    const t1 = [year, month, day].map(formatNumber).join('-')
    return `${t1}`
}
export {formatTime , formatTime2 }