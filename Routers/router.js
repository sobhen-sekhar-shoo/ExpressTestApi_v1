const express = require("express");
const router = express.Router();

const { getAllVideo, AddUser, TestVideo } = require("../Controllers/user.control");

router.route("/").get(getAllVideo);

router.route("/AddUser").post(AddUser);
router.route("/TestVideo").get(TestVideo);



module.exports = router;