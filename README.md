# Installation guide
Requires `yarn` (or you can use `npm`)
```
git clone git@github.com:Darderion/Modern-and-Magic-Chess-Online.git
cd Modern-and-Magic-Chess-Online
```

## Web-Server configuring

1) Copy config from `.env.example` to `.env` and modify (set variables).

2) Copy config from config-db-ex.json to server/src/db/config/config.json and modify.

2) Write the following lines:
```
cd server
yarn
yarn start
cd src/db 
sequelize db:create
node ./create.js
```

For development use `yarn dev` instead of `yarn start`.
