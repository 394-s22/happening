require("dotenv").config();
const express = require("express");
const router = express.Router();

const Event = require("./schema/Event.js");
const User = require("./schema/User.js");

// Define all API routes

router.route("/")
  .get((req, res) => {
    res.status(200).send("<h1>Happening API</h1>");
  });

router.route("/events")
  .get((req, res) => {
    Event.find({}).then((data) => {
      res.status(200).send({ events: data });
    });
  });

router.route("/events/new")
  .post((req, res) => {
    res.status(200).send("MAKE NEW EVENT");
  });

router.route("/events/:eid/rsvp/:uid")
  .post(async (req, res) => {
    const { eid, uid } = req.params;

    const event = await Event.findById(eid);
    const user = await User.findById(uid);

    if (!event) {
      res.status(404).send({ message: `Event with id '${eid}' does not exist`});
      return;
    }

    if (!user) {
      res.status(404).send({ message: `User with id '${uid}' does not exist`});
      return;
    }

    
    if (!user.rsvp.includes(eid)) {
      User.findByIdAndUpdate(uid, { rsvp: [eid, ...user.rsvp] });
    }

    if (!event.rsvp.includes(uid)) {
      User.findByIdAndUpdate(eid, { rsvp: [uid, ...event.rsvp] });
    }

    res.status(204).send();
    return;
  })
  .delete((req, res) => {
    res.status(200).send("CANCEL RSVP TO EVENT");
  });

router.route("/user/:uid/rsvp")
  .get((req, res) => {
    User.findById(req.params.uid).then((user) => {
      Event.find({ _id: { $in: user.rsvp } }).then((data) => {
        res.status(200).send({ rsvp: data });
      });
    });
  });

router.route("/user/login")
  .post((req, res) => {
    console.log(req.body);
    const { email } = req.body;
    User.findOne({ email }).then((user) => {
      if (user) {
        res.status(200).send({ user });
        return;
      }
      // Create user entry
      const newUser = {
        email,
        rsvp: [],
      };
      User.create(newUser)
        .save()
        .then((user) => {
          res.status(200).send({ user });
        });
    });
  });

module.exports = router;
