const mongoose = require("mongoose");

const schema = mongoose.Schema;

const model = new schema({
  folderPath: String,
  author: { type: schema.Types.ObjectId, ref: 'Usuario' },
  reviews: [{ type: schema.Types.ObjectId, ref: 'Avaliacao' }],
  language: String
});


model.virtual('favorites').get(function() {
  const reviews = this.reviews || [];
  const amount = reviews ? reviews.filter(r => r.favorite).length : 0;
  return amount;
});
model.set('toObject', { virtuals: true })
model.set('toJSON', { virtuals: true })

module.exports = mongoose.model("Colinha", model, "colinha");


// db.Colinha.insertMany([
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e22"),
//     "folderPath" : "alice"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e23"),
//     "folderPath" : "ana-cristina"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e29"),
//     "folderPath" : "clara"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e2a"),
//     "folderPath" : "daniela"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e2d"),
//     "folderPath" : "manu"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e32"),
//     "folderPath" : "gabriel-augusto"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e35"),
//     "folderPath" : "heitor"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e38"),
//     "folderPath" : "isadora"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e3b"),
//     "folderPath" : "leticia"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e40"),
//     "folderPath" : "marcos"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e41"),
//     "folderPath" : "maria-fernanda"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e48"),
//     "folderPath" : "rafael-torrezani"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e49"),
//     "folderPath" : "rafaela"
//   },
//   {
//     "author" : ObjectId("5cd0e301e2cb2d873a918e4b"),
//     "folderPath" : "sophia"
//   }
// ])
