const media = require('../models/media');

exports.getAllFiles = () => {
    return media.find({}).select("-__v");
}

exports.updateImage = (imgid, uid, task) => {
    if (task === 'addFav') {
        return media.findByIdAndUpdate(imgid, { isFavourite: true, user: uid }, {
            new: true,
            runValidators: false,
        }).select("-__v");
    } else if (task === 'removeFav') {
        return media.findByIdAndUpdate(imgid, { isFavourite: false }, {
            new: true,
            runValidators: false,
        }).select("-__v");
    } else if (task === 'getFav') {
        return media.find({ user: uid, isFavourite: true }).select("-__v");
    }
}
exports.getUserImages = (id) => {
    return media.find({ user: id }).select("-__v")
}

exports.deleteImage = (id) => {
    return media.findByIdAndDelete(id)
}

exports.getImage = (id) => {
    return media.findById(id).select("-__v");
}