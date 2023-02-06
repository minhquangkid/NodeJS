const Hotel = require("../models/hotel");
const room = require("../models/room");

exports.getDetail = (req, res, next) => {
  // console.log(req.body);
  Hotel.findById(req.body.id)
    .then((data) => {
      // console.log(data)
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
};

exports.getRoom = (req, res, next) => {
  let list = [];
  async function roomArray(id) {
    const array = await Hotel.findById(id);

    await Promise.all(
      // phải đặt promise bao bên ngoài map
      array.rooms.map(async (item) => {
        const res = await room.findById(item);
        list.push(res);
      })
    );
    return list;
  }

  roomArray(req.body.id)
    .then((data) => {
      res.status(200).send({ listRoom: data });
    })
    .catch((err) => console.log(err));
};

////////////
// exports.getCart = (req, res, next) => {
//   req.user
//     .populate("cart.items.productId") // thử bật tắt cái này và xem console.log để thấy khác biệt, kết hợp với xem giao diện Cart trên web
//     .execPopulate() // vì populate ko trả về promise (nếu chỉ dùng mình nó) nên ko chạy then được, ta phải có execPopulate(). Và req.user cũng ko phải là promise, nên có thể console.log(req.user) hoặc muốn dùng then thì phải có .execPopulate()
//     .then((user) => {
//       console.log("đây là user : ", user); // đây là giá trị của req.user
//       console.log("đây là user.cart.items : ", user.cart.items); // nếu tắt .populate("cart.items.productId") đi thì nó sẽ hiện ra như đúng trong database users nhưng nếu bật lên thì ta có thể lấy ra thêm các thông tin liên kết của .productId trong cart.items.productId
//       const products = user.cart.items;
//       res.render("shop/cart", {
//         path: "/cart",
//         pageTitle: "Your Cart",
//         products: products,
//       });
//     })
//     .catch((err) => console.log(err));
// };
