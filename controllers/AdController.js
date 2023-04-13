import AdModel from '../models/Ad.js';

export const createAd = async (req, res) => {
    try {
        const doc = new AdModel({
            imageUrl: req.body.imageUrl,
            title: req.body.title,
        })

        const ad = await doc.save();

        res.json(ad);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed create new ad.',
        })
    }
}

export const getAllAds = async (req, res) => {
    try {
        const ads = await AdModel.find();
        res.json(ads);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cant get ad.',
        })
    }
}