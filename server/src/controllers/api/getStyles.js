const { ApiError } = require('../../validators/errors/ApiError');
const StyleDispatcher = require('../sharedFunctions/StyleDispatcher');

module.exports = async (req, res, next) => {
  if (!req || !req.body) {
    return new ApiError(
      500,
      'Incorrect request: req or req.body is not valid'
    ).sendResponse(res);
  }

  const operationInfo = await StyleDispatcher.getStyles(req.body);

  return operationInfo.success
    ? res.json(operationInfo.styles)
    : operationInfo.error.sendResponse(res);
};
