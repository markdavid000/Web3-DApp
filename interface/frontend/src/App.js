import "./App.css";
import contractABI from "./abi.json";
import React from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ethers = require("ethers");

function App() {
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setMessage(newMessage) {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const contractAddress = "0x658239248b3Fe4608cdb2DAcC8D8CB5fF1d08Dd9";

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const setMessage = await contract.setMessage(newMessage);

        await setMessage.wait();

        toast.success("Message set successfully", {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err) {
        toast.error("User Rejected Transaction", {
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }

  async function getMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const contractAddress = "0x658239248b3Fe4608cdb2DAcC8D8CB5fF1d08Dd9";

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getMessage();

        toast.success(transaction, {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err) {
        toast.error("Failed to get Message", {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex">
          <button
            className="neon-button"
            onClick={() => setMessage("This is my Message")}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Set Message
          </button>
          <button className="neon-button" onClick={getMessage}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Get Message
          </button>
        </div>
        <ToastContainer theme="colored" transition={Flip} />
      </header>
    </div>
  );
}

export default App;
