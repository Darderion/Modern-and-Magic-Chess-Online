const models = require('./models');
const fs = require('../util/fs');
const path = require('path');

const main = async () => {
  for (let packName of fs.getAllFilesInFolder(
    path.resolve(__dirname, '../static/skins')
  ).dirs) {
    for (let pieceColor of fs.getAllFilesInFolder(packName).dirs) {
      for (let typeOfPiece of fs.getAllFilesInFolder(pieceColor).files) {
        const where = {
          pieceColor: path.basename(pieceColor),
          typeOfPiece: path.basename(typeOfPiece, path.extname(typeOfPiece)),
          packName: path.basename(packName),
        };
        await models.Style.findOrCreate({ where });
      }
    }
  }
};

main();
