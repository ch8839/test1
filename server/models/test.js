const query = require('../config/db')

class testModel {
    static async fun1() {
        let res = await query('SELECT * FROM list2')
        return res
    }

}

module.exports = testModel
