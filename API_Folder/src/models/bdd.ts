//********** Imports **********//
const mariadb = require("mariadb");

//********** Pool **********//
export const pool = mariadb.createPool({
		host: 'localhost',
		user: 'root',
		password: 'azer1234',
		database: 'api-avions',
		connectionLimit: 5
});

console.log("Total connections: ", pool.totalConnections());
console.log("Active connections: ", pool.activeConnections());
console.log("Idle connections: ", pool.idleConnections());