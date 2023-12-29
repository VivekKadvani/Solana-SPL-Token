# Token Creation with Metadata

This guide outlines the steps to create a token with metadata using a simple SPL-token and the associated commands. Please follow the instructions carefully for a seamless experience.

## Prerequisites

Make sure you have the following set up before proceeding:

- solana-cli installed
- spl-token library installled
- A default user is preconfigured, and their keypair file is required. If running from a different device, update the user-keypair file with the appropriate values.

## Installation

Run the following command to install the necessary dependencies:

```bash
npm install

```

## step-1 : Create Simple SPL-Token

Use the SPL-token CLI to create a simple token:
`spl-token create-token `

## step-2 :Replace Token Values in Code

After creating the token, replace the placeholder values in the code with the actual token details.

## step-3 : Run Code

Execute the following command to run the code:
`node index.js`

## step- 4 : Verify Token Creation

Check the token creation on any explorer to ensure it was successful.

## step- 5 : Create Associate Token Account for User

Generate an associate token account for the user:
`spl-token create-account <token address>`

## step- 6 : Mint Tokens to Your Account

Mint tokens to your account:
`spl-token mint <token address> <tokne ammount>`

## step- 7 : Transfer Tokens to Another Address

If you wish to transfer created tokens to another address, create an associate account for that user and than transfer using this command
`spl-token transfer --fund-recipient <token address> <amount> <receiver address> `
