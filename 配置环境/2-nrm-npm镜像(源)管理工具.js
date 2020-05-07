/**
 * nrm 是一个可以快速切换NPM源(register)的node插件。
 * 由于官网的源的服务器不在内地和国内网络的问题，访问npm经常会很慢，所以大家经常会用一些替代方案，如：淘宝的cnpm
 * 
 * 什么是镜像（源/register）
 * 我们在进行模块化的开发的时候，package.json文件中往往具有很多的依赖包，而我们进行初始化或者添加依赖的时候,获取依赖包的网址也就是所谓的源了，也即镜像。
 * 
 * 
 * 如果我们每次都过 npm [config] set register [net-url]会非常的麻烦，因此也就有了nrm工具包。
 * nrm可以管理和快速切换镜像
 * 
 * 一、安装：npm install -g nrm
 * 
 * 二、用法：
 * 1、查看所有npm源：nrm ls
 * { // 假如有6个源
 *  * npm -----  https://registry.npmjs.org/  // 带 * 号即为当前使用的配置
      cnpm ----  http://r.cnpmjs.org/
      taobao --  https://registry.npm.taobao.org/
      nj ------  https://registry.nodejitsu.com/
      rednpm -- http://registry.mirror.cqupt.edu.cn
      skimdb -- https://skimdb.npmjs.com/registry
 * }
 * 
 * 2、切换npm源：nrm use cnpm
 * 注意：nrm只是单纯的提供了几个常用的下载包的地址，并能够在这几个地址间进行切换，但我们每次装包的时候 使用的装包工具命令都是npm。
 * 例如：装了这个插件以后，我们就不用再使用cnpm install xxx这样的命令了，而是直接使用npm install xxx这样的命令
 * 
 * 
 * 三、在使用的过程中如果有些命令不记得了可以使用nrm -h查看所有的命令。
 * <命令名称 -h>这个似乎是个基本规则，基本所有的命令程序都可以通过该方式查看其所有的命令选项。
 * 
 * 命令                                      说明
 * nrm ls                                    查看镜像列表
 * nrm current                               查看当前使用j镜像
 * nrm add <名称> <远程地址或私服地址>         添加镜像
 * nrm del <名称>                            删除镜像
 * nrm use <名称>                            切换镜像
 * nrm test <名称>                           测试镜像网络传输速度
 * nrm <–version | -V>                       查看nrm版本号
 * nrm <–help | -h>                          查看nrm的相关信息
 * nrm home < 名称> [browser]                打开镜像的主页
 * nrm publish [< tarball>|< folder>]        上传npm包或命令程序
 * 
 * **/ 
