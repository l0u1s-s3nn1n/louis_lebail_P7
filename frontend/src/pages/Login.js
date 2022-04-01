import React from 'react';
import NavBar from '../components/NavBar';
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <div className='login'>
            <NavBar/> 
            <div className='loginContent'>
                <div className='content'>
                    <LoginForm/>
                </div>
            </div>
        </div>
            
    
    );
};

export default Login;