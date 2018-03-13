const fs = require("fs");
const {log, err} = require("./log");

function readFile(file, format = "utf-8") {
  try {
    fs.readFileSync(file, format);
    log("reading file " + file);
  } catch (error) {
    err(" Could not read file " + file);
  }
}

function writeFile(file, data) {
  try {
    fs.writeFileSync(file, data);
    log("saving file " + file);
  } catch (error) {
    err(" Could not write file " + file);
  }
}

function copyFile(from, to) {
  try {
    fs.copyFileSync(from, to);
    log(`Copying ${from} to ${to}`);
  } catch (error) {
    err(`Could not copy ${from} to ${to}`);
  }
}

module.exports = {readFile, writeFile, copyFile};
