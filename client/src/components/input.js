import React from 'react'

function Input({message,setmessage,sendMessage}) {
  return (
    <form className="bg-gray-300 p-4 flex">
    <input 
    className="flex items-center focus:outline-none h-10 w-full rounded px-3 text-sm"  
    type="text"  
    placeholder="Type your message…"
    value={message}
    onChange={(e)=>setmessage(e.target.value)}
    onKeyDown={e=> e.key==='Enter'?sendMessage(e):null}
    />
    <button
    className="flex items-center ml-2 justify-center bg-blue-600 hover:bg-blue-700 rounded text-white px-4  flex-shrink-0"
    onClick={(e)=>sendMessage(e)}
    >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
  </form>
  )
}

export default Input