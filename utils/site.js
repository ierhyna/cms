const ejs = require("ejs");
const md = require("marked");
const moment = require("moment");
const path = require("path");
const fm = require("front-matter");
const {log} = require("./log");
const fileTree = require("./fileTree");
const {readFile, writeFile} = require("./fileUtils");

class Site {
  constructor(options) {
    this.options = options;
    this.markdownFiles = fileTree(options.paths.source, options.markdownExtension);
    this.contents = buildContents(this.markdownFiles);
  }

  buildIndex({ignore} = []) {
    const {paths: {dest}, template, theme} = this.options;
    const fmPosts = this.contents
      .filter(page => !ignore.includes(page.mdAttributes.type))
      .map(page => ({
        file: `${path.parse(page.mdPath).name}.html`,
        date: page.mdAttributes.date
          ? moment(page.mdAttributes.date).format("YYYY/MM/DD")
          : "No date",
        title: page.mdAttributes.title || "No title",
        attributes: page.mdAttributes // any other attributes
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const page = {title: "Blog", posts: fmPosts};
    const html = ejs.render(template, {template: `./${theme}/blog`, page}, {filename: "index.ejs"});
    writeFile(`${dest}/index.html`, html);
  }

  buildHTMLPages() {
    const {paths: {dest}, template, theme, defaultPageType} = this.options;
    this.contents.forEach(file => {
      log("Parsing " + file.mdPath);
      const date = file.mdAttributes.date
        ? moment(file.mdAttributes.date).format("dddd, MMMM Do YYYY, h:mm")
        : "";

      const page = {date, title: file.mdAttributes.title, content: md(file.mdBody)};
      const pageType = file.mdAttributes.type || defaultPageType;
      const html = ejs.render(template, {template: `./${theme}/${pageType}`, page}, {filename: "index.ejs"});
      const filename = `${path.parse(file.mdPath).name}.html`;
      writeFile(`${dest}/${filename}`, html);
    });
  }
}

module.exports = Site;

function buildContents(markdownFiles) {
  return markdownFiles.map(mdPath => {
    const parsedMdContents = fm(readFile(mdPath));
    return {
      mdPath,
      mdBody: parsedMdContents.body,
      mdAttributes: parsedMdContents.attributes,
      htmlBody: md(parsedMdContents.body)
    };
  });
}
