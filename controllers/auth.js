const user = require("../models/user");
var createError = require('http-errors');
exports.permission = async (req, res, next) => {
    if (!req.headers.authorization) {       //checking token is exist in header or not
        return next(createError(500, 'Please provide the token in headers'));
    }
    const User = await user.findOne({ token: req.headers.authorization });      //verify user based on token 
    if (User.tokenExpire <= Date.now()) {
        return next(createError(500, "You have to login again"));
    }
    if (!User) {
        return next(createError(500, "You are not authorized user", 500));
    }
    req.User = User;
    next();
}
