const { Router } = require('express');
const router = Router();
const PrincipalDao = require('../dao/principal-dao');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const atob = require('atob');
const Blob = require('node-blob');
const FileReader = require('filereader');

router.get('/ObtenerImagenCampania', async(req, res) => {
    try {
        const resultado = await PrincipalDao.getBlobCampaña();

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


router.post('/ActualizarImagenCampania', upload.single("data"), async(req, res) => {
    try {

        const file_buffer = fs.readFileSync(req.file.path);

        const contents_in_base64 = file_buffer.toString('base64');

        // const fileBlob = b64toBlob(contents_in_base64, '', 10000000);

        const myBuffer = Buffer.from(contents_in_base64, 'base64');


        const resultado = await PrincipalDao.updBlobCampaña(myBuffer);

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

function b64toBlob(contents_in_base64, contentType = 'image/png', sliceSize = 10000000) {
    const byteCharacters = atob(contents_in_base64);
    const byteArrays = [];
    for (let offset = 0; offset < contents_in_base64.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
}

function blobToBase64(blob, callback) {
    let reader = new FileReader();
    reader.onload = function() {
        let dataUrl = reader.result;
        let base64 = dataUrl.split(',')[1];
        callback(base64);
    };
    reader.readAsDataURL(blob);
};

module.exports = router;