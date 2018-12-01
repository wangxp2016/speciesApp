/* 网站案例模块 */

const router = require('koa-router')();
const speciesModel = require('../../model/species');
const homeModel = require('../../model/layoutModel');
const layout = require('../../model/layoutCommon');
const info = require('../../middlewares/info');

router
    .get('/', async (ctx) => {
        const I = await layout.webI();
        const params = ctx.query;
        const keyWord = params.word;
        const page = parseInt(params.page) || 1;
        const pagesize = parseInt(params.pagesize) || 10;

        const data = await speciesModel.speciesOverview(page, pagesize, keyWord);
        const num = await speciesModel.speciesOverviewNum();
        const dataList = await data.list;
        const totalRows = await data.totalRows;
        const totalPage = Math.ceil(totalRows[0].n / pagesize);

        // 输出模板
        await ctx.render('overview', {
            num:num,
            speciesList: info.paging(dataList, page, totalPage, totalRows),
            I: I[0] // logo
        });
    });
module.exports = router.routes();