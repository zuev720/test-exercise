require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.USERDB,
    host: 'localhost',
    database: process.env.DATABASE,
    password: process.env.DATABASEPASSWORD,
    port: 5432,
});
const getData = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM datatable ORDER BY id', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getFilterData = (field, term, filterValue) => {
    return new Promise(function(resolve, reject) {
        pool.query(`SELECT * FROM datatable WHERE ${field} ${term} ${filterValue}`, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

module.exports = {
    getData,
    getFilterData
}