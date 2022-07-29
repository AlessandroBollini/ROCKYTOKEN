const db = require('../models/NFTModels');

exports.add = async (data) => {
    const image = {
        uri: data.uri,
        used: false
    }
    await db.Image.create(image)
        .then(console.log("Image stored on the db"))
        .catch((err) => {
            console.error(err);
        })
}