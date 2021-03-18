import IPFS from "ipfs";
import OrbitDB from "orbit-db";
import messageHandler from "./hsMessageHandler";
import libp2pBundle from "./libp2pBundle";
import { openDB } from "./initialHandshake";

const peer = async (setRooms, setMessages) => {
    const ipfs = await IPFS.create({ libp2p: libp2pBundle });
    const orbitdb = await OrbitDB.createInstance(ipfs);
    const rooms = await orbitdb.keyvalue("rooms");
    await rooms.load();

    const allRooms = await rooms.all;
    Object.keys(allRooms).forEach(async (room) => {
        console.log(allRooms[room]);
        const db = await openDB(
            orbitdb,
            { roomID: allRooms[room].roomID },
            setMessages
        );
        // await db.drop();
        // await rooms.drop();
        setRooms((prevState) => ({ ...prevState, [room]: db }));
    });
    console.log(orbitdb.id.slice(-6));
    ipfs.pubsub.subscribe("_OrbitDB._p2p._InitialHandshake", (msg) => {
        const data = JSON.parse(msg.data.toString());
        console.log(data);
        if(data.to === orbitdb.id)
            messageHandler(ipfs, orbitdb, data, rooms, setRooms, setMessages);
    });

    return { ipfs, orbitdb };
};

export default peer;
