import * as mysql from "mysql2"; 
import * as iniparser from "iniparser";

export let module_connexion =
        mysql.createConnection({
        host: 'localhost',
        port:3306,
        user:'root',
        // password:'root',
        password: '19Lun@73',
        database:'Asimov'
    })

