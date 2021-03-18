import React, { useState } from "react";
import "../css/ChatFooter.css";
import { addNewMessage } from "../Backend/messageHandler";
import { IconButton } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/PaymentRounded";
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from "ethers";

var Units = require("ethereumjs-units");
function ChatFooter({ currRoom, setMessages, ipfs, who }) {
    const [message, setMessage] = useState("");
 
    const walletHandleRcv = async ()=>{
       
        const ethAccounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        // const ethAccounts = await ethereum.enable();
        const accA = ethAccounts[0];
        // const accA=prompt("Enter account");
        const requestedAmount=prompt("Enter the amount requested");
         if(accA){
    
                console.log("account:",accA);
                //console.log("PeerId",peer);
                // console.log("amount",requestedAmount);
    
                const message = JSON.stringify({
                    nodeID:Object.keys(currRoom)[0],
                    account:accA,
                    amount:Units.convert(requestedAmount, 'finney', 'wei'),
                    type: 2,
                    who:who,
                })
                // console.log("message:",message)
                // console.log(peer+"_private");
                ipfs.pubsub.publish ((Object.keys(currRoom)[0]).slice(-6)+"_private",message)
             }
             else{
                 alert("Error fetching account details. Maybe caused by not having metamask extension. ")
             }
         }

    const sendMessage = async (e) => {
        e.preventDefault();
        if (currRoom) {
            const roomName = Object.keys(currRoom)[0];
            const db = currRoom[roomName];
            const { id } = await db._ipfs.id();
            const msg = {
                from: id,
                message,
                time: new Date().toLocaleTimeString(),
                type: 0,
            };
            db.add(msg);
            addNewMessage(roomName.slice(-6), setMessages, msg);
        } else {
            console.log("Select a Chat First!!!!");
        }
        setMessage("");
    };
    return (
        <div className="w-100 h-10 bg-dark-gray gray bl bt flex justify-between">
            <form onSubmit={sendMessage} className="w-90 h-25">
                <input
                    value={message}
                    type="text"
                    className="mt3 ml4 br-pill  input-style w-100"
                    placeholder="Enter your message......."
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" hidden={true}>
                    Submit
                </button>
            </form>
            <IconButton onClick={walletHandleRcv}>
                <PaymentIcon />
            </IconButton>
        </div>
    );
}

export default ChatFooter;
