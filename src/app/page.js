"use client";
import "./chat.css"
import React, {useState, useRef, useEffect} from "react";
import AiApi from "./api";
import AiMessage from "./components/AiMessage";
import UserMessage from "./components/UserMessage";
import { IoSend } from "react-icons/io5";

const Home = ()=> {
  const api = new AiApi();
  const [messages, setMessages] = useState([]);
  const [awaitingReaction, setAwaitingReaction] = useState(false);
  const questionInput = useRef();
  const chatBox = useRef();

  const processKeys = (e) => {
    if(e.code == "Enter"){
      submitQuestion()
    }
  };

  const updateMessages = (role, message) => {
    setMessages((prev)=>{
      let lastKey = prev.slice(-1)[0] ? prev.slice(-1)[0]["key"] : 0
      return [...prev, {key:lastKey + 1, role: role, content: message}]
    }) 
  };

  const submitQuestion = () => {
    let question = questionInput.current.value;
    if (question && !awaitingReaction){
      askQuestion(question);
      questionInput.current.value = "";
      updateMessages("user", question);
      setAwaitingReaction(true);
    }
  };

  const getMessageContent = (message) => {
    let splitted = message.split(" ")
    let lastThink = splitted.findLast(word=>word.includes("think>"));
    let index = splitted.indexOf(lastThink)
    message = splitted.slice(index+1).join(" ")
    return `${splitted[index].split("\n").slice(-1)[0]} ${message}`
  };

  const askQuestion = (question) => {
    api.askQuestion("deepseek-r1:1.5b", [{role: "user", content: question}])
    .then((response)=>{
      let message = getMessageContent(response.choices[0].message.content);
      setAwaitingReaction(false);
      window.scrollTo(0, document.body.scrollHeight);
      updateMessages("assistant", message);
    })
    .catch((response)=>{
      console.log(response);
      setAwaitingReaction(false);
    })  
  };

  useEffect(() => {
    const targetElement = chatBox.current; 
    const callback = (mutationsList) => {
      chatBox.current.scrollTo(0, chatBox.current.scrollHeight);
    };
    const observer = new MutationObserver(callback);
    const config = { childList: true, subtree: true };
    observer.observe(targetElement, config);
    return () => {
      observer.disconnect();
    };
  }, []);


  return(
    <>
    <div className="author">
        <span className="author-text">Created by <a href="https://github.com/ayoub-abdessadak">ayoub-abdessadak</a></span>
    </div>
    <div className="chat-box">
      <div className="chat-messages" ref={chatBox}>
        {/* {
          <>
            <UserMessage />
            <AiMessage />
          </>
        } */}
        {
          messages.map((message)=>{
            if(message.role == "user"){
              return (<UserMessage key={message.key} message={message.content} />)
            }else{
              return (<AiMessage key={message.key} message={message.content} />)
            }
          })
        }
        {
          awaitingReaction ?
          <AiMessage message={"waiting"} />
          :
          null
        }
      </div>
      <div className="user-input-box">
        <input ref={questionInput} className="chat-input" type="text" placeholder="Vraag me iets" onKeyUp={processKeys} />
        <button className="chat-button" onClick={submitQuestion} disabled={awaitingReaction}>{awaitingReaction ? <div className="loading-block send-icon"></div> : <IoSend className="send-icon" />}</button>
      </div>
    </div>
    </>
  )
}

export default Home;