@lr = call:(method)~>(address)~>(...args)-> 
	# if !address?length || address?length < 30 => address = big-zero
	web3?eth.contract(config.LR-ABI).at(address)[method](...args)
	
@ledger = call:(method)~>(...args)~> web3?eth.contract(config.LEDGER-ABI).at(config.ETH_MAIN_ADDRESS)[method](...args)
@init   = (obj)~> (method)~> obj[method] = obj[\call](method)

map init(ledger), ["mainAddress", "registrarAddress", "repTokenAddress", "getLr", "getLrFunded", "lastTimeRateUpdated", "__callback", "isNeedToUpdateEthToUsdRate", "__callback", "oraclizeFee", "getLrForUser", "ethPriceInUsd", "newLrAndSetData", "ensRegistryAddress", "unlockRepTokens", "totalLrCount", "lockRepTokens", "addRepTokens", "newLr", "getLrCount", "whereToSendFee", "getLrCountForUser", "getNow", "getEthToUsdRate", "borrowerFeeAmount", "updateEthToUsdRate", "getLrFundedCount", "getRepTokenAddress", "approveRepTokens", "ethPriceInUsdInt", "burnRepTokens", "getFeeSum", "newOraclizeQuery", "priceReceived"]
map init(lr), ["currentType", "creator", "changeMainAddress", "isEns", "mainAddress", "registrarAddress", "lenderFeeAmount", "changeLedgerAddress", "isCanDefault", "token_smartcontract_address", "getBorrower", "getTokenSmartcontractAddress", "token_infolink", "getCurrentInstallmentIndex", "getCurrentState", "waitingForPayback", "premium_wei", "getNeededSumByBorrower", "installments_period_days", "token_amount", "waitingForLender", "installments_count", "getTokenAmount", "ensRegistryAddress", "isRep", "wanted_wei", "borrower", "getTokenInfoLink", "getTokenName", "setData", "token_name", "getLender", "ens_domain_hash", "cancell", "whereToSendFee", "getNeededSumByLender", "lender", "getInstallmentPenalty", "start", "getEnsDomainHash", "requestDefault", "currency", "returnTokens", "convertToEth"]

@lr-keys=-> 
	if web3?eth.contract(config.LRABI).abi
		compact map((.name), web3?eth.contract(config.LRABI).abi)

@ledger-keys=-> 
	if web3?eth.contract(config.LEDGERABI).abi
		compact map((.name), web3?eth.contract(config.LEDGERABI).abi)


   	# getCurrentInstallmentIndex()

	# installments_count = 1;
 #     installments_period_days = 0;         # days_to_lend var is removed
 #     start = 0;    #Holds the startTime of the loan when loan Funded


@get-all-lr-data =(address)->(cb)->
	out = {}
	lr.currency(address) ->  				out.currency = +lilNum-toStr &1    
	lr.wanted_wei(address) ->  				out.WantedWei = &1    
	lr.premium_wei(address) -> 				out.PremiumWei = &1
	lr.getTokenName(address) ->                  out.TokenName = &1
	lr.getTokenInfoLink(address) -> 			out.TokenInfoLink = &1
	lr.getTokenSmartcontractAddress(address) ->  out.TokenSmartcontractAddress = &1
	lr.getBorrower(address) -> 			     out.Borrower = &1
	
	lr.installments_count(address) ->            out.installments_count  = &1
	lr.installments_period_days(address) ->      out.installments_period_days = &1
	lr.getCurrentInstallmentIndex(address) ->    out.installment_index = &1

	lr.getCurrentState(address) -> 			out.State = +lilNum-toStr &1
	lr.getLender(address) -> 				out.Lender = &1
	lr.getTokenAmount(address) -> 			out.TokenAmount = +lilNum-toStr &1
	lr.isEns(address) ->					out.isEns = &1
	lr.isRep(address) ->					out.isRep = &1
	lr.getEnsDomainHash(address) ->			out.EnsDomainHash = &1


	cycle =-> 
		if typeof out.PremiumWei ==\undefined || typeof out.TokenName ==\undefined || typeof out.TokenInfoLink ==\undefined || typeof out.TokenSmartcontractAddress ==\undefined || typeof out.Borrower ==\undefined || typeof out.DaysToLen ==\undefined || typeof out.State ==\undefined || typeof out.Lender ==\undefined || typeof out.TokenAmount ==\undefined || typeof out.isEns == \undefined || typeof out.EnsDomainHash == \undefined || typeof out.currency == \undefined || typeof out.installments_count  ==\undefined || typeof out.installments_period_days==\undefined || out.installment_index==\undefined
			Meteor.setTimeout (->cycle!), 10
		else cb null, out

	cycle!

@get-rep-balance =(address,cb)-> ledger.getRepTokenAddress (err,repAddress)->
	contr = web3?eth.contract(config.REP-ABI).at(repAddress)
	contr.balanceOf address, cb
