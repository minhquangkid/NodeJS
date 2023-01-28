const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
//const checkAuthor = require("./middleware/author");
////////
const homeRouters = require("./routes/home");
const User = require("./models/user");

// toàn bộ app.use() là đang sử dụng middleware
app.use(cors());

app.use(express.json()); // cái này dùng với fetch có method là POST
app.use(express.urlencoded({ extended: false })); // cái này dùng với tag <form> có method là POST

///////////////////////////////

// const movieRouters = require("./routes/movie");

// app.use(checkAuthor); // sử dụng middleware và đặt trước app.use(movieRouters) để nó kiểm tra trước khi chạy controller

// app.use(movieRouters);

app.get("/init", (req, res, next) => {
  User.findOne({ isLogIn: true })
    .then((data) => {
      if (data) {
        console.log(data);
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

// app.use((req, res, next) => { // phải kiếm chỗ đặt cái này
//   res.status(404).send({ message: "Route not found" });
// });

// app.listen(5000);
