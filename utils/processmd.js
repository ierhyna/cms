const fs = require('fs');

function processmd(file, done) {

    return fs.readFileSync(file)
        .toString('utf-8')
        .split("\r\n")
        .map(s => wrap(s.trim()))
        .join("");
}

function wrap(string) {
    if (!string) {
        return ("<br>")
    }
    const text = string.substring(string.indexOf(" ") + 1);
    const fmt = string.split(" ")[0];
    let el = "";

    switch (fmt) {
        case "#":
            el = `<h1>${text}</h1>`;
            break;
        case "##":
            el = `<h2>${text}</h2>`;
            break;
        default:
            el = `<p>${string}</p>`;
            break;
    }
    return el;
}

module.exports = processmd;
