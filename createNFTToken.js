//This snippet is for transferring pre existing token to the other user , just need to replace token address and receiver address
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer, mintTo, createMint } from '@solana/spl-token';
import fs from 'fs';


const tokenAddress = 'BrJiakCxfumyWy2JaopdZJAq3ckphxCXMivYQTP2VHoE'
const receiverWalletAddress = '9z1Bg8yn7BRPav5e2wpM4sSDfPicKPCjpT3Uat2aqFyr'


// Load the keypair from id.json
const loadKeypair = (filePath) => {
    const secretKey = JSON.parse(fs.readFileSync(filePath));
    return Keypair.fromSecretKey(Uint8Array.from(secretKey));
};

const sendToken = async () => {
    // Connect to cluster
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Load existing wallet keypair
    const fromWallet = loadKeypair('./id.json');

    // Log the public key for confirmation
    console.log(`Using wallet: ${fromWallet.publicKey.toBase58()}`);



    const mint = await createMint(
        connection,
        fromWallet,
        fromWallet.publicKey,
        fromWallet.publicKey,
        0
    );

    console.log("token created successfully...");


    // existing token address
    const tokenMintAddress = mint

    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
    );
    console.log("Created token account :", associatedTokenAccount.address.toBase58());


    await mintTo(
        connection,
        fromWallet,
        mint,
        associatedTokenAccount.address,
        fromWallet,
        10
    );




    // Receiver's public key (existing user)
    const receiverPublicKey = new PublicKey(receiverWalletAddress);

    // Ensure the wallet has enough SOL
    const balance = await connection.getBalance(fromWallet.publicKey);
    console.log(`Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);

    if (balance === 0) {
        console.log("Insufficient balance. Please fund the wallet.");
        return;
    }


    // Check if the sender already has a token account
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        tokenMintAddress,
        fromWallet.publicKey
    );
    console.log(`Sender Token Account: ${fromTokenAccount.address.toBase58()}`);

    // Get or create the receiver's token account
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        tokenMintAddress,
        receiverPublicKey
    );
    console.log(`Receiver Token Account: ${toTokenAccount.address.toBase58()}`);

    // Transfer tokens from the sender to the receiver
    const transferAmount = 1; // Adjust based on your token decimals
    const transferSignature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        transferAmount
    );
    console.log('Transfer transaction signature:', transferSignature);

}

await sendToken()