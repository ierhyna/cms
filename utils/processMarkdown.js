const buildStatic = require("./buildStatic");
const fs = require("fs");
const fm = require("front-matter");
const { err } = require("./log");

module.exports = function(markdownFiles, options) {
  const blogPostCache = [];
  markdownFiles.forEach(file => {
    try {
      const data = fs.readFileSync(file, "utf-8");
      const content = fm(data);
      buildStatic(file, content, options);

      // TODO: Configurable array of page types to display in the blog feed
      if (content.attributes.type !== "page") {
        blogPostCache.push({
          file,
          data
        });
      }
    } catch (error) {
      err(`Error processing ${file}, skipping`, error);
    }
  });
  return blogPostCache;
};
