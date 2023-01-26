const fs = require('fs');
const getDirName = require('path').dirname;

const writeFile = (path, contents, cb) => {
    fs.mkdir(getDirName(path), { recursive: true }, function (err) {
        if (err) return cb(err);

        fs.writeFile(path, contents, cb);
    });
}

// transcribe but with no callback 

const writeFileSync = (path, contents) => {
    fs.mkdirSync(getDirName(path), { recursive: true });
    fs.writeFileSync(path, contents);
}

module.exports = { writeFileSync };