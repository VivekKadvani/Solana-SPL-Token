import { MintLayout, NATIVE_MINT, getAssociatedTokenAddressSync, getMint, mintTo } from '@solana/spl-token';
import { web3 } from "@coral-xyz/anchor";

export function getPubkeyFromStr(key) {
    try {
        return new web3.PublicKey(key)
    } catch (pubkeyParseError) {
        debug({ pubkeyParseError })
        return null
    }
}

const getPoolStateAccount = async ({ baseMint, quoteMint, owner }) => {
    const programId = getPubkeyFromStr("EfvcCE4Rbc7RKje2XYLP2neLy4ourjBsefgcjBhrE3r7")
    return web3.PublicKey.findProgramAddressSync([
        Buffer.from('pool'),
        baseMint.toBuffer(),
        quoteMint.toBuffer(),
    ], programId)[0]
}

const main = async (owner, base, quate) => {
    try {


        const creator = getPubkeyFromStr(owner)
        console.log("creator:", creator.toBase58());

        const baseMint = getPubkeyFromStr(base)
        console.log("baseMint:", baseMint.toBase58());

        const quoteMint = getPubkeyFromStr(quate)
        console.log("quoteMint:", quoteMint.toBase58());

        const poolState = await getPoolStateAccount({ baseMint, quoteMint, owner: creator })
        console.log("poolState:", poolState.toBase58());

        const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolState, true)
        console.log("reserverBaseAta:", reserverBaseAta.toBase58());

        const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolState, true)
        console.log("reserverQuoteAta:", reserverQuoteAta.toBase58());

        console.log("reserverBaseAta:", reserverBaseAta.toBase58());
        console.log("reserverQuoteAta:", reserverQuoteAta.toBase58());
    }
    catch (e) {
        console.log("eeror in this lines............:");
        console.log(e);


    }



}
await main(
    "n9HutCwzaBhwzs74Ky2L725aCBgunix8hMeRt2QJyb3",
    "BrJiakCxfumyWy2JaopdZJAq3ckphxCXMivYQTP2VHoE",
    "So11111111111111111111111111111111111111112"
)