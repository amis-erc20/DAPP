Router.route \loan_request, path:\/loan-request/:id template:\loan_request

template \loan_request -> main_blaze do
    error-component!
    loading-component!

    modal-dialog!

    D "loan-wrapper #{state.get \loan-wrapper-class }",
        D \input-wrapper,
            a target:\__blank class:\loan-title href:"https://etherscan.io/address/#{state.get \address }", "Loan Request  #{state.get \address }"
            input-box!
        block-scheme!


modal-dialog=-> div class:'modal fade' id:'exampleModalLong' tabindex:'-1' role:'dialog' "aria-labelledby":'exampleModalLongTitle' "aria-hidden":'true',
    div class:'modal-dialog' role:'document',
        div class:'modal-content',
            div class:'modal-header',
                h5 class:'modal-title' id:'exampleModalLongTitle', "Choose token"
                button type:'button' class:'close' "data-dismiss":'modal' "aria-label":'Close',
                    span "aria-hidden":'true', \x
            div class:'modal-body', div class:'list-group',

                map token-item-view, tokens-list!


token-item-view=-> a href:'#' class:"token-item-view list-group-item list-group-item-action flex-column align-items-start #{if state.get('lr')?TokenSmartcontractAddress == it?address => \active else ''}" name:it?address,
    div class:'d-flex w-100 justify-content-between',
        h5 class:'mb-1', it?name
        small {}, 
            it?description
            br!
            a class:'site-link' href:it?link, it?link
    # p class:'mb-1', 
    small class:'token-addr', it?address

                # a href:'#' class:'list-group-item list-group-item-action flex-column align-items-start',
                #     div class:'d-flex w-100 justify-content-between',
                #         h5 class:'mb-1', "List group item heading"
                #         small class:'text-muted', "3 days ago"
                #     p class:'mb-1', "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit."
                #     small class:'text-muted', "Donec id elit non mi porta."
                # a href:'#' class:'list-group-item list-group-item-action flex-column align-items-start',
                #     div class:'d-flex w-100 justify-content-between',
                #         h5 class:'mb-1', "List group item heading"
                #         small class:'text-muted', "3 days ago"
                #     p class:'mb-1', "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit."
                #     small class:'text-muted', "Donec id elit non mi porta."
                        # div class:'modal-footer',
                        #     button type:'button' class:'btn btn-secondary' "data-dismiss":'modal', "Close"
                        #     button type:'button' class:'btn btn-primary', "Save changes"



grn-pin =-> img class:"hidden input-img-pin gpin" src:\/img/green_pin.svg alt:''
red-pin =-> img class:"hidden input-img-pin rpin" src:\/img/red_pin.svg   alt:''
red-dot =-> img class:"#{state.get(it+\-rdot )} input-img-dot" src:\/img/red_dot.svg   alt:''     

input-box =~> #div class:\input-box, 
    if state.get(\isNeedToUpdateEthToUsdRate) ~= true && (state.get(\lr)?currency ==1)=> div class:\input-box, update-rate!
    else 
        div class:\input-box,
            input-fields-column!

            # if state.get(\lr)?State == 0
            tokens-select!

            if state.get(\lr)?State == 0
                section style:'height:27px',
                    h3 class:\input-key, 
                        'Installmens count'
                    div class:'slider installment-slider',
                        div id:\custom-handle-count class:\ui-slider-handle
            if state.get(\lr)?State == 0
                section style:'height:27px',
                    h3 class:\input-key, 
                        'Installment period (days)'
                    div class:'slider period-slider',
                        div id:\custom-handle-period class:\ui-slider-handle

            text-and-button!

update-rate=-> div class:'text-aligned update-rate-wrapper', D "loan-prebutton-text", 
    "Please update usd to eth rate."
    button class:'card-button bgc-primary loan-button update-rate' style:'width:200px; margin-left:-15px', "Update rate"



