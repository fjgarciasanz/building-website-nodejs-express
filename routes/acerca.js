const express = require('express');


const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
     
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();
      return response.render('layout', {
        pageTitle: 'Acerca de',
        template: 'acerca',
        topSpeakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });


  return router;
};