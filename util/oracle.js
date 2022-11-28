const path = require('path');
require('dotenv').config(path);
const knexOracle = require("../db");

const getLimits = async (table, attribute, condition) => {
    const sql = `SELECT MIN(${attribute}) AS min, MAX(${attribute}) AS max, COUNT(${attribute}) AS count FROM ${table}${condition ? ' WHERE ' + condition : ''}`;
    const res = await executeQuery(sql);
    return res[0];    
}

const executeQuery = async (sql) => {
    try {
        let result = await knexOracle.raw(sql);
        return result;
    } catch (error) {
        console.error(
            JSON.stringify(error)
        );
        knexOracle.shouldReconnect(error);
        process.exit(1);
    }
}

const getSQLBatches = (table, attributes, condition, count, batchSize) => {
    let sqls = [];
    for (let i = 0; i < count; i+=batchSize) {
        const sql = `SELECT ${attributes ? attributes.toString()  : '*' } FROM ${table} WHERE ${condition ? condition :''} OFFSET ${i} ROWS FETCH NEXT ${batchSize} ROWS ONLY`;
        sqls.push(sql);

    }
    console.log(sqls)
    return sqls;
}


module.exports = { getLimits, getSQLBatches,executeQuery };