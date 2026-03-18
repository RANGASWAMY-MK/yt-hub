const ytdl = require("ytdl-core");

exports.isValidYouTubeURL = (url) => {
  return ytdl.validateURL(url);
};
