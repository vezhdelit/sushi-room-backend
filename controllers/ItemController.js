import ItemModel from "../models/ItemModel.js";

export const getAllItems = async (req, res) => {
  // #swagger.tags = ['Items']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Get all items.',
            schema: { $ref: '#/definitions/Item' }
    } */

  try {
    const category = req.query.category;
    const sortBy = req.query.sortBy || "rating";
    const sortOrder = req.query.order;
    const search = req.query.search || "";
    const limit = req.query.limit || 0;
    const page = req.query.page || 1;

    const filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { compounds: { $regex: search, $options: "i" } },
      ],
    };

    if (category) {
      filter.category = category;
    }
    const items = await ItemModel.find(filter)
      .sort([[sortBy, sortOrder]])
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cant get items.",
    });
  }
};

export const getOneItem = async (req, res) => {
  // #swagger.tags = ['Items']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Get item by id.',
            schema: { $ref: '#/definitions/Item' }
    } */

  try {
    const itemId = req.params.id;

    const item = await ItemModel.findOneAndUpdate(
      {
        _id: itemId,
      },
      {
        $inc: { rating: 1 },
      },
      {
        returnDocument: "after",
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Item is not found.",
      });
    }

    return res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cant get item.",
    });
  }
};

export const createItem = async (req, res) => {
  // #swagger.tags = ['Items']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create new item',
            schema: { $ref: '#/definitions/Item' }
    } */

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
    });

    const item = await doc.save();

    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed create new item.",
    });
  }
};

export const deleteItem = async (req, res) => {
  // #swagger.tags = ['Items']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Delete item by id.',
            schema: { $ref: '#/definitions/Item' }
    } */
  try {
    const itemId = req.params.id;

    const item = await ItemModel.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item is not found.",
      });
    }

    await ItemModel.findByIdAndRemove(itemId);

    res.json({
      success: "true",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed deleting item.",
    });
  }
};

export const updateItem = async (req, res) => {
  // #swagger.tags = ['Items']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Edit item by id.',
            schema: { $ref: '#/definitions/Item' }
    } */
  try {
    const itemId = req.params.id;

    const item = await ItemModel.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item is not found.",
      });
    }
    await ItemModel.findOneAndUpdate(
      {
        _id: itemId,
      },
      {
        imageUrl: req.body.imageUrl,
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        weight: req.body.weight,

        description: req.body.description,
        compounds: req.body.compounds,
        category: req.body.category,
      },
      {
        returnDocument: "after",
      }
    ).then((item) => {
      res.json(item._doc);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed update item.",
    });
  }
};
