const sql = require('../config/default').sql;
const moment = require('moment');

module.exports = {

    // 物种添加
    speciesAdd(order_m, suborder, superfamily, family, subfamily, genus, species, introduction, distribution_img, distribution, morphology_img, body_color, body_length_male, body_length_female, forewing_length_male, forewing_length_female, hindFemur_length_male, hindFemur_length_female, pronotum_length_male, pronotum_length_female, literature, species_time, remark,keyWord) {

        // 默认值判断
        !order_m ? order_m = `` : ``;
        !suborder ? suborder = `` : ``;
        !superfamily ? superfamily = `` : ``;
        !family ? family = `` : ``;
        !subfamily ? subfamily = `` : ``;
        !genus ? genus = `` : ``;
        !species ? species = `` : ``;
        !introduction ? introduction = `` : ``;
        !distribution_img ? distribution_img = `` : ``;
        !distribution ? distribution = `` : ``;
        !morphology_img ? morphology_img = `` : ``;
        !body_color ? body_color = `` : ``;
        !body_length_male ? body_length_male = `` : ``;
        !body_length_female ? body_length_female = `` : ``;
        !forewing_length_male ? forewing_length_male = `` : ``;
        !forewing_length_female ? forewing_length_female = `` : ``;
        !hindFemur_length_male ? hindFemur_length_male = `` : ``;
        !hindFemur_length_female ? hindFemur_length_female = `` : ``;
        !pronotum_length_male ? pronotum_length_male = `` : ``;
        !pronotum_length_female ? pronotum_length_female = `` : ``;
        !literature ? literature = `` : ``;
        !remark ? remark = `` : ``;
        !keyWord ? keyWord = `` : ``;

        // 插入数据
        return sql.query(`INSERT INTO species (order_m,suborder,superfamily,family,subfamily,genus,species,introduction,distribution_img,distribution,morphology_img,body_color,body_length_male,body_length_female, forewing_length_male,forewing_length_female, hindFemur_length_male,hindFemur_length_female, pronotum_length_male,pronotum_length_female,literature,species_time,remark,keyWord) VALUES 
            ('${order_m}','${suborder}','${superfamily}','${family}','${subfamily}','${genus}','${species}','${introduction}','${distribution_img}','${distribution}','${morphology_img}','${body_color}','${body_length_male}','${body_length_female}','${forewing_length_male}','${forewing_length_female}','${hindFemur_length_male}','${hindFemur_length_female}','${pronotum_length_male}','${pronotum_length_female}','${literature}','${species_time}','${remark}','${keyWord}');`);
    },

    // 查询物种列表
    speciesList(page, pagesize, species) {
        // 查询条件设置
        let condition = `WHERE 1=1`;
        species ? condition += ` AND species LIKE '%${species}%'` : ``;

        // 总记录数
        const totalRows = sql.query(`SELECT COUNT(id) AS n FROM species ${condition};`);

        // 查询语句
        const list = sql.query(
            `SELECT * FROM species ${condition} ORDER BY id DESC LIMIT ${(page-1)*pagesize},${pagesize};`
        );

        return {
            totalRows, // 总记录数
            list // 数据分页
        };
    },

    // 删除物种
    speciesDel(id) {
        return sql.query(`DELETE FROM species WHERE id=${id};`);
    },

    // 查询物种详情
    speciesOnly(id) {
        return sql.query(`SELECT * FROM species WHERE id=${id};`);
    },

    // 查询物种详情
    speciesOnlyByName(name) {
        return sql.query(`SELECT * FROM species WHERE species='${name}';`);
    },

    // 查询物种tree
    speciesTree() {
        return sql.query(`SELECT id,order_m,suborder,superfamily FROM species GROUP BY superfamily ;`);
    },

    // speciesOverview
    speciesOverview(page, pagesize, word) {
        // 查询条件设置
        let condition = `WHERE 1=1`;
        word ? condition = `WHERE species LIKE '${word}%'` : ``;
        // 总记录数
        const totalRows = sql.query(`SELECT COUNT(species) AS n FROM species ${condition};`);

        // 查询语句
        const list = sql.query(
            `SELECT id,species FROM species ${condition} GROUP BY species ORDER BY species ASC  LIMIT ${(page-1)*pagesize},${pagesize};`
        );
        return {
            totalRows, // 总记录数
            list // 数据分页
        };
    },
     // 查询物种tree
     speciesOverviewNum() {
        return sql.query(`SELECT keyWord,COUNT(keyWord) num FROM species GROUP BY keyWord;`);
    },

    // 查询物种tree
    speciesListByName(name, type, classType) {
        return sql.query(`SELECT id,${classType} FROM species where ${type} = '${name}' GROUP BY ${classType} ;`);
    },

    // 修改物种
    speciesEdit(id, order_m, suborder, superfamily, family, subfamily, genus, species, introduction, distribution_img, distribution, morphology_img, body_color, body_length_male, body_length_female, forewing_length_male, forewing_length_female, hindFemur_length_male, hindFemur_length_female, pronotum_length_male, pronotum_length_female, literature, species_time, remark,keyWord) {

        // 默认值判断
        !order_m ? order_m = `` : ``;
        !suborder ? suborder = `` : ``;
        !superfamily ? superfamily = `` : ``;
        !family ? family = `` : ``;
        !subfamily ? subfamily = `` : ``;
        !genus ? genus = `` : ``;
        !species ? species = `` : ``;
        !introduction ? introduction = `` : ``;
        !distribution_img ? distribution_img = `` : ``;
        !distribution ? distribution = `` : ``;
        !body_color ? body_color = `` : ``;
        !body_length_male ? body_length_male = `` : ``;
        !body_length_female ? body_length_female = `` : ``;
        !forewing_length_male ? forewing_length_male = `` : ``;
        !forewing_length_female ? forewing_length_female = `` : ``;
        !hindFemur_length_male ? hindFemur_length_male = `` : ``;
        !hindFemur_length_female ? hindFemur_length_female = `` : ``;
        !pronotum_length_male ? pronotum_length_male = `` : ``;
        !pronotum_length_female ? pronotum_length_female = `` : ``;
        !literature ? literature = `` : ``;
        !remark ? remark = `` : ``;
        !keyWord ? keyWord = `` : ``;

        // 修改数据
        return sql.query(`UPDATE species SET 
        order_m='${order_m}',
        suborder='${suborder}',
        superfamily='${superfamily}',
        family='${family}',
        subfamily='${subfamily}',
        genus='${genus}',
        species='${species}',
        introduction='${introduction}',
        distribution_img='${distribution_img}',
        distribution='${distribution}',
        morphology_img='${morphology_img}',
        body_color='${body_color}',
        body_length_male='${body_length_male}',
        body_length_female='${body_length_female}',
        forewing_length_male='${forewing_length_male}',
        forewing_length_female='${forewing_length_female}',
        hindFemur_length_male='${hindFemur_length_male}',
        hindFemur_length_female='${hindFemur_length_female}',
        pronotum_length_male='${pronotum_length_male}',
        pronotum_length_female='${pronotum_length_female}',
        literature='${literature}',
        species_time='${species_time}',
        remark='${remark}' 
        keyWord='${keyWord}' 
        WHERE id=${id};`);
    },

    // 修改地理分布图片
    distributionPicDel(id, path) {
        return {
            picList() {
                return sql.query(`SELECT distribution_img FROM species WHERE id=${id};`); // 全部物种图片
            },
            upPic() {
                return sql.query(`UPDATE species SET distribution_img='${path}' WHERE id=${id};`); // 更新物种图片
            }
        };
    },
    // 修改形态图
    morphologyPicDel(id, path) {
        return {
            picList() {
                return sql.query(`SELECT morphology_img FROM species WHERE id=${id};`); // 全部物种图片
            },
            upPic() {
                return sql.query(`UPDATE species SET morphology_img='${path}' WHERE id=${id};`); // 更新物种图片
            }
        };
    },

};