
let account

let connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
        let ethereum = window.ethereum
        let accounts = await ethereum.request({
            method: "eth_requestAccounts",
            params: [{ chainId: "0x13881" }], //add your chain network
            // method: 'eth_requestAccounts'
        });
        account = accounts[0];
        ethereum.on('accountsChanged', function (accounts) {
            account = accounts[0];
            console.log(account)
            // Time to reload your interface with accounts[0]!
        });
        ethereum.on('chainChanged', (chainId) => {
            console.log("network changed.")
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            window.location.reload();
        });

        //   ethereum.on('connect', handler: (connectInfo: ConnectInfo) => void);
        // ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
        // ethereum._metamask.isUnlocked()
        // ethereum.isConnected()
        // console.log(ethereum.isConnected())
        let chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log(chainId)
        if (chainId === "0x13881") {
            if (account) {
                return true
            } else {
                return false
            }
        } else {
            alert("you are not on right network.You need to connect you metaMask wallet to Mumbai-Test-Net.")
            return false
        }

    } else {
        console.error("You need to install metaMask")
        alert("Please install metaMask extension in your chrome browser.")
        return false
    }
}

export { connectMetaMask, account }

