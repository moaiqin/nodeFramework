// 日志文件配置

const path = require('path');
const baseconfig = require('./baseConfig');
const logconfig = {
    replaceConsole: true,
    "appenders": {
        stdout: { // 控制台输出
            type: 'stdout'
        },
        req: { //请求日志
            type: 'dateFile',
            filename: path.resolve(baseconfig.log_dir, 'requestlog/req'),
            pattern: 'yyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        err: { //错误日志
            type: 'dateFile',
            filename: path.resolve(baseconfig.log_dir, 'errorlog/err'),
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        oth: { //其他日志
            type: 'dateFile',
            filename: path.resolve(baseconfig.log_dir, 'othorlog/oth'),
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['stdout','req'], level: 'info'},
        err: { appenders: ['stdout', 'err'], level: 'error'},
        oth: { appenders: ['stdout', 'oth'], level: 'debug'}
    }
}

module.exports = logconfig;