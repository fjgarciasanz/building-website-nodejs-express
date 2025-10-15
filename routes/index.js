const express = require('express');

const museoRoute = require('./museo');
const contactoRoute = require('./contacto');

const router = express.Router();

module.exports = (params) => {
  const { museoService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const cuadro = await museoService.getAllcuadro();
      const topMuseo = await museoService.getList();
      return response.render('layout', {
        pageTitle: 'Bienvenido',
        template: 'index',
        topMuseo,
        cuadro,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/museo', museoRoute(params));
  router.use('/contacto', contactoRoute(params));

  return router;
};
