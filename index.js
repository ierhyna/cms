const fs = require("fs");
const yaml = require("js-yaml");
const makeDir = require("make-dir");

const fileTree = require("./utils/fileTree");
const err = require("./utils/err");
const processImages = require("./utils/processImages");
const processStyles = require("./utils/processStyles");
const buildStatic = require("./utils/buildStatic");
const buildIndex = require("./utils/buildIndex");

const config = yaml.safeLoad(fs.readFileSync("config.yaml", "utf8"));

const theme = `themes/${config.theme}/`;
const options = {
  ...config.paths,
  theme,
  template: fs.readFileSync(`${theme}/index.ejs`).toString("utf-8")
};

const markdownFiles = fileTree(options.source, "md");
const blogPostCache = [];

makeDir.sync(`${options.dest}${options.imageTarget}`);

processStyles(theme, options);
processImages(options);

markdownFiles.forEach(file => {
  try {
    const data = fs.readFileSync(file, "utf-8");
    buildStatic(file, data, options);
    blogPostCache.push({
      file,
      data
    });
  } catch (error) {
    err(`Error processing ${file}, skipping`);
  }
});

// Generate index.html
buildIndex(markdownFiles, options, blogPostCache);
