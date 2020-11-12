'use strict'

const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig.js');
// const auth = require('../util/authentication-db');
oracledb.fetchAsBuffer = [oracledb.BLOB];

const initialize = async() => {

    try {

        await oracledb.createPool(dbConfig.DPROD);
        console.log("Oracle connection Success");

        return true;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const connection = async function() {
    return await oracledb.getPool('DPROD').getConnection()
}


const closeConnection = async(conn) => {

    if (conn) {
        try {
            conn.close();
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

const createObjectFromMetadataAndRow = (metadata, row) => {

    let newObject = {}
    let col = 0;
    for (let meta of metadata) {
        newObject[meta.name] = row[col++];
    }
    return newObject;
}

module.exports = {
    initialize,
    closeConnection,
    connection,
    createObjectFromMetadataAndRow
}