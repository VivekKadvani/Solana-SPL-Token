import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

(async () => {

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const tokenAccounts = await connection.getTokenAccountsByOwner(
        new PublicKey('n9HutCwzaBhwzs74Ky2L725aCBgunix8hMeRt2QJyb3'),
        {
            programId: TOKEN_PROGRAM_ID,
        }
    );

    console.log("Token                                         Balance");
    console.log("------------------------------------------------------------");
    tokenAccounts.value.forEach((tokenAccount) => {

        const accountData = AccountLayout.decode(tokenAccount.account.data);
        const amount = accountData.amount.readBigUInt64LE(0).toString();
        const amountInDecimals = (amount / 1e9).toFixed(2);
        console.log(`${new PublicKey(accountData.mint)}   ${amountInDecimals}`);
    })

})();

/*
Token                                         Balance
------------------------------------------------------------
7e2X5oeAAJyUTi4PfSGXFLGhyPw2H8oELm1mx87ZCgwF  84
AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM  100
AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM  0
AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM  1
*/