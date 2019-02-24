//重置404界面和界面加载出错
const errorPage = (req,res,next) => {
    res.render404 = (errmsg) => {
        res.status(404);
        res.render('notFound',{
            errmsg
        })
    }

    res.renderError = (errmsg, statusCode) => {
        statusCode = statusCode === undefined? 400:statusCode;
        res.status(statusCode).render('notFound',{ errmsg });
    }
    next();
}

module.exports = errorPage;