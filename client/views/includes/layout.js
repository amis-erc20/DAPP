var checkAccountBalance, goCycle, this$ = this;
template('layout', function(){
	return html({
		lang: 'en'
	}, head(meta({
		charset: 'UTF-8'
	}), title({}, "EthLend")), body(header_blaze(a({
		'class': 'logo',
		href: '/main/1'
	}, img({
		'class': 'logo-image',
		src: '/img/logo.png',
		alt: 'EthLend logo'
	})), nav({
		'class': 'navigation'
	}, D("nav-link-wrapper", a({
		'class': "nav-link js-gitter-toggle-chat-button"
	}, "Chat")), D("nav-link-wrapper " + (state.get('selected-class') === 'main' ? 'selected' : void 8), a({
		'class': 'nav-link',
		href: '/main/1'
	}, "All Loan Requests")), D("nav-link-wrapper " + (state.get('selected-class') === 'funded' ? 'selected' : void 8), a({
		'class': 'nav-link',
		href: '/funded/1'
	}, "Funded Loan Requests")), D("nav-link-wrapper " + (state.get('selected-class') === 'new-loan' ? 'selected' : void 8), span({
		'class': "glyphicon glyphicon-plus-sign",
		ariaHidden: "true",
		style: 'color:white; position:relative; left:15px; top:2px;'
	}), a({
		'class': 'nav-link with-icon',
		href: '/new-loan-request'
	}, "New Loan Request")), D("nav-link-wrapper " + (state.get('selected-class') === 'info' ? 'selected' : void 8) + " " + (state.get('selected-class') === 'loan' ? 'pseudo-selected' : void 8), a({
		'class': 'nav-link',
		href: '/info'
	}, "Info")))), div({
		'class': 'main-shell'
	}, SI(this.lookupTemplate('yield')))), footer(div({
		'class': 'footer-nav'
	}, a({
		'class': 'footer-link',
		href: '/main/1'
	}, "Home"), a({
		'class': 'footer-link',
		href: 'http://about.ethlend.io'
	}, "About EthLеnd"), a({
		'class': 'footer-link',
		href: '/faq'
	}, "FAQs")), p({
		'class': 'footer-inscription'
	}, "EthLend ©2017")));
});
Template.layout.events({
	'click .nav-link-wrapper': function(){
		$('.selected').removeClass('selected');
		return $(event.target).addClass('selected');
	}
});
Template.layout.rendered = function(){
	var script;
	console.log(web3.eth.defaultAccount);
	(function(i, s, o, g, r, a, m){
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function(){
			(i[r].q = i[r].q || []).push(arguments);
		};
		i[r].l = 1 * new Date;
		a = s.createElement(o);
		m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m);
	})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
	ga('create', 'UA-102004013-2', 'auto');
	ga('send', 'pageview');
	script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', 'https://sidecar.gitter.im/dist/sidecar.v1.js');
	script.setAttribute('defer', 'defer');
	script.setAttribute('async', 'async');
	document.getElementsByTagName('head')[0].appendChild(script);
	((window.gitter = {}).chat = {}).options = {
		room: 'ethlend/lobby',
		activationElement: false
	};
	state.set('addr', split('/')(
		Router.current().originalUrl));
	state.set('addr-last', last(
		state.get('addr')));
	state.set('addr-prelast', last(
		initial(
			state.get('addr'))));
	state.set('main-class', state.get('addr-prelast') === 'main' ? 'selected' : '');
	state.set('info-class', state.get('addr-last') === 'info' ? 'selected' : '');
	return state.set('new-loan-class', state.get('addr-last') === 'new-loan-request' ? 'selected' : '');
};
checkAccountBalance = function(){
	web3.eth.getAccounts(function(err, accounts){
		if (err !== null) {
			console.log('An error occurred: ', err);
		} else {
			if (accounts.length === 0) {
				swal({
					title: 'Log in to Metamask',
					text: 'You are not logged in to MetaMask. Log in to use the full functinality of the application.',
					icon: 'info'
				});
			} else {
				web3.eth.getBalance(accounts[0], function(error, result){
					if (error) {
						return;
					} else {
						if (result.c[0] === 0) {
							swal({
								title: 'Account balance',
								text: 'Your account balance is ' + result,
								icon: 'info'
							});
						}
					}
				});
			}
		}
	});
};
Template.layout.rendered = function(){
	var link, script;
	if (typeof web3 == 'undefined' || web3 === null) {
		link = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
		swal({
			title: 'Metamask is not installed',
			text: 'This site requires Metamask to use it\'s full functionality. Download the plugin for Google Chrome.',
			icon: 'warning',
			showCancelButton: true,
			close: false,
			buttons: [{
				cancel: "Continue without it",
				download: "Get it here"
			}],
			dangerMode: true
		}, function(download){
			if (download) {
				window.location.href = link;
			}
		});
	}
	if (web3 && web3.eth) {
		web3.version.getNetwork(function(err, netId){
			var network;
			network = Meteor.settings['public'].metamask.network;
			if (netId === '1' && network === 'main') {
				checkAccountBalance();
			} else {
				if (netId === '3' && network === 'ropsten') {
					checkAccountBalance();
				} else {
					if (netId === '4' && network === 'rinkeby') {
						checkAccountBalance();
					} else {
						if (netId === '42' && network === 'kovan') {
							checkAccountBalance();
						} else {
							swal({
								title: 'Wrong network',
								text: 'You are connected to the wrong network. Please switch to ' + network + ' network to make loans.',
								icon: 'info'
							});
						}
					}
				}
			}
		});
	}
	script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', 'https://sidecar.gitter.im/dist/sidecar.v1.js');
	script.setAttribute('defer', 'defer');
	script.setAttribute('async', 'async');
	document.getElementsByTagName('head')[0].appendChild(script);
	return ((window.gitter = {}).chat = {}).options = {
		room: 'ethlend/lobby',
		activationElement: false
	};
};
goCycle = function(iterator, eld){
	var ref$;
	if (typeof web3 == 'undefined' || web3 === null) {
		if (iterator < 50) {
			return Meteor.setTimeout(function(){
				iterator += 1;
				console.log('web3-loading:', iterator);
				return goCycle();
			}, 20);
		} else {
			return no_metamask();
		}
	} else {
		state.set('defaultAccount', typeof web3 != 'undefined' && web3 !== null ? (ref$ = web3.eth) != null ? ref$.defaultAccount : void 8 : void 8);
		console.log('done');
		return eld;
	}
};
