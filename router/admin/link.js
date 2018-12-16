/* 链接模块 */

const router = require('koa-router')();
const moment = require('moment');
const linkModel = require('../../model/link');
const upload = require('../../middlewares/uploaded');
const info = require('../../middlewares/info');

router
    // 添加链接
    .post('/linkadd', upload.configure(), async (ctx) => {
        const link = ctx.request.body,
            createTime = moment().unix(),
            link_img = upload.pathHandle(ctx, 'link_img'); // 获取图片路径

            // 添加操作
            try {
                const data = await linkModel.linkAdd(
                    link.name,
                    link.link,
                    link_img,
                    link.type,
                    createTime
                );
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

    // 查询链接列表
    .get('/linklist', async (ctx) => {
        const params = ctx.query;
        const page = parseInt(params.page);
        const pagesize = parseInt(params.pagesize);

        const data = await linkModel.linkList(page, pagesize, params.link);
        const dataList = await data.list;
        const totalRows = await data.totalRows;
        const totalPage = Math.ceil(totalRows[0].n / pagesize);

        ctx.body = info.paging(dataList, page, totalPage, totalRows);
    })

    // 删除链接
    .get('/linkdel', async (ctx) => {

        // 删除图片文件
        const link_img = await linkModel.linkPicDel(ctx.query.id).picList(); // 获取全部图片
        upload.fileDelete(link_img, 'images');

        // 删除操作
        try {
            const data = await linkModel.linkDel(ctx.query.id);
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

    // 查询链接详情
    .get('/linkonly', async (ctx) => {
        const data = await linkModel.linkOnly(ctx.query.id);
        ctx.body = data[0];
    })

    // 修改链接
    .post('/linkedit', upload.configure(), async (ctx) => {
        let link = ctx.request.body;

        try {
            let linkImage
            if (ctx.request.files['link_img']) {
                let linkList = await linkModel.linkPicDel(link.id).picList(); // 全部链接图片路径
                linkImage = upload.fileUpdate(ctx, 'link_img', linkList, 'link_img'); // 修改图片路径
            }
            let createTime = moment().unix();
            const data = await linkModel.linkEdit(
                link.id,
                link.name,
                link.link,
                linkImage,
                link.type,
                createTime
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

    // 删除链接图片
    .get('/linkPicDel', async (ctx) => {
        const params = ctx.query,
            list = await linkModel.linkPicDel(params.id).picList(); // 获取全部图片

        // 删除图片文件及地址处理
        const pic = upload.fileDelete(list, 'images', params.path);

        // 执行删除
        try {
            const data = await linkModel.linkPicDel(params.id, pic).upPic();
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
    });

module.exports = router.routes();