const chalk = require("chalk");
const yaml = require("js-yaml");
const fs = require("fs");
const moment = require("moment");

const config = yaml.safeLoad(fs.readFileSync("config.yaml", "utf8"));

module.exports = {
  log(m) {
    console.log(
      chalk.cyan(moment(Date().now).format("YYYY-MM-DD HH:mm:ss"), m)
    );
  },
  err(m, verbose) {
    if (config.verboseLog) {
      console.log(
        chalk.grey(moment(Date().now).format("YYYY-MM-DD HH:mm:ss"), verbose)
      );
    }
    console.log(
      chalk.white.bgRed(moment(Date().now).format("YYYY-MM-DD HH:mm:ss"), m)
    );
  }
};
