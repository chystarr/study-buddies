const express = require("express");
const router = express.Router();

// Load each controller
const microPostsController = require("./microPosts.js");
const authController = require("./auth.js");
const classesController = require("./classes.js");
const subjectsController = require("./subjects.js");
const schoolsController = require("./schools.js");

const groupsController = require("./groups.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/auth", authController);
router.use("/micro_posts", microPostsController);
router.use("/classes", classesController);
router.use("/groups", groupsController);
router.use("/subjects", subjectsController);
router.use("/schools", schoolsController);

module.exports = router;