const ejs = require('ejs');
const fm = require('front-matter');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

function buildIndex(files, options, posts) {
    const {
        dest,
        template,
        theme
    } = options;

    const fmPosts = posts
        .map(post => {
            const content = fm(post.data);
            return {
                file: `${path.parse(post.file).name}.html`,
                date: content.attributes.date ?
                    moment(content.attributes.date).format('YYYY/MM/DD') :
                    'No date',
                title: content.attributes.title || 'No title',
                attributes: content.attributes // rest
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const page = {
        title: 'Blog',
        posts: fmPosts
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
