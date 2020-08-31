/*
 * @Author: Tim [rayintee@gmail.com]
 * @Date: 2020-08-29 14:28:05
 * @LastEditTime: 2020-08-29 14:43:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /afire-auto-deploy/src/inputPwd.js
 */
const prompt = require('prompt');
// const utils = require('./utils');

/**
 * 动态的接收host、回调函数
 * @param {*} host 
 * @param {*} cb 
 */
function readLinePwd(host, cb) {
    if (!host) throw 'host cannot be empty.';

    try {
        console.log('====== 请输入[' + host + ']账号密码 ======');

        prompt.start();
        prompt.get([{
            name: 'password',
            description: 'Entry password',
            type: 'string',
            replace: '*',
            required: true,
            hidden: true
        }], function (err, result) {

            if (err && err != null) {
                console.log(err)
                prompt.stop();
                return;
            }

            // if (utils.strTrim(result.password) != '') {
            //     cb && cb(result.password);
            // } else {
            //     console.log('password 密码不能为空!');
            // }

            cb && cb(result.password);

        });
    } catch (err) {
        console.error(err);
        prompt.stop();
    }
}

module.exports = {
    readLinePwd
};