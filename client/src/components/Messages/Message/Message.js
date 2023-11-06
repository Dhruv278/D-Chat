import React from 'react'
import './Message.css'
import ReactEmoji from 'react-emoji';



const Input =({message:{user,text} ,name})=>{
    let isSentByCUrrentUser=false;
    const trimedName=name.trim().toLowerCase();
    if(user===trimedName){
      isSentByCUrrentUser=true;
    }
    return(
      isSentByCUrrentUser
       ?(
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
          </div>
        </div>
       )
       :(<div className="messageContainer justifyStart">
       <div className="messageBox backgroundLight">
         <p className="messageText colorDark">{text}</p>
       </div>
       <p className="sentText pl-10 ">{user}</p>
     </div>)
    )
}
export default Input;