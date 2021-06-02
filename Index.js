/*jshint esversion: 6 */ 

const express    = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const hbs = require('express-handlebars');
const router = require('./routes/routes');

//Importar variables de entorno locales
require('dotenv').config({ path: 'variables.env'});

const app = express();

//configuracion para el Body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Conexion a BD y levantar Servidor
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true ,
    useUnifiedTopology: true,
    useFindAndModify: false ,
});

//Motor de vistas HBS
app.engine('.hbs',hbs({
    defaultLayout:'index',
    extname:'hbs'
}));

//npm i -S method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.set('view engine', '.hbs');

// Declaracion de carpeta STATIC
app.use(express.static('public'));

//Definir rutas de la aplicacion
app.use('/', router);

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () =>{
    console.log('El servidor esta funcionando');
});