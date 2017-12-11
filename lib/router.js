this.currentID = function(){
	return last(split('/', Router.current().originalUrl));
};
Router.configure({
	templateNameConverter: 'upperCamelCase',
	routeControllerNameConverter: 'upperCamelCase',
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});
Router.route('/(.*)', {
	where: 'server'
}).get(function(){
	if (this.params[0] === '') {
		this.response.writeHead(301, {
			'Location': '/main/1'
		});
		this.response.end();
	}
	if (this.params[0] === 'main') {
		this.response.writeHead(301, {
			'Location': '/main/1'
		});
		return this.response.end();
	} else {
		return this.next();
	}
});
