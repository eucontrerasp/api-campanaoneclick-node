'use strict'

const oracleUtil = require('../util/oracle-database');

const getFirst = async(rs, builder) => {

    try {
        let row;
        while (row = await rs.getRow()) {
            return builder(oracleUtil.createObjectFromMetadataAndRow(rs.metaData, row));
        }
    } catch (err) {
        console.log(`Resultsets : ${err}`);
        return err;
    }
}

const getAll = async(rs, builder) => {

    let t = []

    try {
        let row;
        while (row = await rs.getRow()) {
            t = [...t, builder(oracleUtil.createObjectFromMetadataAndRow(rs.metaData, row))];
        }

        return t;
    } catch (err) {
        console.log(`Resultsets: ${err}`);
        return err;
    }
}

module.exports = { getAll, getFirst }