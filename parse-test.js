const processmd = require('./utils/processmd');
const generateHTML = require('./utils/generateHTML');

const fileTree = processmd('content', 'md');
generateHTML(fileTree, 'publish');
