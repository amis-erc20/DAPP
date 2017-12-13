this.template = function(name, func){
	return Template[name] = new Template("Template" + name, func);
};
this.SB = function(it){
	return Spacebars.call(it);
};
this.SM = function(it){
	return Spacebars.mustache(it);
};
this.SI = function(it){
	return Spacebars.include(it);
};
this.SL = function(that, me){
	return Spacebars.call(that.lookup(me));
};
this.state = new ReactiveDict;
this.checkState = function(it){
	if (!state.get(it.v)) {
		return state.set(it.v, it.init);
	}
};
