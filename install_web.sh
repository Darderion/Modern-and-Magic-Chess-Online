cd server
yarn
cd src/db 
sequelize db:create
cd ../../
node ./src/db/create.js
yarn start
