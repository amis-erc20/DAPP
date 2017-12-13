var this$ = this;
Router.route('new_loan_request', {
	path: 'new-loan-request',
	template: 'newLoanRequest'
});

Template.newLoanRequest.helpers({
	messageClass: function () {
		return state.get('message-class');
  },
	calculateFee: function () {
		return state.get('fee-sum') / Math.pow(10, 18);
  }
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
