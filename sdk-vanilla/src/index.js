import "./styles.css";
import "regenerator-runtime/runtime";
import { providers, BigNumber, utils, constants, Contract } from "ethers";
import { ConnextSdk, ERC20Abi } from "@connext/vector-sdk";

const connextSdk = new ConnextSdk();
const webProvider = new providers.Web3Provider(window.ethereum);

async function init() {
  const network = await webProvider.getNetwork();
  console.log(network);
  try {
    await connextSdk.init({
      routerPublicIdentifier:
        "vector7tbbTxQp8ppEQUgPsbGiTrVdapLdU5dH7zTbVuXRf1M4CEBU9Q", // Router Public Identifier
      loginProvider: webProvider, // Web3/JsonRPCProvider
      senderChainProvider:
        "https://goerli.infura.io/v3/af2f28bdb95d40edb06226a46106f5f9", // Rpc Provider Link
      senderAssetId: "0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa", // Asset/Token Address on Sender Chain
      recipientChainProvider: "https://rpc-mumbai.matic.today", // Rpc Provider Link
      recipientAssetId: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1", // Asset/Token Address on Recipient Chain
    });
  } catch (e) {
    const message = "Error initalizing";
    console.log(e, message);
    throw e;
  }
}

async function getEstimatedFee(input) {
  try {
    const res = await connextSdk.estimateFees({
      input: input,
    });
    console.log(res);
  } catch (e) {
    const message = "Error Estimating Fees";
    console.log(message, e);
  }
}

async function preTransferCheck(input) {
  try {
    await connextSdk.preTransferCheck(input);
  } catch (e) {
    console.log("Error at preCheck", e);
  }
}

async function deposit(input) {
  const transferAmountBn = BigNumber.from(
    utils.parseUnits(input, connextSdk.senderChain.assetDecimals)
  );
  console.log(transferAmountBn);

  try {
    const signer = webProvider.getSigner();
    const depositAddress = connextSdk.senderChainChannelAddress;

    const depositTx =
      connextSdk.senderChain.assetId === constants.AddressZero
        ? await signer.sendTransaction({
            to: depositAddress,
            value: transferAmountBn,
          })
        : await new Contract(
            connextSdk.senderChain.assetId,
            ERC20Abi,
            signer
          ).transfer(depositAddress, transferAmountBn);

    console.log("depositTx", depositTx.hash);

    const receipt = await depositTx.wait(1);
    console.log("deposit mined:", receipt.transactionHash);
  } catch (e) {
    console.log("Error during deposit", e);
  }
}

async function crossChainSwap(withdrawalAddress) {
  try {
    await connextSdk.crossChainSwap({
      recipientAddress: withdrawalAddress, // Recipient Address
      onFinished: function (params) {
        console.log("On finish ==>", params);
      }, // onFinished callback function
    });
  } catch (e) {
    console.log("Error at crossChain Swap", e);
    throw e;
  }
}

document.getElementById("app").innerHTML = `
    <h1>Hello Vector Sdk!</h1>
    <div>
    <button id="init">Init</button><br><br>

    <label for="amount">Amount :</label>
    <input type="text" placeholder="Type something..." id="amount"><br><br>
    <button type="button" id="estimateFee">Get Estimate</button>

    <button type="button" id="deposit"> Deposit </button><br><br>

    <input type="text" placeholder="Type something..." id="withdrawalAddress"><br><br>

    <button type="button" id="crossChainSwap"> Cross-Chain Swap </button><br><br>

</div>
`;

document.getElementById("init").addEventListener("click", function () {
  init();
});

document.getElementById("estimateFee").addEventListener("click", function () {
  var inputVal = document.getElementById("amount").value;
  // Displaying the value
  console.log(inputVal);
  getEstimatedFee(inputVal);
});

document.getElementById("deposit").addEventListener("click", async function () {
  var inputVal = document.getElementById("amount").value;
  // Displaying the value
  console.log(inputVal);
  await preTransferCheck(inputVal);

  await deposit(inputVal);
});

document
  .getElementById("crossChainSwap")
  .addEventListener("click", async function () {
    var inputAddress = document.getElementById("withdrawalAddress").value;
    // Displaying the value
    console.log(inputAddress);
    await crossChainSwap(inputAddress);
  });
