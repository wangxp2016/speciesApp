/* 网站商品模块 */

const router = require('koa-router')();
const speciesModel = require('../../model/species');
const homeModel = require('../../model/layoutModel');
const layout = require('../../model/layoutCommon');
const info = require('../../middlewares/info');

//下级物种类型
const speciesType = {
    'superfamily': 'family',
    'family': 'subfamily',
    'subfamily': 'genus',
    'genus': 'species',
    'species': ''
}

router
    .get('/', async (ctx) => {

        const I = await layout.webI();
        // 输出模板
        await ctx.render('species', {
            I: I[0] // logo
        });
    })
    // 查询tree
    .get('/speciesTree', async (ctx) => {
        const speciesTree = await speciesModel.speciesTree();
        const newTeam = function (data, pId) {
            let itemArr = [];
            for (let i = 0; i < data.length; i++) {
                let node = data[i];
                if (node.pId === pId) {
                    let newNode = {};
                    newNode.id = node.id;
                    newNode.name = node.name;
                    newNode.pId = node.pId;
                    newNode.type = node.type;
                    newNode.children = newTeam(data, node.id);
                    itemArr.push(newNode);
                }
            }
            return itemArr;
        }

        var nodeList = {};
        for (var i in speciesTree) {
            for (var key in speciesTree[i]) {
                if (key == 'order_m') {
                    nodeList[speciesTree[i][key]] = {
                        id: speciesTree[i][key],
                        pId: null,
                        name: speciesTree[i][key],
                        type: 'order_m'
                    }
                } else if (key == 'suborder') {
                    nodeList[speciesTree[i][key]] = {
                        id: speciesTree[i][key],
                        pId: speciesTree[i]['order_m'],
                        name: speciesTree[i][key],
                        type: 'suborder'
                    }
                } else if (key == 'superfamily') {
                    nodeList[speciesTree[i][key]] = {
                        id: speciesTree[i][key],
                        pId: speciesTree[i]['suborder'],
                        name: speciesTree[i][key],
                        type: 'superfamily'
                    }
                }
            }
        }

        const list = [];
        for (let key in nodeList) {
            list.push(nodeList[key])
        }
        const treeData = newTeam(list, null)
        ctx.body = treeData[0];
    })
    // 查询树节点
    .get('/getDataByKeyWord', async (ctx) => {
        const params = ctx.query;
        const speciesData = await speciesModel.speciesListByName(params.name, params.type, speciesType[params.type]);
        let itemArr = [];
        for (let i = 0; i < speciesData.length; i++) {
            let node = speciesData[i];
            let newNode = {};
            newNode.id = node[speciesType[params.type]];
            newNode.name = node[speciesType[params.type]];
            newNode.pId = params.name;
            newNode.type = speciesType[params.type];
            newNode.children = [];
            itemArr.push(newNode);
        }
        ctx.body = itemArr;
    });
module.exports = router.routes();