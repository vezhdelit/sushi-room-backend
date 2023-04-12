import ItemModel from '../models/Item.js';

export const getAll = async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cant get items.',
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new ItemModel({
            imageUrl: req.body.imageUrl,
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.quantity,
            weight: req.body.weight,

            description: req.body.description,
            compounds: req.body.compounds,
            category: req.body.category,
        })

        const item = await doc.save();

        res.json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed create new item.',
        })
    }
}