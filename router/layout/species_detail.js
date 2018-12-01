/* 网站商品详,网站案例详情 模块 */

const router=require('koa-router')();
const speciesModel=require('../../model/species');
const upload = require('../../middlewares/uploaded');
const layout=require('../../model/layoutCommon');

router
    .get('/', async (ctx)=>{
        var name = ctx.query.species;
        const speciesDetail=await speciesModel.speciesOnlyByName(name); // 物种详情数据
        const fileList = upload.getFiles.getFileList("www/speciesFile/"+name);
        speciesDetail[0].fileList = fileList;
        const I=await layout.webI();

        // 输出模板
        await ctx.render('single-species',{
            speciesDetail: speciesDetail[0], 
            I:I[0] // logo
        });

    });
module.exports=router.routes();