const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();

app.use(bodyParser());
//跨域
app.use(cors({
    origin: function (ctx) {
        return "*"; // 允许来自所有域名请求
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(router.routes())

//端口监听
app.listen(3009, ()=>{
    console.log("listening on port 3009")
});