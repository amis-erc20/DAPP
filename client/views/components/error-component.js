this.errorComponent = function(){
	return h1({
		'class': state.get('error-class') + ""
	}, 'Wrong address');
};