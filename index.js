const ejs = require('ejs');
const fs = require('fs');
const yaml = require('js-yaml');

try {
  const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

  const template = `themes/${config.theme}/index.ejs`;
  const source = 'content/';
  const dest = '_site/';

  fs.readFile(template, {
    encoding: 'utf-8'
  }, (error, tpl) => {
    if (error) {
      console.log(`Template ${template} cannot be read`);
    } else {

      fs.readdir(source, (err, files) => {
        files.forEach(file => {
          fs.readFile(`${source}/${file}`, {
            encoding: 'utf-8'
          }, (error, data) => {

            if (error) {
              console.log(`File ${source}/${file} cannot be read`);
            } else {
              const html = ejs.render(tpl, { content: data });

              fs.writeFile(`${dest}/${file}` + ".html", html, error => {
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
