const http= require("http");
const sloganArray = require("./slogan.json")
// 创建http server，并传入回调函数:
const server = http.createServer(function (request,response) {
    var result = {
        code : 200,
        msg: '操作成功',
        success :true,
        data: {}
    }
    // 设置跨域
    response.setHeader("Access-Control-Allow-Origin","*");
    // 设置cookie允许跨域
    response.setHeader("Access-Control-Allow-Credentials",true);
    // 设置可以跨域的请求方法
    response.setHeader("Access-Control-Request-Method","PUT,POST,GET,DELETE,OPTIONS");
    if(request.url === '/slogan'){
        const index = Math.floor(Math.random() * sloganArray.length);
        const slogan = sloganArray[index];
        console.log(request.method + ': ' + request.url+"-slogan["+index+"]:"+slogan);
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        result.data = slogan
    }
    // 404
    else{
        response.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
        result.data = "404 not found"
        result.code = 404;
        result.msg = "地址不存在"
    }
    // 返回结果
    response.end(JSON.stringify(result));
});
// 定义监听端口:
const port = 4001;
server.listen(port);
console.log('Server is running at http://127.0.0.1:'+port);
