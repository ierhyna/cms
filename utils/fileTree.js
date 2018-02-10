const unslash = require("unslash");

module.exports = function(dir) {
    return fs.statSync(dir).isDirectory() ?
        Array.prototype
        .concat(...fs.readdirSync(dir)
            .map(f => buildTree(path.join(dir, f))))
        .map(f => unslash(f)) :
        dir;
}
