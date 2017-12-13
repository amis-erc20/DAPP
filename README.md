# Ethlend (meteor DAPP)

Copyright ETHLend.io


### Testnet

1. Reputation (current): 0x5246Bd797AeE3c5f0865b9c108330A0b9368f581
1. Ledger (current):     0xd70ab45fD47026D7d5c2d6592bac31BEB5fe95b0
1. EthTicker:            0x0d9958ad3599571B239AFD323B2a464AdB03949a
1. ENS:                  0xAbb8c817E5aAa66dEe3Da53ec4c6baBFc1A97bFe
1. Sample token:         0x6C1Da3CAae658107c7a4A39348dADaD82fA58839
1. Registrar:            0x21743aF8370ca95710AAA371959Fa03D643D949B

### Params 

```json
"0x04b12cE6512Cce5827e964B00E34E6AD2B9AC852", "0x5246Bd797AeE3c5f0865b9c108330A0b9368f581", "0xAbb8c817E5aAa66dEe3Da53ec4c6baBFc1A97bFe", "0x21743aF8370ca95710AAA371959Fa03D643D949B", "0x0d9958ad3599571B239AFD323B2a464AdB03949a"
```


0x3cbb9b1579464637772e629298de8dbe7ed

address _whereToSendFee,     address _repTokenAddress, 
                     address _ensRegistryAddress, address _registrarAddress,
                     address _ethTickerAddress


### TODO

##### Installment

```livescript
    .newLr type, currency, inst-count, inst-period
```

Касательно логики работы next-installment-date. В контракте должна фиксироваться дата fund, и именно с нее нужно отсчитывать периоды и даты следующих платежей.