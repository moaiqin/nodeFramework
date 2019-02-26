const express = require('express');
const router = express.Router();

router.post('/test1',(req,res,next) => {
    res.json({
        text: 'this is cros test',
        errcode:0,
        errmsg:'处理成功',
        data:{}
    });
})

module.exports = router;