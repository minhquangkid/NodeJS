const getMovie = require("../models/movie");
// xem kỹ thêm về restfull API
exports.getTrending = (req, res, next) => {
  const index = req.query.page; // lấy request param trong url của phương thức GET
  res.status(200).send(getMovie.getTrend(index));

  // xem res.status tại https://expressjs.com/en/5x/api.html#res.status
};

exports.getTopRate = (req, res, next) => {
  const index = req.query.page;
  res.status(200).send(getMovie.getTopRate(index));
};

exports.getType = (req, res, next) => {
  // url yêu cầu sẽ có dạng là http://localhost:5000/api/movies/discover?type=28&page=3
  const param = req.query; // trả về {type : .... , page : .....}
  //console.log(param);
  if (!param.type) {
    // kiểm tra xem người dùng có truyền type ko ?
    res.status(400).send("<h1>Not found genre param</h1>");
  } else {
    // phải dùng else vì nếu ko nó sẽ tiếp tục đọc code ở dưới mặc dù có dùng next() đi nữa

    // nếu có type thì xét xem type có tồn tại trong genreList.json ko ?
    const result = getMovie.checkType(Number(param.type));

    if (!result) {
      // nếu ko tồn tại thì báo lỗi
      res.status(400).send("<h1>Not found that genre id</h1>");
    } else {
      res.status(200).send(getMovie.getGenre(result, param.page));
    }
  }
};

exports.getTrailer = (req, res, next) => {
  // lấy thông tin body của Post bên FE
  const id = req.body.id;

  if (!id) {
    res.status(400).send({ message: "Not found film_id parram" });
  } else {
    const result = getMovie.getTrailer(id);
    if (result.length !== 0) {
      res.status(200).send(result); // gửi kết quả cho FE
    } else {
      res.status(400).send({ message: "Not found video" });
      //res.status(400).send("Not found video"); hoặc dùng cái này để thông báo lỗi cũng được, mở F12 bên Front End để xem thông báo
    }
  }
};

exports.getSearch = (req, res, next) => {
  // lấy thông tin body của Post bên FE
  const key = req.body.key;
  const detail = req.body.getDetail; // lấy ra các thông số tìm kiếm phụ

  const index = req.query.page; // lấy số trang

  if (!key) {
    res.status(400).send({ message: "Not found keyword parram" });
  } else {
    const result = getMovie.getResultSearch(key.toLowerCase(), detail, index);

    res.status(200).send(result);
  }
};
