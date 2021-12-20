let knex = require("knex");

let sqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: "../DB/mydb.sqlite"
    }
})

class Database{
    static client;
    constructor(){
        if(Database.client){
            this.client = Database.client;
            return Database.client;
        }
        Database.client = sqlite;
        this.client = Database.client;
    }
}

module.exports = new Database();