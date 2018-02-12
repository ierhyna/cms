const imagemin = require("imagemin");
const log = require("./log");
const err = require("./err");
const makeDir = require("make-dir");

module.exports = function(options) {
  makeDir.sync(options.dest + options.imageTarget);
  imagemin(
    [`${options.imageDirectory}*.{jpg,png}`],
    `${options.dest}${options.imageTarget}`
  )
    .then(() => log("images copied to static"))
    .catch(e => err(e));
};
