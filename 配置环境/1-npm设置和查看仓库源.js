/**
 * 在使用npm命令时，如果直接从国外的仓库下载依赖，下载速度很慢，甚至会下载不下来，我们可以更换npm的仓库源，提高下载速度。
 * 
 * 此处以淘宝镜像为例，如果公司有本地仓库，将地址修改为公司仓库地址即可。
 * 
 * 可以通过以下方式进行修改：
 * **/ 

/**
 * 一、临时使用淘宝源
 * **/

// 安装express插件--本次从淘宝仓库源下载
// npm install -g express --registry=https://registry.npm.taobao.org


/**
 * 二、使用cnpm命令代替npm
 * **/ 

// 安装cnpm命令,不会改变npm的源
// npm install -g cnpm --registry=https://registry.npm.taobao.org
// 使用
// cnpm install


/**
 * 三、修改npm的源
 * 
 * 设置npm的源，可以设置多个源，但是只有一个是生效的
 * 
 * **/ 

// 全局配置切换到淘宝源
// npm config set registry https://registry.npm.taobao.org
// 设置公司的源
// npm config set registry http://127.0.0.1:4873
// 全局配置切换到官方源
// npm config set registry http://www.npmjs.org

// 查看源，可以看到设置过的所有的源
// npm config get registry
// 显示当前的镜像网址 -- 与上面相比并没有区别呀
// npm get registry

// 检测当前源
// npm info underscore


/**
 * 四、修改npm配置文件
 * 
 * 编辑 ~/.npmrc 加入下面内容
 * **/ 

// registry = https://registry.npm.taobao.org