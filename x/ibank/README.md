# IBANK

The ``IBANK`` module is a custom module that allows secure transfer of tokens between brokers. The module is designed for scenarios where the sender wishes to send tokens with a password that the receiver must know to receive the coins. `ibank` allows brokers to easily send funds from one to another, with added security and peace of mind.

## Features

- Secure transfer of tokens between brokers
- Encrypted password for the receiver to retrieve funds
- Tokens are locked in the module throughout the transfer process
- Funds will automatically return to the sender if the duration expires or max retry limit exceeds.