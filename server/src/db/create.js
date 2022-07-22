const { sequelize } = require('./models');
const { sequelizeInfo } = require('../config/index')

async function main() {
    if(sequelizeInfo.syncType === 'FORCE')
        await sequelize.sync({ force: true });
    else if(sequelizeInfo.syncType === 'ALTER')
        await sequelize.sync({ alter: true });
    else
        await sequelize.sync();
}

main()
