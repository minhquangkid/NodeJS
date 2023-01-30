const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const homeRouters = require("./routes/home");
const User = require("./models/user");
///
// const Test = require("./models/test");
// const fs = require("fs");
// const path = require("path");
const Hotel = require("./models/hotel");

// toàn bộ app.use() là đang sử dụng middleware
app.use(cors());

app.use(express.json()); // cái này dùng với fetch có method là POST
app.use(express.urlencoded({ extended: false })); // cái này dùng với tag <form> có method là POST

///////////////////////////////
// app.use((req, res, next) => {

// });

// app.use((req, res, next) => {
//   Hotel.findById("6311a9c64a642f01423490bf", function (err, docs) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Result : ", docs);
//     }
//   });
// });

// app.use((req, res, next) => {
//   const hotel = JSON.parse(
//     fs.readFileSync(
//       path.join(
//         path.dirname(process.mainModule.filename),
//         "data",
//         "hotels.json"
//       ),
//       "utf8"
//     )
//   );
//   // console.log(hotel);
//   const createRoom = new Test(...hotel);
//   createRoom.save();
//   console.log("test created");
// });

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
