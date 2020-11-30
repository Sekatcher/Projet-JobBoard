module.exports = function(app, passport) {

	var express = require("express");
	var router = express.Router();
	require('./api.route.js')(app);
	require('./login.route.js')(app, passport); // load our routes and pass in our app and fully configured passport

	
	

	var path = __basedir + '/views/';

	app.get('/', (req,res) => {
		res.render(path + "index.ejs", { 
			user: req.user
		});
	});

	app.get('/form', (req,res) => {
		res.render(path + "form.ejs", { 
			user: req.user
		});
	});
	
	app.get('/admin', (req,res) => {
		if(req.user){
			if(req.user.admin == 1){
				res.render(path + "admin.ejs");
			}
		}
		res.redirect('/');
	});

	app.use("/",router);
 
	app.use("*", (req,res) => {
		res.render(path + "404.ejs");
	});
}