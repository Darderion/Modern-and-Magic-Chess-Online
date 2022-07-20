require('dotenv').config();

module.exports = {
    postgres: {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
    env: {
        isDevelopment: process.env.NODE_ENV === "development",
        isProduction: process.env.NODE_ENV === "development",
    },
    server: {
        port: process.env.SERVER_PORT,
    }
}
