
require('colors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');  
const logger = require('./common/logger');
const config = require('./config/baseConfig');
const requestlog = require('./middlewares/request_log');

app.use(helmet.frameguard('sameorigin')); //防止点击劫持,使用iframe的时候必须同源才允许访问
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extends: true, limit: '1mb'}));
app.use(requestlog);
app.get('/test',(req,res,next) => {
    res.json({
        errcode: true
    })
})

app.listen(config.port,() => {
    console.log('服务启动成功,port' + config.port);
})


module.exports = app;