const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

function buildIndex(files, options) {
    const {
        dest,
        template,
        theme
    } = options;

    const fileNames = files.map(file => `${path.parse(file).name}.html`);

    const html = ejs.render(template, {
        template: `./${theme}/blog`,
        title: 'Blog',
        content: fileNames,
        date: ''
    }, {
        filename: 'index.ejs'
    });

    fs.writeFile(`${dest}/index.html`, html, error =>
        error ? console.log(error) : console.log("file saved as index.html"));
};

module.exports = buildIndex;
