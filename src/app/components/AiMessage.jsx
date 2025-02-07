import React from "react"

const AiMessage = ({message}) => {
    return(
        <div className="ai-message">
          {
            message == "waiting" ?
            <div className="loading-block"></div>
            :
            <>
            <span className="side-chat">Assistant:</span>
            <span className="ai-content">{message}</span>
            </>
          }
        </div>
    )
}

export default AiMessage