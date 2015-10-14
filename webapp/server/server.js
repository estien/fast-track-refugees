import express from 'express';
import path from 'path';
import routes from './config/routes';
import middlewares from './config/middlewares';
import viewEngine from './config/viewEngine';

module.exports = () => {

	var app = express();

	viewEngine(app);
	middlewares(app);
	app.use(routes);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		res.status(404).render('404');
	});

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}

	var server = app.listen(3000, function () {
	  console.log('Running on port 3000');
	});

};