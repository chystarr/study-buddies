const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Class, User } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/classes
//    POST   /api/classes
//    GET    /api/classes/:id
//    PUT    /api/classes/:id
//    DELETE /api/classes/:id
//
// More routes:
//    POST   /api/classes/:id/enroll/:userId
//    Enrolls a certain user in a certain class (adds row to ClassEnrollment table)
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /classes comes from the file ./classes.js

router.get("/", (req, res) => {
  Class.findAll({}).then((allClasses) => res.json(allClasses));
});

router.post("/", passport.isAuthenticated(), (req, res) => {
  Class.create({ className: req.body.className, SubjectId: req.body.SubjectId, SchoolId: req.body.SchoolId })
    .then((newClass) => {
      res.status(201).json(newClass);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/:id/enroll/:userId", passport.isAuthenticated(), async (req, res) => {
  const { id, userId } = req.params;
  const classWithId = await Class.findByPk(id);
  if (!classWithId) {
    return res.sendStatus(404);
  }
  const userWithId = await User.findByPk(userId);
  if (!userWithId) {
    return res.sendStatus(404);
  }
  //await classWithId.addUser(userWithId);
  //res.status(201);
  //classWithId.addUser(userWithId).then(res.status(201));
  classWithId.addUser(userWithId)
  .then((enrollment) => {
    res.status(201).json(enrollment);
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