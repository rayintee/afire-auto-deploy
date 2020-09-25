<!--
 * @Author: your name
 * @Date: 2020-08-29 14:27:20
 * @LastEditTime: 2020-09-25 13:50:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /afire-auto-deploy/README.md
-->
# afire-auto-deploy
### 1.自动化部署工具包
>This kit was builded just for the project dist auto upload.

### 2.安装
```javascript

npm install afire-auto-deploy --save-dev

```

### 3.api使用
```javascript

afupload -c|--config your/local/path/afire.config.js [-m|--mode dev|prod]

```

### 4.afire.config配置文件
>需要自定义，参考以下的配置格式

```javascript
const path = require('path');
const dist_path = path.resolve(__dirname, 'dist');

export default {
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
        "remote_path": "XXXX/XXX/deploy_dir",

        //是否删除根节点所有文件&&文件夹后部署
        //默认的false
        "rmdir_all": false,

        success: (env) => {
            console.log("上传成功了，这是成功回调函数success 中执行的code----->>>>", env);
        },

        fail: (env, err) => {
            console.log("上传失败了，这是失败回调函数fail 中执行的code----->>>", env, err);
        }
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