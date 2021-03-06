const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Enable to append to server.log');
		}
	});
	next();
});

// Uncomment this section to quit the maintenance page
app.use((req, res, next) => {
	res.render('maintenance.hbs', {

	});
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('Hello Express');
	// 
	// res.send({
	// 	name: 'Vladimir',
	// 	lastname: 'Velasquez',
	// 	likes: [
	// 		'Biking',
	// 		'Cities'
	// 	]
	// });
	res.render('home.hbs', {
		pageTitle: 'Home Page' ,
		greetMessage: 'hola'
	});
});

app.get('/projects',(req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects'
	});
});

app.get('/about',(req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});