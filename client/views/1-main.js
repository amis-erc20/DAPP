var createQuartet, createQuartetPage, rerender, getPremium, this$ = this, slice$ = [].slice;
Router.route('mainTemplate', {
	path: '/main/:page'
});
template('mainTemplate', function(){
	return main_blaze(notFoundComponent('Not found', 'No Loan Requests found'), D('card-wrapper', progressBar(), D("card-und-nav " + state.get('quartet-class'), D("card-wrapper-aligned", D('div', map(cardTemplate, state.get('quartet') || []))), linkPanel('main'))));
});
this.cardClass = function(it){
	if (it != null && it.isEns) {
		return 'ens';
	}
	if (it != null && it.isRep) {
		return 'rep';
	}
	if (!it.isEns && !it.isRep) {
		return 'tokens';
	}
};
this.cardTemplate = function(it){
	var ref$, ref1$, ref2$, ref3$, ref4$, ref5$, ref6$, ref7$, ref8$, ref9$, ref10$;
	return a({
		'class': "card " + cardClass(it),
		href: "/loan-request/" + (it != null ? it.id : void 8)
	}, div({
		'class': "card-header " + cardClass(it)
	}, it.State > 0
		? div({
			'class': 'div'
		}, h3({
			'class': 'card-header-amount'
		}, bigNumToStr(it.WantedWei) + " Eth"), !it.isEns && !it.isRep ? bigNumToStr(it.WantedWei).length < 10 ? ((ref$ = bigNumToStr(it != null ? it.TokenAmount : void 8)) != null ? ref$.length : void 8) + (it != null ? (ref1$ = it.TokenName) != null ? ref1$.length : void 8 : void 8) < 20
			? h3({
				'class': 'card-header-inscription token-am'
			}, (it != null ? it.TokenName : void 8) + " (" + (it != null ? it.TokenAmount : void 8) + ")")
			: h3({
				'class': 'card-header-inscription token-am'
			}, (it != null ? it.TokenName : void 8) + "") : void 8 : void 8, it.isEns ? h3({
			'class': 'card-header-inscription token-am'
		}, 'ENS domain') : void 8)
		: ((ref2$ = it.Borrower) != null ? ref2$.toUpperCase() : void 8) === (typeof web3 != 'undefined' && web3 !== null ? (ref3$ = web3.eth) != null ? (ref4$ = ref3$.defaultAccount) != null ? ref4$.toUpperCase() : void 8 : void 8 : void 8)
			? h3({
				'class': 'card-header-amount'
			}, "Please, set the data")
			: h3({
				'class': 'card-header-amount'
			}, "Data must be set by the Borrower")), div({
		'class': 'card-body'
	}, ((ref5$ = web3.eth.defaultAccount) != null ? ref5$.toUpperCase() : void 8) === ((ref6$ = it.Borrower) != null ? ref6$.toUpperCase() : void 8) ? img({
		'class': 'img-dot',
		src: '/img/red_dot.svg',
		alt: ''
	}) : void 8, h4({
		'class': 'card-key'
	}, "Borrower"), p({
		'class': "card-value " + cardClass(it)
	}, it.Borrower), (it != null ? it.State : void 8) !== 3 ? D('div-lender', ((ref7$ = web3.eth.defaultAccount) != null ? ref7$.toUpperCase() : void 8) === ((ref8$ = it.Lender) != null ? ref8$.toUpperCase() : void 8) ? img({
		'class': 'img-dot',
		src: '/img/red_dot.svg',
		alt: ''
	}) : void 8, h4({
		'class': 'card-key font-weight-normal'
	}, "Lender"), p({
		'class': "card-value " + cardClass(it)
	}, it.Lender !== bigZero ? it.Lender : '–––')) : void 8, (it != null ? it.State : void 8) === 3 && ((ref9$ = it.Borrower) != null ? ref9$.toUpperCase() : void 8) !== ((ref10$ = web3.eth.defaultAccount) != null ? ref10$.toUpperCase() : void 8) ? h4({
		'class': "card-key-inscription",
		style: 'color:black'
	}, "Get " + getPremium(it.PremiumWei) + "Premium!") : void 8, div({
		'class': 'card-state float-left'
	}, h4({
		'class': 'card-key font-weight-normal'
	}, "State"), p({
		'class': "card-value " + cardClass(it)
	}, stateIntToStr(it != null ? it.State : void 8, it != null && it.isEns ? 'domain' : 'tokens')))));
};
this.emptyList = function(){
	return div({
		style: 'padding:100px',
		'class': 'container'
	}, h1({
		style: 'font-size:50px; display:block'
	}, 'No loan requests'), p({
		style: 'font-size:20px; padding-top:15px;padding-bottom:15px'
	}, 'That is no loan requests here.'));
};
this.getCardData = function(number, cb){
	return ledger.getLr(number, function(){
		return getAllLrData(arguments[1])(cb);
	});
};
this.progressBar = function(percent){
	return div({
		style: 'padding:100px; padding-right:120px',
		'class': state.get('progress-class') + " container"
	}, h1({
		style: 'font-size:50px; display:block'
	}, 'Receiving data...'), p({
		style: 'font-size:20px; padding-top:15px;padding-bottom:15px'
	}, 'Please wait for the data to be downloaded from Ethereum network...'));
};
createQuartet = function(start, cb){
	var out, loadOneCard, Undef, cycle;
	out = [];
	loadOneCard = function(it){
		return ledger.getLr(start - it, function(err, id){
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
createQuartetPage = function(start){
	state.set('percent', 0);
	return createQuartet(start, function(err, res){
		state.set('quartet-class', '');
		state.set('progress-class', 'hidden');
		console.log('res:', res);
		if (res.length === 0) {
			state.set('not-found-class', '');
			return state.set('quartet-class', 'hidden');
		} else {
			return state.set('quartet', res);
		}
	});
};
Template.mainTemplate.rendered = function(){};
Template.mainTemplate.created = function(){
	state.set('quartet', '');
	state.set('page', last(
		split('/')(
			Router.current().originalUrl)));
	if (isNaN(+state.get('page'))) {
		state.set('not-found-class', '');
		state.set('progress-class', 'hidden');
		return state.set('quartet-class', 'hidden');
	} else {
		state.set('not-found-class', 'hidden');
		state.set('selected-class', 'main');
		state.set('quartet-class', 'hidden');
		state.set('progress-class', '');
		if (state.get('percent') === 0 || !state.get('percent')) {
			state.set('percent', 0);
		}
		return rerender();
	}
};
rerender = function(){
	return ledger.getLrCount(function(){
		var totalReqs;
		if (arguments[0]) {
			return arguments[0];
		}
		totalReqs = +lilNumToStr(arguments[1]);
		state.set('totalReqs', totalReqs);
		console.log('quartet-page:', totalReqs - state.get('page') * 4);
		return createQuartetPage(totalReqs - state.get('page') * 4 + 3);
	});
};
Template.mainTemplate.events({
	'click .chevron-right': function(){
		state.set('quartet-class', 'hidden');
		state.set('progress-class', '');
		state.set('percent', 0);
		state.set('page', ceiling(state.get('totalReqs') / 4));
		Router.go("/main/" + state.get('page'));
		return rerender();
	},
	'click .chevron-left': function(){
		if (+state.get('page') < 2) {
			event.preventDefault;
			return;
		}
		state.set('percent', 0);
		state.set('quartet-class', 'hidden');
		state.set('progress-class', '');
		state.set('page', 1);
		Router.go("/main/" + state.get('page'));
		return rerender();
	}
});
getPremium = function(it){
	if (bigNumToStr(it).length > 7) {
		return 'the ';
	} else {
		return "+ " + bigNumToStr(it) + " ETH ";
	}
};
this.gotoPagemain = function(){
	state.set('page', arguments[0]);
	if (+state.get('page') < 1) {
		event.preventDefault;
		return;
	}
	state.set('percent', 0);
	state.set('quartet-class', 'hidden');
	state.set('progress-class', '');
	Router.go("/" + arguments[1] + "/" + state.get('page'));
	return rerender();
};
this.linkPanel = function(type){
	var currentPage, leftChevron, rightChevron, count, pages, linkArr, res$, i$, ridx$, to$, getLink;
	currentPage = +addressLast();
	leftChevron = a({
		'class': "chevron-left arrows " + (state.get('page') == '1' ? 'disabled' : void 8)
	}, '‹‹');
	rightChevron = a({
		'class': "chevron-right arrows " + (state.get('page') == ceiling(state.get('totalReqs') / 4) ? 'disabled' : void 8)
	}, '››');
	count = state.get('totalReqs');
	console.log('totalReqs', state.get('totalReqs'));
	if (count < 0) {
		return null;
	}
	pages = ceiling(count / 4);
	linkArr = [];
	if (pages <= 9) {
		res$ = [];
		for (i$ = 1; i$ <= pages; ++i$) {
			ridx$ = i$;
			res$.push(ridx$);
		}
		linkArr = res$;
		leftChevron = '';
		rightChevron = '';
	}
	if (pages > 9 && currentPage <= 5) {
		linkArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	}
	if (pages > 9 && currentPage > 5 && pages > currentPage + 4) {
		res$ = [];
		for (i$ = currentPage - 4, to$ = currentPage + 4; i$ <= to$; ++i$) {
			ridx$ = i$;
			res$.push(ridx$);
		}
		linkArr = res$;
	}
	if (pages > 9 && currentPage > 5 && pages <= currentPage + 4) {
		res$ = [];
		for (i$ = pages - 8; i$ <= pages; ++i$) {
			ridx$ = i$;
			res$.push(ridx$);
		}
		linkArr = res$;
	}
	getLink = function(text, type){
		return a({
			'class': "pagination-item " + (addressLast() == text ? 'active' : void 8),
			onclick: "gotoPage" + type + "(" + text + ",'" + type + "')"
		}, text);
	};
	console.log('count:', count);
	console.log('pages:', pages);
	return div({
		'class': 'pagination menu'
	}, leftChevron, map(partialize$.apply(this, [getLink, [void 8, type], [0]]), linkArr), rightChevron);
};
function partialize$(f, args, where){
	var context = this;
	return function(){
		var params = slice$.call(arguments), i,
			len = params.length, wlen = where.length,
			ta = args ? args.concat() : [], tw = where ? where.concat() : [];
		for(i = 0; i < len; ++i) { ta[tw[0]] = params[i]; tw.shift(); }
		return len < wlen && len ?
			partialize$.apply(context, [f, ta, tw]) : f.apply(context, ta);
	};
}
