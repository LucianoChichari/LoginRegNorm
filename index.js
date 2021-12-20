const express = require("express");
const path = require("path")
let {config} = require("./config")
const serverRoutes = require("./routes")
const session = require("express-session")
let Sockets = require("./utils/sockets")
const { Server: HttpServer } = require('http');

// Initializations
const app = express();
let httpServer = new HttpServer(app);
let socket = new Sockets(httpServer);
socket.listenConnection();

// Settings
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// EJS----------------------------------------------------
app.set("views", path.join(__dirname, "views", "ejs"))
app.set("view engine", "ejs")
//Pages
app.use(express.static(path.join(__dirname, "views")));


//Middlewares
const cors = require("cors");
app.use(cors(`${config.cors}`));



serverRoutes(app);

httpServer.listen(config.port, ()=>{
    console.log(`Connected to URL:: http://localhost:${config.port}`)
});
app.on("error", err => console.log("Fallo de conexion al servidor", err));