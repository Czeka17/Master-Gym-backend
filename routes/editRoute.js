const express = require("express");
const editControllers = require('../controllers/edit-controllers')
const { check } = require("express-validator");
const router = express.Router();

router.post("/",[check("title").not().isEmpty(),check("intro").not().isEmpty(),check("description").not().isEmpty()], editControllers.createPost)


router.delete("/:pid", editControllers.deletePost)

router.patch("/:pid",[check("title").not().isEmpty(),check("intro").not().isEmpty(),check("description").not().isEmpty()], editControllers.updatePost)

module.exports = router;