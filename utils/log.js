const chalk = require("chalk");

module.exports = function(message) {
  console.log(chalk.cyan(message));
};
