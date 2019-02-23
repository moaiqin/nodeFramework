//日志文件搭建,文件被加载时自动形成日志文件

const env = process.env.NODE_ENV || 'development';
const log4js = require('log4js');
const logconfig = require('../config/logconfig');
log4js.configure(logconfig);

module.exports.getLogger = (name) => {
    return log4js.getLogger(name || 'default');
}