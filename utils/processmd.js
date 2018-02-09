const fs = require("fs");
const md = require("marked");
const path = require("path");

const fileTree = {};

const renderer = new md.Renderer();
renderer.heading = function(text, level) {
    return `<h${level}>${text}</h${level}>`;
};

function processmd(dir, ext) {
    buildTree(dir, ext)
        .filter(f => f.slice(f.lastIndexOf(".") + 1) === ext)
        .forEach(file => fileTree[file] = convert(file));
    return fileTree;
}

function convert(file, ext) {
    const content = fs.readFileSync(file).toString('utf-8');
    return md(content, {
        renderer
    })
}

function buildTree(dir) {
    return fs.statSync(dir).isDirectory() ?
        Array.prototype
        .concat(...fs.readdirSync(dir)
            .map(f => buildTree(path.join(dir, f)))) :
        dir;
}

module.exports = processmd;
