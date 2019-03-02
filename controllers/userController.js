const User = require('../proxy').User;
const logger = require('../common/logger').getLogger('err');
const meiler = require('../common/email');
const crypto = require('crypto');
const eventProxy =  require('eventproxy');

const addUser = (req, res, next) => {
    //模拟登陆
    let {name,loginname,email,password} = req.query;
    const hashMd5 = crypto.createHash('md5');
    const newPass = hashMd5.update(password).digest('hex');
    User.addUser(name, loginname, newPass,email,(err) => {
        console.log(err,'errerr')
        if(err){
            logger.error('add user err: %s',err);
            res.json({
                errcode: 2000,
                message: '数据库添加异常'
            })
            return;
        }else{
            meiler.sendActiveEmail(email,newPass,loginname, (err) => {
                if(err){
                    res.json({
                        errcode: 10000,
                        errmsg:'发送邮件失败'
                    });
                }
            })
            res.json({
                errcode:0,
                message:'添加成功'
            })
        }
    });
}

const getUserByMail = (req, res, next) => {
    const email = req.query.email;
    User.getUserByMail(email, (err,user) =>{
        res.json({
            errcode:0,
            data: user,
            message:'處理成功'
        })
    })
}

const getUserByName = (req, res, next) => {
    let query = req.query;
    let resu = {};
    console.log(query,'777')
    // query = Object.assign({},query)
    const proxy = new eventProxy();
    proxy.fail(next);
    proxy.assign('success', (successResult) => {
        res.json(successResult)
    })
    proxy.all("test1",'test2',(test1Content, test2Content) => {   'test1和test2都实行完之后再实行以下回调'

        // res.json({
        //     errcode: 0,
        //     test1Content: test1Content,
        //     test2Content: test2Content
        // })
        proxy.after('handel',test1Content.length, (list) => {
            
            // res.json({
            //     errcode: 0,
            //     test1Content: list,
            //     test2Content: test2Content
            // })
            resu = ({
                    errcode: 0,
                    test1Content: list,
                    test2Content: test2Content
                })
            proxy.emit('success',resu);
        })
        test1Content.forEach((item,i) => {
            // item.name = '852';
            // proxy.emit('handel',item);//可以直接使用emit进行触发   
            User.getUserByMail('moshaobu@163.com',proxy.group('handel'));//  group 和done支持(err, data) => {}这种格式
        })
        // console.log(resu,'resu')
        // res.json(resu);
    })
    User.getListByName(query,{
        sort:{
            create_at: -1
        },
        limit:2
    },proxy.done('test1'));
    User.getUserByMail('moshaobu@163.com',proxy.done('test2'));
}

exports = module.exports = { addUser, getUserByMail,getUserByName};