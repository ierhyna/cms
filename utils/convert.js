const dt = require("./directoryTree");
const md = require("./processmd");

const fileTree = {};

function convert(dir, ext) {
    dt(dir, ext)
        .forEach(buildFileTree);
    return fileTree;
}


function buildFileTree(file) {
    fileTree[file] = md(file)
}

module.exports = convert;
