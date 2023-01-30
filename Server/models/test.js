const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema({
  // tạo collection users
  _id: { type: Schema.Types.ObjectId, required: true },
  address: { type: String, required: true },
  cheapestPrice: { type: Number, required: true },
  city: { type: String, required: true },
  desc: { type: String, required: true },
  distance: { type: String, required: true },
  featured: { type: Boolean, required: true },
  name: { type: String, required: true },
  photos: { type: Array, required: true },
  rooms: {
    roomID: [
      {
        Id: {
          type: Schema.Types.ObjectId,
          ref: "room",
          required: true,
        },
      },
    ],
  },

  //   cart: {
  //     items: [
  //       {
  //         productId: {
  //           type: Schema.Types.ObjectId,
  //           ref: "Product",
  //           required: true,
  //         },
  //         quantity: { type: Number, required: true },
  //       },
  //     ],
  //   },
});

module.exports = mongoose.model("test", testSchema); // tạo collection, mongoose tự động viết thường và thêm chữ s vào thành 'users'
