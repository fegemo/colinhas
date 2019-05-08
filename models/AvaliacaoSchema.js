const mongoose = require("mongoose");

const schema = mongoose.Schema;

const model = new schema({
  completeness: Number,
  beauty: Number,
  favorite: Boolean,
  reviewer: { type: schema.Types.ObjectId, ref: 'Usuario' },
  towards: { type: schema.Types.ObjectId, ref: 'Colinha' }
});

module.exports = mongoose.model("Avaliacao", model, "avaliacao");
