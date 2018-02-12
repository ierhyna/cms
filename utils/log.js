const chalk = require("chalk");

module.exports = {
  log(m) {
    console.log(chalk.cyan(m));
  },
  err(m) {
    console.log(chalk.white.bgRed(m));
  }
};
