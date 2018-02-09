const fs = require("fs");
const makeDir = require('make-dir');
const unslash = require("./unslash")

function generateHTML(fileTree, directory) {
    let dirs = Object.keys(fileTree).map(getDirectories).filter((d, i, a) => d && a.indexOf(d) === i);
    dirs.forEach(dir => makeDir(`./publish/${directory}/${dir}`).catch(e => console.log(e)))
}

function getDirectories(entry) {
    entry = unslash(entry).split("/");
    return entry.slice(1, entry.length - 1).join("/");
}

module.exports = generateHTML;
