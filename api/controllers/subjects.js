const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Subject } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/subjects
//    POST   /api/subjects
//    GET    /api/subjects/:id
//    PUT    /api/subjects/:id
//    DELETE /api/subjects/:id
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /subjects comes from the file ./subjects.js

router.get("/", (req, res) => {
  Subject.findAll({}).then((allSubjects) => res.json(allSubjects));
});

router.post("/", passport.isAuthenticated(), (req, res) => {
  Subject.create({ subjectName: req.body.subjectName })
    .then((newSubject) => {
      res.status(201).json(newSubject);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Subject.findByPk(id).then((subject) => {
    if (!subject) {
      return res.sendStatus(404);
    }

    res.json(subject);
  });
});

router.put("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Subject.findByPk(id).then((subject) => {
    if (!subject) {
      return res.sendStatus(404);
    }

    subject.subjectName = req.body.subjectName;
    subject
      .save()
      .then((updatedSubject) => {
        res.json(updatedSubject);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Subject.findByPk(id).then((subject) => {
    if (!subject) {
      return res.sendStatus(404);
    }

    subject.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;