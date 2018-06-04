import mongoose from 'mongoose';

const { Schema } = mongoose;
const Staff = new Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  shopId: {
    type: Schema.Types.ObjectId,
    ref: 'shop',
  },
});
const model = mongoose.model('staff', Staff);

export default model;
