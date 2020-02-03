const express = require('express');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');
//inicianmos express
const app = express();


//configuraciones
app.set('puerto', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middelwear
//propiedades de multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/image'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
})

app.use(multer({
    //configuracion para el nonmbre de los archivos
    storage,
    //aca se coloca la ruta en donde se colocara las imaens
    dest: path.join(__dirname, 'public/image'),
    limits: { fileSize: 3000000 },
    fileFilter: (req, file, cb) => {
        const tipos_archivos = /jpeg|jpg|png|gif/;
        const minetype = tipos_archivos.test(file.mimetype);
        //con el file.extnamesolo obtendremosla extencion del archivo 
        const extmane = tipos_archivos.test(path.extname(file.originalname));
        if (minetype && extmane) {
            return cb(null, true);
        }
        cb("error:el archivo tiene que ser una imagen pe papaaaa")
    }
}).single('imagen'))




//rutas
app.use(require('./routes/index'));

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))


//inicandpo el servidor
app.listen(app.get('puerto'), () => {
    console.log("el servidor esta inicado en el puerto ", app.get('puerto'));
})