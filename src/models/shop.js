import mongoose from 'mongoose';

const { Schema } = mongoose;
const Shop = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // ShopName
  name: {
    type: String,
    unique: true,
  },
});
Shop.methods.passwordIsValid = function passwordIsValid(password) {
  try {
    return password === this.password;
  } catch (err) {
    throw err;
  }
};
const model = mongoose.model('shop', Shop);

export default model;
