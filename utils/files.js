const fs = require('fs');
const getDirName = require('path').dirname;

const writeFileSync = (path, contents) => {
    fs.mkdirSync(getDirName(path), { recursive: true });
    fs.writeFileSync(path, contents);
}

const appendFileSync = (path, contents) => {
    fs.appendFileSync(path, contents);
}

module.exports = { writeFileSync };