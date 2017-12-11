var grnPin, redPin, redDot, inputBox, blockScheme, Everything_is_ok, checkSetDataOut, setDataCb, inputFieldsColumn, inputUnit, this$ = this;
Router.route('loan_request', {
	path: '/loan-request/:id',
	template: 'loan_request'
});
template('loan_request', function(){
	return main_blaze(errorComponent(), loadingComponent(), D("loan-wrapper " + state.get('loan-wrapper-class'), D('input-wrapper', a({
		target: '__blank',
		'class': 'loan-title',
		href: "https://etherscan.io/address/" + state.get('address')
	}, "Loan Request  " + state.get('address')), inputBox()), blockScheme()));
});
grnPin = function(){
	return img({
		'class': "hidden input-img-pin gpin",
		src: '/img/green_pin.svg',
		alt: ''
	});
};
redPin = function(){
	return img({
		'class': "hidden input-img-pin rpin",
		src: '/img/red_pin.svg',
		alt: ''
	});
};
redDot = function(it){
	return img({
		'class': state.get(it + '-rdot') + " input-img-dot",
		src: '/img/red_dot.svg',
		alt: ''
	});
};
inputBox = function(){
	var ref$;
	return div({
		'class': 'input-box'
	}, inputFieldsColumn(), div({
		'class': 'text-aligned'
	}, state.get('lr-State') === 0 && state.get('IamBorrower') ? D('text-s', D("loan-prebutton-text", "Please, enter the data"), button({
		'class': 'card-button bgc-primary loan-button set-data'
	}, 'Set data')) : void 8, state.get('lr-State') === 0 && !state.get('IamBorrower') ? D('text-s', D("loan-prebutton-text", "Borrower should set the data"), button({
		'class': 'card-button bgc-primary loan-button set-data',
		disabled: true
	}, 'Set data')) : void 8, state.get('lr-State') === 1 && state.get('IamBorrower') ? D('text-s', D("loan-prebutton-text", "Please, transfer " + ensQ(state.get('lr').TokenAmount + ' tokens', 'domain') + "  to this Loan Request address - " + state.get('address') + " and click on the button"), button({
		'class': 'card-button bgc-primary loan-button transfer-tokens'
	}, "Check that " + ensQ('tokens are', 'domain is') + " transferred")) : void 8, state.get('lr-State') === 1 && !state.get('IamBorrower') ? D('text-s', D("loan-prebutton-text", "Borrower should transfer " + ensQ(state.get('lr').TokenAmount + ' tokens', 'domain') + " to this Loan Request address - " + state.get('address')), button({
		'class': 'card-button bgc-primary loan-button transfer-tokens',
		disabled: true
	}, "Check that " + ensQ('tokens', 'domain') + " are transferred")) : void 8, state.get('lr-State') === 3 && !state.get('IamBorrower') ? D('text-s', D("loan-prebutton-text", 'Fund this Loan Request and get Premium'), button({
		'class': 'card-button bgc-primary loan-button lender-pay',
		style: 'width:200px; margin-left:-15px'
	}, "Fund this Loan Request")) : void 8, state.get('lr-State') === 3 && state.get('IamBorrower') ? D('text-s', D("loan-prebutton-text", "Please wait while someone lend your Loan Request. You can cancel this loan request."), button({
		'class': 'card-button bgc-primary loan-button borrower-cancel',
		style: 'width:200px; margin-left:-15px'
	}, "Cancel")) : void 8, state.get('lr-State') === 4 && state.get('IamBorrower') ? D('text-s', D("loan-prebutton-text", "To return " + ensQ('tokens', 'domain', 'the loan') + " please send " + bigNumToStr(state.get('NeededSumByBorrower')) + " Eth to " + state.get('address') + ". This includes " + bigNumToStr(state.get('lr').PremiumWei) + " Eth premium amount", br(), "Borrower is rewarded with " + (+bigNumToStrDiv10((ref$ = state.get('lr')) != null ? ref$.WantedWei : void 8)) + " Credit Tokens (CRE) after the repayment."), button({
		'class': 'card-button bgc-primary loan-button return-tokens'
	}, "Return " + ensQ('tokens', 'domain', 'loan'))) : void 8, state.get('lr-State') === 4 && !state.get('IamBorrower') && !state.get('IamLender') ? D('text-s', D("loan-prebutton-text", "Borrower should now return " + bigNumToStr(state.get('NeededSumByBorrower')) + " Eth in order to get " + ensQ('tokens', 'domain', 'the loan') + " back"), button({
		'class': 'card-button bgc-primary loan-button return-tokens',
		disabled: true
	}, 'Return tokens')) : void 8, state.get('lr-State') === 4 && state.get('IamLender') ? D('text-s', D("loan-prebutton-text", "If time has passed but borrower hasn't returned the loan - you can " + ensQ('get his tokens', 'get his domain', 'burn his credit')), button({
		'class': 'card-button bgc-primary loan-button get-tokens'
	}, ensQ('Get tokens', 'Get domain', 'Burn borrowers CRE'))) : void 8));
};
blockScheme = function(){
	var ref$, ref1$, ref2$, ref3$;
	return D('block-scheme', D("block-scheme-element " + highlightQ(0), 'No data'), D('block-scheme-line', P('block-scheme-line-inscription', "Borrower", br(), 'sets data'), D('block-scheme-line-arrow')), !((ref$ = state.get('lr')) != null && ref$.isRep) ? D("block-scheme-element " + highlightQ(1), ensQ('Waiting for tokens', 'Waiting For domain')) : void 8, !((ref1$ = state.get('lr')) != null && ref1$.isRep) ? D('block-scheme-line', P('block-scheme-line-inscription', "Borrower transfers", br(), ensQ('tokens', 'domain')), D('block-scheme-line-arrow')) : void 8, D("block-scheme-element " + highlightQ(3), 'Waiting For Lender'), D('block-scheme-line', P('block-scheme-line-inscription', "Lender sends", br(), 'ETH'), D('block-scheme-line-arrow')), D("block-scheme-element " + highlightQ(4), 'Funded'), D('block-scheme-line block-scheme-line-long', p({
		'class': 'block-scheme-line-inscription'
	}, 'Borrower gets ', ensQ('his tokens back +', 'his domain back +', ''), br(), 'Credit Tokens (CRE)'), p({
		'class': 'block-scheme-line-inscription block-scheme-line-inscription-second'
	}, "Lender gets Eth amount"), D('block-scheme-line-arrow block-scheme-line-arrow-long')), D(highlightQ(6) + " block-scheme-element " + (state.get('lr-State') !== 6 ? 'block-scheme-element-success' : void 8), 'Finished'), div({
		'class': 'block-scheme-line block-scheme-line-long block-scheme-line-long-branch',
		style: ((ref2$ = state.get('lr')) != null && ref2$.isRep ? 'top:240px' : void 8) + ""
	}, P('block-scheme-line-inscription block-scheme-line-inscription-branch', ensQ('Lender gets tokens', 'Lender gets domain', 'Lender burns borrowers CRE (reputation)')), div({
		'class': 'block-scheme-line-arrow block-scheme-line-arrow-branch'
	})), div({
		'class': highlightQ(5) + " block-scheme-element block-scheme-element-branch " + (state.get('lr-State') !== 5 ? 'block-scheme-element-failure' : 'failure-highlighted'),
		style: ((ref3$ = state.get('lr')) != null && ref3$.isRep ? 'top:379px' : void 8) + ""
	}, 'Default'));
};
Template.loan_request.created = function(){
	state.set('selected-class', 'loan');
	map(stateNull, ['lr-WantedWei', 'lr-DaysToLen', 'lr-TokenAmount', 'lr-PremiumWei', 'lr-TokenName', 'lr-Borrower', 'lr-Lender', 'lr-TokenSmartcontractAddress', 'lr-TokenInfoLink', 'lr-isE']);
	state.set('address', last(
		split('/')(
			Router.current().originalUrl)));
	state.set('loan-wrapper-class', 'hidden');
	state.set('loading-class', '');
	state.set('error-class', EthQ(state.get('address')) ? 'hidden' : '');
	return lr.getNeededSumByLender(state.get('address'))(function(err, res){
		state.set('NeededSumByLender', res);
		return lr.getNeededSumByBorrower(state.get('address'))(function(err, res){
			state.set('NeededSumByBorrower', res);
			return ledger.getFeeSum(function(err, res){
				if (err) {
					return err;
				}
				state.set('fee-sum', res);
				return getAllLrData(state.get('address'))(function(){
					var ref$, ref1$, ref2$, ref3$, ref4$, ref5$;
					state.set('loan-wrapper-class', '');
					state.set('loading-class', 'hidden');
					arguments[1].isToken = !((ref$ = arguments[1]) != null && ref$.isEns) && !((ref1$ = arguments[1]) != null && ref1$.isRep);
					state.set('lr', arguments[1]);
					state.set('lr-Lender', (ref2$ = arguments[1]) != null ? ref2$.Lender : void 8);
					state.set('lr-Borrower', (ref3$ = arguments[1]) != null ? ref3$.Borrower : void 8);
					state.set('lr-State', (ref4$ = arguments[1]) != null ? ref4$.State : void 8);
					state.set('IamLender', web3.eth.defaultAccount.toUpperCase() === state.get('lr-Lender').toUpperCase());
					state.set('IamBorrower', web3.eth.defaultAccount.toUpperCase() === state.get('lr-Borrower').toUpperCase());
					return getRepBalance((ref5$ = state.get('lr')) != null ? ref5$.Borrower : void 8, function(err, res){
						$('.bor-balance').attr('value', +bigNumToStr(res));
						return state.set('bor-balance', bigNumToStr(res));
					});
				});
			});
		});
	});
};
Template.loan_request.rendered = function(){
	var ref$, ref1$, ref2$, ref3$, ref4$, ref5$, ref6$, ref7$, ref8$, ref9$, ref10$, ref11$, ref12$, ref13$, ref14$, ref15$, ref16$, ref17$;
	if (bigNumToStr((ref$ = state.get('lr')) != null ? ref$.WantedWei : void 8) !== '0') {
		$('.lr-WantedWei').attr('value', bigNumToStr((ref1$ = state.get('lr')) != null ? ref1$.WantedWei : void 8));
	}
	if (((ref2$ = state.get('lr')) != null ? ref2$.DaysToLen : void 8) !== 0) {
		$('.lr-DaysToLen').attr('value', (ref3$ = state.get('lr')) != null ? ref3$.DaysToLen : void 8);
	}
	if (((ref4$ = state.get('lr')) != null ? ref4$.TokenAmount : void 8) !== 0) {
		$('.lr-TokenAmount').attr('value', (ref5$ = state.get('lr')) != null ? ref5$.TokenAmount : void 8);
	}
	if (bigNumToStr((ref6$ = state.get('lr')) != null ? ref6$.PremiumWei : void 8) !== '0') {
		$('.lr-PremiumWei').attr('value', bigNumToStr((ref7$ = state.get('lr')) != null ? ref7$.PremiumWei : void 8));
	}
	if (((ref8$ = state.get('lr')) != null ? ref8$.Borrower : void 8) !== bigZero) {
		$('.lr-Borrower').attr('value', (ref9$ = state.get('lr')) != null ? ref9$.Borrower : void 8);
	}
	if (((ref10$ = state.get('lr')) != null ? ref10$.Lender : void 8) !== bigZero) {
		$('.lr-Lender').attr('value', (ref11$ = state.get('lr')) != null ? ref11$.Lender : void 8);
	}
	if (((ref12$ = state.get('lr')) != null ? ref12$.TokenSmartcontractAddress : void 8) !== bigZero) {
		$('.lr-TokenSmartcontractAddress').attr('value', (ref13$ = state.get('lr')) != null ? ref13$.TokenSmartcontractAddress : void 8);
	}
	if (((ref14$ = state.get('lr')) != null ? ref14$.EnsDomainHash : void 8) !== shaZero) {
		$('.lr-ensDomain').attr('value', (ref15$ = state.get('lr')) != null ? ref15$.EnsDomainHash : void 8);
	}
	$('.lr-TokenName').attr('value', (ref16$ = state.get('lr')) != null ? ref16$.TokenName : void 8);
	return $('.lr-TokenInfoLink').attr('value', (ref17$ = state.get('lr')) != null ? ref17$.TokenInfoLink : void 8);
};
Template.loan_request.events({
	'click .set-data': function(){
		var out;
		out = {};
		out.ethamount = ethToWei($('.lr-WantedWei').val());
		out.days = $('.lr-DaysToLen').val();
		out.premium = ethToWei($('.lr-PremiumWei').val());
		out.bor = $('.lr-Borrower').val();
		out.len = $('.lr-Lender').val();
		out.tokamount = $('.lr-TokenAmount').val() || 0;
		out.tokname = $('.lr-TokenName').val() || '';
		out.smart = $('.lr-TokenSmartcontractAddress').val() || 0;
		out.link = $('.lr-TokenInfoLink').val() || '';
		out.ensDomainHash = $('.lr-ensDomain').val() || 0;
		console.log('out:', out);
		return lr.setData(state.get('address'))(out.ethamount, out.tokamount, out.premium, out.tokname, out.link, out.smart, out.days, out.ensDomainHash, gotoSuccessCb);
	},
	'click .lender-pay': function(){
		var transact;
		console.log('NeededSumByLender:', lilNumToStr(state.get('NeededSumByLender')));
		transact = {
			gasPrice: 200000000000,
			from: web3.eth.defaultAccount,
			to: state.get('address'),
			value: lilNumToStr(state.get('NeededSumByLender'))
		};
		console.log('transact:', transact);
		return web3.eth.sendTransaction(transact, gotoSuccessCb);
	},
	'click .borrower-cancel': function(){
		return lr.returnTokens(state.get('address'))(gotoSuccessCb);
	},
	'click .transfer-tokens': function(){
		var ref$, ref1$;
		if (((ref$ = state.get('lr')) != null ? ref$.isEns : void 8) === false) {
			lr.checkTokens(state.get('address'))(gotoSuccessCb);
		}
		if ((ref1$ = state.get('lr')) != null && ref1$.isEns) {
			return web3.eth.contract(config.LRABI).at(state.get('address')).checkDomain({
				from: web3.eth.defaultAccount,
				gasPrice: 20000000000
			}, gotoSuccessCb);
		}
	},
	'click .return-tokens': function(){
		var transact;
		transact = {
			from: web3.eth.defaultAccount,
			to: state.get('address'),
			value: +lilNumToStr(state.get('NeededSumByBorrower'))
		};
		console.log('transact:', transact);
		state.set('transact-to-address', state.get('address'));
		state.set('transact-value', bigNumToStr(state.get('NeededSumByBorrower')));
		state.set('show-finished-text', true);
		return web3.eth.sendTransaction(transact, gotoSuccessCb);
	},
	'click .get-tokens': function(){
		return lr.requestDefault(state.get('address'))(gotoSuccessCb);
	},
	'input .input': function(){
		var $T, name, test, cls, ref$, ref1$, ref2$, ref3$;
		$T = $(event.target);
		name = $T.attr('ident');
		test = function(it){
			if (it === true) {
				$T.parents('section').find('.gpin').removeClass('hidden');
				$T.parents('section').find('.rpin').addClass('hidden');
				state.set(name + "-rpin", true);
				state.set(name + "-gpin", false);
			} else {
				$T.parents('section').find('.gpin').addClass('hidden');
				$T.parents('section').find('.rpin').removeClass('hidden');
			}
		};
		cls = last(
			split(' ')(
				$T.attr('class')));
		if (cls === 'lr-TokenAmount' && ((ref$ = state.get('lr')) != null && ref$.isToken)) {
			test(IntQ($T.val()));
		}
		if (cls === 'lr-TokenName' && ((ref1$ = state.get('lr')) != null && ref1$.isToken)) {
			test($T.val().length > 0);
		}
		if (cls === 'lr-ensDomain' && ((ref2$ = state.get('lr')) != null && ref2$.isEns)) {
			test(ShaQ($T.val()));
		}
		if (cls === 'lr-TokenSmartcontractAddress' && ((ref3$ = state.get('lr')) != null && ref3$.isToken)) {
			test(EthQ($T.val()));
		}
		if (cls === 'lr-WantedWei') {
			test(IntQ($T.val()));
		}
		if (cls === 'lr-DaysToLen') {
			test(IntQ($T.val()));
		}
		if (cls === 'lr-PremiumWei') {
			test(IntQ($T.val()));
		}
		if (Everything_is_ok()) {
			return $('.set-data').removeAttr('disabled');
		} else {
			return $('.set-data').attr('disabled', 'disabled');
		}
	},
	'keydown .block-input': function(){
		return event.preventDefault();
	}
});
Everything_is_ok = function(){
	var ok, test, i$, ref$, len$, el, cls, ref1$, ref2$, ref3$, ref4$;
	ok = true;
	test = function(it){
		if (it === false) {
			return ok = false;
		}
	};
	for (i$ = 0, len$ = (ref$ = $('.input')).length; i$ < len$; ++i$) {
		el = ref$[i$];
		cls = last(
			split(' ')(
				$(el).attr('class')));
		if (cls === 'lr-WantedWei') {
			test(IntQ($(el).val()));
		}
		if (cls === 'lr-DaysToLen') {
			test(IntQ($(el).val()));
		}
		if (cls === 'lr-TokenAmount' && ((ref1$ = state.get('lr')) != null ? ref1$.isEns : void 8) === false) {
			test(IntQ($(el).val()));
		}
		if (cls === 'lr-TokenName' && ((ref2$ = state.get('lr')) != null ? ref2$.isEns : void 8) === false) {
			test($(el).val().length > 0);
		}
		if (cls === 'lr-ensDomain' && ((ref3$ = state.get('lr')) != null ? ref3$.isEns : void 8) === true) {
			test(ShaQ($(el).val()));
		}
		if (cls === 'lr-PremiumWei') {
			test(IntQ($(el).val()));
		}
		if (cls === 'lr-TokenSmartcontractAddress' && ((ref4$ = state.get('lr')) != null ? ref4$.isEns : void 8) === false) {
			test(EthQ($(el).val()));
		}
		console.log(cls, 'ok:', ok);
	}
	return ok;
};
checkSetDataOut = function(out, cb){
	return cb(null, out);
};
setDataCb = function(err, res){
	return res;
};
this.disableQ = function(){
	return !state.get('IamBorrower') || !!state.get('lr-State');
};
this.highlightQ = function(it){
	if (it === state.get('lr-State')) {
		'block-scheme-element-highlighted';
	} else {
		'';
	}
	if (it === state.get('lr-State')) {
		return 'block-scheme-element-highlighted';
	} else {
		return '';
	}
};
inputFieldsColumn = function(){
	var fieldArray, rep, ref$, ref1$, ref2$, ref3$;
	fieldArray = [];
	rep = state.get('bor-balance');
	if (!((ref$ = state.get('lr')) != null && ref$.isEns) && !((ref1$ = state.get('lr')) != null && ref1$.isRep)) {
		fieldArray.push({
			c: 'lr-WantedWei',
			n: 'Eth amount',
			d: disableQ(),
			placeholder: '0.00 Eth'
		});
		fieldArray.push({
			c: 'lr-TokenName',
			n: 'Token name',
			d: disableQ()
		});
		fieldArray.push({
			c: 'lr-TokenAmount',
			n: 'Token amount',
			d: disableQ(),
			placeholder: '0'
		});
		fieldArray.push({
			c: 'input-primary-short lr-TokenSmartcontractAddress',
			n: 'Token smart contract',
			d: disableQ()
		});
		fieldArray.push({
			c: 'lr-TokenInfoLink',
			n: 'Token info link (optional)',
			d: disableQ()
		});
	}
	if ((ref2$ = state.get('lr')) != null && ref2$.isEns) {
		fieldArray.push({
			c: 'lr-WantedWei',
			n: 'Eth amount',
			d: disableQ(),
			placeholder: '0.00 Eth'
		});
		fieldArray.push({
			c: 'lr-ensDomain',
			n: 'ENS Domain Hash',
			d: disableQ()
		});
	}
	if ((ref3$ = state.get('lr')) != null && ref3$.isRep) {
		fieldArray.push({
			c: 'lr-WantedWei block-input',
			n: 'Eth amount',
			d: disableQ(),
			placeholder: '0.00 Eth',
			type: 'number',
			step: 0.01,
			maxi: +rep,
			mini: 0,
			v: +bigNumToStr(state.get('lr').WantedWei) || rep
		});
	}
	fieldArray.push({
		c: 'lr-DaysToLen',
		n: 'Days to lend',
		d: disableQ()
	});
	fieldArray.push({
		c: 'lr-PremiumWei',
		n: 'Premium amount',
		d: disableQ(),
		placeholder: '0.00 Eth'
	});
	fieldArray.push({
		c: 'lr-Borrower input-primary-short',
		n: 'Borrower',
		d: true,
		redDot: state.get('IamBorrower')
	});
	fieldArray.push({
		c: 'bor-balance input-primary-short',
		n: 'Borrower reputation',
		d: true,
		redDot: state.get('IamBorrower')
	});
	fieldArray.push({
		c: 'lr-Lender input-primary-short',
		n: 'Lender',
		d: true,
		redDot: state.get('IamLender')
	});
	return map(inputUnit, fieldArray);
};
inputUnit = function(it){
	return section({
		style: 'height:36px'
	}, h3({
		'class': 'input-key'
	}, it.redDot ? redDot() : void 8, it.n), input({
		id: it.ident,
		type: (it != null ? it.type : void 8) || 'text',
		step: it != null ? it.step : void 8,
		max: it != null ? it.maxi : void 8,
		min: it != null ? it.mini : void 8,
		ident: it.ident,
		style: 'max-height:40px',
		'class': "input " + ((it != null ? it.c : void 8) || ''),
		placeholder: it != null ? it.placeholder : void 8,
		value: it != null ? it.v : void 8,
		disabled: it.d
	}), grnPin(), redPin());
};
this.ensQ = function(){
	var ref$, ref1$;
	if ((ref$ = state.get('lr')) != null && ref$.isToken) {
		return arguments[0];
	} else if ((ref1$ = state.get('lr')) != null && ref1$.isEns) {
		return arguments[1];
	} else {
		return arguments[2];
	}
};