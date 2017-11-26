Router.route \new_loan_request, path:\new-loan-request template:\newLoanRequest

template \newLoanRequest -> main_blaze do
    loading-component!
    div class:"message #{state.get \message-class }",
        p style:\font-size:20px,
            "This includes " b "#{state.get(\fee-sum)/10^18} ETH"; " deployment fees and can take 3-5 minutes"

        p style:\font-size:20px,
            'New ' 
            b 'Loan Request'
            ' will be then available in ’All Loan Requests’ window.'
            br!
            br!
            "Credit Tokens (CRE) are credited to the borrower on successful loan"
            br!
            "repayment (loan amount of 1 ETH = 0.1 CRE). CRE represents the borrower’s credit rating. "
            br!
            br!
            "0.1 CRE allows to borrow up to 0.1 ETH without a collateral (reputation based lending)."

        d \.center,
            div class:'row', 
                d \.header 'Collateral Type'    
                div class:'form-check',
                    label class:'form-check-label',
                        input class:'form-check-input' type:'radio' name:'contract-type' id:'gridRadios1' value:\0 checked:''
                        "Tokens"
                div class:'form-check',
                    label class:'form-check-label',
                        input class:'form-check-input' type:'radio' name:'contract-type' id:'gridRadios2' value:\1
                        "Domain"
                div class:'form-check',
                    label class:'form-check-label',
                        input class:'form-check-input' type:'radio' name:'contract-type' id:'gridRadios3' value:\2
                        "Reputation"

            div class:'row', 
                d \.header 'Currency'    
                div class:'form-check',
                    label class:'form-check-label',
                        input class:'form-check-input' type:'radio' name:'contract-currency' id:'gridRadios4' value:\0 checked:''
                        "ETH"
                div class:'form-check',
                    label class:'form-check-label',
                        input class:'form-check-input' type:'radio' name:'contract-currency' id:'gridRadios5' value:\1
                        "USD"

        button class:'new-loan-request card-button bgc-primary blue',  \Create


Template.newLoanRequest.events do
    'click .new-loan-request':->
        params = {from:web3.eth.defaultAccount, gasPrice:15000000000, value:config.BALANCE_FEE_AMOUNT_IN_WEI}
        type = +$('input[name="contract-type"]:checked').val!
        currency = +$('input[name="contract-currency"]:checked').val!
        # inst-count = +$(\.installment-slider).attr \value
        # inst-period = +$(\.period-slider).attr \value

        web3.eth.contract(config.LEDGERABI).at(config.ETH_MAIN_ADDRESS).newLr type, currency, params, (err,res)->
            if err => console.log \err: err
            if res 
                console.log \thash: res
                state.set \transact-to-address config.ETH_MAIN_ADDRESS
                state.set \transact-value      state.get(\fee-sum)
                Router.go \success   


Template.newLoanRequest.created =->
    state.set \selected-class \new-loan
    state.set \message-class \hidden
    state.set \loading-class ''
        
Template.newLoanRequest.rendered =~>

    web3?eth.contract(config.LEDGER-ABI).at(config.ETH_MAIN_ADDRESS).getFeeSum (err, res)~>
        if err => return err 
        fee-sum = lilNum-toStr res
        state.set \fee-sum fee-sum
        state.set \message-class ''
        state.set \loading-class \hidden


