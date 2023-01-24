import React, {  useState } from 'react';
import './App.css';
import { connectMetaMask } from '../services/metaMaskConnection';
import CreateNFT from "./CreateNFT";

function MetamaskButton() {
  let [connected, setConnected] = useState(false)
  let connectMetaMaskFun = async () => {
    let connection = await connectMetaMask();
    setConnected(connection);
    
  }
  return (
    <>
      {connected ? (
        <div className='counterContainer'>
          {/* <button onClick={() => updateCounter(0)}>-</button>
          {counter}
          <button onClick={() => updateCounter(1)}>+</button> */}
            {/* <CreateNFT /> */}
            <button className="btn">MetaMask Connected</button>

        </div>
      ) : (
        <div className="connectMetaMasContainer">
          <button onClick={connectMetaMaskFun} className="btn">Connect MetaMask</button>
        </div>
      )}
    </>
  );
}

export default MetamaskButton;
