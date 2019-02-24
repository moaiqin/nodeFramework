
const config = {
    debug:false, //是否是调试开发状态
    port: 3000,
    log_dir: 'logs/',
    session_secret: 'node_test',
    token_secret_key: 'tucao',
    expiresIn:'1m'    //token生效时间
}

module.exports = config;