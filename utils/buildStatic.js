const md = require('marked');
const fm = require('front-matter');
const ejs = require('ejs');
const fs = require('fs');

module.exports = function(file, markdown, options) {
    const {
        dest,
        template,
        theme
    } = options;

    const content = fm(markdown);
    const page = {
      title: content.attributes.title,
      date: content.attributes.date,
      content: md(content.body)
    };

    const html = ejs.render(template, {
        template: `./${theme}/post`,
        page
    }, {
        filename: 'index.ejs'
    });

    const filename = file.slice(file.lastIndexOf("/") + 1).replace('.md', '.html');

    fs.writeFile(`${dest}/${filename}`, html, error =>
        error ? console.log(error) : console.log("file saved as " + filename));
}
