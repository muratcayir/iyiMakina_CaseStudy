const Offer = require("../models/Offer");
const Product = require("../models/Product");



exports.createOffer = async (req, res) => {
  
  const { price, userId, productId } = req.body;

  try{
    const  product = await Product.find({_id:productId});
  }catch(err){
    res.status(404).json({message :"Product not found" });
  }

  const offerBody = {
    price,
    userId,
    product:productId,
  };

  const offer = await Offer.create(offerBody);

     res.json({message:"teklif eklendi"});
    
};


exports.getOffersOfProduct = async (req, res) => {
  try {
    const offers  = await Offer.find({product:req.params.productId});

    res.json(offers)
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
