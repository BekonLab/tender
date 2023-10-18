# tender

This Solana program is custom-designed to streamline the public project bidding process, allowing community members to propose, submit and enable service providers to compete for projects. 

It will serve as an extension of the spl-governance, leveraging its fundamental features while incorporating  custom processes for overseeing public tenders and implementing NFT-based identification.

## Key dependencies

- solana-cli: 1.17
- anchor-cli: 0.29

## Run program tests

1. git clone https://github.com/BekonLab/tender
2. anchor build
3. solana-test-validator
4. anchor deploy
5. close local validator
6. anchor test
