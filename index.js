const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const yaml = require('js-yaml');
const md = require("marked");
const fm = require('front-matter');
const makeDir = require('make-dir');

try {
  const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

  const theme =`themes/${config.theme}`;
  const template =`${theme}/index.ejs`;
  const style = `${theme}/style.css`;

  const source = 'content/';
  const dest = '_site/';

  // Process styles
  makeDir.sync(dest)
  fs.copyFile(style, `${dest}/style.css`, error => {
    if (error) {
      console.log(`Could not copy ${style}: ${error}`)
    }
  });

  // Process content
  fs.readdir(source, (err, files) => {
    files.forEach(file => {
      fs.readFile(`${source}/${file}`, {
        encoding: 'utf-8'
      }, (error, data) => {
        if (error) {
          console.log(`File ${source}/${file} cannot be read`);
        } else {

          fs.readFile(template, {
            encoding: 'utf-8'
          }, (error, tpl) => {
            if (error) {
              console.log(`Template ${template} cannot be read`);
            } else {
              const content = fm(data);
              const html = ejs.render(tpl, {
                type: 'page',
                title: content.attributes.title,
                date: content.attributes.date,
                content: md(content.body)
              });
              const filename = file.replace('.md', '.html');

              fs.writeFile(`${dest}/${filename}`, html, error => {
                if (error) {
                  console.log("could not save file")
                } else {
                  console.log("file saved as " + filename)
                }
              })
            }
          });

        }
      });
    })
  });
} catch (e) {
  console.log(e);
}
