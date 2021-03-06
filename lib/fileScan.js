/*
 * @Author: Tim [rayintee@gmail.com]
 * @Date: 2020-05-25 15:08:17
 * @LastEditTime: 2020-09-03 20:58:14
 * @LastEditors: Please set LastEditors
 * @Description: 文件扫描
 * @FilePath: /afire-auto-deploy/src/fileScan.js
 */
const path = require('path');
const fs = require('fs');

///定义默认的配置文件
let deployConf = {};
///本地文件路径：扫描路径
let local_dist_path;
///本地文件路径：排除扫描的路径
let local_exclude_path;
let errHandler;

class FileScan {
    /**
     * 重置配置文件
     * @param {*} config 
     */
    static setDeployConf(config = {}, _errHandler) {
        deployConf = config;
        local_dist_path = (deployConf.common || {}).local_path;
        local_exclude_path = (deployConf.common || {}).local_exclude_path || [];
        errHandler = _errHandler;
    }

    /**
     * @description 同步读取指定的文件夹
     * 
     * e.g. 缺省的话直接从根目录扫描
     * @param {*} dir 
     */
    static readSyncFileList(dir = local_dist_path, filesList = []) {
        const files = fs.readdirSync(dir);

        files.forEach((item, index) => {
            if (local_exclude_path.length > 0 && local_exclude_path.indexOf(item) > -1) {
                console.log(item, '该路径已在排除路径在外 >>> ');
                return;
            }
            var fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                this.readSyncFileList(path.join(dir, item), filesList); //递归读取文件
            } else {
                filesList.push(fullPath);
            }
        });

        return filesList;
    }

    /**
     * 获取上传的文件路径相关信息
     * @param {*} index 
     */
    static getUploadFilesPath(filesList, index = 0) {
        let pathStr = filesList[index];

        //默认的缺省dist
        let dist_dir = (deployConf.common || {}).dist_dir || 'dist';
        let deploy_path = deployConf.common.remote_path;

        if (!deploy_path) throw "deploy path cannot be empty.";

        //截取关键字下标值
        let startIndex = pathStr.indexOf(dist_dir) + dist_dir.length + 1;
        let subPathStr = pathStr.substr(startIndex);

        // 替换window下反斜杠为正斜杠
        subPathStr = subPathStr.replace(new RegExp('\\\\', 'g'), "/");

        //远程完整的路径
        let remote_path = deploy_path + '/' + subPathStr;
        console.log('remote_path >>>', remote_path);

        return {
            local_path: pathStr,
            remote_path
        }
    }
}

//导出class
module.exports = FileScan;