text-and-button=-> div class:\text-aligned,
    if state.get(\lr-State)==0 && state.get(\IamBorrower) => D \text-s,
        D "loan-prebutton-text", "Please, enter the data" 
        button class:'card-button bgc-primary loan-button set-data' disabled:true, 'Set data'
    if state.get(\lr-State)==0 && !state.get(\IamBorrower) => D \text-s,
        D "loan-prebutton-text", "Borrower should set the data" 
        button class:'card-button bgc-primary loan-button set-data' disabled:true, 'Set data'

    if state.get(\lr-State)==1 && state.get(\IamBorrower) => D \text-s,
        D "loan-prebutton-text", "Please, transfer #{ ensQ((state.get('lr').TokenAmount + ' tokens'), \domain) }  to this Loan Request address - #{state.get \address } and click on the button"
        # button class:'card-button bgc-primary loan-button transfer-tokens', "Check that #{ ensQ('tokens are', 'domain is') } transferred"
    if state.get(\lr-State)==1 && !state.get(\IamBorrower) => D \text-s,
        D "loan-prebutton-text", "Borrower should transfer #{ ensQ((state.get('lr').TokenAmount + ' tokens'), \domain) } to this Loan Request address - #{state.get \address }"
        # button class:'card-button bgc-primary loan-button transfer-tokens' disabled:true, "Check that #{ensQ(\tokens \domain)} are transferred"

    if state.get(\lr-State)==3 && !state.get(\IamBorrower) => D \text-s,
        D "loan-prebutton-text",      
            'Fund this Loan Request and get Premium'
        button class:'card-button bgc-primary loan-button lender-pay' style:'width:200px; margin-left:-15px', "Fund this Loan Request"

    if state.get(\lr-State)==3 && state.get(\IamBorrower) => D \text-s,
        D "loan-prebutton-text", 
            "Please wait while someone lend your Loan Request. You can cancel this loan request."

        button class:'card-button bgc-primary loan-button borrower-cancel' style:'width:200px; margin-left:-15px', "Cancel"

    if state.get(\lr-State)==4 && state.get(\IamBorrower) => D \text-s,
        D "loan-prebutton-text", 
            "Please send #{ (+needed-sum-bor!) } #{if state.get(\lr)?currency~=0 => \Eth else \Usd } to #{state.get \address } to go to next installment." 
            br!
            "This includes #{ (premium-amount!/state.get(\lr).installments_count)} #{if state.get(\lr)?currency~=0 => \Eth else \Usd } premium amount"
            # br!
            # "Borrower is rewarded with #{(+wanted-amount!/(global.rate*10)).to-fixed 0 } Credit Tokens (CRE) after the repayment."
        button class:'card-button bgc-primary loan-button return-tokens', 'Pay an installment'
    if state.get(\lr-State)==4 && !state.get(\IamBorrower) && !state.get(\IamLender) => D \text-s,
        D "loan-prebutton-text", "Borrower should now return #{ needed-sum-bor! } #{if state.get(\lr)?currency~=0 => \Eth else \Usd } in order to get #{ensQ(\tokens \domain 'the loan')} back"
        button class:'card-button bgc-primary loan-button return-tokens' disabled:true, 'Pay an installment'
    if state.get(\lr-State)==4 && state.get(\IamLender) => D \text-s,
        D "loan-prebutton-text", "If time has passed but borrower hasn't returned the loan - you can #{ensQ('get his tokens' 'get his domain' 'burn his credit' )}"
        button disabled:!state.get('lr').isCanDefault, class:'card-button bgc-primary loan-button get-tokens', ensQ('Get tokens' 'Get domain' 'Burn borrowers CRE')

