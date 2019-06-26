function formatNumber(n){
 const str = n.toString()
 return str[1]? str: `0${str}`
}

const week_map =['星期一', '星期二', '星期三','星期四', '星期五', '星期六', '星期七']
 
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

const formatTime3 = function(time){
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    let week = date.getDay()
    
    const t1 = [year, month, day].map(formatNumber).join('-')
    const t2 = [hour, minute, second].map(formatNumber).join(':')
    const t3 = week_map[week-1]
    return `${t1} ${t2} ${t3}`
}
export {formatTime , formatTime2, formatTime3 }