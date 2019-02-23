// 请求日志

const logger = require('../common/logger').getLogger();
const moment = require('moment');
//如果请求的是静态文件则不打印日志

const ignore = /^\/(public)/;

module.exports = (req,res,next) => {
    if(ignore.test(req.url)){
        next();
        return;
    }
    let start = moment().format('YYYY-MM-DD HH:mm:ss');
    logger.info(`\nstart`,start,req.method,req.url, req.ip);
    res.on('finish', () => {
        let dur = Date.now() - Date.parse(start);
        console.log(dur,'dur')
        logger.info('\ncomplete',res.statusCode,`(${dur}ms)`,'\n');
    })
    next();
}