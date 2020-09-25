/*
 * @Author: Tim [rayintee@gmail.com]
 * @Date: 2020-05-25 14:02:40
 * @LastEditTime: 2020-09-25 13:54:47
 * @LastEditors: Please set LastEditors
 * @Description: 默认的文件配置
 * @FilePath: /afire-auto-deploy/src/config.js
 */
module.exports = {
    //通用配置文件
    common: {
        //打包后的滋源文件存储的目标目录
        "dist_dir": "dist",

        //本地要扫描的文件夹目录
        "local_path": "",

        //本地扫描后排除的目录
        "local_exclude_path": [],

        //服务器要部署的文件夹目录
        "remote_path": "",

        //远程部署的目录
        "remote_dir": "",

        //是否删除根节点所有文件&&文件夹后部署
        //默认的false
        "rmdir_all": false,

        //成功上传部署回调函数
        "success": function (env) {},

        //失败的回调函数
        "fail": function (env, err) {}
    },

    //测试环境
    dev: {
        options: [{
            host: '', // 服务器 IP
            port: '22', //ssh port ------ 缺省的话为22
            username: 'root', //用户名
            password: '' //密码 -- 为了安全起见：密码改为手动输入 && node.js从cmd动态读取
        }]
    },

    prod: {
        options: [{
            host: '', // 服务器 IP
            port: '22', //ssh port
            username: 'root', //用户名
            password: '' //密码 -- 为了安全起见：密码改为手动输入 && node.js从cmd动态读取
        }, {
            host: '', // 服务器 IP
            port: '22', //ssh port
            username: 'root', //用户名
            password: '' //密码 -- 为了安全起见：密码改为手动输入 && node.js从cmd动态读取
        }]
    }
}