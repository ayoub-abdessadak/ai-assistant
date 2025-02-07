import React from "react";

const UserMessage = ({message}) => {
    return(
        <div className="user-message">
          <span className="side-chat">Jij:</span>
          <span className="user-content">{message}</span>
        </div>
    )
}

export default UserMessage;
