const md = require('marked');
const fm = require('front-matter');
const ejs = require('ejs');
const fs = require('fs');
const moment = require('moment');

module.exports = function(file, markdown, options) {
    const {
        dest,
        template,
        theme
    } = options;

    const content = fm(markdown);
    const date = content.attributes.date ?
        moment(content.attributes.date).format('dddd, MMMM Do YYYY, h:mm') :
        '';
    const page = {
        date,
        title: content.attributes.title,
        content: md(content.body)
    };

    const html = ejs.render(template, {
        template: `./${theme}/post`,
        page
    }, {
        filename: 'index.ejs'
    });

    const filename = file.slice(file.lastIndexOf('/') + 1).replace('.md', '.html');

    fs.writeFile(`${dest}/${filename}`, html, error =>
        error ? console.log(error) : console.log('file saved as ' + filename));
};
