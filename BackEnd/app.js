const express = require("express");
const cors = require("cors");
const app = express();
const checkAuthor = require("./middleware/author");

// toàn bộ app.use() là đang sử dụng middleware
app.use(cors());

app.use(express.json()); // cái này dùng với fetch có method là POST
app.use(express.urlencoded({ extended: false })); // cái này dùng với tag <form> có method là POST

///////////////////////////////

const movieRouters = require("./routes/movie");

app.use(checkAuthor); // sử dụng middleware và đặt trước app.use(movieRouters) để nó kiểm tra trước khi chạy controller
//xem thêm video về middleware đã tải về máy

app.use(movieRouters);

//app.use(checkAuthor, movieRouters); // gộp chạy chung 2 cái như vầy cũng dc, phải chạy checkAuthor trước sau đó mới đến movieRouters

app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" }); // chỉ hiện lỗi ở BE http://localhost:5000/ss?user=User_01&token=8qlOkxz4wq , còn muốn FE hiện thì phải chỉnh trong phần Router của React
});

app.listen(5000);
