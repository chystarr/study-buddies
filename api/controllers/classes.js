const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Class } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/classes
//    POST   /api/classes
//    GET    /api/classes/:id
//    PUT    /api/classes/:id
//    DELETE /api/classes/:id
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /classes comes from the file ./classes.js

router.get("/", (req, res) => {
  Class.findAll({}).then((allClasses) => res.json(allClasses));
});

router.post("/", passport.isAuthenticated(), (req, res) => {
  Class.create({ className: req.body.className, subjectName: req.body.subjectName, schoolName: req.body.schoolName })
    .then((newClass) => {
      res.status(201).json(newClass);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Class.findByPk(id).then((classWithId) => {
    if (!classWithId) {
      return res.sendStatus(404);
    }

    res.json(classWithId);
  });
});

router.put("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Class.findByPk(id).then((classWithId) => {
    if (!classWithId) {
      return res.sendStatus(404);
    }

    classWithId.className = req.body.className;
    classWithId.subjectName = req.body.subjectName;
    classWithId.schoolName = req.body.schoolName;
    classWithId
      .save()
      .then((updatedClass) => {
        res.json(updatedClass);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Class.findByPk(id).then((classWithId) => {
    if (!classWithId) {
      return res.sendStatus(404);
    }

    classWithId.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;