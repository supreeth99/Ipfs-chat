import React, { useEffect, useState } from "react";
import ChatWindow from "./Components/ChatWindow";
import Sidebar from "./Components/Sidebar";
import peer from "./Backend/peer";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./css/App.css";

function App() {
    const [ready, setReady] = useState(false);
    const [ipfs, setIPFS] = useState();
    const [orbit, setOrbit] = useState();
    const [rooms, setRooms] = useState({});
    const [currRoom, setCurrRoom] = useState();
    const [messages, setMessages] = useState({});
    const [who, setWho] = useState("");

    useEffect(() => {
        const node = async () => await peer(setRooms, setMessages);
        node().then(async ({ ipfs, orbitdb }) => {
            setIPFS(ipfs);
            setOrbit(orbitdb);
            setReady(true);
            setWho(orbitdb.id);
        });
        return async () => await node.stop();
    }, []);

    return (
        <div className="overflow-y-hidden">
            {ready === true ? (
                <>
                    <Sidebar
                        ipfs={ipfs}
                        orbit={orbit}
                        rooms={rooms}
                        setCurrRoom={setCurrRoom}
                    />
                    <ChatWindow
                        who={who}
                        currRoom={currRoom}
                        messages={messages}
                        setMessages={setMessages}
                        ipfs={ipfs}
                    />
                </>
            ) : (
                <CircularProgress className="center" />
            )}
        </div>
    );
}

export default App;
