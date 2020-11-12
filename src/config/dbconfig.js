// Configuración de base de datos

module.exports = {
    DPROD: {
        poolAlias: 'DPROD.BANMEDICA.CL',
        user: process.env.DPROD_ORACLE_USER || 'AFILIACION',
        password: process.env.DPROD_ORACLE_PASSWORD || 'AFILIACIONDESA',
        owner: process.env.DPROD_ORACLE_OWNER || 'AFILIACION',
        connectString: process.env.DPROD_ORACLE_URL || '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=bandesa.banmedica.cl)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=DPROD)))',
        poolMin: 1,
        poolMax: 1,
        poolIncrement: 0,
        poolTimeout: 60
    },
    DBConfig: {
        alias: process.env.POOL_ALIAS || 'DPROD.BANMEDICA.CL'
    }

}