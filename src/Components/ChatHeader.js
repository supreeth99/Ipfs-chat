import { Avatar } from "@material-ui/core";
import React from "react";

function ChatHeader({ currRoom }) {
    return (
        <div
            style={{ height: "10%" }}
            className="w-100 pa2 bg-mid-gray flex gray bb"
        >
            <Avatar
                src={`https://avatars.dicebear.com/api/human/${String(
                    Math.random()
                )}.svg`}
            />
            <h3 className="mh3 mt2 mb-10 white sans-serif">
                {currRoom ? Object.keys(currRoom)[0].slice(-6) : undefined}
            </h3>
        </div>
    );
}

export default ChatHeader;
