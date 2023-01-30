const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  createAt: { type: Date, required: true },
  desc: {
    type: String,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  roomNumbers: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema); // tạo collection, mongoose tự động viết thường và thêm chữ s vào thành 'users'
