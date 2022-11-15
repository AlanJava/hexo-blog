const http= require("http");
const sloganArray = require("./slogan.json")
const fs = require('fs');
const path = require('path')
// 创建http server，并传入回调函数:
const server = http.createServer(function (request,response) {
    var result = {
        code : 200,
        msg: '操作成功',
        success :true,
        data: {}
    }
    // 记录访问ip
    const headers = request.headers;
    const ip = headers['x-real-ip'];
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth()+1;
    if(month.length == 1){
        month = "0"+month
    }
    let day = now.getDate();
    if(day.length == 1){
        day = "0"+day
    }
    let hour = now.getHours();
    if(hour.length == 1){
        hour = "0"+hour
    }
    let min = now.getMinutes();
    if(min.length == 1){
        min = "0"+min
    }
    let sec = now.getSeconds();
    if(sec.length == 1){
        sec = "0"+sec
    }
    const stringNow = year +"-"+ month +"-"+ day +" "+ hour +":"+ min +":"+ sec
    // 获取
    fs.readFile(path.join(__dirname, 'request_log.json'), 'utf8', (err, data) => {
        // 转成数组
        let array = JSON.parse(data)
        // 添加
        array.push({
            "ip": ip,
            "time": stringNow
            }
        )
        // 转回json格式
        const box = JSON.stringify(array)
        // 覆盖写入
        fs.writeFile('request_log.json', box, 'utf8', (err) => {
            // console.log(err)
        })
    })
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
