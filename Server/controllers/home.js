const User = require("../models/user");

exports.postSign = (req, res, next) => {
  console.log(req.body);

  User.findOne({ email: req.body.getMail }).then((user) => {
    // nếu ko truyền điều kiện tìm kiếm cho findOne thì nó sẽ trả về giá trị đầu tiên tìm dc
    if (!user) {
      // nếu chưa có user mới thì sẽ tạo
      const user = new User({
        username: null,
        password: req.body.getPass,
        fullName: null,
        phoneNumber: null,
        email: req.body.getMail,
        isAdmin: false,
        isLogIn: false,
      });
      user.save().then(() => {
        res.status(200);
        res.send({ redirect: true, message: "http://localhost:3000/login" }); // nodejs ko thể tự điều hướng cho React được nên phải gửi url
      });
    } else {
      res
        .status(400)
        .send({ redirect: false, message: "email đã được sử dụng" });
    }
  });
};

exports.postLogIn = (req, res, next) => {
  User.findOne({ email: req.body.getMail }).then((user) => {
    // nếu ko truyền điều kiện tìm kiếm cho findOne thì nó sẽ trả về giá trị đầu tiên tìm dc
    if (!user) {
      // nếu ko có gmail nào
      res.status(400).send({ isLogIn: false, message: "Sai gmail đăng nhập" });
    } else {
      // khi đúng gmail thì đi kiểm tra password
      if (user.password !== req.body.getPass) {
        // nếu sai password
        res
          .status(400)
          .send({ isLogIn: false, message: "Sai mật khẩu đăng nhập" });
      } else {
        // nếu đúng pass thì gửi lại tên gmail để hiện trên navbar
        User.updateOne({ email: req.body.getMail }, { isLogIn: true })
          .then((data) => {
            // updateOne là 1 promise nên bắt buộc dùng then để nó thực hiện xong updata database rồi mới đến res.status
            res.status(200).send({ isLogIn: true, message: req.body.getMail });
          })
          .catch((err) => console.log(err));
      }
    }
  });
};

exports.postLogOut = (req, res, next) => {
  User.updateOne({ email: req.body.mail }, { isLogIn: false })
    .then()
    .catch((err) => {
      console.log(err);
    });
};

// exports.getInit = (req, res, next) => {
//   User.findOne({ isLogIn: true })
//     .then((data) => {
//       if (data) {
//         console.log(data);
//         res.status(200).send({ message: "init" });
//       } else {
//         res.status(400);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // res.status(200).send({ message: "init" });
//   // return next();
// };

// const getMovie = require("../models/movie");
// // xem kỹ thêm về restfull API
// exports.getTrending = (req, res, next) => {
//   const index = req.query.page; // lấy request param trong url của phương thức GET
//   res.status(200).send(getMovie.getTrend(index));

//   // xem res.status tại https://expressjs.com/en/5x/api.html#res.status
// };

// exports.getTopRate = (req, res, next) => {
//   const index = req.query.page;
//   res.status(200).send(getMovie.getTopRate(index));
// };

// exports.getType = (req, res, next) => {
//   // url yêu cầu sẽ có dạng là http://localhost:5000/api/movies/discover?type=28&page=3
//   const param = req.query; // trả về {type : .... , page : .....}
//   //console.log(param);
//   if (!param.type) {
//     // kiểm tra xem người dùng có truyền type ko ?
//     res.status(400).send("<h1>Not found genre param</h1>");
//   } else {
//     // phải dùng else vì nếu ko nó sẽ tiếp tục đọc code ở dưới mặc dù có dùng next() đi nữa

//     // nếu có type thì xét xem type có tồn tại trong genreList.json ko ?
//     const result = getMovie.checkType(Number(param.type));

//     if (!result) {
//       // nếu ko tồn tại thì báo lỗi
//       res.status(400).send("<h1>Not found that genre id</h1>");
//     } else {
//       res.status(200).send(getMovie.getGenre(result, param.page));
//     }
//   }
// };

// exports.getTrailer = (req, res, next) => {
//   // lấy thông tin body của Post bên FE
//   const id = req.body.id;

//   if (!id) {
//     res.status(400).send({ message: "Not found film_id parram" });
//   } else {
//     const result = getMovie.getTrailer(id);
//     if (result.length !== 0) {
//       res.status(200).send(result); // gửi kết quả cho FE
//     } else {
//       res.status(400).send({ message: "Not found video" });
//       //res.status(400).send("Not found video"); hoặc dùng cái này để thông báo lỗi cũng được, mở F12 bên Front End để xem thông báo
//     }
//   }
// };

// exports.getSearch = (req, res, next) => {
//   // lấy thông tin body của Post bên FE
//   const key = req.body.key;
//   const detail = req.body.getDetail; // lấy ra các thông số tìm kiếm phụ

//   const index = req.query.page; // lấy số trang

//   if (!key) {
//     res.status(400).send({ message: "Not found keyword parram" });
//   } else {
//     const result = getMovie.getResultSearch(key.toLowerCase(), detail, index);

//     res.status(200).send(result);
//   }
// };
