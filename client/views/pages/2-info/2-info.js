Router.route('info', {
	path: 'info'
});

Template.info.helpers({
	yesno: function () {
		return yesno(config.SMART_CONTRACTS_ENABLED);
  },
	ethMainAddressLink: function () {
    return config.ETH_MAIN_ADDRESS_LINK;
  },
  ethMainAddress: function () {
    return config.ETH_MAIN_ADDRESS;
  },
	ensRegAddress: function () {
    return config.ENS_REG_ADDRESS;
  },
	repAddress: function () {
    return config.REP_ADDRESS;
  },
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