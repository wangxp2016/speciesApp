/* 网站商品详,网站案例详情 模块 */

const router = require('koa-router')();
const speciesModel = require('../../model/species');
const upload = require('../../middlewares/uploaded');
const layout = require('../../model/layoutCommon');

router
    .get('/', async (ctx) => {

        const fileList = upload.getFiles.getFileList("www/speciesFile/");
        for(let i in fileList){
            let file = fileList[i];
            file.isEmpty = true;
            for(let j in file.children){
                let folder = file.children[j].children[0].children
                if(folder.length>0){
                    file.isEmpty = false;
                }
            }
            console.log(fileList[i]);
        }
        const I = await layout.webI();

        // 输出模板
        await ctx.render('download', {
            fileList: fileList,
            I: I[0] // logo
        });

    });
module.exports = router.routes();