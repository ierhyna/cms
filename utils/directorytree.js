const fs = require('fs');
const path = require('path');

function directoryTree(dir, ext) {
    return fs.statSync(dir).isDirectory() ?
        Array.prototype
        .concat(...fs.readdirSync(dir)
            .map(f => directoryTree(path.join(dir, f))))
        .filter(f => f.substring(f.lastIndexOf(".") + 1) === ext) :
        dir;
}
module.exports = directoryTree
