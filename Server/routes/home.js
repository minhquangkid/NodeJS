const express = require("express");

const homeController = require("../controllers/home");
const router = express.Router();

router.post("/sign", homeController.postSign);

router.post("/login", homeController.postLogIn);

router.post("/logout", homeController.postLogOut);

router.get("/center", homeController.getCenter);

module.exports = router;
