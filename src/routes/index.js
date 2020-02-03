const { Router } = require('express');
const path = require('path')
//lo que nos permitira subir laimagen
const multer = require('multer');
//iniciamos el modulo router
const router = Router();


//rutas

//ruta inical 
router.get('/', (req, res) => {
    res.render('index')
})


router.post('/imagen', (req, res) => {
    console.log(req.file);

    res.send("subido");
})



//exportamos el modulo patra que lo podamos implementar en la applicacion principal 
module.exports = router