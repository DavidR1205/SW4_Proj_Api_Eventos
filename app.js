const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Importar RUTAS
const artistaRouter = require('./routes/artistaRouter');
const organizadorRouter = require('./routes/organizadorRouter');

//Configuracion EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Configuracion para soportar PUT y DELETE en formularios
app.use(methodOverride('_method'));

//RUTAS
app.use('/artista', artistaRouter);
app.use('/organizador', organizadorRouter);

//Ruta Principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Sistema de Eventos' })
})

//Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor Corriendo en http://localhost:${port}`);
})