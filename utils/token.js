const jwt = require('jsonwebtoken');

exports.jwtTokenGenerator = (id) => {
    return jwt.sign({
        id: id
    }, process.env.JWT_SECRET_KEY);
}

exports.jwtTokenVerification = (tkn) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}