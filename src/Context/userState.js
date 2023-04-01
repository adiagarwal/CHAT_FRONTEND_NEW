import React , {useState} from 'react';
import {userContext} from "./userContext";


const UserState = (props) => {
    let [user , setUser] = useState({})
  return (
    <userContext.Provider value={{user , setUser}}>
      {props.children}
    </userContext.Provider>
  );
}

export default UserState;
