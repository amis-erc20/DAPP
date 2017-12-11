this.notFoundComponent = function(){
	return div({
		'class': state.get('not-found-class') + " container",
		style: 'padding:100px'
	}, h1({
		style: 'font-size:50px; display:block'
	}, arguments[0]), p({
		style: 'font-size:20px; padding-top:15px;padding-bottom:15px'
	}, arguments[1]));
};