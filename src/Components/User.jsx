import React  from "react";
import {useMutation} from "@apollo/client";
import {CREATE_USER_CONVERSATION} from "../Graphql/mutations";
import {client} from "../Graphql/apolloClient";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  ListItemButton,
  Divider
} from "@mui/material";
import { toast } from "react-toastify";


const User = ({user , bg}) => {

    const [createConversation , {data : userConversation}] = useMutation(CREATE_USER_CONVERSATION , {client : client})

    const handleClick = (event , user) =>{
        event.stopPropagation()
        createConversation({variables:{
          createUserConversationId: String(user._id)
        }})
    }

    if(userConversation){
      let {createUserConversation} = userConversation
      let {status , data , msg} = createUserConversation
      if(status !== 200){
        toast.error(String(msg))
      }
    }
    
  return (
    <div>
      <List disablePadding>
        <ListItemButton disableRipple onClick={(e) => handleClick(e , user)}>
          <ListItem key={user.id} sx={bg ? {background : "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)" , color:"white" , '&:hover' : {cursor : "pointer"}} : {'&:hover' : {cursor : "pointer"}}}>
            <ListItemAvatar>
              <Avatar sizes={"large"}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.username} secondary={
                <React.Fragment>
                    <Typography component={"span"} variant="body2" sx={bg ? {display:"inline",color:"white"} : {display:"inline"}}>
                        {user.status ? "active" : "inactive"}
                    </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </ListItemButton>
      </List>
      <Divider/>
    </div>
  );
};

export default User;
