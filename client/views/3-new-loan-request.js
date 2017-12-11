var this$ = this;
Router.route('new_loan_request', {
	path: 'new-loan-request',
	template: 'newLoanRequest'
});
template('newLoanRequest', function(){
	return main_blaze(loadingComponent(), div({
		'class': "message " + state.get('message-class')
	}, p({
		style: 'font-size:20px'
	}, "This includes ", b(state.get('fee-sum') / Math.pow(10, 18) + " ETH"), " deployment fees and can take 3-5 minutes"), p({
		style: 'font-size:20px'
	}, 'New ', b('Loan Request'), ' will be then available in ’All Loan Requests’ window.', br(), br(), "Credit Tokens (CRE) are credited to the borrower on successful loan", br(), "repayment (loan amount of 1 ETH = 0.1 CRE). CRE represents the borrower’s credit rating. ", br(), br(), "0.1 CRE allows to borrow up to 0.1 ETH without a collateral (reputation based lending)."), div({
		'class': 'new-loan-group'
	}, div({
		'class': 'new-loan-text'
	}, 'New loan request:')), button({
		'class': 'new-loan-request card-button bgc-primary blue'
	}, 'Tokens'), button({
		'class': 'new-domain-request card-button bgc-primary blue'
	}, 'Domain'), button({
		'class': 'new-rep-request card-button bgc-primary red'
	}, 'Reputation')));
});
Template.newLoanRequest.events({
	'click .new-loan-request': function(){
		return web3.eth.contract(config.LEDGERABI).at(config.ETH_MAIN_ADDRESS).createNewLendingRequest({
			from: web3.eth.defaultAccount,
			gasPrice: 15000000000,
			value: config.BALANCE_FEE_AMOUNT_IN_WEI
		}, function(err, res){
			if (err) {
				console.log('err:', err);
			}
			if (res) {
				console.log('thash:', res);
				state.set('transact-to-address', config.ETH_MAIN_ADDRESS);
				state.set('transact-value', state.get('fee-sum'));
				return Router.go('success');
			}
		});
	},
	'click .new-domain-request': function(){
		return web3.eth.contract(config.LEDGERABI).at(config.ETH_MAIN_ADDRESS).createNewLendingRequestEns({
			from: web3.eth.defaultAccount,
			gasPrice: 15000000000,
			value: config.BALANCE_FEE_AMOUNT_IN_WEI
		}, function(err, res){
			if (err) {
				console.log('err:', err);
			}
			if (res) {
				console.log('thash:', res);
				state.set('transact-to-address', config.ETH_MAIN_ADDRESS);
				state.set('transact-value', state.get('fee-sum'));
				return Router.go('success');
			}
		});
	},
	'click .new-rep-request': function(){
		return web3.eth.contract(config.LEDGERABI).at(config.ETH_MAIN_ADDRESS).createNewLendingRequestRep({
			from: web3.eth.defaultAccount,
			gasPrice: 15000000000,
			value: config.BALANCE_FEE_AMOUNT_IN_WEI
		}, function(err, res){
			if (err) {
				console.log('err:', err);
			}
			if (res) {
				console.log('thash:', res);
				state.set('transact-to-address', config.ETH_MAIN_ADDRESS);
				state.set('transact-value', state.get('fee-sum'));
				return Router.go('success');
			}
		});
	}
});
Template.newLoanRequest.created = function(){
	state.set('selected-class', 'new-loan');
	state.set('message-class', 'hidden');
	return state.set('loading-class', '');
};
Template.newLoanRequest.rendered = function(){
	return ledger.getFeeSum(function(err, res){
		var feeSum;
		if (err) {
			return err;
		}
		feeSum = lilNumToStr(res);
		state.set('fee-sum', feeSum);
		state.set('message-class', '');
		return state.set('loading-class', 'hidden');
	});
};
