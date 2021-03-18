import { Avatar } from "@material-ui/core";
import React from "react";

function PeerCard({ rooms, setCurrRoom, roomName }) {
    const selectRoom = () => {
        setCurrRoom({ [roomName]: rooms[roomName] });
    };
    return (
        <div
            className="w-100-ns flex justify-start hover-bg-mid-gray pointer"
            onClick={selectRoom}
        >
            <div className="pa3 w-20">
                <Avatar
                    src={`https://avatars.dicebear.com/api/human/${String(
                        Math.random()
                    )}.svg`}
                />
            </div>
            <div className="flex justify-between bb-ns white-80 sans-serif w-70">
                <div className="mt3">
                    <h3 className="mv0">{roomName.slice(-6)}</h3>
                    <h5 className="mt2">Last message....</h5>
                </div>
                <time className="mt4">03:52 PM</time>
            </div>
        </div>
    );
}

export default PeerCard;
