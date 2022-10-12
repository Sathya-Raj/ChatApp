import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'
import { useLocation } from 'react-router';

let socket;

function Chat() {
  const location =useLocation();
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState();
  const ENDPOINT ="http://localhost:5000/";
  
  useEffect(() => {
    socket=io(ENDPOINT);
    const {name,room}=queryString.parse(location.search);
    setname(name);
    setroom(room);  
    socket.emit('join',{name,room},()=>{


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
  console.log(message,messages);
  return (
    <div >
      <div>
        <input
        type="text"
        value={message}
        onChange={(e)=>setmessage(e.target.value)}
        onKeyDown={e=>e.key==="Enter"?sendMessage(e):null}/>
      </div>
    </div>
  )
}

export default Chat