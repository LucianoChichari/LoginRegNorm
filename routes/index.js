const {Router} = require("express");
const router = Router();
let contenedor = require("../services/index");
// const normalizr = require("../components/handlers/handleCreate")
function serverRouter(app) {
    
    app.use("/", router);

    // router.get("/productos-test", normalizr.store)

// EJS--------------------------------------------

    router.get("/", (req, res, next) => {
        res.redirect("login")
    })

// Registro

    router.get("/registro", (req, res, next) => {
        res.render("pages/registro")
    })

    let usuarios = [];

    router.post("/registro", (req, res, next) =>{
        let {direccion, nombre, password} = req.body
        const usuario = usuarios.find(user => user.nombre == nombre)
        if(usuario){
            return res.render("registro-error");
        }
        usuarios.push({nombre, password, direccion});
        res.redirect("login")
    })

    // Log In
    router.get("/login", (req, res, next) => {
        res.render("pages/login")
    })

    router.post("/login", (req, res, next) =>{
        let {nombre, password} = req.body
        const usuario = usuarios.find(user => user.nombre == nombre && user.password == password) 
        if(!usuario){
            return res.json("login-error");
        }
        res.redirect("/productos-ejs")
    })

    // Log Out
    router.get("/logout", (req, res, next) =>{
        req.session.destroy( err => {
            if (err) console.log(err);
            res.redirect("login");
        })
    })

    // Acciones de productos-ejs

    router.get("/productos-ejs", async (req, res, next) => {
        let response = await contenedor.getAll()
        let user = usuarios.find(user => user.nombre == req.session.nombre)
        res.render("pages/index", {response, user})
    })

    router.get("/productos-ejs/:id", async (req, res, next) => {
        let { id } = req.params
        let response = await contenedor.getProdById(parseInt(id))
        res.render("pages/index", {response})
    })


    router.post("/productos-ejs", (req, res) => {
        let obj = req.body;
        contenedor.newProd(obj);
        console.log(obj)
        res.redirect("/productos-ejs")
    })  

    router.put("/productos-ejs/:id", async (req, res) => {
        let {obj} = req.body
        let { id } = req.params
        let response = await contenedor.updateProduct(obj, parseInt(id))
        res.json(response)
    })
   

    router.delete("/productos-ejs/:id", async (req, res, next) => {
        let { id } = req.params
        let response = await contenedor.deleteById(parseInt(id))
        res.render("pages/index", {response})
    })

}




module.exports = serverRouter;