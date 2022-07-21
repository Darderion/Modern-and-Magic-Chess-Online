cd server
yarn
cd src/db 
sequelize db:create
node ./create.js
cd ../../
yarn start