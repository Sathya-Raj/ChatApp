import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'
import { useLocation } from 'react-router';
import Infobar from './infobar'
import Input from './input'
import Message from "./Message"
import ScrollToBottom from "react-scroll-to-bottom";

let socket;

function Chat() {
  const location =useLocation();
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState("");
  const ENDPOINT ="http://localhost:5000/";
  
  useEffect(() => {
    socket=io(ENDPOINT);
    const {name,room}=queryString.parse(location.search);
    setname(name);
    setroom(room);  
    socket.emit('join',{name,room},(error)=>{
      console.log(error);
      if (error){
        alert(error) ;
        window.history.back();
        return 
      }
    });
    return () =>{
      socket.disconnect(true);
      socket.off();
    }
  },[ENDPOINT,location.search]);
  
  useEffect(() => {
    socket.on("message",(message)=>{
      setmessages([...messages,message]);
    });
    
  }, [messages]);

  const sendMessage=(e)=>{
    e.preventDefault();
    if (message){
      socket.emit("sendMessage",message,()=>setmessage(""));
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-[98vh]  text-gray-800 p-5">

        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <Infobar room={room}/>
          
          <ScrollToBottom className="flex flex-col flex-grow h-0  overflow-auto">
            {messages.map((message,i)=> <Message message={message} name= {name} keyProp={i}/>)}
          </ScrollToBottom>

          <Input message={message} setmessage={setmessage} sendMessage={sendMessage}/>
        </div>
      
      </div>
    </>
  )
}

export default Chat