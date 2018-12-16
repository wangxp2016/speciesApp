const sql = require('../config/default').sql;
const moment = require('moment');

module.exports = {

    // 商品添加
    linkAdd(name, link, images, type, createTime) {

        // 默认值判断
        !name ? name = `` : ``;
        !link ? link = `` : ``;
        !images ? images = `` : ``;
        !type ? type = `` : ``;
        !createTime ? createTime = `` : ``;
        // 插入数据
        return sql.query(`INSERT INTO link (name,link,images,type,createTime) VALUES 
            ('${name}','${link}','${images}','${type}',${createTime});`);
    },

    // 查询商品列表
    linkList(page, pagesize, type) {
        let condition = `WHERE 1=1`;
        if (type) {
            condition = ` and type = '${type}'`;
        }
        // 总记录数
        const totalRows = sql.query(`SELECT COUNT(id) AS n FROM link ${condition} ;`);

        // 查询语句
        const list = sql.query(
            `SELECT * FROM link  ${condition} ORDER BY name ASC LIMIT ${(page-1)*pagesize},${pagesize};`
        );

        return {
            totalRows, // 总记录数
            list // 数据分页
        };
    },

    // 删除链接
    linkDel(id) {
        return sql.query(`DELETE FROM link WHERE id=${id};`);
    },

    // 查询链接详情
    linkOnly(id) {
        return sql.query(`SELECT * FROM link WHERE id=${id};`);
    },

    // 查询链接详情
    linkOnlyByName(name) {
        return sql.query(`SELECT * FROM link WHERE name='${name}';`);
    },

    // 修改链接
    linkEdit(id, name, link, images, type, createTime) {

        // 默认值判断
        !name ? name = `` : ``;
        !link ? link = `` : ``;
        !images ? images = `` : ``;
        !type ? type = `` : ``;
        !createTime ? createTime = `` : ``;

        // 修改数据
        return sql.query(`UPDATE link SET 
        name='${name}',
        link='${link}',
        images='${images}',
        type='${type}',
        createTime='${createTime}',
        WHERE id=${id};`);
    },

    // 修改链接图片
    linkPicDel(id, path) {
        return {
            picList() {
                return sql.query(`SELECT images FROM link WHERE id=${id};`); // 全部链接图片
            },
            upPic() {
                return sql.query(`UPDATE link SET images='${path}' WHERE id=${id};`); // 更新链接图片
            }
        };
    }

};