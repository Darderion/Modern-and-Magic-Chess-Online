const exp = {
    server: {
        serverURL: process.env.REACT_APP_SERVER_PROTOCOL + '://' + 
            process.env.REACT_APP_SERVER_HOST + ':' + 
            process.env.REACT_APP_SERVER_PORT + '/',
        skinFolder: process.env.REACT_APP_SERVER_STYLE_FOLDER,
    },
};
export default exp;
