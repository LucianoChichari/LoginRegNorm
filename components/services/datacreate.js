const faker = require('faker')

module.exports = function generateData(){
    
    let data = []

    for(let i=0; i<5; i++){
    data.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image() 
        })
    }
    return data
}

