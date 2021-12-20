let knex = require("knex");
let {
    db
} = require("./index");

let mysql = knex({
    client: 'mysql',
    connection: {
        ...db
    },
    pool: {
        min: 0,
        max: 10
    }
})

//Script para crear Tabla
// (async ()=>{
//     try {
//         await db.schema.createTable("newProducts", table =>{
//             table.increments("id").primary();
//             table.string("name");
//             table.integer("price");
//             table.string("thumbnail");
//         });
//     } catch (error) {
//         console.log("ERROR", error);
//     }
// })();

class Database {
    static client;
    constructor() {
        if (Database.client) {
            this.client = Database.client;
            return Database.client;
        }
        Database.client = mysql;
        this.client = Database.client;
    }
}

module.exports = new Database();
