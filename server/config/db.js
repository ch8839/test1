const mysql = require('mysql')

const POOL = mysql.createPool({
	host: '172.16.20.46',
	user: 'root',
	password: 'admin',
	database: 'test'
})

module.exports = function (sql, values) {
	return new Promise((resolve, reject) => {
		POOL.getConnection(function (err, connection) {
			if (err) {
				reject(err); // not connected!
			}
			connection.query(sql, values, function (err, results, fields) {
				if (err) {
					reject(err)
				} else {
					resolve(results)
				}

				connection.release()
			})
		})
	})
}