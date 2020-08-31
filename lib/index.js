/*
 * @Author: Tim [rayintee@gmail.com]
 * @Date: 2020-05-25 20:47:32
 * @LastEditTime: 2020-08-31 14:51:40
 * @LastEditors: Please set LastEditors
 * @Description: 自动上传部署kit
 * @FilePath: /afire-auto-deploy/src/index.js
 */
const inputPwd = require("./inputPwd");
const DefaultDeployConf = require('./config');
const FileScan = require('./fileScan');
const UploadClient = require('./uploadClient');
const merge = require('merge');

/**
 * 部署配置文件
 * @param {*} mode 
 * @param {*} configOptions 
 */
function afire(mode = 'dev', configOptions = {}) {
    const env = mode;

    console.log('====== 当前部署环境env=[', env, '] ======', '\n');

    ///部署配置文件
    let deployConf = merge(true, DefaultDeployConf, configOptions);

    //通用配置
    const commonConf = deployConf.common || {};

    //服务器配置
    const serverInfo = deployConf[env] || deployConf.dev;
    const serverConf = serverInfo.options || [];

    //默认任务索引
    let current_index = 0;

    if (typeof commonConf.local_path === 'undefined' || !commonConf.local_path) throw "local_path不能为空~";

    console.log('====== 开始扫描[' + commonConf.local_path + ']目录下所有文件或文件夹 ======');
    //读取文件夹
    const file_list = FileScan.readSyncFileList();

    console.log(file_list, '\n');
    console.log('====== 扫描目录完毕, 准备上传 ======', '\n');

    //上传核心逻辑
    function upload(opt) {
        if (typeof commonConf.remote_path === 'undefined' || !commonConf.remote_path) throw "remote_path不能为空~";
        let client = new UploadClient(opt, commonConf.remote_path);

        //复写complete函数
        client.complete = function () {
            current_index += 1;
            if (current_index >= serverConf.length) {
                console.log('====== 所有服务器部署完毕 ======', '\n')
            } else {
                start();
            }
        };

        //开始部署上传
        client.deploy(file_list);
    }

    ///开始上传
    function start() {
        if (!commonConf.remote_path) throw "remote_path不能为空~";

        let opt = serverConf[current_index];

        ///如果配置了密码直接从文件中读取密码
        ///建议还是不要用写死密码，容易泄漏，还是通过控制台输入
        if (typeof opt.password != 'undefined' && opt['password']) {
            console.log('\033[33m WARN:you\'d better not to write "password" in config directly~\033[0m');
            upload(opt);
            return;
        }

        //读取服务器密码
        inputPwd.readLinePwd(opt.host, pwd => {

            opt['password'] = pwd;

            upload(opt);
        });
    }

    //启动服务
    start();
}

module.exports = afire;