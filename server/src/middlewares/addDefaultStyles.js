const { UserStyle } = require('../db/models');

const {
  DatabaseConnectionError,
} = require('../validators/errors/ConnectionError');

const StyleDispatcher = require('../controllers/sharedFunctions/StyleDispatcher');

module.exports = async (req, res, next) => {
  const userId = req.user.id;
  
  const operationInfo = await StyleDispatcher.getStyles({
    packName: 'default',
  });

  if (!operationInfo.success) {
    return operationInfo.error.sendResponse(res);
  }

  const stylesIds = operationInfo.styles.map((t) => t.id);

  try {
    for (let id of stylesIds) {
      await UserStyle.create({
        UserId: userId,
        StyleId: id,
        isSelected: true,
      });
    }

    next();
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }
};
