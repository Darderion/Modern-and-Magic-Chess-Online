## Web-Server configuring

### Build

1) Copy config from `webapp/.env.example` to `webapp/.env` and modify

2) Copy config from `server/.env.example` to `server/.env` and modify

3) Copy config `server/config-db-example.json` to `server/src/db/config/config.json` and modify

4) To install dependencies, write the following in root project directory: `bash install_web.sh`
  keys: 
    -d | --drop -> drop current database and create again
    -c | --create -> create database
    -f | --fill -> database exists and you want to fill it with tables
    -nis | --not_inst_server -> the server modules wouldn't be installed
    -niw | --not_inst_web -> the client modules wouldn't be installed

### Run
To start a server write the following:
```
cd server
yarn start # for development use `yarn dev`
```
To start a client write the following:
```
cd webapp
yarn start
```
