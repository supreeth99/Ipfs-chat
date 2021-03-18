import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import "../css/ChatBody.css";

function ChatBody({ currRoom, messages, setMessages, who }) {
    let room;
    let p1;
    if (currRoom) {
        room = Object.keys(currRoom)[0];
        p1 = room.slice(-6);
    }
    useEffect(() => {
        if (currRoom) {
            const msgs = currRoom[room]
                .iterator({ limit: -1 })
                .collect()
                .map((e) => e.payload.value);
            setMessages((prevState) => ({ ...prevState, [p1]: msgs }));
        }
    }, [currRoom]);
    return (
        <SimpleBar className="h-80 chat-bg">
            {messages[p1]
                ? Object.values(messages[p1]).map(
                      ({ from, message, time, type }, index) => {
                          return (
                              <p
                                  key={index}
                                  className={
                                      from === who
                                          ? "chat-receiver"
                                          : "chat-message"
                                  }
                              >
                                  {message}
                                  <span className="chat-timestamp">{time}</span>
                              </p>
                          );
                      }
                  )
                : undefined}
        </SimpleBar>
    );
}

export default ChatBody;
