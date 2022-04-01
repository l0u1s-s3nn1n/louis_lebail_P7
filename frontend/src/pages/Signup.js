import React from 'react';
import NavBar from '../components/NavBar';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
    return (
        <div className='login'>
            <NavBar/> 
            <div className='loginContent'>
                <div className='content'>
                    <SignUpForm/>
                </div>
            </div>
        </div>
            
    
    );
};

export default SignUp;