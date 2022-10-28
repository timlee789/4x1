import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  storename: { type: String },
  url: { type: String },
  city: { type: String },
  state: { type: String },
  img1: { type: String },
  zip: { type: String },
  campaign: [
    {
      campaignname: { type: String },
      period: { type: String },
      visit: { type: String },
      reach: { type: String },
      content: { type: String },
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
