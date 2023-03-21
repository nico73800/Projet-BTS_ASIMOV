import * as mysql from "mysql2"; 
import * as iniparser from "iniparser";

export let module_connexion =
        mysql.createConnection({
        host: 'localhost',
        port:3308,
        user:'root',
        password:'root',
        database:'asimov'
    })

