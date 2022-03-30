import logo from './logo.svg';
import './App.css';

//RouterDOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import des pages
import Home from './pages/Home';
import Knowledges from './pages/Login';
import Portfolio from './pages/Signup';
import Contact from './pages/Profile';
import NotFound from './pages/notFound';


function App() {
  return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/home" element={<Knowledges/>} exact />
          <Route path="/login" element={<Portfolio/>} exact />
          <Route path="/signup" element={<Contact/>} exact />
          <Route path="/profile" element={<Contact/>} exact />
          <Route path="*" element={<NotFound/>}/>      
        </Routes>
      </Router>
    </>
    );
  }

export default App;
