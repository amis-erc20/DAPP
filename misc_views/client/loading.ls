template \loading -> main_blaze do
	div style:'padding:100px' class:\container ,
		h1 style:'font-size:50px; display:block', 'No Metamask'
		p style:'font-size:20px; padding-top:15px;padding-bottom:15px', 'This site requires the Metamask plugin for Google Chrome.'
		a class:'btn btn-primary btn-lg' href:'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', 'Download Metamask'