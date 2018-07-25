const Koa = require('koa')
const app = new Koa()

const Router=require("koa-router");
const mongoose=require('mongoose');
const {connect , initSchemas} = require('../database/init.js');
const fs = require('fs');
let router=new Router();



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
router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
       data=JSON.parse(data)
       let saveCount=0
       const Goods = mongoose.model('Goods')
       data.map((value,index)=>{
           console.log(value)
           let newGoods = new Goods(value)
           console.log(newGoods)
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
router.post('/getDetailGoodsInfo',async(ctx)=>{
    // console.log(ctx.request.body.goodsId)
    // let goodsId = ctx.request.body.goodsId
    // const Goods = mongoose.model('Goods')
    // await Goods.findOne({ID:goodsId}).exec().then(async(result)=>{
    //     console.log(result)
    //     ctx.body={status:200,message:result}
    // }).catch(error=>{
    //     ctx.body={status:500,message:error}
    // })
    try{
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let result=await Goods.findOne({ID:goodsId}).exec()
        ctx.body={status:200,message:result}
    }catch(err){
        console.log(err);
        ctx.body={status:500,message:err}
    }
})
//获取商品分类
router.get("/getCategoryList",async(ctx)=>{
    try {
        const Category = mongoose.model('Category')
        let result =await Category.find().exec()
        ctx.body={status:200,message:result}   
    } catch (error) {
        cosole.log(error);
        ctx.body={status:500,message:error}
    }
})
//获取商品小类
router.post("/getCategorySubList",async(ctx)=>{
    try {
        let categoryId=ctx.request.body.categoryId;
        //let categoryId=1;
        const CategorySub = mongoose.model('CategorySub')
        let result =await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body={status:200,message:result}   
    } catch (error) {
        cosole.log(error);
        ctx.body={status:500,message:error}
    }
})
//根据商品类别获取商品
router.post("/getGoodsListByCategorySubId",async(ctx)=>{
    try{
        let subCategoryId=ctx.request.body.subCategoryId;
        let pageno=ctx.request.body.pageno;
        let pagesize=ctx.request.body.pagesize;
        let start=(pageno-1)*pagesize;
        const Goods = mongoose.model('Goods')
        let result=await Goods.find({SUB_ID:subCategoryId}).skip(start).limit(pagesize).exec()
        ctx.body={status:200,message:result}
    }catch(err){
        console.log(err);
        ctx.body={status:500,message:err}
    }

})
module.exports=router;