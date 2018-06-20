const Koa = require('koa')
const app = new Koa()
//引入connect
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')
//引入koa-bodyparser,获取前端请求
const bodyParser = require('koa-bodyparser')
//引入koa2-cors,解决跨域问题
const cors = require('koa2-cors')
//引入koa-router
const Router = require('koa-router')

app.use(bodyParser())
app.use(cors())

let user=require('./appApi/User.js')
//装载所有子路由
let router = new Router();
router.use('/user',user.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({userName:'zcl',password:'123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
    // let  users = await  User.findOne({}).exec()
    // console.log('------------------')
    // console.log(users)
    // console.log('------------------')  
})()

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})