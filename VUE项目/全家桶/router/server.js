var http = require('http');
var fs = require('fs');//引入文件读取模块

// var documentRoot = '/index.html';
var documentRoot = 'E:/statisticsSdy/VUE项目/全家桶/router/';
// E:\statisticsSdy\VUE项目\全家桶\router\index.html

//需要访问的文件的存放目录（项目所在位置的文件夹路径）

var server= http.createServer(function(req,res){

    var url = req.url; 
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html 

    var file = documentRoot + url;
    console.log(url);
    //E:/PhpProject/html5/websocket/www/index.html 


    fs.readFile( file , function(err,data){
    /*
        一参为文件路径
        二参为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
    */
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            console.log('....', file)
            if(file.indexOf('.css') > -1){
                res.writeHeader(200, {"content-type" : "text/css"})
            } else if(file.indexOf('.html') > -1){
                res.writeHeader(200, {"content-type" : 'text/html;charset="utf-8"'})
            } else if(file.indexOf('.js') > -1){
                res.writeHeader(200, {"content-type" : "application/x-javascript"})
            } else {
                res.writeHeader(200)
            }
            
            // res.writeHeader(200,{
            //     'content-type' : 'text/html;charset="utf-8"'
            // });
            res.write(data);//将index.html显示在客户端
            res.end();

        }

    });



}).listen(9080);

console.log('服务器开启成功9080');