block-scheme =-> D \block-scheme,
    D "block-scheme-element #{highlightQ(0)}", 'No data'
    D \block-scheme-line,
        P \block-scheme-line-inscription, "Borrower ", br!, 'sets data'
        D \block-scheme-line-arrow
    unless state.get(\lr)?isRep => D "block-scheme-element #{highlightQ(1)}", ensQ('Waiting for tokens', 'Waiting For domain')
    unless state.get(\lr)?isRep => D \block-scheme-line,
        P \block-scheme-line-inscription, "Borrower transfers", br!,  ensQ(\tokens \domain)
        D \block-scheme-line-arrow
    D "block-scheme-element #{highlightQ(3)}", 'Waiting For Lender'
    D \block-scheme-line,
        P \block-scheme-line-inscription, "Lender sends ", br!, "#{if state.get(\lr)?currency~=0 => \Eth else \Usd }"
        D \block-scheme-line-arrow
    D "block-scheme-element #{highlightQ(4)}", \Funded
    D 'block-scheme-line block-scheme-line-long',
        p class:\block-scheme-line-inscription, 'Borrower gets ',  ensQ('his tokens back' 'his domain back', '') #, br!, 'Credit Tokens (CRE)'
        p class:'block-scheme-line-inscription block-scheme-line-inscription-second' , "Lender gets #{if state.get(\lr)?currency~=0 => \Eth else \Usd } amount"
        D 'block-scheme-line-arrow block-scheme-line-arrow-long'
    D "#{highlightQ(6)} block-scheme-element #{if state.get(\lr-State)!=6 => \block-scheme-element-success }", \Finished
  
    div class:'block-scheme-line block-scheme-line-long block-scheme-line-long-branch' style:"#{if state.get(\lr)?isRep=> \top:240px }",
        P 'block-scheme-line-inscription block-scheme-line-inscription-branch', ensQ('Lender gets tokens' 'Lender gets domain' 'Lender burns borrowers CRE (reputation)')
        div class:'block-scheme-line-arrow block-scheme-line-arrow-branch'
    div class:"#{highlightQ(5)} block-scheme-element block-scheme-element-branch #{if state.get(\lr-State)!=5 => \block-scheme-element-failure else \failure-highlighted }" style:"#{if state.get(\lr)?isRep=> \top:379px }", \Default


premium-amount=->
    if (state.get(\lr)?currency == 0)
        return bigNum-toStr state.get(\lr).PremiumWei
    else 
        (+lilNumToStr(state.get(\lr)?PremiumWei)/100).to-fixed 2

wanted-amount=->
    if (state.get(\lr)?currency == 0)
        bigNum-toStr state.get(\lr)?WantedWei
    else 
        (+lilNumToStr(state.get(\lr)?WantedWei)/100)


needed-sum-bor=->
    if (state.get(\lr)?currency == 0)
        +bigNum-toStr state.get(\lr)?neededSumByBorrower

    else 
       (global.rate*(+bigNum-toStr state.get(\lr)?neededSumByBorrower))

Template.loan_request.created=->
    state.set \selected-class \loan

    state.set \address     (Router.current!originalUrl |> split \/ |> last )
    state.set \loan-wrapper-class, \hidden
    state.set \loading-class,      ''
    state.set \error-class, (if EthQ(state.get(\address))=>\hidden else '' )

    state.set \NeededSumByLender +bigNum-toStr state.get(\lr)?neededSumByLender
    state.set \NeededSumByBorrower +bigNum-toStr state.get(\lr)?neededSumByBorrower
    state.set \fee-sum state.get(\lr)?feeSum

    get-all-lr-data( state.get \address ) ->    
        state.set \loan-wrapper-class, ''
        state.set \loading-class, \hidden
        &1.isToken = (!&1?isEns)&&(!&1?isRep)
        state.set \lr, &1
        state.set \lr-Lender   &1?Lender
        state.set \lr-Borrower &1?Borrower
        state.set \lr-State    &1?State
        state.set \IamLender   (web3.eth.defaultAccount.toUpperCase()==state.get(\lr-Lender).toUpperCase())       

        state.set \IamBorrower (web3.eth.defaultAccount.toUpperCase()==state.get(\lr-Borrower).toUpperCase())   

        state.set \bor-balance 0

        ticker.isNeedToUpdateEthToUsdRate (err,need)->
            console.log \need: need
            state.set \isNeedToUpdateEthToUsdRate need


