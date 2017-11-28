# Ethlend (meteor DAPP)

Copyright ETHLend.io


### Testnet

1. Reputation (current): 0xE3D8B641067CFb8eA172a00537E00Be818761196
1. Ledger (current):     0xAb32ae850a7598E6ae6951edE224c25ee16eE940
1. EthTicker:            0xb471C18B3859C4735cd28e63f28Ff0ad5364e8f3
1. ENS:                  0xA1564E2F4110815546A3aA681e6e26DE819848e2
1. Sample token:         0x8f8bf891529BB2ea3450695Df75b0553E43bCD7b
1. Registrar:            0x2338c380a0076De45ca84cf9Ab50fBB51B4Db98f

### Params

```json
"0x04b12cE6512Cce5827e964B00E34E6AD2B9AC852", " 0xE3D8B641067CFb8eA172a00537E00Be818761196", "0xA1564E2F4110815546A3aA681e6e26DE819848e2", "0x2338c380a0076De45ca84cf9Ab50fBB51B4Db98f", "0xb471C18B3859C4735cd28e63f28Ff0ad5364e8f3"
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