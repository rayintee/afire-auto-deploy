/*
 * @Author: your name
 * @Date: 2020-09-03 20:24:52
 * @LastEditTime: 2020-09-03 20:56:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /afire-auto-deploy/lib/errorHandler.js
 */
const noop = () => {};
class ErrorHandler {
    /**
     * 初始化
     * @param {*} success 
     * @param {*} fail 
     * @param {*} env 
     */
    constructor(_success = noop, _fail = noop, env = 'dev') {
        if (typeof _success === 'function') this.success = _success;
        if (typeof _fail === 'function') this.fail = _fail;

        if (env) this.env = env;
    }

    /**
     * 处理成功的函数
     */
    doSucc() {
        if (typeof this.success === 'function') this.success(this.env);
    }

    /**
     * 处理失败的函数
     * @param {*} err 
     */
    doErr(err) {
        if (typeof this.fail === 'function') this.fail(this.env, err);
    }
}

module.exports = ErrorHandler;