Template.loan_request.rendered =->
    $ \.installment-slider .slider do 
        disabled: !state.get(\IamBorrower)
        create:(event,ui)-> 
            $(\#custom-handle-count).text $(this).slider \value
            $(this).attr \value 1
        
        slide:(event,ui)-> 
            $(\#custom-handle-count).text ui.value 
            $(this).attr \value ui.value 
        range: \min
        min: 1
        max: 12
        step: 1
        value: 1

    $ \.period-slider .slider do 
        disabled: !state.get(\IamBorrower)
        create:(event,ui)-> 
            $(\#custom-handle-period).text $(this).slider \value
            $(this).attr \value 1
        
        slide:(event,ui)-> 
            $(\#custom-handle-period).text ui.value 
            $(this).attr \value ui.value 
        range: \min
        min: 1
        max: 30
        step: 1
        value: 1


    global.rate = +state.get(\lr)?rate
    global.was  = +state.get(\lr)?was
    console.log \rate: rate

    state.set \ethPriceInUsd +rate

    wwei = +lilNumToStr(state.get(\lr)?WantedWei)/100
    pwei = +lilNumToStr(state.get(\lr)?PremiumWei)/100

    if (state.get(\lr)?currency == 1)      
        if global.was   
            $('.lr-usdrate').attr \value, "$#{global.rate} (was $#{global.was} when LR was created)"
        else 
            $('.lr-usdrate').attr \value, "$#{global.rate}"

        if bigNum-toStr(state.get(\lr)?WantedWei)  !=\0 => $('.lr-WantedWei').attr \value,  "$#{+wwei/ 10^16 } (#{(wwei/(10^16 * (+global.rate))).to-fixed(7)} ETH)"
        if bigNum-toStr(state.get(\lr)?PremiumWei) !=\0 => $('.lr-PremiumWei').attr \value, "$#{+pwei/ 10^16 } (#{(pwei/(10^16 * (+global.rate))).to-fixed(7)} ETH)"
    else 
        if bigNum-toStr(state.get(\lr)?WantedWei)  !=\0 => $('.lr-WantedWei').attr \value,  +bigNum-toStr state.get(\lr)?WantedWei
        if bigNum-toStr(state.get(\lr)?PremiumWei) !=\0 => $('.lr-PremiumWei').attr \value, +bigNum-toStr state.get(\lr)?PremiumWei


    # if state.get(\lr)?DaysToLen                 != 0 =>        $('.lr-DaysToLen').attr \value,                  state.get(\lr)?DaysToLen
    if state.get(\lr)?TokenAmount               != 0 =>        $('.lr-TokenAmount').attr \value,                state.get(\lr)?TokenAmount

    if state.get(\lr)?Borrower                  != big-zero => $('.lr-Borrower').attr \value,                   state.get(\lr)?Borrower
    if state.get(\lr)?Lender                    != big-zero => $('.lr-Lender').attr \value,                     state.get(\lr)?Lender
    if state.get(\lr)?TokenSmartcontractAddress != big-zero
            $('.lr-TokenName').attr \value,  smart-contract-converter state.get(\lr)?TokenSmartcontractAddress
            $('.lr-TokenAddress').attr \value, state.get(\lr)?TokenSmartcontractAddress
    
    if state.get(\lr)?EnsDomainHash             != sha-zero => $('.lr-ensDomain').attr \value,                  state.get(\lr)?EnsDomainHash


    if state.get(\lr)?installments_count        != \0 => $('.lr-installments-count').attr \value,      +bigNum-toStr state.get(\lr)?installments_count      
    if state.get(\lr)?installments_period_days  != \0 => $('.lr-installments-period').attr \value,     +bigNum-toStr state.get(\lr)?installments_period_days
    if state.get(\lr)?installment_index         != \0 => $('.lr-installments-next-date').attr \value,  +bigNum-toStr state.get(\lr)?installment_index       


    $('.lr-TokenName').attr \value,     state.get(\lr)?TokenName
    $('.lr-TokenInfoLink').attr \value, state.get(\lr)?TokenInfoLink     

    b-text = smart-contract-converter(state.get(\token-address)||state.get(\lr)?TokenSmartcontractAddress) 
    if b-text => $(\.show-tokens).text b-text

Template.loan_request.events do 
    'click .set-data':-> 
        out = {}
        out.installments_count  = +$(\.installment-slider).attr \value  
        out.installments_period = +$(\.period-slider).attr \value 
 

        if state.get(\lr)?currency == 0
            out.ethamount = eth-to-wei $(\.lr-WantedWei).val!
            out.premium   = eth-to-wei $(\.lr-PremiumWei).val!

        else 
            out.ethamount =  (+$(\.lr-WantedWei).val! ) * 100
            out.premium   =  (+$(\.lr-PremiumWei).val!) * 100


        out.bor       = $(\.lr-Borrower).val!
        out.len       = $(\.lr-Lender).val!

        out.tokamount = +$(\.lr-TokenAmount).val!   || 0
        out.tokname   = smart-contract-converter(state.get \token-address) || ''
        out.smart     = state.get \token-address
        out.link      = $(\.lr-TokenInfoLink).val! || ''

        out.ensDomainHash = $(\.lr-ensDomain).val! || 0

        
        console.log \out.ethamount: out.ethamount
        console.log \out.tokamount: out.tokamount
        console.log \out.premium: out.premium
        console.log \out.tokname: out.tokname
        console.log \out.link: out.link
        console.log \out.smart: out.smart
        console.log \out.installments_count: out.installments_count
        console.log \out.installments_period: out.installments_period
        console.log \out.ensDomainHash: out.ensDomainHash

        lr.setData(state.get \address )(
            out.ethamount,
            out.tokamount,                    
            out.premium,             
            out.tokname,            
            out.link,
            out.smart,
            out.installments_count,
            out.installments_period,
            out.ensDomainHash,
            goto-success-cb
        )  


    'click .lender-pay':-> 
        console.log \NeededSumByLender: state.get(\NeededSumByLender)

        transact = {
            gasPrice: 200000000000
            from:  web3.eth.defaultAccount
            to:    state.get(\address)
            value: lilNum-toStr state.get(\lr)?neededSumByLender
        }
        console.log \transact: transact
        web3.eth.sendTransaction transact, goto-success-cb

    'click .borrower-cancel':-> 
        lr.returnTokens(state.get(\address)) goto-success-cb

    'click .transfer-tokens':->
        if state.get(\lr)?isEns == false
            lr.checkTokens(state.get(\address)) goto-success-cb
        if state.get(\lr)?isEns
            # lr.checkDomain(state.get(\address)) goto-success-cb
            web3.eth.contract(config.LRABI).at(state.get(\address)).checkDomain({from:web3.eth.defaultAccount,  gasPrice:20000000000}, goto-success-cb)

    'click .token-item-view':(event, target)-> 
        if $(event.target).has-class \site-link
            window.location.href = $(event.target).attr \href
        if state.get(\lr).State != 0 
            return event.prevent-default!

        if web3.eth.defaultAccount != state.get(\lr)?Borrower
            return event.prevent-default!

        $('#exampleModalLong').modal('hide')
        $(\.modal-backdrop).remove!
        addr = $(event.target).attr(\name) || $(event.target).parents(\.token-item-view).attr(\name)
        console.log \addr: addr
        state.set \token-address addr

        b-text = smart-contract-converter addr
        $(\.show-tokens).text b-text


    'click .show-tokens':->
        $('#exampleModalLong').modal!

    'click .return-tokens':->
        transact = {
            from:  web3.eth.defaultAccount
            to:    state.get(\address)
            value: lilNum-toStr state.get(\lr)?neededSumByBorrower
            #             gasPrice:150000000000
        }
        console.log \transact: transact
        
        state.set \transact-to-address state.get(\address)
        state.set \transact-value bigNum-toStr state.get(\NeededSumByBorrower)
        state.set \show-finished-text true
        web3.eth.sendTransaction transact, goto-success-cb




    'click .get-tokens':->
        lr.requestDefault(state.get(\address)) goto-success-cb


    'input .input':~> 
        $T = $(event.target)
        name = $T.attr \ident
        test =~> 
            if it is true
                $T.parents(\section).find(\.gpin).remove-class(\hidden)
                $T.parents(\section).find(\.rpin).add-class(\hidden)
                state.set("#{name}-rpin" true); state.set("#{name}-gpin" false)
            else 
                $T.parents(\section).find(\.gpin).add-class(\hidden)
                $T.parents(\section).find(\.rpin).remove-class(\hidden)
            return 

        cls = $T.attr(\class) |> split ' ' |> last

        
        if cls==\lr-TokenAmount && state.get(\lr)?isToken => test IntQ $T.val!
        # if cls==\lr-TokenName   && state.get(\lr)?isToken => test $T.val!length > 0
        if cls==\lr-ensDomain   && state.get(\lr)?isEns   => test ShaQ $T.val!
        if cls==\lr-TokenSmartcontractAddress && state.get(\lr)?isToken => test EthQ $T.val!
       
        if cls==\lr-WantedWei   => test IntQ $T.val!
        if cls==\lr-DaysToLen   => test IntQ $T.val!
        if cls==\lr-PremiumWei  => test IntQ $T.val!
        

        if Everything_is_ok! => $(\.set-data).remove-attr \disabled
        else $(\.set-data).attr \disabled, \disabled

    'keydown .block-input':-> event.prevent-default!


    'click .update-rate':->
        web3.eth.contract(config.TICKER-ABI).at(config.ETH_TICKER_ADDRESS).updateEthToUsdRate {from:web3.eth.defaultAccount, gasPrice:15000000000, value:50000000000000000}, goto-success-cb


Everything_is_ok=->
    ok = true
    test =-> if it is false => ok := false

    for el in $(\.input)
        cls = $(el).attr(\class) |> split ' ' |> last
        
        if cls==\lr-WantedWei   => test IntQ $(el).val!
        if cls==\lr-DaysToLen   => test IntQ $(el).val!
        if cls==\lr-TokenAmount && state.get(\lr)?isEns == false => test IntQ $(el).val!
        if cls==\lr-TokenName   && state.get(\lr)?isEns == false => test $(el).val!length > 0
        if cls==\lr-ensDomain   && state.get(\lr)?isEns == true  => test ShaQ $(el).val!
        if cls==\lr-PremiumWei  => test IntQ $(el).val!
        if cls==\lr-TokenSmartcontractAddress && state.get(\lr)?isEns == false => test EthQ $(el).val!
        console.log cls, \ok:, ok
    ok

check-set-data-out =(out,cb)->  # TODO: check set-data 
    cb(null, out)

set-data-cb =(err,res)->
    # location.reload!
    res                  

@disableQ =-> (!state.get(\IamBorrower) || !!state.get(\lr-State))

@highlightQ =-> 
    if it is state.get \lr-State then \block-scheme-element-highlighted else ''
    if it is state.get \lr-State then \block-scheme-element-highlighted else ''

input-fields-column =->
    field-array = []
    rep = state.get(\bor-balance)

    if (state.get(\lr)?currency == 0)
        if (not state.get(\lr)?isEns) && (not state.get(\lr)?isRep)
            field-array.push c:'lr-WantedWei'                                     n:'Amount (ETH)'                 d:disableQ!, placeholder:'0.00 Eth'     
            # field-array.push c:'lr-TokenName'   n:'Token name'       d:disableQ!                                
            
            # field-array.push c:'input-primary-short lr-TokenSmartcontractAddress' n:'Token smart contract'       d:disableQ!                                      
            # field-array.push c:'lr-TokenInfoLink'                                 n:'Token info link (optional)' d:disableQ!
            field-array.push c:'lr-TokenAmount' n:'Token amount'     d:disableQ!, placeholder:'0'      

        if (state.get(\lr)?isEns)
            field-array.push c:'lr-WantedWei'                                     n:'Amount (ETH)'                 d:disableQ!, placeholder:'0.00 Eth'     
            field-array.push c:'lr-ensDomain'   n:'ENS Domain Hash'  d:disableQ!                                
      
        if (state.get(\lr)?isRep)
            field-array.push c:'lr-WantedWei block-input'   n:'Amount (ETH)'       d:disableQ!, placeholder:'0.00 Eth' type:\number step:0.01, maxi:(+rep), mini:0, v:(+bigNumToStr(state.get('lr').WantedWei)||rep)
      
        field-array.push c:'lr-PremiumWei'                                    n:'Premium (ETH)'             d:disableQ!, placeholder:'0.00 Eth'       

    if (state.get(\lr)?currency == 1)

        if (not state.get(\lr)?isEns) && (not state.get(\lr)?isRep)
            field-array.push c:'lr-WantedWei'                                     n:'Amount (USD)'                 d:disableQ!, placeholder:'0.00 Usd'     
            # field-array.push c:'lr-TokenName'   n:'Token name'       d:disableQ!                                
            
            # field-array.push c:'input-primary-short lr-TokenSmartcontractAddress' n:'Token smart contract'       d:disableQ!                                      
            
            # field-array.push c:'lr-TokenInfoLink'                                 n:'Token info link (optional)' d:disableQ!

            field-array.push c:'lr-TokenAmount' n:'Token amount'     d:disableQ!, placeholder:'0'      

        if (state.get(\lr)?isEns)
            field-array.push c:'lr-WantedWei'                                     n:'Amount (SUD)'                 d:disableQ!, placeholder:'0.00 Usd'     
            field-array.push c:'lr-ensDomain'   n:'ENS Domain Hash'  d:disableQ!                                
      
        if (state.get(\lr)?isRep)
            field-array.push c:'lr-WantedWei block-input'   n:'Amount (USD)'       d:disableQ!, placeholder:'0.00 Usd' type:\number step:0.01, maxi:(+rep), mini:0, v:(+bigNumToStr(state.get('lr').WantedWei)||rep)
      
        field-array.push c:'lr-PremiumWei'                    n:'Premium (USD)'             d:disableQ!, placeholder:'0.00 Usd'       
        field-array.push c:'lr-usdrate input-primary-short'   n:'Usd to Eth rate'            d:true
    
    field-array.push c:'lr-Borrower input-primary-short'  n:'Borrower'             d:true       red-dot:state.get(\IamBorrower)
    # field-array.push c:'bor-balance input-primary-short'  n:'Borrower reputation'  d:true       red-dot:state.get(\IamBorrower)
    field-array.push c:'lr-Lender input-primary-short'    n:'Lender'               d:true       red-dot:state.get(\IamLender)

    if state.get(\lr)?State != 0
        field-array.push c:'lr-installments-count input-primary-short'     n:'Installments paid'               d:true v:"#{state.get(\lr)?installments_paid} of #{state.get(\lr)?installments_count}"
        field-array.push c:'lr-installments-period input-primary-short'    n:'Installment Period (days)' d:true v:state.get(\lr)?installments_period_days     
        field-array.push c:'lr-installments-left input-primary-short'    n:'Days to pay left' d:true v:state.get(\lr)?days_left     
        # field-array.push c:'input-primary-short lr-TokenName' n:'Token name'                 d:disableQ!
        # field-array.push c:'input-primary-short lr-TokenAddress' n:'Token smart contract'       d:disableQ!

        # field-array.push c:'lr-installments-next-date input-primary-short' n:'Next Installment date'     d:true v:state.get(\lr)?installment-date



    map input-unit, field-array

input-unit =-> section style:'height:27px',
    h3 class:\input-key, 
        if it.red-dot   => red-dot!
        it.n
    input id:it.ident, type:it?type||\text, step:it?step, max:it?maxi, min:it?mini, ident:it.ident, style:'max-height:35px' class:"input #{it?c||''}" placeholder:it?placeholder, value:it?v, disabled:it.d 
    grn-pin!       
    red-pin!      

tokens-select=-> section style:'height:27px',
    h3 class:\input-key, 'Token name'
    button class:'show-tokens', 'Select'
        
        
@ensQ =-> 
    if state.get(\lr)?isToken => &0
    else if state.get(\lr)?isEns => &1
    else &2