const UserDispatcher = require('../sharedFunctions/UserDispatcher');

// TEST
// curl -X POST -H "Content-Type: application/json" -d '{"money": 100}' http://localhost:5000/api/addMoney

module.exports = async (req, res) => {
  const userId = req.user.id;
  const { money } = req.body;

  const operationInfo = await UserDispatcher.increaseMoney(userId, money);

  return operationInfo.success
    ? res.json(operationInfo.newMoney)
    : operationInfo.error.sendResponse(res);
};
