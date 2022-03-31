import './App.css';

//RouterDOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import des pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './pages/notFound';


function App() {
  return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/signup" element={<Signup/>} exact />
          <Route path="/profile" element={<Profile/>} exact />
          <Route path="*" element={<NotFound/>}/>      
        </Routes>
      </Router>
    </>
    );
  }

export default App;
