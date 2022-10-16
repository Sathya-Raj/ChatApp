import React from 'react'
import ReactEmoji from 'react-emoji'

function Message({message:{user,text},name,keyProp}) {
  let SentByCurrentUser= false;
  const trimmedName= name.trim().toLowerCase();
  if (trimmedName===user){
    SentByCurrentUser=true;
  }

  return (
    SentByCurrentUser
    ?(
      <div key={keyProp} className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">{ReactEmoji.emojify(text)}</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">{user}</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      </div>
     )
     :(
      ()=>{
      if(user==="admin"){
        return (
          <div key={keyProp} className="flex w-full mt-3 mb-4  max-w-xs  justify-center ml-[1rem] sm:ml-[115px]">
        <div>
            <div className="bg-gray-300 text-black p-1 px-2 rounded-lg ">
              <p className=" text-xs">{ReactEmoji.emojify(text)}</p>
            </div>
        </div>
      </div>
        );
        }
      else{
        return(
      <div key={keyProp} className="flex w-full mt-2 space-x-3 max-w-xs">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          <div>
            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">{ReactEmoji.emojify(text)}</p>
            </div>
          <span className="text-xs text-gray-500 leading-none">{user}</span>
        </div>
      </div>
        )
     }
    }
      
      
     )()
    
  )
}

export default Message