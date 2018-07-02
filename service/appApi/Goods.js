const Koa = require('koa')
const app = new Koa()

const Router=require("koa-router");
const mongoose=require('mongoose');
const {connect , initSchemas} = require('../database/init.js');
const fs = require('fs');
let router=new Router();


router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./data_json/newgoods.json','utf8',(err,data)=>{
       data=JSON.parse(data)
       let saveCount=0
       const Goods = mongoose.model('Goods')
       data.map((value,index)=>{
           console.log(value)
           let newGoods = new Goods(value)
           newGoods.save().then(()=>{
               saveCount++
               console.log('成功'+saveCount)
           }).catch(error=>{
                console.log('失败：'+error)
           })
       })
       
   })
   ctx.body="开始导入数据"
})
router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                 console.log('失败：'+error)
            })
        })
       
        
    })
    ctx.body="开始导入数据"
 
})
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0 
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('成功插入'+saveCount)
            }).catch(error=>{
                console.log('插入失败:'+error)
            })
        }) 
    })
    ctx.body="开始导入数据"
})
//***获取商品详细信息的接口
router.post('getDetailGoodsInfo',async(ctx)=>{
    // let goodsId = ctx.request.body.goodsId
    // const Goods = mongoose.model('Goods')
    // await Goods.findOne({ID:goodsId}).exec().then(async(result)=>{
    //     ctx.body={status:200,message:result}
    // }).catch(error=>{
    //     ctx.body={status:500,message:error}
    // })

    try{
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let result=await Goods.findOne({ID:goodsId}).exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
module.exports=router;