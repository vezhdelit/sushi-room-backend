import ItemModel from '../models/Item.js';

export const getAllItems = async (req, res) => {
    try {
        const category = req.query.category;
        const sortBy = req.query.sortBy || 'rating';
        const sortOrder = req.query.order;
        const search = req.query.search || '';

        const filter = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { compounds: { $regex: search, $options: 'i' } }
            ]
        };

        if (category) {
            filter.category = category;
        }
        const items = await ItemModel.find(filter).sort([[sortBy, sortOrder]]);
        res.json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cant get items.',
        })
    }
}

export const getOneItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await ItemModel.findOneAndUpdate({
            _id: itemId,
        },
            {
                $inc: { rating: 1 },
            },
            {
                returnDocument: 'after',
            });

        if (!item) {
            return res.status(404).json({
                message: 'Item is not found.'
            })
        }

        return res.json(item);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cant get item.',
        })
    }
}

export const createItem = async (req, res) => {
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