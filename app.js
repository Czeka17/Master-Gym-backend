const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
const express = require('express')
const blogRoute = require("./routes/blogRoute")
const editRoute = require("./routes/editRoute")
const HttpError = require("./models/http-error");
const mongoose = require('mongoose')
const app = express();

app.use(bodyParser.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req,res,next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requsted-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE")
	next()
})

app.use("/api/blog",blogRoute);

app.use("/api/edit",editRoute);

app.use((req, res, next) => {
	const error = new HttpError("Could not find this route.", 404);
	throw error;
});

app.use((error, req, res, next) => {
	if(req.file){
		fs.unlink(req.file.path, (err) => {
			console.log(err)
		})
	}
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500)
	res.json({ message: error.message || "An unknown error occured!" });
});
mongoose
  .connect('mongodb+srv://jczekanski123:t4hMR0lqpFZ7I4pK@dejv.p9bjtsg.mongodb.net/')
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err)
  });



