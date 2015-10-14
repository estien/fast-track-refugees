
import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import viewLocals from './middlewares/viewLocals';
import environment from './environment';

module.exports = app => {

	app.set('trust proxy', 1);
	app.disable('x-powered-by');
	app.use(cookieParser());
	app.use(express.static('public'));
	app.use(viewLocals);

}
