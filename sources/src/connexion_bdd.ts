import * as mysql from "mysql2"; 

export let module_connexion =
	mysql.createConnection({
		host: 'localhost',
		user:'root',
		// password:'root',
		database:'Asimov'
	})
