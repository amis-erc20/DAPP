var createQuartet, createQuartetPage, rerender, this$ = this;
Router.route('funded', {
	path: '/funded/:page'
});
template('funded', function(){
	return main_blaze(notFoundComponent('Not found', 'No funded Loan Requests found'), D('card-wrapper', progressBar(), D("card-wrapper-aligned " + state.get('quartet-funded-class'), D('div', map(cardTemplate, state.get('quartet-funded') || [])), linkPanel('funded'))));
});
createQuartet = function(start, cb){
	var out, loadOneCard, Undef, cycle;
	out = [];
	loadOneCard = function(it){
		return ledger.getLrFunded(start - it, function(err, id){
			var this$ = this;
			if (id === bigZero) {
				return out[it] = null;
			} else {
				return getAllLrData(id)(function(err, lr){
					lr.id = id;
					return out[it] = lr;
				});
			}
		});
	};
	map(loadOneCard, [0, 1, 2, 3]);
	Undef = false;
	cycle = function(){
		if (typeof out[0] === 'undefined') {
			return Meteor.setTimeout(function(){
				return cycle();
			}, 10);
		}
		if (typeof out[1] === 'undefined') {
			return Meteor.setTimeout(function(){
				return cycle();
			}, 10);
		}
		if (typeof out[2] === 'undefined') {
			return Meteor.setTimeout(function(){
				return cycle();
			}, 10);
		}
		if (typeof out[3] === 'undefined') {
			return Meteor.setTimeout(function(){
				return cycle();
			}, 10);
		} else {
			return cb(null, compact(out));
		}
	};
	return cycle();
};
this.gotoPagefunded = function(){
	state.set('page', arguments[0]);
	if (+state.get('page') < 1) {
		event.preventDefault;
		return;
	}
	state.set('percent', 0);
	state.set('quartet-funded-class', 'hidden');
	state.set('progress-class', '');
	Router.go("/" + arguments[1] + "/" + state.get('page'));
	return rerender();
};
createQuartetPage = function(start){
	state.set('percent', 0);
	return createQuartet(start, function(err, res){
		state.set('quartet-funded-class', '');
		state.set('progress-class', 'hidden');
		console.log('res:', res);
		if (res.length === 0 || isNaN(+state.get('page'))) {
			state.set('not-found-class', '');
			return state.set('quartet-funded-class', 'hidden');
		} else {
			return state.set('quartet-funded', res);
		}
	});
};
Template.funded.rendered = function(){};
Template.funded.created = function(){
	state.set('quartet-funded', '');
	state.set('page', last(
		split('/')(
			Router.current().originalUrl)));
	if (isNaN(+state.get('page'))) {
		state.set('not-found-class', '');
		state.set('progress-class', 'hidden');
		return state.set('quartet-funded-class', 'hidden');
	} else {
		state.set('not-found-class', 'hidden');
		state.set('selected-class', 'funded');
		state.set('quartet-funded-class', 'hidden');
		state.set('progress-class', '');
		if (state.get('percent') === 0 || !state.get('percent')) {
			state.set('percent', 0);
		}
		return rerender();
	}
};
rerender = function(){
	return ledger.getLrFundedCount(function(){
		var totalReqs;
		if (arguments[0]) {
			return arguments[0];
		}
		totalReqs = arguments[1].c[0];
		state.set('totalReqs', totalReqs);
		return createQuartetPage(totalReqs - state.get('page') * 4 + 3);
	});
};
Template.funded.events({
	'click .chevron-right': function(){
		state.set('quartet-funded-class', 'hidden');
		state.set('progress-class', '');
		state.set('percent', 0);
		state.set('page', ceiling(state.get('totalReqs') / 4));
		Router.go("/funded/" + state.get('page'));
		return rerender();
	},
	'click .chevron-left': function(){
		if (+state.get('page') < 2) {
			event.preventDefault;
			return;
		}
		state.set('percent', 0);
		state.set('quartet-funded-class', 'hidden');
		state.set('progress-class', '');
		state.set('page', 1);
		Router.go("/funded/" + state.get('page'));
		return rerender();
	}
});
