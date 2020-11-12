const { Router } = require('express');
const router = Router();

router.get('/status', async(req, res) => {
    try {

        let date_ob = new Date();

        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        res.json({
            ok: true,
            body: {
                hora: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
            }
        });

    } catch (err) {
        console.log(err);
        return err;
    }
});

module.exports = router;