import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      {!modalOpen && (
        <button className="share-btn" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <header className="App-header">
          <h1 className="app-title">DecentraStore</h1>
          <div className="account-info">
            {account
              ? `${account.substring(0, 6)}...${account.substring(
                  account.length - 4
                )}`
              : "Not connected"}
          </div>
        </header>

        <div className="bg-animation">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>

        <div className="app-container">
          <div className="upload-section">
            <h2 className="section-title">Upload File</h2>
            <div className="content-card">
              <FileUpload
                account={account}
                provider={provider}
                contract={contract}
              />
            </div>
          </div>

          <div className="display-section">
            <h2 className="section-title">Your Files</h2>
            <div className="content-card">
              <Display contract={contract} account={account} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
