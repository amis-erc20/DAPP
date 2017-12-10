# Ethlend (meteor DAPP)

Copyright ETHLend.io


### Testnet

1. Reputation (current): 0xcada084bcc7cfea1d537ee157b7100d2770da995
1. Ledger (current):     0x8fd7897cecb799fc72204b16ab4e6d8546f4c42f
1. EthTicker:            0x0d9958ad3599571B239AFD323B2a464AdB03949a
1. ENS:                  0xAbb8c817E5aAa66dEe3Da53ec4c6baBFc1A97bFe
1. Sample token:         0x6C1Da3CAae658107c7a4A39348dADaD82fA58839
1. Registrar:            0x21743aF8370ca95710AAA371959Fa03D643D949B

### Params

```json
"0x04b12cE6512Cce5827e964B00E34E6AD2B9AC852", " 0xcada084bcc7cfea1d537ee157b7100d2770da995", "0xAbb8c817E5aAa66dEe3Da53ec4c6baBFc1A97bFe", "0x21743aF8370ca95710AAA371959Fa03D643D949B", "0x0d9958ad3599571B239AFD323B2a464AdB03949a"
```

address _whereToSendFee,     address _repTokenAddress, 
                     address _ensRegistryAddress, address _registrarAddress,
                     address _ethTickerAddress


### TODO

##### Installment

```livescript
    .newLr type, currency, inst-count, inst-period
```

Касательно логики работы next-installment-date. В контракте должна фиксироваться дата fund, и именно с нее нужно отсчитывать периоды и даты следующих платежей.