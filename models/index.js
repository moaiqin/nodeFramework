const mongoose = require('mongoose');
const config = require('../config/baseConfig');
const logger = require('../common/logger')
mongoose.connect(config.db, {
    poolSize: 20,
    useCreateIndex: true,
    useNewUrlParser: true
}, (err) => {
    if(err){
        logger.error('connect to %s error', config.db, err.message);
        process.exit(1);
    }
    console.log('connet to '+config.db);
})
exports.User = require('./user');