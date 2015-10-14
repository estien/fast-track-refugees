import path from 'path';
import _ from 'lodash';

module.exports = (req, res, next) => {

	const defaultLocals = {
		packageVersion : require('../../../package.json').version
	};

	res.view = (view, locals) => {

		var viewPath = view.indexOf('/') === -1
			? path.join(view, 'index')
			: view;

		res.render(viewPath, _.assign(defaultLocals, locals));

	};

	next();

}