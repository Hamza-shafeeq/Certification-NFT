import context from './contractContext';
import artifacts from "../artifacts/contracts/CertificationNFT.sol/CertificationNFT.json";
import { useState } from 'react';
import { useEffect } from 'react';

const ethers = require('ethers');


let ContractState = (props) => {
    const [contract, setContract] = useState(null);
    const [account, setAcc] = useState({ address: null, balance: null });
    const [Provider, setProvider] = useState({ provider: null, signer: null });


    const contractAddress = '0x682f28E2cA3B632B00123f8fa424812d2DF6A5F8';

    window.ethereum.on('accountsChanged', async function (accounts) {
        if (Provider.provider) {
            try {
                const _signer = await Provider.provider.getSigner();
                let _accAddress = await _signer.getAddress();
                //_accAddress = shortenAddress(_accAddress);
                let _accBalance = ethers.utils.formatEther(await _signer.getBalance());
                _accBalance = _accBalance.match(/^-?\d+(?:\.\d{0,2})?/)[0];
                setAcc({ address: _accAddress, balance: _accBalance });
                setProvider({ provider: Provider.provider, signer: _signer });
            } catch (error) {
                setAcc({ address: null, balance: null });
                console.log("error while handling change in account");
                console.log(error);
            }
        }
    })

    // async function refreshDetails() {
    //     if (Provider.provider) {
    //         try {
    //             const _signer = await Provider.provider.getSigner();
    //             let _accAddress = await _signer.getAddress();
    //             //_accAddress = shortenAddress(_accAddress);
    //             let _accBalance = ethers.utils.formatEther(await _signer.getBalance());
    //             _accBalance = _accBalance.match(/^-?\d+(?:\.\d{0,2})?/)[0];
    //             setAcc({ address: _accAddress, balance: _accBalance });
    //             setProvider({ provider: Provider.provider, signer: _signer });
    //         } catch (error) {
    //             setAcc({ address: null, balance: null });
    //             console.log("error while handling change in account");
    //             console.log(error);
    //         }
    //     }
    // }

    async function connectWallet() {
        // const _provider = new ethers.providers.JsonRpcProvider(`${localRpc}`);
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            await _provider.send("eth_requestAccounts", []);
            const _signer = await _provider.getSigner();
            let _accAddress = await _signer.getAddress();
            //_accAddress = shortenAddress(_accAddress);
            let _accBalance = ethers.utils.formatEther(await _signer.getBalance());
            _accBalance = _accBalance.match(/^-?\d+(?:\.\d{0,2})?/)[0];
            setAcc({ address: _accAddress, balance: _accBalance });
            setProvider({ provider: _provider, signer: _signer });
            !(contract) && (await connectContract());

        } catch (error) {
            console.log("error while connecting with web3 provider");
            console.log(error);
        }


    }

    const contractFunction = {
        'mint': minToken,
    }

    async function minToken(to, uri) {
        try {
            console.log(to)
            let _contract = await contract.connect(Provider.signer);
            const res = await _contract.mintNFT(to,  uri);
            console.log("Token Minted ", res);
        } catch (error) {
            // // alert('error while minting token');
            console.log('error while minting token');
            console.log(error);
        }
    }
   
    async function getUri(tokendId) {
        let _contract = await contract.connect(Provider.signer);
        const res = await _contract._uri(tokendId);
        if (res) {
            return res;
        }
    }

    let connectContract = async () => {
        const _contract = await new ethers.Contract(contractAddress, artifacts.abi, Provider.provider);
        setContract(_contract);
    }



    useEffect(() => {
        // console.log("useEffect: updating account details");
        let updateDetails = async () => {
            connectWallet().then(() => {
            }).catch((error) => {
                console.log(error);
            });
        }
        updateDetails();
    }, [])


    return (
        <context.Provider value={{ contractFunction }}>
            {props.children}
        </context.Provider>
    )
}

export { ContractState };