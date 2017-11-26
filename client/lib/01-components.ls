template \noMetamask -> main_blaze no_metamask!
Router.route \noMetamask, path: \/no_metamask

Router.route \success path:\/success

@no_metamask=-> div style:'padding:100px' class:\container ,
		h1 style:'font-size:50px; display:block', 'No Metamask'
		p style:'font-size:20px; padding-top:15px;padding-bottom:15px', 'This site requires the Metamask plugin for Google Chrome.'
		a class:'btn btn-primary btn-lg' href:'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', 'Download Metamask'

@error-component =-> 
	h1 class:"#{state.get \error-class }", 'Wrong address'

@loading-component =-> 
	div class:"loading #{state.get \loading-class } container" style:'padding:100px',  
		h1 style:'font-size:50px; display:block', 'Loading'
		p style:'font-size:20px; padding-top:15px;padding-bottom:15px', 'Please, wait...'

template \loading -> main_blaze do
	div style:'padding:100px' class:\container ,
		h1 style:'font-size:50px; display:block', 'Loading'
		p style:'font-size:20px; padding-top:15px;padding-bottom:15px', 'Please, wait...'
		# a class:'btn btn-primary btn-lg' href:'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', 'Download Metamask'

@not-found-component =-> 
	div class:"#{state.get(\not-found-class)} container" style:'padding:100px',  
		h1 style:'font-size:50px; display:block', &0
		p style:'font-size:20px; padding-top:15px;padding-bottom:15px', &1

template \notFound -> 
	div class:"#{state.get(\not-found-class)} container" style:'padding:100px',  
		h1 style:'font-size:50px; display:block', 'Error 404'
		p style:'font-size:20px; padding-top:15px;padding-bottom:15px', 'Not found'

template \reload -> main_blaze do
	div style:'padding:100px' class:\container ,
		h1 style:'font-size:50px; display:block', 'Can not get account address'
		p style:'font-size:20px; padding-top:15px;padding-bottom:15px', 'Please, enter password in the Metamask, or reload page.'
		button class:'btn btn-danger btn-lg' onclick:'location.reload()', 'Reload page'

template \success -> main_blaze do
	div style:'padding:100px' class:\container ,
		h1 style:'font-size:50px; display:block', 'Done!'
		p style:'font-size:20px; padding-top:15px;padding-bottom:15px', 
			'Please wait. Action will be completed in the next few minutes' 
			# br!
			# if state.get(\show-finished-text) => "#{+state.get(\transact-value)} Credit Tokens (CRE) were transferred to #{state.get \transact-to-address } address. "
			# br!
			# if state.get(\show-finished-text) => "Use CRE to borrow ETH without a collateral."

		button class:'btn btn-primary btn-lg' onclick:'window.history.back()', 'Go back'

