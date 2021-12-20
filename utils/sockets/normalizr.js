const util = require('util')
module.exports = function print(obj){
    console.log(util.inspect(obj, false, 12, true))
}

