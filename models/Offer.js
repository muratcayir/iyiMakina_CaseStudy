const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  price: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: String,
    required: true,
  },
});

const Offer = mongoose.model("Offer", OfferSchema);
module.exports = Offer;
