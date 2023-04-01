import {conversationContext} from "./conversationContext";
import React  , {useState} from 'react';

const ConversationState = (props) => {
    let [conversation , setConversation] = useState({})
  return (
    <conversationContext.Provider value={{conversation , setConversation}}>
      {props.children}
    </conversationContext.Provider>
  );
}

export default ConversationState;
