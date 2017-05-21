const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const loadTestDomFromPath = path=> {
    const file = fs.readFileSync(path).toString();
    global.document = new JSDOM(file).window.document;
}

module.exports = loadTestDomFromPath;