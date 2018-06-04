import mongoose from 'mongoose';

const { Schema } = mongoose;
const Work = new Schema({
  staff: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'staff',
    },
    name: String,
    phone: String,
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'shop',
    },
  },
  shop: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'shop',
    },
    name: String,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  endDatetime: {
    type: Date,
  },
});
const model = mongoose.model('work', Work);

export default model;
