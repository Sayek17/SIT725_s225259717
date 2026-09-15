const mongoose = require('mongoose');

// One document per book. The price is stored as Decimal128 so the cents cannot
// drift the way they can with plain floating point numbers. The getter turns it
// back into a string, because Decimal128 does not serialise to a number on its own.
const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  summary: { type: String, required: true },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: (value) => (value ? value.toString() : value)
  },
  currency: { type: String, required: true, default: 'AUD' }
}, {
  toJSON: {
    getters: true,
    virtuals: false,
    transform(_doc, ret) { delete ret.__v; return ret; }
  },
  toObject: { getters: true, virtuals: false }
});

module.exports = mongoose.model('Book', BookSchema);
