const addNewMessage = (p1, setMessages, msg) => {
    console.log(setMessages);
    setMessages((prevState) => {
        let newState;
        if (!!prevState[p1]) {
            newState = {
                ...prevState,
                [p1]: [...prevState[p1], msg],
            };
        } else {
            newState = {
                ...prevState,
                [p1]: [msg],
            };
        }
        console.log(newState);
        return newState;
    });
};

export { addNewMessage };
