const md = require("marked");
const ejs = require("ejs");
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const { log, err } = require("./log");

module.exports = function(file, content, options) {
  const { dest, template, theme, defaultPageType } = options;
  log("Parsing " + file);
  const date = content.attributes.date
    ? moment(content.attributes.date).format("dddd, MMMM Do YYYY, h:mm")
    : "";
  const page = {
    date,
    title: content.attributes.title,
    content: md(content.body)
  };
  const pageType = content.attributes.type || defaultPageType;

  const html = ejs.render(
    template,
    {
      template: `./${theme}/${pageType}`,
      page
    },
    {
      filename: "index.ejs"
    }
  );

  const filename = `${path.parse(file).name}.html`;

  fs.writeFile(`${dest}/${filename}`, html, error => {
    if (error) {
      return err("Could not create static file", error);
    }
    log(`Saving ${filename}`);
  });
};
