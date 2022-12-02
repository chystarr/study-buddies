const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { School } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/schools
//    POST   /api/schools
//    GET    /api/schools/:id
//    PUT    /api/schools/:id
//    DELETE /api/schools/:id
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /schools comes from the file ./schools.js

router.get("/", (req, res) => {
  School.findAll({}).then((allSchools) => res.json(allSchools));
});

router.post("/", passport.isAuthenticated(), (req, res) => {
  School.create({ schoolName: req.body.schoolName })
    .then((newSchool) => {
      res.status(201).json(newSchool);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  School.findByPk(id).then((school) => {
    if (!school) {
      return res.sendStatus(404);
    }

    res.json(school);
  });
});

router.put("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  School.findByPk(id).then((school) => {
    if (!school) {
      return res.sendStatus(404);
    }

    school.schoolName = req.body.schoolName;
    school
      .save()
      .then((updatedSchool) => {
        res.json(updatedSchool);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  School.findByPk(id).then((school) => {
    if (!school) {
      return res.sendStatus(404);
    }

    school.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;