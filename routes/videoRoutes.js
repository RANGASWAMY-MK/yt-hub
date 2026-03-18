const express = require("express");
const router = express.Router();

const {
  getVideoInfo,
  downloadVideo,
} = require("../controllers/videoController");

router.post("/info", getVideoInfo);
router.post("/download", downloadVideo);

module.exports = router;
