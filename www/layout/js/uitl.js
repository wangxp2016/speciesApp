function getNodeById(data, id) {
    var result;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return data[i];
        }
        if (!isLeaf(data[i])) {
            result = this.getNodeById(data[i].children, id);
        }
        if (!_.isUndefined(result)) {
            return result;
        }
    }
    return result;
}

function isLeaf(item) {
    return !(_.isArray(item.children) && item.children.length > 0);
}

function idIsRightful(id) {
    return (_.isString(id) || _.isNumber(id))
}

function addNode(data, node, index) {
    var k = parseInt(index, 10);
    var nodes = _.isArray(node) ? node : [node];
    var pNode = this.getNodeById(data, nodes[0].pId);
    if (!pNode) {
        if (index === -1) {
            index = data.length;
        }
        for (let i = 0; i < nodes.length; i++) {
            data.splice(index + i, 0, nodes[i])
        }
        return;
    }
    if (isLeaf(pNode)) {
        pNode.children = [];
    }
    if (index === -1) {
        pNode.children = pNode.children.concat(nodes);
    } else {
        for (let j = 0; j < nodes.length; j++) {
            pNode.children.splice(index + j, 0, nodes[j])
        }
    }
    return data;
}