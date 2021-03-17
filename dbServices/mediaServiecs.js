const media = require('../models/media');

exports.getAllFiles = () => {
    return media.find({}).select("-userPassword -userToken -userTokenExpire -__v");
}

exports.addUserImage = (id, uid) => {
    return media.findByIdAndUpdate(id, { user: uid }, {
        new: true,
        runValidators: false,
    }).select("-userPassword -userToken -userTokenExpire -__v");
}

exports.updateImage = (imgid, uid, task) => {
    if (task === 'addFav') {
        return media.findByIdAndUpdate(imgid, { isFavourite: true, user: uid }, {
            new: true,
            runValidators: false,
        }).select("-userPassword -userToken -userTokenExpire -__v");
    } else if (task === 'removeFav') {
        return media.findByIdAndUpdate(imgid, { isFavourite: false }, {
            new: true,
            runValidators: false,
        }).select("-userPassword -userToken -userTokenExpire -__v");
    } else if (task === 'getFav') {
        return media.find({ user: uid, isFavourite: true });
    }
}