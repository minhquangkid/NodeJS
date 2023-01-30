const express = require("express");

const hotelController = require("../controllers/hotel");
const router = express.Router();

router.post("/detail", hotelController.getDetail);

module.exports = router;
