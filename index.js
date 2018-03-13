const yaml = require("js-yaml");
const makeDir = require("make-dir");
const del = require("del");
const processImages = require("./utils/processImages");
const processStyles = require("./utils/processStyles");
const {readFile} = require("./utils/fileUtils");
const Site = require("./utils/site");

const config = yaml.safeLoad(readFile("config.yaml"));
const theme = `themes/${config.theme}/`;
const template = readFile(`${theme}/index.ejs`).toString("utf-8");
const options = {...config, theme, template};

Object.keys(options.paths).forEach(path => {
  if (options.paths[path][options.paths[path].length - 1] !== "/") {
    options.paths[path] += "/";
  }
});

const site = new Site(options);

del.sync([options.paths.dest]);
makeDir.sync(options.paths.dest + options.paths.imageTarget);

processStyles(theme, options);
processImages(options);

site.buildHTMLPages();
site.buildIndex({ignore: ["page"]});
