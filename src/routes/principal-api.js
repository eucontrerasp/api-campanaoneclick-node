const { Router } = require('express');
const router = Router();
const PrincipalDao = require('../dao/principal-dao');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const atob = require('atob');
const Blob = require('node-blob');
const FileReader = require('filereader');

router.get('/ObtenerImagenCampania/:idCampana', async(req, res) => {
    try {

        const { idCampana } = req.params;
        const resultado = await PrincipalDao.getImagenCampaña(idCampana);

        const fileData = resultado.parametros[0].imagen;

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', 'attachment; filename=campania-1.png');
        res.setHeader('Content-Length', fileData.length);

        return res.end(fileData);

    } catch (err) {
        console.log(err);
        return err;
    }

});


router.post('/ActualizarImagenCampania/:idCampana', upload.single("imagen"), async(req, res) => {
    try {

        const { idCampana } = req.params;

        const file_buffer = fs.readFileSync(req.file.path);

        const contents_in_base64 = file_buffer.toString('base64');

        const myBuffer = Buffer.from(contents_in_base64, 'base64');


        const resultado = await PrincipalDao.updImagenCampaña(idCampana, myBuffer);

        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error(err)
                return
            } else {
                res.status(200).send(resultado);
            }
        });


    } catch (err) {
        console.log(err);
        return err;
    }
});

router.get('/ObtenerPDFCampania/:idCampana', async(req, res) => {
    try {

        let nombrePDF = '';
        const { idCampana } = req.params;
        const resultado = await PrincipalDao.getPDFCampaña(idCampana);

        const fileData = resultado.parametros[0].pdf;
        if (resultado.parametros[0].isapre === 'B') {
            nombrePDF = 'TerminoCondiciones Banmedica.pdf';
        } else {
            nombrePDF = 'TerminoCondiciones VidaTres.pdf';
        }


        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${nombrePDF}`);
        res.setHeader('Content-Length', fileData.length);

        return res.end(fileData);

    } catch (err) {
        console.log(err);
        return err;
    }

});

router.post('/ActualizarPDFCampania/:idCampana', upload.single("pdf"), async(req, res) => {
    try {

        const { idCampana } = req.params;

        const file_buffer = fs.readFileSync(req.file.path);

        const contents_in_base64 = file_buffer.toString('base64');

        // const fileBlob = b64toBlob(contents_in_base64, '', 10000000);

        const myBuffer = Buffer.from(contents_in_base64, 'base64');


        const resultado = await PrincipalDao.updPDFCampaña(idCampana, myBuffer);

        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error(err)
                return
            } else {
                res.status(200).send(resultado);
            }
        });

    } catch (err) {
        console.log(err);
        return err;
    }
});

module.exports = router;