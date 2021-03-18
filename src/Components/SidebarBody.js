import React from "react";
import PeerCard from "./PeerCard";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

function SidebarBody({ rooms, setCurrRoom }) {
    return (
        <SimpleBar
            style={{ height: "90%" }}
            className="h-75 w-100 bg-dark-gray"
        >
            {Object.keys(rooms).map((roomName, index) => {
                return (
                    <PeerCard
                        key={index}
                        roomName={roomName}
                        rooms={rooms}
                        setCurrRoom={setCurrRoom}
                    />
                );
            })}
        </SimpleBar>
    );
}

export default SidebarBody;
