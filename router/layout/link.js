/* 链接模块 */

const router = require('koa-router')();
const linkModel = require('../../model/link');
const homeModel = require('../../model/layoutModel');
const layout = require('../../model/layoutCommon');
const info = require('../../middlewares/info');

router
    .get('/', async (ctx) => {
        const I = await layout.webI();
        const params = ctx.query;
        const type = params.type;
        const page = params.page || 1;
        const pagesize = params.pagesize || 100;

        const link = await linkModel.linkList(page, pagesize);
        var linkList = await link.list;
        console.log("linkList", linkList);
        let websites = [];
        let researchers = [];
        for (let link of linkList) {
            console.log("linkList", link);
            if (link.type == 'researchers') {
                researchers.push(link)
            } else {
                websites.push(link)
            }
        }

        // 输出模板
        await ctx.render('link', {
            researchers: researchers,
            websites: websites,
            I: I[0] // logo
        });
    });
module.exports = router.routes();