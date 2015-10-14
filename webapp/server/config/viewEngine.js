import path from 'path';
import hbs from 'express-hbs';

hbs.registerHelper('ifEither', (boolValue1, boolValue2, options) => {
  if(boolValue1 || boolValue2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('commaSeparated', (array) => {
	 return new hbs.SafeString(array.join(', '));
});

hbs.registerHelper('pageTitle', title => {

	let subPage = title ? ' - ' + title : '';
	return `Fast Track Refugees${subPage}`;

});

module.exports = app => {

	let viewsFolder = path.join(__dirname, '../views');

	app.engine('hbs', hbs.express4({
	  partialsDir: path.join(viewsFolder, 'partials'),
	  layoutsDir: path.join(viewsFolder, 'layouts')
	}));
	app.set('view engine', 'hbs');
	app.set('views', viewsFolder);

}