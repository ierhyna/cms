const chalk = require("chalk");

module.exports = function(error) {
  console && console.log(chalk.white.bgRed(error));
};
