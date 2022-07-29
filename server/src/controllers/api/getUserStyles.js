const { UserStyle, Style } = require('../../db/models');
const { ApiError } = require('../../validators/errors/ApiError');
const { gameObjs } = require('../../config');

module.exports = async (req, res) => {
  const where = {
    UserId: req.user.id,
  };
  const isSelected = req?.body?.isSelected;
  if (isSelected) where.isSelected = isSelected;

  try {
    const styles = await UserStyle.findAll({ where });
    const res2 = gameObjs.colors.reduce((prev, cur) => {
      prev[cur] = gameObjs.figures.reduce((prev2, cur2) => {
        prev2[cur2] = isSelected ? undefined : [];
        return prev2;
      }, {});
      return prev;
    }, {});
    for(const style of styles) {
      const styleContent = style?.dataValues;
      if(styleContent) {
        const styleEl = await Style.findOne({
          where: {
            id: styleContent.StyleId,
          },
        });
        const style2 = styleEl.dataValues;
        if(isSelected) {
          res2[style2.pieceColor][style2.typeOfPiece] = 
            {id: style2.id, packName: style2.packName};
        } else {
          res2[style2.pieceColor][style2.typeOfPiece].push(
            {id: style2.id, packName: style2.packName});
        }
      }
      for(let color of gameObjs.colors) {
        for(let figure of gameObjs.figures) {
          if(isSelected) {
            if(!res2[color][figure]){
              res2[color][figure] = {id: -1, packName: 'default'};
            }
          } else {
            if(res2[color][figure] === {}) {
              res2[color][figure].push({id: -1, packName: 'default'});
            }
          }
        }
      }
    }
    return res.json({
      styles: res2,
    });
  } catch (e) {
    return new ApiError(500, e.message).sendResponse(res);
  }
};
