const fileTree = require("./fileTree");
const path = require("path");
const {copyFile} = require("./fileUtils");

module.exports = function (theme, options) {
  fileTree(theme, "css").forEach(style =>
    copyFile(`${options.theme}/${path.parse(style).base}`, `${options.paths.dest}/${path.parse(style).base}`));
};
