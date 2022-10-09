const mongoose = require('mongoose');

const { Schema } = mongoose;

const trackSchema = new Schema({
  event: String,
  tags: [String],
  url: String,
  title: String,
  ts: Date,
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('tracks', trackSchema);
