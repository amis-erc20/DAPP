var this$ = this;
Router.route('info', {
	path: 'info'
});
template('info', function(){
	return main_blaze({}, D('info', h4({
		'class': 'info-key'
	}, "Eth is enabled"), p({
		'class': 'info-value'
	}, yesno(config.SMART_CONTRACTS_ENABLED)), h4({
		'class': 'info-key'
	}, "Your address"), p({
		'class': 'info-value defaultAccount'
	}, a({
		target: '_blank',
		'class': 'account-link',
		href: ''
	}, '')), h4({
		'class': 'info-key'
	}, "Your balance"), p({
		'class': 'info-value balance'
	}, ''), h4({
		'class': 'info-key'
	}, "Ledger contract address"), p({
		'class': 'info-value'
	}, a({
		target: '_blank',
		href: config.ETH_MAIN_ADDRESS_LINK
	}, config.ETH_MAIN_ADDRESS)), h4({
		'class': 'info-key'
	}, "ENS registry address"), p({
		'class': 'info-value'
	}, a({
		target: '_blank',
		href: "https://etherscan.io/address/" + config.ENS_REG_ADDRESS
	}, config.ENS_REG_ADDRESS)), h4({
		'class': 'info-key'
	}, "Your reputation"), p({
		'class': 'info-value reputation'
	}, ''), h4({
		'class': 'info-key'
	}, "Credit Token (CRE)"), p({
		'class': 'info-value'
	}, a({
		target: '_blank',
		href: "https://etherscan.io/address/" + config.REP_ADDRESS
	}, config.REP_ADDRESS)), h4({
		'class': 'info-key'
	}, "First EthLend ver."), p({
		'class': 'info-value'
	}, a({
		target: '_blank',
		href: 'http://oldest.ethlend.io'
	}, 'oldest.ethlend.io')), h4({
		'class': 'info-key'
	}, "Second EthLend ver."), p({
		'class': 'info-value'
	}, a({
		target: '_blank',
		href: 'http://old.ethlend.io'
	}, 'old.ethlend.io'))));
});
Template.info.created = function(){
	var getB;
	state.set('selected-class', 'info');
	if (!web3) {
		console.log('oops');
	}
	getB = function(it){
		var this$ = this;
		return web3.eth.getBalance(it, function(err, res){
			if (res) {
				$('.balance').html(bigNumToStr(res) + " ETH");
				return console.log(res);
			} else {
				return getB(it);
			}
		});
	};
	return lookup(web3.eth.defaultAccount, function(res){
		getB(res);
		$('.account-link').html(res);
		$('.account-link').attr('href', "https://etherscan.io/address/" + res);
		return getRepBalance(web3.eth.defaultAccount, function(err, res){
			$('.reputation').html(+bigNumToStr(res) + ' Credit Token (CRE)');
			return state.set('reputation', bigNumToStr(res));
		});
	});
};