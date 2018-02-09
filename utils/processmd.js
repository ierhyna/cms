const fs = require('fs');
const md = require("marked");
const path = require('path');

const fileTree = {};

// Renderer overwrite — lets get rid of ids for headers
const renderer = new md.Renderer();
renderer.heading = function(text, level) {
    return `<h${level}>${text}</h${level}>`;
};

function processmd(dir, ext) {
    buildTree(dir, ext)
        .forEach(file => fileTree[file] = convert(file));
    return fileTree
}

function convert(file) {
    const content = fs.readFileSync(file).toString('utf-8');
    return md(content, {
        renderer
    })
}

function buildTree(dir, ext) {
    return fs.statSync(dir).isDirectory() ?
        Array.prototype
        .concat(...fs.readdirSync(dir)
            .map(f => buildTree(path.join(dir, f))))
        .filter(f => f.substring(f.lastIndexOf(".") + 1) === ext) :
        dir;
}

module.exports = processmd;
