const sql = require('../config/default').sql;

module.exports = {

    /**
     * home model data
     */

    // 产品分类查询
    classify (className) {
        return sql.query(`SELECT id,sname FROM subcategory WHERE cid=(SELECT id FROM category WHERE cname='${className}');`);
    },

    //查询superfamily分类统计

    getSuperfamily () {
        return sql.query(`SELECT superfamily as name,COUNT(*) as value FROM species GROUP BY superfamily;`);
    },

    // 热门商品查询
    heatGoods () {
        return sql.query(`SELECT id,goods_name,goods_pic FROM goods WHERE nice=1 AND i=0;`);
    },

    // 最新新闻查询
    newsQuery () {
        return sql.query(
            `SELECT news.id,title,sid,sname,FROM_UNIXTIME(time,'%Y-%m-%d %H:%i:%S') AS time FROM news LEFT JOIN subcategory 
            ON news.sid=subcategory.id WHERE state=1 ORDER BY time DESC LIMIT 3;`
        );
    },

    // 热门案例查询
    heatCase () {
        return sql.query(`SELECT id,goods_name,goods_pic,FROM_UNIXTIME(goods_time,'%Y-%m-%d %H:%i:%S') AS time FROM goods WHERE nice=1 AND i=1 ORDER BY time DESC;`);
    }

};