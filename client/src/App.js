import './App.css';

//routerDOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import des pages
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/signup" element={<Signup/>} exact />
          <Route path="/profile" element={<Profile/>} exact />     
        </Routes>
      </Router>
    </>
  );
}

export default App;
