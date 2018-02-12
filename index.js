const fs = require("fs");
const yaml = require("js-yaml");
const makeDir = require("make-dir");
const del = require("del");

const fileTree = require("./utils/fileTree");
const processImages = require("./utils/processImages");
const processStyles = require("./utils/processStyles");
const buildIndex = require("./utils/buildIndex");
const processMarkdown = require("./utils/processMarkdown");

const config = yaml.safeLoad(fs.readFileSync("config.yaml", "utf8"));
const theme = `themes/${config.theme}/`;
const options = {
  ...config.paths,
  theme,
  template: fs.readFileSync(`${theme}/index.ejs`).toString("utf-8")
};

del.sync([options.dest]);
makeDir.sync(options.dest + options.imageTarget);

const markdownFiles = fileTree(options.source, "md");
const blogPostCache = processMarkdown(markdownFiles, options);

processStyles(theme, options);
processImages(options);
buildIndex(markdownFiles, options, blogPostCache);
