import * as mysql from "mysql2"; 

export let module_connexion =
	mysql.createConnection({
		host: 'localhost',
		user:'root',
		// password:'root',
		password:'19Lun@73',
		database:'Asimov'
	})
