/*
 * @Author: Tim [rayintee@gmail.com]
 * @Date: 2020-08-29 14:28:05
 * @LastEditTime: 2020-08-29 14:44:41
 * @LastEditors: Please set LastEditors
 * @Description: 工具类封装
 * @FilePath: /afire-auto-deploy/src/utils.js
 */
/**
 * 去掉空格 | 支持2端或者全部空格
 * @param {*} str 
 * @param {*} all 
 */
function strTrim(str, all = false) {
    if (!str) return "";
    if (all) {
        return str.replace(/\s+/g, "");
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = {
    strTrim
}