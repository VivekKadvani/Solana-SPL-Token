import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createMetadataAccountV3,
  updateMetadataAccountV2,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  fromWeb3JsPublicKey,
  fromWeb3JsKeypair,
} from '@metaplex-foundation/umi-web3js-adapters';
import {
  // PublicKey,
  createSignerFromKeypair,
  none,
  signerIdentity,
  some,
} from '@metaplex-foundation/umi';
import * as web3 from '@solana/web3.js';
//default signer keypair
import { keypair } from './user-keypair.js';

function loadWalletKey(secret) {
  const tempArraySecret = Object.values(secret);
  const secret2 = new Uint8Array(tempArraySecret);
  const account = web3.Keypair.fromSecretKey(secret2);
  return account;
}

const INITIALIZE = true;

async function main() {
  console.log("let's name some tokens in 2024!");
  console.log(keypair);
  //load default signer keypair
  const myKeypair = loadWalletKey(keypair);
  //after creating simple spl-token put that address here
  const mint = new web3.PublicKey(
    '9ZSWcy2oDAfkgPWyreMi9wLegTKHqpfP7DdghbRTYeRm',
  );

  const umi = createUmi('https://api.devnet.solana.com');
  const signer = createSignerFromKeypair(umi, fromWeb3JsKeypair(myKeypair));
  umi.use(signerIdentity(signer, true));

  // here is metadata modify it as per your choice
  const ourMetadata = {
    // TODO change those values!
    name: 'Reward Token',
    symbol: 'RPT',
    uri: 'https://raw.githubusercontent.com/VivekKadvani/test-nft-data/main/example.json',
  };
  // https://raw.githubusercontent.com/VivekKadvani/test-nft-data/blob/main/metadata.json
  const onChainData = {
    ...ourMetadata,
    // we don't need that
    sellerFeeBasisPoints: 0,
    creators: none(),
    collection: none(),
    uses: none(),
  };
  if (INITIALIZE) {
    const accounts = {
      mint: fromWeb3JsPublicKey(mint),
      mintAuthority: signer,
    };
    const data = {
      isMutable: true,
      collectionDetails: null,
      data: onChainData,
    };
    const txid = await createMetadataAccountV3(umi, {
      ...accounts,
      ...data,
    }).sendAndConfirm(umi);
    console.log(txid);
  } else {
    const data = {
      data: some(onChainData),
      discriminator: 0,
      isMutable: some(true),
      newUpdateAuthority: none(),
      primarySaleHappened: none(),
    };
    const accounts = {
      metadata: findMetadataPda(umi, { mint: fromWeb3JsPublicKey(mint) }),
      updateAuthority: signer,
    };
    console.log("Metadata acc :", accounts.metadata);

    const txid = await updateMetadataAccountV2(umi, {
      ...accounts,
      ...data,
    }).sendAndConfirm(umi);
    console.log(txid);
  }
}

main();
