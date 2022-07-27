# Installation guide
Requires `yarn` (or you can use `npm`)
```
git clone git@github.com:Darderion/Modern-and-Magic-Chess-Online.git
cd Modern-and-Magic-Chess-Online
```

## Web-Server configuring

1) Copy config from `.env.example` to `.env` and modify (set variables).

2) Copy config from `server/config-db-example.json` to `server/src/db/config/config.json` and modify.

3) Run `bash install_web.sh`

4) Run `yarn start`

For development use `yarn dev` instead of `yarn start`.

## React configuring

1) Copy config from `.env.example` to `.env` and modify (set variables).

2) Run `yarn install`

3) Run `yarn start`
