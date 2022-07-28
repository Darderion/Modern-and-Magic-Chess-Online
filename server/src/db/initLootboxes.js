const path = require('path');
const fs = require('../util/fs');

const LootboxCreator = require('../controllers/sharedFunctions/LootboxCreator');
const StyleDispatcher = require('../controllers/sharedFunctions/StyleDispatcher');

const main = async () => {
  const packsPath = path.resolve(__dirname, '../static/skins');
  const allPacks = fs.getAllFilesInFolder(packsPath).dirs;
  
  const packs = allPacks
    .map(t => t.replace(/^.*[\\\/]/, ''))
    .filter((t) => t !== 'default');

  for (let packName of packs) {
    const operationInfo = await StyleDispatcher.getStyles({ packName });

    if (!operationInfo.success){
      continue;
    }

    const price = 100;
    const stylesIds = operationInfo.styles.map((t) => t.id);

    LootboxCreator.create(price, stylesIds);
  }
};

main();
