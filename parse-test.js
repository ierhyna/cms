const processmd = require('./utils/processmd');
const directoryTree = require('./utils/directoryTree')
const fileTree = {};

directoryTree(__dirname + "/content", "md").forEach(buildFileTree)
console.dir(fileTree)


function buildFileTree(file) {
    fileTree[file] = processmd(file)
}
