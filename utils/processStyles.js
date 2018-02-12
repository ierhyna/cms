const fileTree = require("./fileTree");
const { err } = require("./log");
const fs = require("fs");
const path = require("path");

module.exports = function(theme, options) {
  fileTree(theme, "css").forEach(style => {
    try {
      fs.copyFileSync(
        `${options.theme}/${path.parse(style).base}`,
        `${options.dest}/${path.parse(style).base}`
      );
    } catch (error) {
      err(`Could not copy ${path.parse(style).base}`, error);
    }
  });
};
