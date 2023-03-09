import ABI from "./ABIs/todo.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

function Todo() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [chainName, setChainName] = useState(null);
  const [balance, setBalance] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);

  const getWalletAddress = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts");
      const currentAddress = await provider.getSigner().getAddress();

      setCurrentAccount(currentAddress);

      const chain = await provider.getNetwork();
      setChainId(chain.chainId);
      setChainName(chain.name);

      const amount = await provider.getBalance(currentAddress);
      const amountInEth = ethers.utils.formatEther(amount);
      setBalance(amountInEth);

      const blockNumber = await provider.getBlockNumber();
      setBlockNumber(blockNumber);
    }
  };
  const chainChanged = () => {
    window.location.reload();
  };
  window.ethereum.on("chainChanged", chainChanged);
  window.ethereum.on("accountsChanged", getWalletAddress);

  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      0x22d6dbe238daa4dfb011d1ad87e765a99f3c8173,
      ABI,
      signer
    );

    await contract.completeTask(3);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <button onClick={getData}> Click Me</button>
      <p> Total number of Tasks : </p>
      <button onClick={getWalletAddress}> Click Me</button>
      <p>{currentAccount}</p>
      <p> Chain Id: {chainId} </p>
      <p> Chain name: {chainName} </p>
      <p> Eth: {balance} </p>
      <p> Block#: {blockNumber}</p>
    </div>
  );
}

export default Todo;
