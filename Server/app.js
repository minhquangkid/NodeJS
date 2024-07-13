const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const homeRouters = require("./routes/home");
const hotelRouters = require("./routes/hotel");
const roomRouters = require("./routes/rooms.js");
const transactionRouters = require("./routes/transaction");
const User = require("./models/user");
const Hotel = require("./models/hotel");

// toàn bộ app.use() là đang sử dụng middleware
app.use(cors());

app.use(express.json()); // cái này dùng với fetch có method là POST
app.use(express.urlencoded({ extended: false })); // cái này dùng với tag <form> có method là POST

app.get("/init", (req, res, next) => {
  User.findOne({ isLogIn: true })
    .then((data) => {
      if (data) {
        // console.log(data);

        res.send(data);
      } else {
        res.status(400);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // return next(); // dùng next ở đây sẽ lỗi ?
});

app.use(homeRouters);
app.use(hotelRouters);
app.use(transactionRouters);
app.use(roomRouters);

mongoose
  .connect(
    // tạo database tên là asm2
    "mongodb+srv://minhquang:25031998@cluster0.0tlx60u.mongodb.net/asm2?retryWrites=true",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

/*

useNewUrlParser: true: Sử dụng trình phân tích cú pháp URL mới của MongoDB. Điều này giúp xử lý các thay đổi trong cách URL được phân tích và kết nối.
useUnifiedTopology: true: Sử dụng công cụ quản lý kết nối mới của MongoDB. Điều này cung cấp một cách quản lý kết nối nhất quán và ổn định hơn.

*/

// app.use((req, res, next) => { // phải kiếm chỗ đặt cái này
//   res.status(404).send({ message: "Route not found" });
// });

// app.listen(5000);
