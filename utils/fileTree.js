const unslash = require("./unslash");
const fs = require("fs");
const path = require("path");

module.exports = function fileTree(dir) {
    return fs.statSync(dir).isDirectory() ?
        Array.prototype
        .concat(...fs.readdirSync(dir)
            .map(f => fileTree(path.join(dir, f))))
        .map(f => unslash(f)) :
        dir;
}
