// const {  Metaplex, keypairIdentity, bundlrStorage } = require("@metaplex-foundation/js");
// const {  Connection, clusterApiUrl, Keypair , PublicKey} = require("@solana/web3.js");

import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey} from "@solana/web3.js";


const connection = new Connection(clusterApiUrl("devnet"));
const wallet = Keypair.generate();

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    // .use(bundlrStorage());
    .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
    }));

// console.log('=====> metadata: ', metaplex, '\n\n')

const getNft_findByMint = async(mintID) => {
    const mint = new PublicKey(mintID);
    const nft = await metaplex.nfts().findByMint(mint);
    console.log('=====> nft: ', nft, '\n\n');

    const imageUrl = nft.metadata.image;
    const supply = nft.originalEdition.supply;
    const maxSupply = nft.originalEdition.maxSupply;
    console.log('=====> getNft_findByMint: ', imageUrl, ' ',  supply.toString(), ' ', maxSupply.toString(), '\n\n');
}



const getNft_findAllByMintList = async(mintIDs) => {
    const mintA = new PublicKey(mintIDs[0]);
    const mintB = new PublicKey(mintIDs[1]);
    const [nft, nftB] = await metaplex.nfts().findAllByMintList([mintA, mintB]);
    
    console.log('=====> getNft_findAllByMintList: ', nftB, '\n\n');

    await nft.metadataTask.run();
    // await nft.EditionTask.run();
    if (nft.isOriginal()) {
        const currentSupply = nft.originalEdition.supply;
        const maxSupply = nft.originalEdition.maxSupply;
        console.log('====> currentSupply: ', currentSupply, '\t maxSupply: ', maxSupply);
    }
    
    if (nft.isPrint()) {
      const parentEdition = nft.printEdition.parent;
      const editionNumber = nft.printEdition.edition;
      console.log('======> parentEdition: ', parentEdition, '\t editionNumber', editionNumber);
    }
}



const getNft_findAllByOwner = async() => {
    // const myNfts = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
    const myNfts = await metaplex.nfts().findAllByOwner(new PublicKey('6nZRR27JKqK1isskNgtib6n6Und7xuJYPhjWfiSUypEd'));
    
    console.log('=====> getNft_findAllByOwner: ', myNfts.mint, '\n\n');

}



const getNft_findAllByCreator = async() => {
    const nft1 = await metaplex.nfts().findAllByCreator(creatorPublicKey);
    const nft2= await metaplex.nfts().findAllByCreator(creatorPublicKey, 1); // Equivalent to the previous line.
    const nft3 = await metaplex.nfts().findAllByCreator(creatorPublicKey, 2); // Now matching the second creator field.
}

const getNft_findAllByCandyMachine = async() => {
    // const nft1 = await metaplex.nfts().findAllByCandyMachine(candyMachinePublicKey);
    const nft1 = await metaplex.nfts().findAllByCandyMachine(new PublicKey('2ocxydUmMj1r2HWU18GYhreKMrpyhpDqUz1xm348RPvh'));
    // const nft2 = await metaplex.nfts().findAllByCandyMachine(candyMachinePublicKey, 2); // Equivalent to the previous line.
    // const nft3 = await metaplex.nfts().findAllByCandyMachine(candyMachinePublicKey, 1); // Now finding NFTs for Candy Machine v1.

    console.log('=====> getNft_findAllByCandyMachine: ', nft1, '\n\n');
}

async function main_get(){
    await getNft_findByMint("8kzRZtRSGcHDJTfrCKsZfa2neohNGEFYdf7mWvKdx2YB");
    // await getNft_findAllByMintList(["8kzRZtRSGcHDJTfrCKsZfa2neohNGEFYdf7mWvKdx2YB", "8kzRZtRSGcHDJTfrCKsZfa2neohNGEFYdf7mWvKdx2YB"]);
    // await getNft_findAllByOwner();
    // await getNft_findAllByCandyMachine();
}
main_get();












// ************************** set ***************************************************


const setNft_uploadMetadata = async() => {
    const { uri } = await metaplex.nfts().uploadMetadata({
        name: "My NFT",
        description: "My description",
        image: "https://arweave.net/123",
    });
    
    console.log('=====> setNft_uploadMetadata: ', uri, '\n\n');
}


const setNft_create = async() => {
    const { nft } = await metaplex.nfts().create({
        uri: "https://5issneubaq5oi624bgzntcffh5a7dfhjhoeo5y3x2eoorypcqy.arweave.net/6iUmkoEEOuR7XAmy2Yil_P0HxlOk7iO7jd9Ec6OHihk/",
    });
    
    console.log('=====> setNft_create: ', nft, '\n\n');
}


async function main_set(){
    // await setNft_uploadMetadata();
    await setNft_create();

}
main_set();


