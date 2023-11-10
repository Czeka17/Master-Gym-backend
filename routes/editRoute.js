const express = require("express");
const editControllers = require('../controllers/edit-controllers')
const { check } = require("express-validator");
const fileUpload = require('../middleware/file-upload')
const router = express.Router();

router.post("/",fileUpload.single('image'),[check("title").not().isEmpty(),check("intro").not().isEmpty(),check("description").not().isEmpty()], editControllers.createPost)


router.delete("/:pid", editControllers.deletePost)

router.patch("/:pid",[check("title").not().isEmpty(),check("intro").not().isEmpty(),check("description").not().isEmpty()], editControllers.updatePost)

module.exports = router;