// a function must have req, res and next pass to it
let logger = (req, res, next) =>{
    console.log(`${req.method} ${req.ip} ${req.statusCode} ${req.url}`);
    next();
};

// export the logger
module.exports = logger;