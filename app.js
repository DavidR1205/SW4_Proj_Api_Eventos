const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pool = require('./config/database');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Importar validadores
const loginvalidator = require('./middlewares/loginValidator');
const authValidator = require('./middlewares/authValidator');

//Importar RUTAS
const loginRouter = require('./routes/loginRouter');
const artistaRouter = require('./routes/artistaRouter');
const organizadorRouter = require('./routes/organizadorRouter');
const eventoRouter = require('./routes/eventoRouter');
const boletaRouter = require('./routes/boletaRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const rolRouter = require('./routes/rolRouter');
const compraRouter = require('./routes/compraRouter');
const ventaRouter = require('./routes/ventaRouter');
const indexRouter = require('./routes/indexRouter');


//Usar las Cookies
app.use(cookieParser())

//Configuracion EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Configuracion para soportar PUT y DELETE en formularios
app.use(methodOverride('_method'));

//Configuracion Carrito
app.use(session({
    secret: 'boletas-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(loginvalidator);

//RUTAS DE LOGIN
app.use(loginRouter);

// Middleware para proteger las rutas de admin(jwt)
app.use('/admin', authValidator);

//RUTAS
app.use('/', indexRouter);

//RUTAS ADMIN
app.use('/admin/artista', artistaRouter);
app.use('/admin/organizador', organizadorRouter);
app.use('/admin/eventos', eventoRouter);
app.use('/admin/boletas', boletaRouter);
app.use('/admin/usuarios', usuarioRouter);
app.use('/admin/roles', rolRouter);
app.use('/admin/compras', compraRouter);
app.use('/admin/ventas', ventaRouter);


/*Ruta Principal
app.get('/', (req, res) => {
    res.render('pages/home/index', { title: 'Sistema de Eventos' })
})*/

//Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor Corriendo en http://localhost:${port}`);
})



