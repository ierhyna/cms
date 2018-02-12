const fs = require("fs");
const path = require("path");

module.exports = function fileTree(dir, filter) {
  return fs.statSync(dir).isDirectory()
    ? Array.prototype
        .concat(...fs.readdirSync(dir).map(f => fileTree(path.join(dir, f))))
        .map(f => path.normalize(f))
        .filter(f => (filter ? path.parse(f).ext === `.${filter}` : true))
    : dir;
};
