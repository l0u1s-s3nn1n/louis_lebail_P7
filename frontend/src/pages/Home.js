import React from 'react';

import NavBar from '../components/NavBar';
import Timeline from '../components/Timeline';

const Home = () => {
    return (
        <div className='home'>
            <NavBar/>
            <div className='homeContent'>
                <div className='content'>
                <Timeline/>
                   
                    </div>
                </div>
            </div>
    );
};

export default Home;