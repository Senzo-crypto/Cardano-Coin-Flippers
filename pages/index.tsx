import Head from "next/head";
import { CardanoWallet, MeshBadge, useWallet } from "@meshsdk/react";
import { Lucid } from "lucid-cardano";
import { script, scriptAddr } from "../config/contract";
import {
  Transaction,
  Data,
  BlockfrostProvider,
  resolveDataHash,
} from "@meshsdk/core";
import { useState } from "react";
import type { NextPage } from "next";

const lucid = await Lucid.new();

const betAmounts = [1, 5, 10];

const Home: NextPage = () => {
  const { wallet, connected, connecting } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  async function lockFunds() {
    if (wallet) {
      const addr = (await wallet.getUsedAddresses())[0];
      const d: Data = {
        alternative: 0,
        fields: [42],
      };
      const tx = new Transaction({ initiator: wallet }).sendAssets(
        {
          address: scriptAddr,
          datum: {
            value: d,
          },
        },
        [
          {
            unit: "ce982ed35e3d6319fa62777e6b4145e314d16575cbb79d7532124be57453656e7a6f636f696e",
            quantity: "1",
          },
        ]
      );
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
    }
  }
  return (
    <div className="container">
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered my Mesh" />
        <link rel="icon" href="https://meshjs.dev/favicon/favicon-32x32.png" />
        <link
          href="https://meshjs.dev/css/template.css"
          rel="stylesheet"
          key="mesh-demo"
        />
      </Head>

      <main className="main">
        <h1 className="title">
          <a href="https://cardanocoinflippers.com/" className="LinkSite">
            Cardano
          </a>{" "}
          Coin Flippers
          <p className="Description">Flipping made easy</p>
        </h1>

        <div className="demo">
          <CardanoWallet />
        </div>
        <div className="BetAmount-container">
          <div className="BetAmount">
            {betAmounts.map((amount) => (
              <button key={amount}>{amount} Ada</button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => lockFunds()}
          disabled={connecting || loading}
          style={{
            margin: "8px",
            backgroundColor: connecting || loading ? "orange" : "grey",
          }}
        >
          Lock funds
        </button>
      </main>
      <footer className="footer">
        <MeshBadge dark={true} />
      </footer>
    </div>
  );
};
export default Home;
