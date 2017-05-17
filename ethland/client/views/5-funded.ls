Router.route \funded, path: \/funded/:page

template \funded -> main_blaze do
    D \card-wrapper D \card-wrapper-aligned,
        progress-bar!
        D "#{state.get \quartet-class }",
            map card-template, state.get(\quartet)||[]
    
        button class:"#{state.get \left-arrow-class } arrow arrow-left glyphicon glyphicon-chevron-left" disabled:!!state.get(\left-arrow-class)
        button class:"#{state.get \right-arrow-class } arrow arrow-right glyphicon glyphicon-chevron-right"

card-template =-> a class:\card href:"/loan-request/#{it?id}",
    div class:\card-header,
        if it.WantedWei => div class:\card-header,
            h3 class:\card-header-amount, "#{it.WantedWei} Eth"
            h3 class:\card-header-inscription, "#{it?TokenName} (#{it?TokenAmount})"
        else if it.Borrower == web3?eth?defaultAccount => div class:\card-header, 
            h3 class:\card-header-amount, "Please, set the data"

        else div class:\card-header, 
            h3 class:\card-header-amount, "Data must be set by the Borrower"

    div class:\card-body,
        if web3.eth.defaultAccount == it.Borrower
            img class:\img-dot src:\/img/red_dot.svg alt:''
        h4 class:\card-key, "Borrower"
        p class:\card-value, it.Borrower
            
        h4 class:'card-key font-weight-normal', "Lender"
            p class:\card-value, if it.Lender != big-zero => it.Lender else \–––
        div class:'card-state float-left',
            h4 class:'card-key font-weight-normal', "State"
            p class:\card-value, state-int-to-str it?State

empty-list =-> div style:'padding:100px' class:\container ,
    h1 style:'font-size:50px; display:block', 'No loan requests'
    p style:'font-size:20px; padding-top:15px;padding-bottom:15px', 'That is no loan requests here.'

get-card-data =(number, cb)->
    ledger.getLr number, ->
        get-all-lr-data(&1)(cb)

progress-bar =(percent)-> div style:'padding:100px; padding-right:120px' class:"#{state.get \progress-class } container" ,
    h1 style:'font-size:50px; display:block', 'Recieving... data'
    p style:'font-size:20px; padding-top:15px;padding-bottom:15px', 'Please wait for the data to be downloaded from the Ethereum network'
    div class:\progress style:'width:70%',
        div class:"progress-bar progress-bar-striped active" role:"progressbar" aria-valuenow:"#percent" aria-valuemin:"0" aria-valuemax:"100" style:"width:#{state.get \percent }%"
        span class:"sr-only", "#{state.get \percent } Complete"

create-quartet=(start,cb)-> # TODO: свернуть рукурентно
    out = []
    if state.get(\percent)==0 => ledger.getLr start, ->
        if &1 == big-zero => return cb(null,out)
        id = &1
        get-all-lr-data(&1) ->
            if state.get(\percent)==0 => state.set \percent 25
            console.log state.get(\percent)
            &1.id = id
            out.push &1
           
            ledger.getLr start+1, ->
                if &1 == big-zero => return cb(null,out)
                id = &1
                get-all-lr-data(&1) ->
                    if state.get(\percent)==25 => state.set \percent 50
                    console.log state.get(\percent)
                    &1.id = id
                    out.push &1
             
                    ledger.getLr start+2, ->
                        if &1 == big-zero => return cb(null,out)
                        id = &1
                        get-all-lr-data(&1) ->
                            if state.get(\percent)==50 =>state.set \percent 75
                            console.log state.get(\percent)
                            &1.id = id
                            out.push &1
                  
                            ledger.getLr start+3, ->
                                if &1 == big-zero => return cb(null,out)
                                id = &1
                                get-all-lr-data(&1) ->
                                    if state.get(\percent)==75 =>state.set \percent 100
                                    &1.id = id
                                    out.push &1
                                    return cb(null,out)

create-quartet-page=(start)->
    state.set \left-arrow-class  \hidden
    state.set \right-arrow-class \hidden
    state.set \percent 0

    # create-quartet start, (err,res)->
    state.set \quartet-class ''
    state.set \progress-class \hidden
    if +state.get(\page)>1 => state.set \left-arrow-class ''  
    else state.set \left-arrow-class \disabled
    state.set \right-arrow-class ''  
    state.set \quartet []

Template.funded.rendered =->
    
Template.funded.created =->
    state.set \selected-class \funded
    state.set \page (Router.current!originalUrl |> split \/ |> last )    

    if state.get(\percent)==0 or !state.get(\percent)
        state.set \left-arrow-class  \hidden
        state.set \right-arrow-class \hidden
        state.set \percent 0

    rerender!  
    # state.set \currentQuartet 1
    # state.set \requests get-mock-data-arr!

rerender =~> ledger.getLrCount ->
    return &0 if &0
    total-reqs = &1.c.0
    state.set \totalReqs total-reqs
    create-quartet-page((state.get(\page)-1)*4)   



Template.funded.events do
    'click .arrow-right':-> 
        state.set \left-arrow-class  \hidden
        state.set \right-arrow-class \hidden    
        state.set \quartet-class \hidden 
        state.set \progress-class ''
        state.set \percent 0

        state.set \page (+state.get(\page)+1)
        Router.go "/main/#{state.get(\page)}" 
        rerender!
    'click .arrow-left' :-> 
        state.set \left-arrow-class  \hidden
        state.set \right-arrow-class \hidden    
        if +state.get(\page)<2 => event.prevent-default; return
        state.set \percent 0
        state.set \quartet-class \hidden 
        state.set \progress-class ''

        state.set \page (+state.get(\page)-1)
        Router.go "/main/#{state.get(\page)}" 
        rerender!
        

    # 'click .card' :-> 
    #     address = \/loan-request/ + $(event.target).attr(\link)
    #     console.log \address: address
    #     Router.go address