import React  , {useEffect , useState ,useContext} from 'react';
import {useLazyQuery , useSubscription} from "@apollo/client";
import {GET_ALL_CONVERSATIONS} from "../Graphql/query";
import {SUBSCRIBE_NEW_CONVERSATION} from "../Graphql/subscription";
import { client } from '../Graphql/apolloClient';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    ListItemButton,
    ListItemIcon,
    Divider
  } from "@mui/material";
import {conversationContext} from "../Context/conversationContext";



const ConversationList = ({user_id}) => {
    
   let {setConversation} = useContext(conversationContext)

    let [convArray , setConvArray] = useState([])

    let [getAllConversation , {data : allConversations}] = useLazyQuery(GET_ALL_CONVERSATIONS,{client : client})

   let { data  : subscribedConversation } = useSubscription(SUBSCRIBE_NEW_CONVERSATION , {client : client,variables : {user_id : user_id}} )
   
    const handleClick = (e , conversation) =>{
        e.preventDefault();
        setConversation(conversation)
    }

    useEffect(()=>{
        if(subscribedConversation){
            let {conversationCreated} = subscribedConversation
            convArray = [conversationCreated ,...convArray]
            setConvArray(convArray)
        }

    },[subscribedConversation])
   



    useEffect(()=>{
        getAllConversation()
    },[convArray])




    useEffect(()=>{
        if(allConversations){
            let {getAllConversationsForUser} = allConversations
            setConvArray(getAllConversationsForUser)
        }
    },[allConversations])
    


  return (
    <div>
        {convArray.map((conversation) =>{
           let userNameString = "" + conversation.participants.map((part) => part.username);
           userNameString = userNameString.length <= 20 ? userNameString : userNameString.slice(0,21) + "..."
           return (
            <List disablePadding key={conversation.id}>
            <Divider/>
            <ListItemButton  disableRipple onClick={(e) => handleClick(e,conversation)}>
                <ListItem >
                <ListItemIcon>
                    <MessageOutlinedIcon/>
                </ListItemIcon>
                <ListItemText  primary={userNameString} secondary={
                <React.Fragment>
                    <Typography component={"span"} variant="body2">
                        Total Participants : {conversation.numberOfParticipants}
                    </Typography>
                </React.Fragment>
                }
                />
                </ListItem>
            </ListItemButton>
            </List>
           ) 
        }
        )}
    </div>
  );
}

export default ConversationList;
