const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const makeDir = require('make-dir');
const fileTree = require("./utils/fileTree");
const buildStatic = require("./utils/buildStatic");
const buildIndex = require("./utils/buildIndex");

const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
const theme = `themes/${config.theme}`;
const options = {
    theme,
    dest: '_site/',
    template: fs.readFileSync(`${theme}/index.ejs`).toString('utf-8'),
    source: 'content/',
    style: `${theme}/style.css`
}
const files = fileTree(options.source);
const blogPostCache = [];

// Process styles
makeDir.sync(options.dest)
fs.copyFile(options.style, `${options.dest}/style.css`, error =>
    error && console.log(`Could not copy ${options. style}: ${error}`));

// Process content
files.forEach(file => {
    try {
        const data = fs.readFileSync(file, 'utf-8')
        buildStatic(file, data, options)
        blogPostCache.push({
            file,
            data
        })
    } catch (error) {
        console.log(error)
    }
});

// Generate index.html
buildIndex(files, options, cache);
