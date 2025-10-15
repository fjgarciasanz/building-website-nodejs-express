const express = require('express'); 
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

const bodyParser = require('body-parser');

const ContactoService = require('./services/ContactoService');  
const MuseoService = require('./services/museoService');

const contactoService = new ContactoService('./data/contacto.json');
const museoService = new MuseoService('./data/museo.json');

const routes = require('./routes');

const app = express();

app.locals.siteName = 'Museo';  // Nombre del sitio 

const port = 3000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Ghdur687399s7w', 'hhjjdf89s866799'],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Museo';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const nombre = await museoService.getNombre();
    response.locals.museonombre = nombre;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    contactoService,
    museoService,
  })
);

app.use((request, response, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});

app.listen(port, () => {
  console.log(`Servidor express funcionando en el puerto ${port}!`);
});
