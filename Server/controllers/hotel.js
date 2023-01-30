const Hotel = require("../models/hotel");

exports.getDetail = (req, res, next) => {
  // console.log(req.body);
  Hotel.findById(req.body.id)
    .then((data) => {
      // console.log(data)
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
};
