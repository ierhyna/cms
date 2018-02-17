const imagemin = require("imagemin");
const imageminJpeg = require("imagemin-jpeg-recompress");
const imageminPng = require("imagemin-pngquant");
const { log, err } = require("./log");

module.exports = function(options) {
  imagemin(
    [`${options.imageDirectory}*.{jpg,png}`],
    `${options.dest}${options.imageTarget}`,
    {
      plugins: [
        imageminJpeg({ quality: "medium" }),
        imageminPng({ quality: "65-80" })
      ]
    }
  )
    .then(() => log("images copied to static"))
    .catch(e => err("image processing failed", e));
};
