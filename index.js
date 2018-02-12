const fs = require("fs");
const yaml = require("js-yaml");
const makeDir = require("make-dir");
const fileTree = require("./utils/fileTree");
const buildStatic = require("./utils/buildStatic");
const buildIndex = require("./utils/buildIndex");
const log = require("./utils/log");
const err = require("./utils/err");
const processImages = require("./utils/processImages");

const config = yaml.safeLoad(fs.readFileSync("config.yaml", "utf8"));
const theme = `themes/${config.theme}`;
const options = {
  theme,
  dest: "_site/",
  template: fs.readFileSync(`${theme}/index.ejs`).toString("utf-8"),
  source: "content/",
  static: "static/",
  imageDirectory: "content/images/",
  imageTarget: "static/images/",
  styles: ["style.css"]
};
const markdownFiles = fileTree(options.source, "md");
//const imageFiles = fileTree(options.imageDirectory);
const blogPostCache = [];

// Process styles
makeDir.sync(options.imageTarget);
options.styles.forEach(style =>
  fs.copyFile(
    `${options.theme}/${style}`,
    `${options.dest}/${style}`,
    error => {
      if (error) {
        err(error, `Could not copy ${style}`);
      }
    }
  )
);

processImages(options);

// Process content
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
