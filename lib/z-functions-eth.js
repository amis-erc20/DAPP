var this$ = this;
this.lr = {
	call: function(method){
		return function(address){
			return function(){
				var args, res$, i$, to$, ref$;
				res$ = [];
				for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
					res$.push(arguments[i$]);
				}
				args = res$;
				return typeof web3 != 'undefined' && web3 !== null ? (ref$ = web3.eth.contract(config.LRABI).at(address))[method].apply(ref$, args) : void 8;
			};
		};
	}
};
this.ledger = {
	call: function(method){
		return function(){
			var args, res$, i$, to$, ref$;
			res$ = [];
			for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
				res$.push(arguments[i$]);
			}
			args = res$;
			return typeof web3 != 'undefined' && web3 !== null ? (ref$ = web3.eth.contract(config.LEDGERABI).at(config.ETH_MAIN_ADDRESS))[method].apply(ref$, args) : void 8;
		};
	}
};
this.init = function(obj){
	return function(method){
		return obj[method] = obj['call'](method);
	};
};
map(init(ledger), ['Ledger', 'createNewLendingRequest', 'getFeeSum', 'getLrCount', 'getLr', 'getLrCountForUser', 'getLrForUser', 'payable', 'getLrFundedCount', 'getLrFunded', 'getRepTokenAddress', 'createNewLendingRequestEns']);
map(init(lr), ['getBorrower', 'getWantedWei', 'getPremiumWei', 'getTokenAmount', 'getTokenName', 'getTokenInfoLink', 'getTokenSmartcontractAddress', 'getDaysToLen', 'getState', 'getLender', 'isEns', 'getEnsDomainHash', 'changeLedgerAddress', 'changeMainAddress', 'setData', 'cancell', 'checkTokens', 'checkDomain', 'returnTokens', 'waitingForLender', 'waitingForPayback', 'getNeededSumByLender', 'getNeededSumByBorrower', 'requestDefault', 'releaseToLender', 'releaseToBorrower', 'isRep']);
this.getAllLrData = function(address){
	return function(cb){
		var out, cycle;
		out = {};
		lr.getWantedWei(address)(function(){
			return out.WantedWei = arguments[1];
		});
		lr.getPremiumWei(address)(function(){
			return out.PremiumWei = arguments[1];
		});
		lr.getTokenName(address)(function(){
			return out.TokenName = arguments[1];
		});
		lr.getTokenInfoLink(address)(function(){
			return out.TokenInfoLink = arguments[1];
		});
		lr.getTokenSmartcontractAddress(address)(function(){
			return out.TokenSmartcontractAddress = arguments[1];
		});
		lr.getBorrower(address)(function(){
			return out.Borrower = arguments[1];
		});
		lr.getDaysToLen(address)(function(){
			return out.DaysToLen = +lilNumToStr(arguments[1]);
		});
		lr.getState(address)(function(){
			return out.State = +lilNumToStr(arguments[1]);
		});
		lr.getLender(address)(function(){
			return out.Lender = arguments[1];
		});
		lr.getTokenAmount(address)(function(){
			return out.TokenAmount = +lilNumToStr(arguments[1]);
		});
		lr.isEns(address)(function(){
			return out.isEns = arguments[1];
		});
		lr.isRep(address)(function(){
			return out.isRep = arguments[1];
		});
		lr.getEnsDomainHash(address)(function(){
			return out.EnsDomainHash = arguments[1];
		});
		cycle = function(){
			if (typeof out.WantedWei === 'undefined' || typeof out.PremiumWei === 'undefined' || typeof out.TokenName === 'undefined' || typeof out.TokenInfoLink === 'undefined' || typeof out.TokenSmartcontractAddress === 'undefined' || typeof out.Borrower === 'undefined' || typeof out.DaysToLen === 'undefined' || typeof out.State === 'undefined' || typeof out.Lender === 'undefined' || typeof out.TokenAmount === 'undefined' || typeof out.isEns === 'undefined' || typeof out.EnsDomainHash === 'undefined') {
				return Meteor.setTimeout(function(){
					return cycle();
				}, 10);
			} else {
				return cb(null, out);
			}
		};
		return cycle();
	};
};
this.getRepBalance = function(address, cb){
	return ledger.getRepTokenAddress(function(err, repAddress){
		var contr;
		contr = typeof web3 != 'undefined' && web3 !== null ? web3.eth.contract(config.REPABI).at(repAddress) : void 8;
		return contr.balanceOf(address, cb);
	});
};
