const fs = require('fs');
const md = require("marked");

// Rendere overwrite — lets get rid of ids for headers
const renderer = new md.Renderer();
renderer.heading = function(text, level) {
    return `<h${level}>${text}</h${level}>`;
};

function processmd(file, done) {
    const content = fs.readFileSync(file).toString('utf-8');
    return md(content, {
        renderer
    })
}

module.exports = processmd;
