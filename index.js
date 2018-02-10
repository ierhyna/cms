const ejs = require('ejs');
const fs = require('fs');
const yaml = require('js-yaml');
const md = require("marked");

try {
  const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

  const theme = `themes/${config.theme}`;
  const template = `${theme}/index.ejs`;
  const style = `${theme}/style.css`;

  const source = 'content/';
  const dest = '_site/';

  fs.readFile(template, {
    encoding: 'utf-8'
  }, (error, tpl) => {
    if (error) {
      console.log(`Template ${template} cannot be read`);
    } else {
      // Process styles
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
              const html = ejs.render(tpl, { content: md(data) });
              const filename = `${file}`.replace('.md', '.html');

              fs.writeFile(`${dest}/${filename}`, html, error => {
                if (error) {
                  console.log("could not save file")
                } else {
                  console.log("file saved as " + file + ".html")
                }
              })
            }

          });
        })
      });

    }
  });
} catch (e) {
  console.log(e);
}
