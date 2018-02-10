const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const makeDir = require('make-dir');
const fileTree = require("./utils/fileTree");
const buildStatic = require("./utils/buildStatic");

const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
const theme = `themes/${config.theme}`;
const options = {
    theme,
    dest: '_site/',
    template: fs.readFileSync(`${theme}/index.ejs`).toString('utf-8'),
    source: 'content/',
    style: `${theme}/style.css`
}

// Process styles
makeDir.sync(options.dest)
fs.copyFile(options.style, `${options.dest}/style.css`, error =>
    error && console.log(`Could not copy ${options. style}: ${error}`));

// Process content
fileTree(options.source)
    .forEach(file => fs.readFile(file, 'utf-8', (error, data) =>
        error ? console.log(error) : buildStatic(file, data, options)));
