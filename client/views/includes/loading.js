template('loading', function(){
	return main_blaze(div({
		style: 'padding:100px',
		'class': 'container'
	}, h1({
		style: 'font-size:50px; display:block'
	}, 'Loading'), p({
		style: 'font-size:20px; padding-top:15px;padding-bottom:15px'
	}, 'Please, wait...')));
});