const fs = require("fs")

const productos = [{
    "id": 1,
    "title": "producto 1",
    "price": 20,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}, {
    "id": 2,
    "title": "producto 3",
    "price": 10,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}, {
    "id": 3,
    "title": "producto 4",
    "price": 23,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}, {
    "id": 4,
    "title": "producto 5",
    "price": 30,
    "thumbnail": "https://cdn1.iconfinder.com/data/icons/feather-2/24/scissors-512.png"
}]

class Contenedor {

    getAll() {
        try {
            return productos
        } catch (error) {
            console.log(error)
        }
    }
    
     getProdById(e) {
        try {
            let data = this.getAll();
            let results = data.filter((x) => {
                return x.id == e
            })
            return results
        } catch (error) {
            console.log(error)
        }
    }
    newProd(obj){
        try {
            let data = this.getAll();
        let filterId = data.map((e) =>{
            return e.id
        });
        let newId = filterId.length + 1;
        data.push({
            "id": newId,
            "title": obj.title,
            "price": obj.price,
            "thumbnail": obj.thumbnail
        })
        return data;
        } catch (error) {
            console.log(error)
        }
        
    }
    deleteById(e){
        try {
            let data = this.getAll();
            let new_arr = data.filter((x) => {
                return x.id !== e
            })
            return new_arr
        } catch (error) {
            console.log(error)
        }
    }
    updateProduct(data, e){
        try {
            let {title, price, thumbnail} = data
            let response = this.getProdById(e);
            let newObj = response.map(e => {
                if(e.title !== title){
                     e.title = title
                     if(e.price !== price){
                         e.price = price
                         if(e.thumbnail !== thumbnail){
                             e.thumbnail = thumbnail
                         }
                     }
                }
                return e
            })
            return newObj
    } catch (error){
        console.log(error)
    }
}
}

module.exports = new Contenedor()