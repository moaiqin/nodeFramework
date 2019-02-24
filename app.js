
require('colors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');  
const logger = require('./common/logger');
const othorLogger = logger.getLogger('oth');
const config = require('./config/baseConfig');
const path = require('path');
const static = path.join(__dirname,'public');
const compress = require('compression');
const csurf = require('csurf');
const session = require('express-session');
const middleware = require('./middlewares');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use('/public', express.static(static))
app.use(helmet.frameguard('sameorigin')); //防止点击劫持,使用iframe的时候必须同源才允许访问
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(middleware.requestLog);
app.use(middleware.errorPage);
app.use(compress()); //压缩资源
app.set(session({
    secret: config.session_secret,
    resave:false,
    saveUninitialized:false,
    name:'session_id',
    cookie:{
        maxAge: 5000
    }
}))

//如果不是开发状态下,防止cusrf攻击，设置模板缓存
if( !config.debug ){
    app.use((req, res, next) => {
        // if(req.path.indexOf('/api') === -1) {
        //     csurf()(req,res,next);
        //     return;
        // }
        next();
    })
    app.set('view cache', true);
}
// app.use(csurf({cookie:false}));
app.use(middleware.checkCsrfToken(app));

app.use('/',require('./test/test'));

app.listen(config.port,() => {
    othorLogger.info(`project listen port${config.port}`);
})


module.exports = app;