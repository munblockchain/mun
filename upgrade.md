# How to upgrade to mun-upgrade-v2
## 1. Vote 'yes' to upgrade proposal
```
mund tx gov vote [proposal_id] yes --from [wallet_name] --chain-id testmun --keyring-backend test -y
```

## 2. Upgrade binary
```
 wget -O update.sh https://raw.githubusercontent.com/munblockchain/mun/main/mupgrade.sh && chmod +x update.sh && sh update.sh
```

## 3. Done, It will be upgraded when Munchain reaches to the upgrade block height. 
