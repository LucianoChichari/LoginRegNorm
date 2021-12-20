const fs = require("fs")

let db_obj = require("../config/db")
let db = db_obj.client;



class Contenedor {

    async getAll() {
        try {
            let respuesta = await db.from('productos')
            return respuesta
        } catch (error) {
            console.log(error)
        }
    }
    async getProdById(e) {
        try {
           let respuesta = await db.from('productos').where('id', e)
           return respuesta
        } catch (error) {
            console.log(error)
        }
    }
    async newProd(obj){
        try {
            let respuesta = await db.from('productos').insert({
                name: obj.name,
                price: obj.price,
                thumbnail: obj.thumbnail
            })
            return respuesta
        } catch (error) {
            console.log(error)
        }
        
    }
    async deleteById(e){
        try {
            let respuesta = await db.from('productos').where({id: e}).del()
            return respuesta
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(data, e){
        try {
            let respuesta = await db.from('prodcutos').where({id: e}).update({
                name: data.name,
                price: data.price,
                thumbnail: data.thumbnail
            })
            return respuesta
    } catch (error){
        console.log(error)
    }
}
}

module.exports = new Contenedor()