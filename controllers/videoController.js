const ytdl = require("ytdl-core");
const { isValidYouTubeURL } = require("../utils/validate");

exports.getVideoInfo = async (req, res) => {
  try {
    const { url } = req.body;

    if (!isValidYouTubeURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    const info = await ytdl.getInfo(url);

    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails.pop().url,
      formats: ytdl.filterFormats(info.formats, "videoandaudio"),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video info" });
  }
};

exports.downloadVideo = async (req, res) => {
  try {
    const { url, quality, type } = req.body;

    if (!isValidYouTubeURL(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    res.header("Content-Disposition", `attachment; filename="video.${type === "audio" ? "mp3" : "mp4"}"`);

    if (type === "audio") {
      ytdl(url, { filter: "audioonly" }).pipe(res);
    } else {
      ytdl(url, {
        quality: quality || "highest",
      }).pipe(res);
    }
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
};
