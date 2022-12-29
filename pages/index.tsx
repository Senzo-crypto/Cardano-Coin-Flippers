import Head from "next/head";
import { CardanoWallet, MeshBadge } from "@meshsdk/react";

const betAmounts = [1, 5, 10];

export default function Home() {
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
      </main>
      <footer className="footer">
        <MeshBadge dark={true} />
      </footer>
    </div>
  );
}
