const router=require('koa-router')();

// 网站主页模块
router.use(require('./home'));

// 网站公共功能模块
router.use('common',require('./common'));

// 网站商品模块
router.use('goods',require('./goods'));

// 网站检索模块
router.use('overview',require('./overview'));

// 网站商品详,网站案例详情 模块
router.use('goodsDetail',require('./goods_detail'));

// 网站物种详情 模块
router.use('species',require('./species'));

// 网站专家 模块
router.use('link',require('./link'));

// 文件下载 模块
router.use('download',require('./download'));

// 网站物种详情 模块
router.use('speciesDetail',require('./species_detail'));

// 网站新闻模块
router.use('news',require('./news'));

// 网站新闻详情模块
router.use('newsDetail',require('./news_detail'));

// 网站关于模块
router.use('about',require('./about'));

module.exports=router.routes();