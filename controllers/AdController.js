import AdModel from "../models/AdModel.js";

export const createAd = async (req, res) => {
  // #swagger.tags = ['Ads']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create Ad',
            schema: { $ref: '#/definitions/Ad' }
    } */

  try {
    const doc = new AdModel({
      imageUrl: req.body.imageUrl,
      title: req.body.title,
    });

    const ad = await doc.save();

    res.json(ad);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed create new ad.",
    });
  }
};

export const getAllAds = async (req, res) => {
  // #swagger.tags = ['Ads']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Get all Ad',
            schema: { $ref: '#/definitions/Ad' }
    } */

  try {
    const ads = await AdModel.find();
    res.json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cant get ad.",
    });
  }
};
