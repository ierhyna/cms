const buildStatic = require("./buildStatic");
const fs = require("fs");
const { err } = require("./log");

module.exports = function(markdownFiles, options) {
  const blogPostCache = [];
  markdownFiles.forEach(file => {
    try {
      const data = fs.readFileSync(file, "utf-8");
      buildStatic(file, data, options);
      blogPostCache.push({
        file,
        data
      });
    } catch (error) {
      err(`Error processing ${file}, skipping`, error);
    }
  });
  return blogPostCache;
};
