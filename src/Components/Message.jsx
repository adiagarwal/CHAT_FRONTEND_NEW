import React , {useContext} from 'react';
import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  Typography,
  ListItemAvatar,
} from "@mui/material";
import {userContext} from "../Context/userContext"

const Message = ({messages}) => {
    let {user} = useContext(userContext)
  return (
    <div>
      {messages.length == 0 ? (
      <h1>
        No messages from this conversation
      </h1>) : (
        messages.map((message) =>{
          return (
            <List key={message._id} disablePadding>
                <ListItem  sx={user._id !== message.sender ? {background:"#F8F9F9" ,marginBottom : "100px", inlineSize:"45%" , overflowWrap:"break-word" , borderRadius:"20px 20px 0px 30px"} : {background:"#ff885d" , marginBottom:"100px" , inlineSize:"45%" , overflowWrap:"break-word" , borderRadius:"20px 20px 0px 30px" , marginLeft:"auto" , color:"white"}}>
                  <ListItemAvatar>
                    <Avatar sizes={"large"}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={message.body} secondary={
                    <React.Fragment >
                      <Typography sx={user._id !== message.sender ? {float:"right"} : {float:"right" , color:"white"}} component={"span"} variant="body2">
                          {new Date(message.created_ts).toLocaleString()}
                      </Typography>
                    </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
          )
        })
      )}
    </div>
  );
}

export default Message;
