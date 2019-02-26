
// const corsUrl = ['http://localhost:8090']; //支持跨域的地址
const config = {
    debug:false, //是否是调试开发状态
    port: 3001,
    name:'node开发基本架构',
    log_dir: 'logs/',
    host:'localhost:3001',
    session_secret: 'node_test',
    token_secret_key: 'tucao',
    expiresIn:'30m',    //token生效时间
    corsOptions: {
        // origin: (origin, cb) => {
        //     if(corsUrl.indexOf( origin ) > -1){
        //         cb(null,true);
        //     } else {
        //         cb(new Error('not allowed by CORS'))
        //     }
        // },
        origin: ['http://localhost:8010',/localhost\:(8090)$/],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        optionsSuccessStatus:200,  //对于node fetch先发送的option请求处 if(req.method.toLowerCase() == 'options'){ res.sendStatus(200)
        credentials:true
    },
    mail_options: {
        host: 'smtp.qq.com',   //到邮箱开启SMTP打开方式
        port:465,
        secureConnection: true, //使用ssl协议
        auth: {
            user: '982405672@qq.com',
            pass: 'raajlvqowiuybbij'  //设置的smtp授权码,到邮箱设置
        }
    }
}

module.exports = config;