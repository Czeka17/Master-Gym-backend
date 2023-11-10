const express = require("express");
const blogControllers = require('../controllers/blog-controllers')
const router = express.Router();

router.get("/", blogControllers.getPosts)

router.get("/:pid", blogControllers.getPostById)

module.exports = router;