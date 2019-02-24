const checkCsrfToken = (app) => {
    return (req,res,next) => {
        app.locals.token = req.csrfToken ? req.csrfToken() : '';
        next();  
    }
}

module.exports = checkCsrfToken;