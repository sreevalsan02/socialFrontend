import './App.css';
import Topbar from './components/topbar/Topbar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from "./pages/profile/Profile"
import { BrowserRouter,Routes,Route , Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function App() {
  const {user} = useSelector( state => state.auth)
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {user?<Home/>: <Login/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/profile/:username" element = {<Profile/>} />
        </Routes>
      </BrowserRouter>
      {/* <Topbar/> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </div>
  );
}

export default App;
