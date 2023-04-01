import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConversationState from "./Context/conversationState";
import UserState from "./Context/userState";
import NavRoute from './Components/NavRoute';

function App() {
  return (
    <div className="App">
      <UserState>
      <ConversationState>
      <NavRoute/>
      <ToastContainer/>
      </ConversationState>
      </UserState>
    </div> 
  );
}

export default App;
