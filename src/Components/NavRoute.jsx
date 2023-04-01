import React from 'react';
import Nav from './Nav';
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard';

import {BrowserRouter as Router , Route , Routes} from "react-router-dom"
const NavRoute = () => {
  return (
    <div>
      <Router>
        <Nav/>
        <Routes>
            <Route path='/' element={<Signin/>}/>
            <Route path='/login' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default NavRoute;
