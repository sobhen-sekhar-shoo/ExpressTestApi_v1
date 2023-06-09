const express = require("express");
const router = express.Router();

const { getAllVideo, AddUser, AllUsers, TestVideo, UploadVideo } = require("../Controllers/user.control");

router.route("/").get(getAllVideo);

router.route("/AddUser").post(AddUser);
router.route("/AllUsers").get(AllUsers);
router.route("/TestVideo").get(TestVideo);
router.route("/UploadVideo").get(UploadVideo);


module.exports = router;