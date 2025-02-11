# Sui AI Image Generator & NFT Minter


<img src="https://github.com/user-attachments/assets/24238988-b742-4125-8ac9-406dcb73b5bd" width="500" height="500" />

<a href="https://suiscan.xyz/devnet/object/0xf2815f0c81ef92a045842ae8c645308366367fc5f5ab40d563735611a9062761/tx-blocks" target="blank"> Nft Link </a> |  <a href="https://suiscan.xyz/devnet/tx/7e4JH3fvRpgM7Ww2piGn8i44ZKK24uZo3rBhnJbnR6J4" target="blank"> Transaction Link </a>



Built using Open AI, Next.js and Sui TS SDK.


-> try it: https://sui-agent.vercel.app/


## Instructions

```
1. Get your OPEN AI API Key
2. Deploy a SUI NFT Mint Contract address on https://ide.bitslab.xyz/ on DevNet
 2.1 Arguments for Minting method should be String.
```

add a .env file with the following

```
  OPENAI_API_KEY=sk-proj-XYZ
  NEXT_PUBLIC_PACKAGE=0xXYz
```

then:

```
pnpm install
pnpm run dev
```


## Dev SUI Wallet Address:

Some minted NFTs using this tool.
https://suiscan.xyz/devnet/account/0x079d4acd30b69514ad0b187490b188398c002e6c099ebe9d24912e3857ad4263/portfolio


## Demos

https://github.com/user-attachments/assets/8e1a9b6b-eb82-4922-99ba-1b22a12a3a83

https://github.com/user-attachments/assets/e91e16aa-737e-4781-b0ec-1055c7fc88d7

## TODO/Roadmap

- Work on store the media generated on Walrus instead of using OpenAI urls
- new type of medias and also better prompting handling
- suggest user new prompts
- store chat conversations on a db




