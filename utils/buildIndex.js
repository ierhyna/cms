const ejs = require('ejs');
const fm = require('front-matter');
const fs = require('fs');
const path = require('path');

function buildIndex(files, options, cache) {
    const {
        dest,
        template,
        theme
    } = options;

    const fileNames = files.map(file => `${path.parse(file).name}.html`);

    const page = {
        title: 'Blog',
        files: fileNames,
    };

    const html = ejs.render(template, {
        template: `./${theme}/blog`,
        page
    }, {
        filename: 'index.ejs'
    });

    fs.writeFile(`${dest}/index.html`, html, error =>
        error ? console.log(error) : console.log('file saved as index.html'));
}

module.exports = buildIndex;
