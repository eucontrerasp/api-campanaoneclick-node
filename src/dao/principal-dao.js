'use strict'

const { BLOB } = require('oracledb');
const oracledb = require('oracledb');
const config = require('../config/dbconfig');
const oracleUtil = require('../util/oracle-database');
const Resultsets = require('../util/resultsets');
const Blob = require('node-blob');

const getImagenCampaña = async(idCampana) => {

    const build = (rs) => {
        return {
            imagen: rs['IMAGEN'],
            isapre: rs['ISAPRE']
        }
    }

    let connection;

    try {

        await oracledb.createPool({
            user: config.DPROD.user,
            password: config.DPROD.password,
            connectString: config.DPROD.connectString
        });

        connection = await oracledb.getConnection();

        const vars = {
            PR_ID_CAMPANIA: Number(idCampana),
            PR_CODEOUT: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
            PR_DESCRIPOUT: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
            C_PARAMETROS: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        }

        const query = `BEGIN AFILIACION.PKG_CAMPAÑA_ONECLICK.QRY_IMAGEN_CAMPAÑA(:PR_ID_CAMPANIA, :C_PARAMETROS, :PR_CODEOUT, :PR_DESCRIPOUT); END;`;


        const result = await connection.execute(query, vars);

        return {
            codigo: result.outBinds.PR_CODEOUT,
            descripcion: result.outBinds.PR_DESCRIPOUT,
            parametros: await Resultsets.getAll(result.outBinds.C_PARAMETROS, build)
        }

    } catch (err) {
        console.log(`DAO: getImagenCampaña ${err}`);
        // logger.error(`DAO: getBlobCampaña ${err}`);
        return err = {
            ok: false,
            err
        };

    } finally {

        oracleUtil.closeConnection(connection);
    }
}

const updImagenCampaña = async(idCampania, imagenBLOB) => {

    let connection;

    try {

        await oracledb.createPool({
            user: config.DPROD.user,
            password: config.DPROD.password,
            connectString: config.DPROD.connectString
        });

        connection = await oracledb.getConnection();

        const vars = {
            PR_ID_CAMPANIA: Number(idCampania),
            PR_IMAGEN: { type: oracledb.BUFFER, val: imagenBLOB, maxSize: 10 * 1024 },
            PR_CODEOUT: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
            PR_DESCRIPOUT: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
        }

        const query = `BEGIN AFILIACION.PKG_CAMPAÑA_ONECLICK.UPD_IMAGEN_CAMPAÑA(:PR_ID_CAMPANIA,:PR_IMAGEN, :PR_CODEOUT, :PR_DESCRIPOUT); END;`;

        const result = await connection.execute(query, vars);

        // oracledb.autoCommit = true;
        // const result = await connection.execute(
        //     `UPDATE ONEC_CAMPANIA
        // 	    SET ONCA_IMG = :PR_IMAGEN,
        // 	AUDI_TUSUARIO_MODIFICADOR = 'ext_econtrerasp',
        // 	AUDI_FMODIFICACION = SYSDATE 
        //     WHERE ID_CAMPANIA IN (1,3,5,7)`, { PR_IMAGEN: { type: oracledb.BUFFER, val: imagenBLOB, maxSize: 10 * 1024 } }
        // );

        // return {
        //     codigo: result.outBinds.PR_CODEOUT,
        //     descripcion: result.outBinds.PR_DESCRIPOUT
        // }

        return result;

    } catch (err) {
        console.log(`DAO: updImagenCampaña ${err}`);
        // logger.error(`DAO: updBlobCampaña ${err}`);
        return err = {
            ok: false,
            err
        };

    } finally {

        oracleUtil.closeConnection(connection);
    }
}

const getPDFCampaña = async(idCampana) => {

    const build = (rs) => {
        return {
            pdf: rs['PDF'],
            isapre: rs['ISAPRE']
        }
    }

    let connection;

    try {

        await oracledb.createPool({
            user: config.DPROD.user,
            password: config.DPROD.password,
            connectString: config.DPROD.connectString
        });

        connection = await oracledb.getConnection();

        const vars = {
            PR_ID_CAMPANIA: Number(idCampana),
            PR_CODEOUT: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
            PR_DESCRIPOUT: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
            C_PARAMETROS: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        }

        const query = `BEGIN AFILIACION.PKG_CAMPAÑA_ONECLICK.QRY_PDF_CAMPAÑA(:PR_ID_CAMPANIA, :C_PARAMETROS, :PR_CODEOUT, :PR_DESCRIPOUT); END;`;


        const result = await connection.execute(query, vars);

        return {
            codigo: result.outBinds.PR_CODEOUT,
            descripcion: result.outBinds.PR_DESCRIPOUT,
            parametros: await Resultsets.getAll(result.outBinds.C_PARAMETROS, build)
        }

    } catch (err) {
        console.log(`DAO: getPDFCampaña ${err}`);
        // logger.error(`DAO: getBlobCampaña ${err}`);
        return err = {
            ok: false,
            err
        };

    } finally {

        oracleUtil.closeConnection(connection);
    }
}

const updPDFCampaña = async(idCampania, pdfBLOB) => {

    let connection;

    try {

        await oracledb.createPool({
            user: config.DPROD.user,
            password: config.DPROD.password,
            connectString: config.DPROD.connectString
        });

        connection = await oracledb.getConnection();

        const vars = {
            PR_ID_CAMPANIA: Number(idCampania),
            PR_PDF: { type: oracledb.BUFFER, val: pdfBLOB, maxSize: 10 * 1024 },
            PR_CODEOUT: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
            PR_DESCRIPOUT: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
        }

        const query = `BEGIN AFILIACION.PKG_CAMPAÑA_ONECLICK.UPD_PDF_CAMPAÑA(:PR_ID_CAMPANIA,:PR_PDF, :PR_CODEOUT, :PR_DESCRIPOUT); END;`;

        const result = await connection.execute(query, vars);

        // oracledb.autoCommit = true;
        // const result = await connection.execute(
        //     `UPDATE ONEC_CAMPANIA
        // 	    SET ONCA_TYC = :PR_PDF,
        // 	AUDI_TUSUARIO_MODIFICADOR = 'ext_econtrerasp',
        // 	AUDI_FMODIFICACION = SYSDATE 
        //     WHERE ID_CAMPANIA IN (1,3,5,7)`, { PR_PDF: { type: oracledb.BUFFER, val: pdfBLOB, maxSize: 10 * 1024 } }
        // );

        // return {
        //     codigo: result.outBinds.PR_CODEOUT,
        //     descripcion: result.outBinds.PR_DESCRIPOUT
        // }

        return result;

    } catch (err) {
        console.log(`DAO: updPDFCampaña ${err}`);
        // logger.error(`DAO: updBlobCampaña ${err}`);
        return err = {
            ok: false,
            err
        };

    } finally {

        oracleUtil.closeConnection(connection);
    }
}

module.exports = {
    getImagenCampaña,
    updImagenCampaña,
    getPDFCampaña,
    updPDFCampaña
}