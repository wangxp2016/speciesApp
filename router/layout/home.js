/* 网站主页模块 */

const router = require('koa-router')();
const homeModel = require('../../model/layoutModel');
const layoutModel = require('../../model/layoutCommon');

router
    // 主页数据分配
    .get('/', async (ctx) => {
        const websiteInfo = await layoutModel.webInfoQuery(); // 网站信息查询
        const superfamily = await homeModel.getSuperfamily();
        const I = await layoutModel.webI();

        // 输出模板
        await ctx.render('index', {
            websiteInfo,
            superfamily,
            I: I[0] // logo
        });
    })

    ;

module.exports = router.routes();