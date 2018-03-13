const imagemin = require("imagemin");
const imageminJpeg = require("imagemin-jpeg-recompress");
const imageminPng = require("imagemin-pngquant");
const {log, err} = require("./log");

module.exports = function (options) {
  let {imageQuality} = options;
  let imageQualityJpg = " high";
  if (isNaN(Number(imageQuality))) {
    imageQuality = "80";
  } else {
    imageQuality = Number(imageQuality);
    if (imageQuality > 100) imageQuality = 100;
    if (imageQuality < 25) imageQuality = 25;
  }
  if (imageQuality < 40) {
    imageQualityJpg = "low";
  } else if (imageQuality < 60) {
    imageQualityJpg = "medium";
  } else if (imageQuality < 85) {
    imageQualityJpg = "high";
  } else {
    imageQualityJpg = "veryhigh";
  }

  imagemin(
    [`${options.paths.imageDirectory}*.{jpg,png}`],
    `${options.paths.dest}${options.paths.imageTarget}`,
    {
      plugins: [imageminJpeg({quality: imageQualityJpg}), imageminPng({quality: imageQuality})]
    }
  )
    .then(() => log("images copied to static"))
    .catch(e => err("image processing failed", e));
};
