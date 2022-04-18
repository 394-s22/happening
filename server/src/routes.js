require("dotenv").config();
const express = require("express");
const router = express.Router();

const Event = require("./schema/Event.js");
const User = require("./schema/User.js");

// Define all API routes

router.route("/").get((req, res) => {
  res.status(200).send("<h1>Happening API</h1>");
});

router.route("/events").get((req, res) => {
  Event.find({}).then((data) => {
    res.status(200).send({ events: data });
  });
});

router.route("/events/new").post((req, res) => {
  res.status(200).send("MAKE NEW EVENT");
});

router
  .route("/events/:eid/rsvp")
  .post((req, res) => {
    const { email } = req.body;
    const eid = req.params.eid;
    
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          // Create user entry
          const newUser = {
            email,
            rsvp: [eid],
          };
          User.create(newUser).save()
            .then((user) => {
              res.status(204).send();
            });
          return;
        } 

        const newRsvp = user.rsvp.includes(eid) ? user.rsvp : [eid, ...user.rsvp];
        User.findByIdAndUpdate(user._id, {rsvp: newRsvp})
          .then(data => {
            res.status(204).send();
            return;
          });

      });
  })
  .delete((req, res) => {
    res.status(200).send("CANCEL RSVP TO EVENT");
  });

router.route("/user/:uid/rsvp").get((req, res) => {
  res.status(200).send(`RSVP events for ${req.params.uid}`);
});

module.exports = router;
