<!--
 * @Author: your name
 * @Date: 2020-08-29 14:27:20
 * @LastEditTime: 2020-08-31 11:38:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /afire-auto-deploy/README.md
-->
# afire-auto-deploy
### 1.自动化部署工具包
>This kit was builded just for the project dist auto upload.


### 2.config配置文件

```javascript
module.exports = {
    //通用配置文件
    common: {
        //打包后的资源源文件存储的目标目录
        //目标目录文件夹名
        "dist_dir": "dist",

        //本地要扫描的文件夹目录
        //此为全路径配置属性
        "local_path": "XXXXX/XXXX/dist",

        //本地扫描后排除的目录或者文件
        "local_exclude_path": [],

        //远程部署的目录文件夹名
        "remote_dir": "deploy_dir",

        //服务器要部署的文件夹目录
        //此为全路径配置属性
        "remote_path": "XXXX/XXX/deploy_dir"
    },

    //测试环境
    dev: {
        options: [{
            host: '', // 服务器 IP
            port: '22', //ssh port ------ 缺省的话为22
            username: 'root', //用户名
            password: '' //密码 -- 为了安全起见：密码改为手动输入 && node.js从cmd动态读取
        },{...}]
    },

    //线上环境
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
```