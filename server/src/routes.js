
require('dotenv').config();
const express = require('express');
const router = express.Router();

const Event = require('./schema/Event.js');

// Define all API routes

router.route('/')
  .get((req, res) => {
    res.status(200).send('<h1>Happening API</h1>');
  });

router.route('/events')
  .get((req, res) => {
    res.status(200).send('GET ALL EVENTS NOW');
  });

router.route('/events/new')
  .post((req, res) => {
    res.status(200).send('MAKE NEW EVENT');
  });

router.route('/events/:eid/rsvp')
  .post((req, res) => {
    res.status(200).send(`NEW RSVP TO EVENT ${req.params.eid}`);
  })
  .delete((req, res) => {
    res.status(200).send('CANCEL RSVP TO EVENT');
  });

router.route('/user/:uid/rsvp')
  .get((req, res) => {
    res.status(200).send(`RSVP events for ${req.params.uid}`);
  });

module.exports = router;
