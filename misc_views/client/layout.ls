template \layout -> 
    html lang:\en,
        head do
            meta charset:\UTF-8
            title {}, "EthLend"
        body do
            header_blaze do
                a class:\logo href:\/main/1,
                    img class:\logo-image src:\/img/logo.png alt:'EthLend logo'
                nav class:\navigation,
                    D "nav-link-wrapper",
                        a class:"nav-link js-gitter-toggle-chat-button", "Chat"
                    D "nav-link-wrapper #{if state.get(\selected-class)==\main => \selected  }",
                        a class:\nav-link href:\/main/1, "All Loan Requests"
                    D "nav-link-wrapper #{if state.get(\selected-class)==\funded => \selected  }",
                        a class:\nav-link href:\/funded/1, "Funded Loan Requests"
                    D "nav-link-wrapper #{if state.get(\selected-class)==\new-loan => \selected  }",
                        span class:"glyphicon glyphicon-plus-sign" aria-hidden:"true" style:'color:white; position:relative; left:15px; top:2px;'
                        a class:'nav-link with-icon' href:\/new-loan-request, "New Loan Request"
                    D "nav-link-wrapper #{if state.get(\selected-class)==\info => \selected } #{if state.get(\selected-class)==\loan => \pseudo-selected }",
                        a class:\nav-link href:\/info, "Info"
#       CHECK FOR WEB3 do
            div class:'main-shell', 
                
                SI @lookupTemplate \yield


        footer do
            div class:\footer-nav,
                a class:\footer-link href:\/main/1, "Home"
                a class:\footer-link href:'http://about.ethlend.io', "About EthLеnd"
                a class:\footer-link href:'/faq', "FAQs"
            p class:\footer-inscription, "EthLend ©2017"


Template.layout.events do 
    'click .nav-link-wrapper':->
        $(\.selected).remove-class(\selected)
        $(event.target).add-class(\selected)

    # 'mouseover .nav-link-wrapper':->
    #     $(\.selected).remove-class(\selected)
    #     $(event.target).add-class(\selected)




Template.layout.rendered=->
    console.log web3.eth.defaultAccount

    ((i, s, o, g, r, a, m) ->
      i.'GoogleAnalyticsObject' = r
      i[r] = i[r] || ->
        (i[r].q = i[r].q || []).push arguments
        return 
      i[r].l = 1 * new Date
      a = s.createElement o
      m = (s.getElementsByTagName o).0
      a.async = 1
      a.src = g
      m.parentNode.insertBefore a, m
      return ) window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga'

    ga 'create', 'UA-102004013-2', 'auto'

    ga 'send', 'pageview'

    script = document.createElement 'script'
    script.setAttribute 'type', 'text/javascript'
    script.setAttribute 'src', 'https://sidecar.gitter.im/dist/sidecar.v1.js'
    script.setAttribute 'defer', 'defer'
    script.setAttribute 'async', 'async'
    (document.getElementsByTagName 'head').0.appendChild script
    ((window.gitter = {}).chat = {}).options = {
        room: 'ethlend/lobby',
        activationElement: false
    }

    state.set \addr (Router.current!originalUrl |> split \/)

    state.set \addr-last (state.get(\addr) |> last )
    state.set \addr-prelast (state.get(\addr) |> initial |> last )

    state.set \main-class     if (state.get(\addr-prelast)==\main)          => \selected else ''
    state.set \info-class     if (state.get(\addr-last)==\info)             => \selected else ''
    state.set \new-loan-class if (state.get(\addr-last)==\new-loan-request) => \selected else ''
    

# check-web=(eld, nom)~>

Template.layout.rendered=->
    #Notify if MetaMask is not installed
    if !web3? =>
                   link = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
                   swal {
                     title: 'Metamask is not installed'
                     text: 'This site requires Metamask to use it\'s full functionality. Download the plugin for Google Chrome.'
                     icon: 'warning'
                     showCancelButton: true
                     close: false
                     buttons: [cancel: "Continue without it", download: "Get it here"]
                     dangerMode: true
                   }, (download) ->
                     if download then window.location.href = link;
                     return

    if web3 and web3.eth => web3.version.getNetwork ((err, netId) ->
                              if netId is '1'
                                web3.eth.getAccounts ((err, accounts) ->
                                  if err isnt null
                                    console.log 'An error occurred: ', err
                                  else
                                  #Notify when not logged in to MetaMask
                                    if accounts.length is 0
                                      swal {
                                        title: 'Log in to Metamask'
                                        text: 'You are not logged in to MetaMask. Log in to use the full functinality of the application.'
                                        icon: 'info'
                                      }
                                    else
                                    #Notify if user MetaMask account balance 0
                                      web3.eth.getBalance accounts.0, (error, result) ->
                                        if error
                                          return
                                        else
                                          console.log 'result answer: ', result.c[0]
                                          if result.c[0] is 0
                                            swal {
                                              title: 'Account balance'
                                              text: 'Your account balance is ' + result
                                              icon: 'info'
                                            }
                                        return
                                  return )
                              else
                              #Notify if user is on Testnet and ask to switch to mainnet
                                if netId is '3'
                                  swal {
                                    title: 'Ropsten test network'
                                    text: 'You are connected to the Ropsten test network. Please switch to Main network to make loans.'
                                    icon: 'info'
                                  }
                                else
                                  if netId is '4'
                                    swal {
                                      title: 'Rinkeby test network'
                                      text: 'You are connected to the Rinkeby test network. Please switch to Main network to make loans.'
                                      icon: 'info'
                                    }
                                  else
                                    if netId is '42'
                                      console.log 'This is the Kovan test network.'
                                      swal {
                                        title: 'Kovan test network'
                                        text: 'You are connected to the Kovan test network. Please switch to Main network to make loans.'
                                        icon: 'info'
                                      }
                                    else
                                      swal {
                                        title: 'Unknown network'
                                        text: 'You are connected to an unknown network. Please switch to Main network to make loans.'
                                        icon: 'info'
                                      }
                              return )

    script = document.createElement 'script'
    script.setAttribute 'type', 'text/javascript'
    script.setAttribute 'src', 'https://sidecar.gitter.im/dist/sidecar.v1.js'
    script.setAttribute 'defer', 'defer'
    script.setAttribute 'async', 'async'
    (document.getElementsByTagName 'head').0.appendChild script
    ((window.gitter = {}).chat = {}).options = {
        room: 'ethlend/lobby',
        activationElement: false
    }

go-cycle=(iterator, eld)~> 
    unless web3?
        if iterator < 50
            Meteor.setTimeout (-> iterator +=1; console.log(\web3-loading:,iterator);  go-cycle!), 20
                
        else no_metamask!
    else 
        state.set \defaultAccount web3?eth?defaultAccount
        console.log \done
        eld