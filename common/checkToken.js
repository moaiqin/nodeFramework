const config = require('../config/baseConfig');
const jsonwebtoken = require('jsonwebtoken');
const logger = require('./logger').getLogger('err');

const checkToken = (req, callback) => {
    const token = req.body.token || req.query.token;
    if(!token) {
        logger.error('verify should be have token');
        callback({err:'verify should be have token'});
    }
    jsonwebtoken.verify(token,config.token_secret_key,(err, decode) => {
        if( err ){
            logger.error(err);
            callback(err);
        }else{
            callback(null);
        }
    })
}

module.exports = checkToken;