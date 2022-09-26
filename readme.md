# How to join Munchain network
## Infrastructure
```
**Recommended configuration:**
- Number of CPUs: 4
- Memory: 16GB
- OS: Ubuntu 22.04 LTS
- Allow all incoming connections from TCP port 26656 and 26657
Static IP address
- The recommended configuration from AWS is the equivalent of a t2.large machine
with 300GB EBS attached storage.
```

## Installing prerequisites
```
sudo apt update
sudo apt upgrade -y
sudo apt install build-essential jq -y
```

## Install Golang:

## Install latest go version https://golang.org/doc/install
```
wget -q -O - https://raw.githubusercontent.com/canha/golang-tools-install-script/master/goinstall.sh | bash -s -- --version 1.18
source ~/.profile
```

## To verify that Golang installed
```
go version
```
// Should return go version go1.18 linux/amd64

## Clone repository
```
git clone https://github.com/munblockchain/mun
cd mun
```

## Install the executables

```
sudo rm -rf ~/.mun
go mod tidy
make install

clear

mkdir -p ~/.mun/upgrade_manager/upgrades
mkdir -p ~/.mun/upgrade_manager/genesis/bin
```

## Symlink genesis binary to upgrade
```
cp $(which mund) ~/.mun/upgrade_manager/genesis/bin
sudo cp $(which mund-manager) /usr/bin
```

## Initialize the validator with a moniker name (Example moniker_name: solid-moon-rock)
```
mund init [moniker_name] --chain-id testmun
```

## Add a new wallet address, store seeds and buy TMUN to it. (Example wallet_name: solid-moon-rock)
```
mund keys add [wallet_name] --keyring-backend test
```

## Fetch genesis.json from genesis node
curl --tlsv1 https://node1.mun.money/genesis? | jq ".result.genesis" > ~/.mun/config/genesis.json

## Update seed in config.toml to make p2p connection
```
nano ~/.mun/config/config.toml
seeds = "b4eeaf7ca17e5186b181885714cedc6a78d20c9b@167.99.6.48:26656"
```

## Replace stake to TMUN
```
sed -i 's/stake/utmun/g' ~/.mun/config/genesis.json
```

## Create the service file "/etc/systemd/system/mund.service" with the following content
```
sudo nano /etc/systemd/system/mund.service
```

## Paste following content(*Please make sure to use correct name of user, group and DAEMON_HOME path at the below.)
```
[Unit]
Description=mund
Requires=network-online.target
After=network-online.target

[Service]
Restart=on-failure
RestartSec=3
User=root
Group=root
Environment=DAEMON_NAME=mund
Environment=DAEMON_HOME=/root/.mun
Environment=DAEMON_ALLOW_DOWNLOAD_BINARIES=on
Environment=DAEMON_RESTART_AFTER_UPGRADE=on
PermissionsStartOnly=true
ExecStart=/usr/bin/mund-manager start --pruning="nothing" --rpc.laddr "tcp://0.0.0.0:26657"
StandardOutput=file:/var/log/mund/mund.log
StandardError=file:/var/log/mund/mund_error.log
ExecReload=/bin/kill -HUP $MAINPID
KillSignal=SIGTERM
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
```
**Tips**
- How to get user and group name
```
whoami
```
- How to get DAEMON_HOME path
```
cd ~/.mun
pwd
```

## Create log files and starts running the node
```
make log-files

sudo systemctl enable mund
sudo systemctl start mund
```

## Verify node is running properly
```
mund status
```

## After buying TMUN, stake it to become a validator.
**Tips**

You should wait until the node gets fully synchronized with other nodes. You can cross check with the genesis node by visiting https://node1.mun.money/status and check the latest block height. You can also check your node status through this link http://[Your_Node_IP]:26657/status.

Or visit https://blockexplorer.mun.money


**A transaction to become a validator by staking 50K TMUN**

```
mund tx staking create-validator --from [wallet_name] --moniker [moniker_name] --pubkey $(mund tendermint show-validator) --chain-id testmun --keyring-backend test --amount 50000000000utmun --commission-max-change-rate 0.01 --commission-max-rate 0.2 --commission-rate 0.1 --min-self-delegation 1 --fees 200000utmun --gas auto --gas=auto --gas-adjustment=1.5 -y
```
