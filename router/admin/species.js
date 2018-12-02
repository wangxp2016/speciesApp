/* 商品模块 */

const router = require('koa-router')();
const moment = require('moment');
const speciesModel = require('../../model/species');
const upload = require('../../middlewares/uploaded');
const info = require('../../middlewares/info');

router
    // 添加商品
    .post('/speciesadd', upload.configure(), async (ctx) => {
        const species = ctx.request.body,
            speciesTime = moment().unix(),
            keyWord =  species.species.substring(0,1),
            distribution_img = upload.pathHandle(ctx, 'distribution_img'), // 获取图片路径
            morphology_img = upload.pathHandle(ctx, 'morphology_img'); // 获取图片路径

        // 添加操作
        try {
            const data = await speciesModel.speciesAdd(
                species.order,
                species.suborder,
                species.superfamily,
                species.family,
                species.subfamily,
                species.genus,
                species.species,
                species.introduction,
                distribution_img,
                species.distribution,
                morphology_img,
                species.body_color,
                species.body_length_male,
                species.body_length_female,
                species.forewing_length_male,
                species.forewing_length_female,
                species.hindFemur_length_male,
                species.hindFemur_length_female,
                species.pronotum_length_male,
                species.pronotum_length_female,
                species.literature,
                speciesTime,
                species.remark,
                keyWord);
            if (data.affectedRows) {
                // 新增成功
                ctx.body = info.suc('新增成功！');
            } else {
                // 新增失败
                ctx.body = info.err('新增失败，请重试！');
            }
        } catch (e) {
            ctx.body = info.err('操作失败，请重试！' + e);
        }

    })

    // 查询商品列表
    .get('/specieslist', async (ctx) => {
        const params = ctx.query;
        const page = parseInt(params.page);
        const pagesize = parseInt(params.pagesize);

        const data = await speciesModel.speciesList(page, pagesize, params.species);
        const dataList = await data.list;
        const totalRows = await data.totalRows;
        const totalPage = Math.ceil(totalRows[0].n / pagesize);

        ctx.body = info.paging(dataList, page, totalPage, totalRows);
    })

    // 删除商品
    .get('/speciesdel', async (ctx) => {

        // 删除图片文件
        const distribution_list = await speciesModel.distributionPicDel(ctx.query.id).picList(); // 获取全部图片
        upload.fileDelete(list, 'distribution_img');

        const morphology_list = await speciesModel.morphologyPicDel(ctx.query.id).picList(); // 获取全部图片
        upload.fileDelete(list, 'morphology_img');

        // 删除操作
        try {
            const data = await speciesModel.speciesDel(ctx.query.id);
            if (data.affectedRows) {
                // 删除成功
                ctx.body = info.suc('删除成功！');
            } else {
                // 删除失败
                ctx.body = info.err('删除失败，请重试！');
            }
        } catch (e) {
            ctx.body = info.err('操作失败，请重试！');
        }
    })

    // 查询商品详情
    .get('/speciesonly', async (ctx) => {
        const data = await speciesModel.speciesOnly(ctx.query.id);
        const fileList = upload.getFiles.getFileList("www/speciesFile/");
        data[0].fileList = fileList;
        ctx.body = data[0];
    })

    // 修改商品
    .post('/speciesedit', upload.configure(), async (ctx) => {
        let species = ctx.request.body;

        try {
            let distributionSite,morphologySite
            if (ctx.request.files['distribution_img']) {
                let distributionList = await speciesModel.distributionPicDel(species.id).picList(); // 全部地理分布图片路径
                distributionSite = upload.fileUpdate(ctx, 'distribution_img', distributionList, 'distribution_img'); // 修改图片路径
            }
            if (ctx.request.files['morphology_img']) {
                let morphologyList = await speciesModel.morphologyPicDel(species.id).picList(); // 全部形态图片路径
                morphologySite = upload.fileUpdate(ctx, 'morphology_img', morphologyList, 'morphology_img'); // 修改图片路径
            }
            let speciesTime = moment().unix();
            let keyWord =  species.species.substring(0,1);
            const data = await speciesModel.speciesEdit(
                species.id,
                species.order,
                species.suborder,
                species.superfamily,
                species.family,
                species.subfamily,
                species.genus,
                species.species,
                species.introduction,
                distributionSite,
                species.distribution,
                morphologySite,
                species.body_color,
                species.body_length_male,
                species.body_length_female,
                species.forewing_length_male,
                species.forewing_length_female,
                species.hindFemur_length_male,
                species.hindFemur_length_female,
                species.pronotum_length_male,
                species.pronotum_length_female,
                species.literature,
                speciesTime,
                species.remark,
                keyWord
            );
            if (data.affectedRows) {
                // 修改成功
                ctx.body = info.suc('修改成功！');
            } else {
                // 修改失败
                ctx.body = info.err('修改失败，请重试！');
            }
        } catch (e) {
            console.log(e);
            ctx.body = info.err('操作失败，请重试！');
        }
    })

    // 删除商品图片
    .get('/distributionPicDel', async (ctx) => {
        const params = ctx.query,
            list = await speciesModel.distributionPicDel(params.id).picList(); // 获取全部图片

        // 删除图片文件及地址处理
        const pic = upload.fileDelete(list, 'distribution_img', params.path);

        // 执行删除
        try {
            const data = await speciesModel.distributionPicDel(params.id, pic).upPic();
            if (data.affectedRows) {
                // 删除成功
                ctx.body = info.suc('删除成功！');
            } else {
                // 删除失败
                ctx.body = info.err('删除失败，请重试！');
            }
        } catch (e) {
            ctx.body = info.err('操作失败，请重试！');
        }
    })

    // 删除商品图片
    .get('/morphologyPicDel', async (ctx) => {
        const params = ctx.query,
            list = await speciesModel.morphologyPicDel(params.id).picList(); // 获取全部图片

        // 删除图片文件及地址处理
        const pic = upload.fileDelete(list, 'morphology_img', params.path);

        // 执行删除
        try {
            const data = await speciesModel.morphologyPicDel(params.id, pic).upPic();
            if (data.affectedRows) {
                // 删除成功
                ctx.body = info.suc('删除成功！');
            } else {
                // 删除失败
                ctx.body = info.err('删除失败，请重试！');
            }
        } catch (e) {
            ctx.body = info.err('操作失败，请重试！');
        }
    })

;

module.exports = router.routes();