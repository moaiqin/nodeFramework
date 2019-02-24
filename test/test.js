const express = require('express');
const createToken = require('../common/webtoken');
const checkToken = require('../common/checkToken');
const router = express.Router();
router.get('/login',(req,res, next) => {
    res.render('logintest',{})
})
router.post('/api/login',function(req,res,next){
    const tokentest = {
        name:'莫绍补',
        id:444566,
        admin:true,
        phone:13476033220
    }
    const option = {
        expiresIn: '120s'
    } 
    createToken(tokentest, option).then((token) => {
        res.json({
            token: token,
            errcode:0,
            errmsg:'处理成功'
        })
    }).catch((err) => {
        console.log(err)
    })
})
router.get('/api/login',(req,res,next) => {
    res.render('user',{
        name:'莫绍补'
    })
})
router.post('/api/checktoken',(req,res,next) => {
    checkToken(req,function(err) {
        if(err){
            console.log(err,'err')
            res.json({
                errcode: 10000,
                errmsg: err
            });
        }else{
            res.json({
                checkout: '匹配成功'
            })
        }
    });
})

router.get('/test/api',(req,res,next) => {
    res.renderError('页面出错啦');
    // res.json({
    //     errcode: true
    // })
})

module.exports = router;
