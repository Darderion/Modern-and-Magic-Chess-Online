const config = {
    game: {
        figures: ['bishop', 'king', 'knight', 'queen', 'pawn', 'rook'],
        colors: ['black', 'white'],
    },
    server: {
        serverURL: process.env.REACT_APP_SERVER_PROTOCOL + '://' + 
            process.env.REACT_APP_SERVER_HOST + ':' + 
            process.env.REACT_APP_SERVER_PORT + '/',
        serverWebsockerURL: process.env.REACT_APP_SERVER_WEBSOCKET_PROTOCOL + '://' +
            process.env.REACT_APP_SERVER_HOST + ':' +
            process.env.REACT_APP_SERVER_PORT + '/' +
            process.env.REACT_APP_SERVER_WEBSOCKET_PATH,
        skinFolder: process.env.REACT_APP_SERVER_STYLE_FOLDER,
        registerFolder: process.env.REACT_APP_SERVER_REGISTER_FOLDER,
        loginFolder: process.env.REACT_APP_SERVER_LOGIN_FOLDER,
    },
    client: {
        showLoginType: { none: 0, signIn: 1, signUp: 2},
    },
};

export default config;
