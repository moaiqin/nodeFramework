const User = require('../models').User;

exports.addUser = (name, loginname,password, email, callback) => {
    const user = new User();
    user.name = name,
    user.loginname = loginname;
    user.password = password;
    user.email = email;

    user.save(callback);
} 

exports.getUserByMail = (email,cb) => {
    User.findOne({email},cb)
}

exports.getListByName = (params,options,cb) => {
    if(!cb){
        cb = options;
        options = null;
    }
    const selectKey = ['name','loginname'];// 在查询的时候获取只获取name和loginname这两个键值；
    const ignoreKey = {password:1,name:1}; //设置为0或者false就是过滤这个字段,为true或者1时就是只获取这个键值
    User.find(params,ignoreKey,options,cb);
}