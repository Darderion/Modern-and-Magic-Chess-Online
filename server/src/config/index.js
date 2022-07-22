require('dotenv').config();

module.exports = {
    sequelizeInfo: {
        syncType: process.env.MODELS_SYNC_TYPE
    },
    env: {
        nodeEnv: process.env.NODE_ENV,
        isDevelopment: process.env.NODE_ENV === "development",
        isProduction: process.env.NODE_ENV === "production",
    },
    server: {
        port: process.env.SERVER_PORT,
    }
}
