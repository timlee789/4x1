import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  productname: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description1: { type: String, required: true },
  description2: { type: String, required: true },
  description: { type: String },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
