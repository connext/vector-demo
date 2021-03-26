import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { ConnextModal } from "@connext/vector-modal";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="App">
      <header>Demo</header>

      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Show Modal
      </Button>
      <ConnextModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onReady={(params) => console.log("MODAL IS READY =======>", params)}
        withdrawalAddress={"0x75e4DD0587663Fce5B2D9aF7fbED3AC54342d3dB"}
        // loginProvider={loginProvider}
        // injectedProvider={(window as any).ethereum}
        // prod config
        // routerPublicIdentifier="vector7tbbTxQp8ppEQUgPsbGiTrVdapLdU5dH7zTbVuXRf1M4CEBU9Q"
        // depositAssetId={"0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa"}
        // depositChainProvider="https://goerli.infura.io/v3/af2f28bdb95d40edb06226a46106f5f9"
        // withdrawAssetId={"0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"}
        // withdrawChainProvider="https://rpc-mumbai.matic.today"
        // local config
        // routerPublicIdentifier="vector8Uz1BdpA9hV5uTm6QUv5jj1PsUyCH8m8ciA94voCzsxVmrBRor"
        // depositAssetId={'0x9FBDa871d559710256a2502A2517b794B482Db40'}
        // depositChainProvider="http://localhost:8545"
        // withdrawAssetId={'0x9FBDa871d559710256a2502A2517b794B482Db40'}
        // withdrawChainProvider="http://localhost:8546"

        // reproduce
        routerPublicIdentifier="vector5mTdufEcQa1HjtHmUtdeXHenhRkp9AZURXKnLY4c6GUfwUtCHc"
        depositAssetId={"0xc825e75837a3f10e6cc7bda1b85eaac572ac3b8d"}
        depositChainProvider="https://data-seed-prebsc-1-s1.binance.org:8545"
        withdrawAssetId={"0xB4a04eCF1855FBccf5C770BA6DB1dde7c96b17Be"}
        withdrawChainProvider="https://rinkeby.infura.io/v3/bce97999b34a4b759ca27229313f96ec"
      />
    </div>
  );
}

export default App;
