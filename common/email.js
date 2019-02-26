// 发送邮件模块
const mailer = require('nodemailer');
const config = require('../config/baseConfig');
const util = require('util');
const logger = require('./logger').getLogger('err');
const async = require('async');

const transporter = mailer.createTransport(config.mail_options);

/**
 * 
 * @param {*} data  发送配置 
 * @param {*} cb 回调
 */
const sendEmail = (data, cb) => {
    async.retry({times:6}, (done) => {
        transporter.sendMail(data, (err) => {
            if(err) {
                logger.error('send mail error', err, data);
                return done(err);
            }
            return done();
        });
    }, (err) => {
        if(err){
            logger.error('send mail finally error', err, data);
            cb && cb(err)
            return;
        }
        logger.info('send mail success', data);
        cb && cb(null)
    })
}

/**
 * 
 * @param {*} who 发送到的邮箱
 * @param {*} token 用于发送到邮箱的token，用于激活验证
 * @param {*} name 用户登陆名
 * @param {*} cb 邮箱发送状态回调
 */
const sendActiveEmail = (who, token, name, cb) => {
    if(!who){
        logger.error('email send need send user');
    }
    const html = `<p>你好：你已经通过邮箱验证，
        <a href="http://${config.host}/emailAccept?key=${token}&&name=${name}" >点击激活</a>
    </p>`
    const sendOPtions = {
        from: util.format('%s <%s>', config.name, config.mail_options.auth.user),
        to: who,
        subject: config.name + '邮箱激活账户',
        html:html
    }
    sendEmail(sendOPtions,cb);
}
exports.sendActiveEmail = sendActiveEmail;