const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Group, User } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/groups
//    POST   /api/groups
//    GET    /api/groups/:id
//    PUT    /api/groups/:id
//    DELETE /api/groups/:id
//
// More routes:
//    POST   /api/groups/:id/join/:userId
//    Lets a certain user join a certain group (adds row to GroupMembership table)
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /classes comes from the file ./groups.js

router.get("/", (req, res) => {
  Group.findAll({}).then((allGroups) => res.json(allGroups));
});

router.post("/", passport.isAuthenticated(), (req, res) => {
  Group.create({ groupName: req.body.groupName, ClassId: req.body.ClassId })
    .then((newGroup) => {
      res.status(201).json(newGroup);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/:id/join/:userId", passport.isAuthenticated(), async (req, res) => {
  const { id, userId } = req.params;
  const groupWithId = await Group.findByPk(id);
  if (!groupWithId) {
    return res.sendStatus(404);
  }
  const userWithId = await User.findByPk(userId);
  if (!userWithId) {
    return res.sendStatus(404);
  }

  groupWithId.addUser(userWithId)
  .then((membershipInfo) => {
    res.status(201).json(membershipInfo);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Group.findByPk(id).then((group) => {
    if (!group) {
      return res.sendStatus(404);
    }

    res.json(group);
  });
});

router.put("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Group.findByPk(id).then((group) => {
    if (!group) {
      return res.sendStatus(404);
    }

    group.groupName = req.body.groupName;
    group
      .save()
      .then((updatedGroup) => {
        res.json(updatedGroup);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Group.findByPk(id).then((group) => {
    if (!group) {
      return res.sendStatus(404);
    }

    group.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;