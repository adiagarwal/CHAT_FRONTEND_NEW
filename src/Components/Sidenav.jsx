import React , {useEffect , useContext} from 'react';
import {Box} from "@mui/material";
import User from './User';
import { useLazyQuery } from '@apollo/client';
import { client} from "../Graphql/apolloClient";
import { GET_CURRENT_USER } from "../Graphql/query";
import Search from './Search';
import ConversationList from './ConversationList';
import {userContext} from "../Context/userContext";

const Sidenav = () => {

    let {setUser} = useContext(userContext)

    let current_user = {};

    const [getCurrentUser , {data : currentUser}] = useLazyQuery(GET_CURRENT_USER,{client:client})
    

    useEffect(()=>{
        getCurrentUser()
    },[])

    if(currentUser){
      let {getCurrentUser} = currentUser
      let {data} = getCurrentUser
      current_user = data
    }

    useEffect(() =>{
      setUser(current_user)
    },[current_user])

  return (
    <>
    <Box sx={{display : "flex" , flexDirection:"column",height:"90vh"}}>
      <Box sx={{margin:"10px" , height:"15%" , minWidth:"300px"}}>
        <User user={current_user} bg={true}/>
      </Box>
      <Box sx={{margin:"20px" , height:"15%"}}>
        <Search/>
      </Box>
      <Box sx={{margin:"10px" ,height:"67%" , overflow: "auto" ,'&::-webkit-scrollbar' : {display : 'none'}}}>
        <ConversationList user_id={current_user._id}/>
      </Box>
    </Box>
    </>
  );
}

export default Sidenav;
