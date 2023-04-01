import React ,{useState , useContext} from 'react';
import { TextField  , IconButton} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import {useMutation} from "@apollo/client";
import {client} from "../Graphql/apolloClient";
import {SEND_NEW_MESSAGE}from "../Graphql/mutations";
import {conversationContext} from "../Context/conversationContext"
import {useRef} from "react";

const UserInput = () => {

    const {conversation} = useContext(conversationContext)

    const [messageBody , setMessageBody] = useState(null)

    const [sendMessage] = useMutation(SEND_NEW_MESSAGE ,{client : client})


    const handleClick = (event) =>{
        event.preventDefault()
        sendMessage({variables:{
            conversationId: String(conversation.id),
            body: messageBody
        }})
        setMessageBody("")
    }

    const handleChange = (event) =>{
        setMessageBody(event.target.value)
    }

  return (
    <div>
      <TextField  variant="filled"  onChange={handleChange} value={messageBody}  fullWidth InputProps={{
        endAdornment : <InputAdornment position="end"><IconButton onClick={handleClick}><SendIcon color='warning'/></IconButton></InputAdornment>,
        disableUnderline :true
      }}
      sx={{borderRadius:"20px" , height:"60px"}}/>
    </div>
  );
}

export default UserInput;
