const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
     
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();
      return response.render('layout', {
        pageTitle: 'Contacto',
        template: 'contacto',
        mensajeExito: null,
        topSpeakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/',(req,res) => {
    const {nombre, email, mensaje } = req.body;

    // Ruta del archivo JSON
    const filePath = path.join(__dirname, '../data/contactos.json');

    //leer contactos existentes si hay
        let contactos = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      contactos = JSON.parse(data);
    }

        // Agregar nuevo contacto
    contactos.push({
      nombre,
      email,
      mensaje,
      fecha: new Date().toISOString()
    });

       // Guardar de nuevo en JSON
    fs.writeFileSync(filePath, JSON.stringify(contactos, null, 2));
    // Renderizamos la misma página con un mensaje
    res.render('layout', {
    pageTitle: 'Contacto',
    template: 'contacto',
    mensajeExito: `¡Gracias por tu mensaje, ${nombre}!`
  });
  })

  return router;
};

