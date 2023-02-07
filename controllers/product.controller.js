const { ObjectId } = require("mongodb");
const { getDb } = require("../Utils/dbConnect");

let tools = [
  {
    id: 1,
    tool: "Hammer",
  },
  {
    id: 2,
    tool: "Hammer2",
  },
  {
    id: 3,
    tool: "Hammer3",
  },
];
module.exports.getAllProducts = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const db = getDb();
    //cursor => toArray(),forEach
    const tool = await db
      .collection("tools")
      .find()
      // .project({ _id: 0 })
      .skip(+page * limit)
      .limit(+limit)
      .toArray();
    res.status(200).json({ IsSuccess: true, data: tool });
  } catch (error) {
    next(error);
  }
};
module.exports.saveProducts = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;
    const result = await db.collection("tools").insertOne(tool);
    console.log(result);
    if (!result.insertedId) {
      return res
        .status(404)
        .send({ status: false, error: "Something went wrong" });
    }
    res.send(`Tools added with id ${result.insertedId}`);
  } catch (error) {
    next(error);
  }
};
module.exports.specificProducts = async (req, re, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not valid tool id" });
    }
    const tool = await db.collection("tools").findOne({ _id: ObjectId(id) });
    if (!tool) {
      res
        .status(404)
        .json({ success: false, error: "Couldn't find tool with id" });
    }
    res.status(200).json({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProducts = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not valid tool id" });
    }
    const tool = await db
      .collection("tools")
      .updateOne({ _id: ObjectId(id) }, { $set: req.body });
    if (!tool.modifiedCount) {
      res
        .status(404)
        .json({ success: false, error: "Couldn't update the tool" });
    }
    res
      .status(200)
      .json({ success: true, Message: "Successfully updated the tool" });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteProducts = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not valid tool id" });
    }
    const tool = await db
      .collection("tools")
      .deleteOne({ _id: ObjectId(id) }, { $set: req.body });
    // if(!tool.modifiedCount){
    //   res.status(404).json({success:false, error:"Couldn't delete the tool"})
    // }
    res
      .status(200)
      .json({ success: true, Message: "Successfully deleted the tool" });
  } catch (error) {
    next(error);
  }
};

module.exports.test = async (req, res) => {
  for (let i = 0; i < 100000; i++) {
    const db = getDb();
    db.collection("test").insertOne({ name: `test ${i}`, age: i });
  }
};
module.exports.getTest = async (req, res) => {
  const db = getDb();
  const result = await db.collection("test").find({ age: 99999 }).toArray();
  res.json(result);
};
