const moment = require('moment');

module.exports = (schema) => {
    schema.methods.create_at_ago = () => {
        return moment(this.create_at).format('YYYY-MM-DD HH:mm');
    }
    schema.methods.update_at_ago = () => {
        return moment(this.update_at).format('YYYY-MM-DD HH:mm');
    }
}