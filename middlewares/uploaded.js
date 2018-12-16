const koaBody = require('koa-body');
const paths = require('path');
const fs = require('fs');

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {}; //定义一个对象存放文件的路径和名字
            obj.path = path; //路径
            obj.filename = itm //名字
            filesList.push(obj);
        }

    })

}
var getFiles = {
    //获取文件夹下的所有文件
    // getFileList: function (path) {
    //     var filesList = [];
    //     readFileList(path, filesList);
    //     return filesList;
    // },
    getFileList: function (path) {
        var filesList = [];
        var targetObj = {};
        readFile(path, filesList, targetObj);
        return filesList;
    }
};

function geFileList(path) {
    var filesList = [];
    var targetObj = {};
    readFile(path, filesList, targetObj);
    return filesList;
}

function mkdirSync(dirpath) {
    if (!fs.existsSync(paths.dirname(dirpath))) {
        mkdirSync(paths.dirname(dirpath));
    }
    fs.mkdirSync(dirpath);
}

//遍历读取文件 
function readFile(path, filesList, targetObj) {
    let isExists = fs.existsSync(path);
    if (!isExists) {
        mkdirSync(path + '/EST/1');
        mkdirSync(path + '/mitogenome/1');
        mkdirSync(path + '/second_transcriptome/1');
        mkdirSync(path + '/third_transcriptome/1');
    }
    files = fs.readdirSync(path); //需要用到同步读取 
    files.forEach(walk);

    function walk(file) {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            var item;
            if (targetObj["children"]) {
                item = {
                    name: file,
                    children: [],
                    type: "folder"
                };
                targetObj["children"].push(item);
            } else {
                item = {
                    name: file,
                    children: [],
                    type: "folder"
                };
                filesList.push(item);
            }
            readFile(path + '/' + file, filesList, item);
        } else {
            //创建一个对象保存信息
            var obj = new Object();
            obj.size = states.size; //文件大小，以字节为单位 
            obj.name = file; //文件名
            obj.path = path + '/' + file; //文件绝对路径 
            if (targetObj["children"]) {
                var item = {
                    name: file,
                    value: obj.path,
                    type: "file"
                }
                targetObj["children"].push(item);
            } else {
                var item = {
                    name: file,
                    value: obj.path,
                    type: "file"
                };
                filesList.push(item);
            }
        }
    }
}

module.exports = {
    getFiles: getFiles,
    // 文件上传配置
    configure() {
        return koaBody({
            multipart: true,
            formidable: {
                uploadDir: paths.join(__dirname, `../www/uploads`),
                keepExtensions: true,
                maxFieldsSize: 20 * 1024 * 1024, // 20M
                maxFileSize: 200 * 1024 * 1024, // 200M
                onFileBegin(name, file) {

                }
            },
            onError(err) {
                console.log('文件上传失败！', err);
            }
        })
    },

    // 文件路径处理
    pathHandle(ctx, field) {
        let obj = ctx.request.files,
            path = [];
        // 文件存在
        if (JSON.stringify(obj) !== '{}') {
            // 路径获取
            for (let i = 0, len = obj[field].length; i < len; i++) {
                path.push(`/uploads/${paths.parse(obj[field][i].path).base}`);
            }!path.length ? path = `/uploads/${paths.parse(obj[field].path).base}` : '';
        } else {
            path = '';
        }

        return path;
    },

    // 文件删除操作
    fileDelete(list, field, site) {
        let record = list[0][field],
            arr = record.split(',');

        for (let i = 0, len = arr.length; i < len; i++) {
            if (site) {
                // 删除指定文件
                if (site === arr[i]) {
                    // 删除图片文件
                    fs.unlinkSync(paths.join(__dirname, `../www${arr[i]}`), (err) => {
                        if (err) return false;
                    });
                    // 删除路径
                    arr.splice(i, 1);
                }
                record = arr.join();
            } else {
                // 删除全部文件
                if (record) {
                    // 删除图片文件
                    fs.unlinkSync(paths.join(__dirname, `../www${arr[i]}`), (err) => {
                        if (err) return false;
                    });
                }

            }
        }

        return record;
    },

    // 文件修改操作
    fileUpdate(ctx, field, list, picname, ) {
        let path = this.pathHandle(ctx, field), // 文件路径处理
            up = ''; // 更新文件路径存储

        if (list[0][picname] && JSON.stringify(ctx.request.files) !== '{}') {
            up = list[0][picname] + ',' + path;
        } else if (JSON.stringify(ctx.request.files) === '{}') {
            up = list[0][picname];
        } else {
            up = path;
        }
        return up;
    }

};