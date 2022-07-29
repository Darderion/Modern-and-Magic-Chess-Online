const fs = require('fs');
const util = require('util');
const path = require('path');

const writeFileAsync = util.promisify(fs.writeFile);
const unlinkFileAsync = util.promisify(fs.unlink);
const existsFileAsync = util.promisify(fs.exists);
const readdirSync = fs.readdirSync;
const statSync = fs.statSync;

module.exports = {
  writeFile: async (path, content) => {
    await writeFileAsync(path, content, { encoding: 'utf-8' });
  },

  removeFile: async (path) => {
    try {
      await unlinkFileAsync(path);
    } catch (err) {
      console.log(`removeFile error: file ${path} doesn't exist...`);
    }
  },

  getAllFilesInFolder: (dirName) => {
    const fileNames = readdirSync(dirName);
    const [dirs, files] = [[], []];
    for (let f of fileNames) {
      let fullPath = path.resolve(dirName, f);
      let stat = statSync(fullPath);
      if (stat.isDirectory()) {
        dirs.push(fullPath);
      } else {
        files.push(fullPath);
      }
    }
    return { dirs, files };
  },

  exists: async (path) => {
    return await existsFileAsync(path);
  },
};
