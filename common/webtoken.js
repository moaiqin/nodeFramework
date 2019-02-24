const jsonwebtoken = require('jsonwebtoken');
const logger = require('./logger').getLogger('oth');
const config = require('../config/baseConfig');
const createToken = (content, options = {}) => {
    let token;
    let tokenOptions = Object({expiresIn: config.expiresIn},options)
    if(!content || typeof content !== 'object') {
        logger.error('jsonwebtoken should be have conetent');
        return Promise.reject('jsonwebtoken should be have conetent');
    }
    try{
        token = jsonwebtoken.sign(content,config.token_secret_key ,tokenOptions);
    }catch(e){
        logger.error(e);
        return Promise.reject(e);
    }
    return Promise.resolve(token);
}


module.exports = createToken;