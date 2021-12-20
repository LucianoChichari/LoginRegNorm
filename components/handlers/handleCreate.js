const data = require('../services/datacreate')
const fs = require('fs')
const path = require('path')

let datos = JSON.stringify(data(),null, 2)

class ProductHandler{

    async store (req, res, next){
        try {
            
            await fs.promises.writeFile(path.join(__dirname, '../../data/product.json'), datos, 'utf-8')
            let response = JSON.parse(datos)
            res.render(path.join(__dirname, '../../views/ejs/pages/index.ejs'), {responseObject: response})
            
        } catch (error) {
            console.log(error) 
        }

}}

module.exports = new ProductHandler()
