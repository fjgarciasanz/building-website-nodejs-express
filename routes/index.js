const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');
const acercaRoute = require('./acerca');
const contactoRoute = require('./contacto');
const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();
      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));
  router.use('/acerca', acercaRoute(params));
  router.use('/contacto',contactoRoute(params));

  return router;
};
