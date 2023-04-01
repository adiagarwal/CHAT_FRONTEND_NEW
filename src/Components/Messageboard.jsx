import React , {useContext , useEffect , useState} from 'react';
import { Box } from '@mui/system';
import UserInput from './UserInput';
import Message from './Message';
import {GET_MESSAGES_OF_CONVERSATION} from "../Graphql/query";
import {PUBLISH_MESSAGE} from "../Graphql/subscription";
import {client} from "../Graphql/apolloClient";
import {useLazyQuery , useSubscription} from "@apollo/client";
import {conversationContext} from "../Context/conversationContext"


const Messageboard = () => {

  let [messageArray , setMessageArray] = useState([])

  let {conversation} = useContext(conversationContext)

  let [getAllMessages , {data : allMessages}] = useLazyQuery(GET_MESSAGES_OF_CONVERSATION,{client:client , variables : {conversationId:String(conversation.id)}})

  let { data  : publishedMessage } = useSubscription(PUBLISH_MESSAGE , {client : client} )


  useEffect(()=>{
    getAllMessages()
  },[conversation.id , messageArray])



  useEffect(() =>{
    if(allMessages){
      let {getMessagesOfConversations} = allMessages
      if(getMessagesOfConversations && getMessagesOfConversations.length){
        setMessageArray(getMessagesOfConversations)
      }
      else{
        setMessageArray([])
      }
    }
  } , [allMessages])


  useEffect(()=>{
    if(publishedMessage){
      let {publishMessage} = publishedMessage
      let new_message_array = [...messageArray , publishMessage]
      setMessageArray(new_message_array)
    }
  },[publishedMessage])


  return (
    <Box sx={{height : "87vh" , display:"flex" , flexDirection:"column" , padding : "10px"}}>
      <Box sx={{ height : "75vh" , overflow:"auto" , '&::-webkit-scrollbar' : {display : 'none'}}}>
        <Message messages={messageArray}/>
      </Box>
      <Box >
      <UserInput/>
      </Box>
    </Box>
  );
}

export default Messageboard;
