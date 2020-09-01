/*
 * @Author: Tim [rayintee@gmail.com]
 * @Date: 2020-08-29 14:28:05
 * @LastEditTime: 2020-09-01 08:53:35
 * @LastEditors: Please set LastEditors
 * @Description: 上传文件核心业务
 * @FilePath: /afire-auto-deploy/src/uploadClient.js
 */
const Client = require('ssh2-sftp-client');
const FileScan = require('./fileScan');

class UploadClient {
    /**
     * 构建函数: 服务器配置信息 && 部署的路径
     * @param {*} options 
     * @param {*} deploy_path 
     */
    constructor(options, deploy_path) {
        if (!options || Object.keys(options).length === 0) {
            throw "sftp client connect config cannot be empty.";
        }

        if (!deploy_path) {
            throw "deploy path cannot be empty.";
        }

        ///默认的端口缺省
        if (typeof options.port === 'undefined' || !options.port) options.port = '22';
        this.serverOptions = options;
        this.deployPath = deploy_path
        this.sftp = new Client();
    }

    /**
     * 检测目录是否存在，如果不存在创建
     * @param {*} dir 
     */
    initDir(dir, isRoot = false) {
        try {
            return this.sftp.exists(dir).then(data => {

                //判断是否存在文件夹
                if (data && data === 'd') {
                    console.log('目录', dir, '已存在,不需要重复创建 >>>');
                    if (isRoot) {
                        //根结点需要先执行删除操作
                        return this.sftp.rmdir(dir, true).then(data => {
                            console.log("删除根结点目录", dir, "下资源文件包成功 >>>", data);
                            return this.sftp.mkdir(dir, true);
                        });
                    }

                    //非根结点的直接透传 pass
                    return Promise.resolve();
                } else {
                    console.log("目录", dir, "不存在, 开始创建目录 >>>");
                    return this.sftp.mkdir(dir, true);
                }

            });
        } catch (err) {
            console.error("调用sftp exists方法异常 >>> ", err);
            this.sftp.end();
        }
    }

    /**
     * 部署
     * @param {*} filesList 
     */
    deploy(filesList = []) {
        try {
            if (!filesList || filesList.length === 0) {
                throw "上传的文件路径Array不能为空.";
            }

            let index = 0;

            //建立链接通道
            this.sftp.connect(this.serverOptions).then(() => {
                return this.initDir(this.deployPath, true);
            }).then(data => {
                console.log('服务器上传路径初始化完毕, 开始上传文件 >>>', '\n');
                this.upload(filesList, index);
            }).catch(err => {
                console.error("删除旧资源包异常报错 >>> ", err);
                this.sftp.end();
            });
        } catch (err) {
            this.sftp.end();
            console.error(err);
        }
    }

    /**
     * 上传文件：采用递归上传方式
     * @param {*} filesList 
     * @param {*} index 
     */
    upload(filesList, index = 0) {
        try {
            let {
                local_path,
                remote_path
            } = FileScan.getUploadFilesPath(filesList, index);

            let target_dir = remote_path.substring(0, remote_path.lastIndexOf("/"));
            this.initDir(target_dir).then(data => {
                console.log('开始上传>>>>', local_path);
                return this.sftp.fastPut(local_path, remote_path).then(data => {
                    console.log('上传文件成功', '\n');

                    //索引+1
                    index += 1;
                    if (index >= filesList.length) {
                        console.log('============ 上传完毕! =============', '\n');
                        this.sftp.end();
                        typeof this.complete === 'function' && this.complete();
                    } else {
                        //递归调用
                        this.upload(filesList, index);
                    }
                });
            }).catch(err => {
                console.error(err);
                this.sftp.end();
            });

        } catch (err) {
            console.error(err);
            this.sftp.end();
        }
    }
}

module.exports = UploadClient;