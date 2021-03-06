/* 商品模块 */

const router = require('koa-router')();
const moment = require('moment');
const speciesModel = require('../../model/species');
const upload = require('../../middlewares/uploaded');
const info = require('../../middlewares/info');

function firstUpperCase(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

router
    // 添加商品
    .post('/speciesadd', upload.configure(), async (ctx) => {
        const species = ctx.request.body;
        // 添加操作
        try {
            const speciesTime = moment().unix(),
                keyWord = species.species.substring(0, 1),
                introduction_img = upload.pathHandle(ctx, 'introduction_img'), // 获取图片路径
                habitat_img = upload.pathHandle(ctx, 'habitat_img'), // 获取图片路径
                distribution_img = upload.pathHandle(ctx, 'distribution_img'), // 获取图片路径
                morphology_img = upload.pathHandle(ctx, 'morphology_img'); // 获取图片路径
            let literature = '';
            if (species.literature && Array.isArray(species.literature)) {
                literature = species.literature.join('||');
            }
            const data = await speciesModel.speciesAdd(
                firstUpperCase(species.order),
                firstUpperCase(species.suborder),
                firstUpperCase(species.superfamily),
                firstUpperCase(species.family),
                firstUpperCase(species.subfamily),
                firstUpperCase(species.genus),
                firstUpperCase(species.species),
                species.linkAddr,
                species.introduction,
                introduction_img,
                species.habitat,
                habitat_img,
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
                species.nucleus_male,
                species.nucleus_female,
                literature,
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
        const habitat_list = await speciesModel.habitatPicDel(ctx.query.id).picList(); // 获取全部图片
        upload.fileDelete(habitat_list, 'habitat_img');

        // 删除图片文件
        const distribution_list = await speciesModel.distributionPicDel(ctx.query.id).picList(); // 获取全部图片
        upload.fileDelete(distribution_list, 'distribution_img');

        const morphology_list = await speciesModel.morphologyPicDel(ctx.query.id).picList(); // 获取全部图片
        upload.fileDelete(morphology_list, 'morphology_img');

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
            let introductionSite, habitatSite, distributionSite, morphologySite, literature = '';
            if (species.literature && Array.isArray(species.literature)) {
                literature = species.literature.join('||');
            }

            let introductionList = await speciesModel.introductionPicDel(species.id).picList(); // 全部地理分布图片路径
            if (ctx.request.files['introduction_img']) {
                introductionSite = upload.fileUpdate(ctx, 'introduction_img', introductionList, 'introduction_img'); // 修改图片路径
            } else {
                introductionSite = introductionList[0].introduction_img;
            }

            let habitatList = await speciesModel.habitatPicDel(species.id).picList(); // 全部地理分布图片路径
            if (ctx.request.files['habitat_img']) {
                habitatSite = upload.fileUpdate(ctx, 'habitat_img', habitatList, 'habitat_img'); // 修改图片路径
            } else {
                habitatSite = habitatList[0].habitat_img;
            }

            let distributionList = await speciesModel.distributionPicDel(species.id).picList(); // 全部地理分布图片路径
            if (ctx.request.files['distribution_img']) {
                distributionSite = upload.fileUpdate(ctx, 'distribution_img', distributionList, 'distribution_img'); // 修改图片路径
            } else {
                distributionSite = distributionList[0].distribution_img;
            }

            let morphologyList = await speciesModel.morphologyPicDel(species.id).picList(); // 全部形态图片路径
            if (ctx.request.files['morphology_img']) {
                morphologySite = upload.fileUpdate(ctx, 'morphology_img', morphologyList, 'morphology_img'); // 修改图片路径
            } else {
                morphologySite = morphologyList[0].morphology_img;
            }

            let speciesTime = moment().unix();
            let keyWord = species.species.substring(0, 1);
            const data = await speciesModel.speciesEdit(
                species.id,
                firstUpperCase(species.order),
                firstUpperCase(species.suborder),
                firstUpperCase(species.superfamily),
                firstUpperCase(species.family),
                firstUpperCase(species.subfamily),
                firstUpperCase(species.genus),
                firstUpperCase(species.species),
                species.linkAddr,
                species.introduction,
                introductionSite,
                species.habitat,
                habitatSite,
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
                species.nucleus_male,
                species.nucleus_female,
                literature,
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
    // 删除生境型图片
    .get('/introductionPicDel', async (ctx) => {
        const params = ctx.query,
            list = await speciesModel.introductionPicDel(params.id).picList(); // 获取全部图片

        // 删除图片文件及地址处理
        const pic = upload.fileDelete(list, 'introduction_img', params.path);

        // 执行删除
        try {
            const data = await speciesModel.introductionPicDel(params.id, pic).upPic();
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

    // 删除生境型图片
    .get('/habitatPicDel', async (ctx) => {
        const params = ctx.query,
            list = await speciesModel.habitatPicDel(params.id).picList(); // 获取全部图片

        // 删除图片文件及地址处理
        const pic = upload.fileDelete(list, 'habitat_img', params.path);

        // 执行删除
        try {
            const data = await speciesModel.habitatPicDel(params.id, pic).upPic();
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
    // 删除地理分布图片
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

    // 删除形态图图片
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