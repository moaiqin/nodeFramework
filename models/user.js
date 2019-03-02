const mongoose = require('mongoose');
const baseModel = require('./base');
const Schema = mongoose.Schema;
const lodash = require('lodash');

const UserSchema = new Schema({
    name: { type: String},
    loginname: { type: String},
    password: { type: String},
    email: { type: String},
    url: { type: String},
    age: { type:Number},
    profile_image_url: { type: String},
    location: { type: String},
    signature: { type: String },
    profile: { type: String},
    githubId: {type: String},
    giehubUsername: { type: String},
    githubAccessToken: { type: String},
    is_block: { type: Boolean, default: false},
    accessToken: { type: String},
    update_at: { type: Date},
    create_at:{ type: Date, default: new Date()}
});

UserSchema.plugin(baseModel);
UserSchema.virtual('virTest').get( function(){
    return this.name+' virtTest';
});
// UserSchema.set('toJSON',{ virtual: true})
UserSchema.virtual('getAge').get( function(){ //在查询的时候是找不到这个字段，可以在返回的res.getAge,就可以找到了
    return this.age > 20;
})

UserSchema.index({ loginname:1}, {unique: true});
UserSchema.pre('save', function(next) {
    const now = new Date();
    this.update_at = now;
    next();
})


module.exports = mongoose.model('User', UserSchema);