import * as mysql from "mysql2"; 

export let module_connexion =
	mysql.createConnection({
		host: 'localhost',
		port:3306,
		user:'root',
		password:'root',
		database:'Asimov'
	})
