const http= require("http");
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
        const sloganArray = [
            "This is Alan's blog website.",
            "Welcome to AlanBlog.",
            "记录我想记录的。",
            "良好的生活习惯对人的一生都至关重要。",
            "从胜利学得少，从失败学得多。",
            "思诚为修身之本，而明善又为思诚之本。",
            "爱代码,爱编程。"
        ]
        const index = Math.floor(Math.random() * sloganArray.length);
        const slogan = sloganArray[index];
        console.log(request.method + ': ' + request.url+"-slogan["+index+"]:"+slogan);
        // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
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
