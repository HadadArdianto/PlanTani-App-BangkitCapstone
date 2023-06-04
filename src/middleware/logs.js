const logRequest = (req, res, next) => {
    console.log('log request to PATH : ', req.path);
    next();
};


module.exports = logRequest;