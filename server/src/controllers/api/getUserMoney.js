const UserDispatcher = require('../sharedFunctions/UserDispatcher');

// TEST
// curl -X GET http://localhost:5000/api/getUserMoney

module.exports = async (req, res) => {
  const userId = req.user.id;
  const operationInfo = await UserDispatcher.getMoney(userId);

  return operationInfo.success
    ? res.json(operationInfo.money)
    : operationInfo.error.sendResponse(res);
};
