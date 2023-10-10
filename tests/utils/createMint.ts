import { AnchorProvider, web3 } from "@coral-xyz/anchor";
import {
  createInitializeMintInstruction,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { ConfirmOptions } from "@solana/web3.js";

export const createMint = async (
  provider: AnchorProvider,
  confirmOptions: ConfirmOptions,
  decimals = 0,
): Promise<web3.PublicKey> => {
  const tokenMint = new web3.Keypair();
  const lamportsForMint =
    await provider.connection.getMinimumBalanceForRentExemption(MintLayout.span);

  // Allocate mint and wallet account
  await provider.sendAndConfirm(
    new web3.Transaction()
      .add(
        web3.SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: MintLayout.span,
          fromPubkey: provider.wallet.publicKey,
          newAccountPubkey: tokenMint.publicKey,
          lamports: lamportsForMint,
        })
      )
      .add(
        createInitializeMintInstruction(
          tokenMint.publicKey,
          decimals,
          provider.wallet.publicKey,
          provider.wallet.publicKey
        )
      ),
    [tokenMint],
    confirmOptions
  );
  return tokenMint.publicKey;
};
