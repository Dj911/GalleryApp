const user = require('../models/user');

exports.create = (body) => {
    console.log('CREATE!!')
    return user.create(body);
}

exports.find = (body) => {
    return user.findOne({ email: body.email })
}

exports.getUserById = (id) => {
    return user.findById(id).select("-userPassword -userToken -userTokenExpire -__v");
}

exports.login = (body) => {
    return user.findOne({ email: body.email, password: body.password }).select('-__v')
}
exports.update = (id, data) => {
    return user.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: false,
    }).select("-userPassword -userToken -userTokenExpire -__v");
}