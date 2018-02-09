const fs = require("fs");
const makeDir = require('make-dir');
const unslash = require("./unslash")

module.exports = function(fileTree, directory) {
    Object.keys(fileTree)
        .forEach(file => {
            const dir = directory + "/" + file.slice(file.indexOf("/") + 1, file.lastIndexOf("/"));
            const fileName = "/" + file.slice(file.lastIndexOf("/") + 1, file.lastIndexOf(".")) + ".html"
            makeDir(dir)
                .then(r => fs.writeFileSync(dir + fileName, fileTree[file]))
        })
}
