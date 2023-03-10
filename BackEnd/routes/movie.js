const express = require("express");
const movieController = require("../controllers/movie");

const router = express.Router();

router.get("/api/movies/trending", movieController.getTrending);

router.get("/api/movies/top-rate", movieController.getTopRate);

router.get("/api/movies/discover", movieController.getType);

router.post("/api/movies/video", movieController.getTrailer); // có request Body nên FE phải là POST và BE cũng dùng router.post
// router.get("/api/movies/video", movieController.getTrailer); // cái lệnh này chỉ để xem kết quả trên trang BE

router.post("/api/movies/search", movieController.getSearch);

module.exports = router;
