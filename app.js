const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const oracleUtil = require('./src/util/oracle-database');

//settings 
app.set('port', process.env.port || 4000)
app.set('json spaces', 2);

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes 
app.use('/CampaniaOneClick/api/v1', require('./src/routes/principal-api'));
app.use('/CampaniaOneClick/api/v1', require('./src/routes/status-api'));

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server start ${app.get('port')}`);
});
const expressServer = http.createServer(app);

//Se inicia conexion a base de datos
oracleUtil.initialize().then((connectionSuccess) => {
    if (!module.parent) {
        //fix para shutdown node y oracle
        process.on('SIGINT', function() {
            process.exit(0)
        })
    }
    // //Se inicia el servidor web
    // expressServer.listen(config.protocol.webPort, () => {
    //     console.log(`web api listening on port ${config.protocol.webPort}`)
    // })
}).catch((err) => {
    console.log('Error al conectar a base de datos', err)
        //process.exit(1)
})