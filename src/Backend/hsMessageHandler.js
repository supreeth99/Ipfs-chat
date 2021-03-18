import { createDB, openDB } from "./initialHandshake";
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from "ethers";
const messageHandler = async (
    ipfs,
    orbitdb,
    data,
    rooms,
    setRooms,
    setMessages
) => {
    const { nodeID, type } = data;
    const p1 = orbitdb.id.slice(-6);
    const p2 = nodeID.slice(-6);
    if (type === 0) {
        const newRoom = await createDB(p1, p2, orbitdb, data, setMessages);
        const res = JSON.stringify({
            nodeID: orbitdb.id,
            roomID: newRoom.address.toString(),
            type: 1,
        });

        ipfs.pubsub.publish(p2 + "_private", res);

        await rooms.set(nodeID, {
            roomID: newRoom.address.toString(),
            walletAddr: "",
        }); // Handle Ethereum Wallet addresses later
        setRooms((prevState) => ({ ...prevState, [nodeID]: newRoom }));
        console.log("Node B(step 1):", await rooms.all);
    } else if (type === 1) {
        const newRoom = await openDB(orbitdb, data, setMessages);
        await rooms.set(nodeID, {
            roomID: newRoom.address.toString(),
            walletAddr: "",
        });
        setRooms((prevState) => ({ ...prevState, [nodeID]: newRoom }));
        console.log("Node A(step 2):", await rooms.all);
    }
    else if(data.type===2){
                    
        const peerID = nodeID;
        const amount =data.amount;
        // web3.utils.toWei(data.amount, 'ether');
        const account = data.account;
        const a = await rooms.get(nodeID);
        await rooms.set(nodeID,{...a, walletAddr:account});
        
        // console.log("Method 2");
        // console.log("id:",nodeID);
        // console.log("account:",data.account);
        // console.log("Amount:",amount);

        //console.log("This is saved locally:",this.kv.get(key).ethWallet);
        
        
        //const accB= prompt("Enter your wallet id maccha");
        const ethAccounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const accB = ethAccounts[0];
        console.log("accb:",accB);
        const res = JSON.stringify({
            ID:data.who,    // wrong id is sent need to change
            account:accB,
            type:3,
        })

        console.log("response:",res);
        ipfs.pubsub.publish(nodeID+"_private",res);
        const provider = await detectEthereumProvider();
        // const provider = new ethers.providers.Web3Provider(web3.currentProvider);
        
        if (provider) {
            //console.log(provider);
        startApp(provider);
        } 
        else {
            console.log('Please install MetaMask!');
        }

        function startApp(provider) {
       
        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        }
     
        }
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        handleChainChanged(chainId);

        window.ethereum.on('chainChanged', handleChainChanged);

        function handleChainChanged(_chainId) {
       
            //window.location.reload();
        }
        let currentAccount = null;
        window.ethereum
        .request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
       
            //console.error("in promise part:",err);
        });

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            
            console.log('Please connect to MetaMask.');
            alert("please connect to metamask first.")
        } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
            
            //console.log("inside metamask account:",currentAccount);
        }
        }
        const transactionParameters = {
            to: account, 
            from: accB, 
            value:amount, 
            };
          
          
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
          console.log("Transaction hash:",txHash);
    }
    else if(data.type===3){

        // console.log("method of type=3 being excecuted.");
        // console.log("RECEIVED FROM OTHER NODE");
        // console.log("account of other node:",data.account);
        // console.log("id of other",data.ID);

        const peerID = data.nodeID;
        const amount = data.amount;
        const account = data.account;
        const a = await rooms.get(nodeID);
        await rooms.set(peerID.slice(-6),{...a,  walletAddr:account});

       
    }
};

export default messageHandler;
