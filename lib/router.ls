@currentID=-> last split \/, Router.current!originalUrl

Router.configure do
	templateNameConverter: \upperCamelCase
	routeControllerNameConverter: \upperCamelCase
	layoutTemplate:   \layout
	loadingTemplate:  \loading 
	notFoundTemplate: \notFound

# Router.route \start, path: \/

Router.route('/(.*)', where: 'server').get( ->
	if  @params[0] == ''
		@response.writeHead 301, {'Location': '/main'}
		@response.end!
	else @next!
		)

	
