const express = require('express');
const app = express();
const artistaRouter = require('./routes/artistaRouter');
const port = 3000;

app.set('view engine', 'ejs');
app.use('/artista', artistaRouter);

app.listen(port, () => {
    console.log(`Servidor Corriendo en http://localhost:${port}`);
})