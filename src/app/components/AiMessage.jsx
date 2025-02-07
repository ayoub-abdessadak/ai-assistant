import React from "react";
import Markdown from 'react-markdown';

const AiMessage = ({message}) => {
    return(
        <div className="ai-message">
          {
            message == "waiting" ?
            <div className="loading-block"></div>
            :
            <>
            <span className="side-chat">Assistant:</span>
            <span className="ai-content"><Markdown>{message}</Markdown></span>
            </>
          }
        </div>
    )
}

export default AiMessage