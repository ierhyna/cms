const imagemin = require("imagemin");
const { log, err } = require("./log");

module.exports = function(options) {
  imagemin(
    [`${options.imageDirectory}*.{jpg,png}`],
    `${options.dest}${options.imageTarget}`
  )
    .then(() => log("images copied to static"))
    .catch(e => err("image processing failed", e));
};
