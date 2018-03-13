const fs = require("fs");
const yaml = require("js-yaml");
const makeDir = require("make-dir");
const del = require("del");
const processImages = require("./utils/processImages");
const processStyles = require("./utils/processStyles");
const Site = require("./utils/site");

const config = yaml.safeLoad(fs.readFileSync("config.yaml", "utf8"));
const theme = `themes/${config.theme}/`;
const template = fs.readFileSync(`${theme}/index.ejs`).toString("utf-8");
const options = {...config, theme, template};

const site = new Site(options);

del.sync([options.paths.dest]);
makeDir.sync(options.paths.dest + options.paths.imageTarget);

processStyles(theme, options);
processImages(options);

site.buildHTMLPages();
site.buildIndex({ignore: ["page"]});

