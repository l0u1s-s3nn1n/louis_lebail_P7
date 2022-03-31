import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const NavBar = () => {
    return (
        
<div className='sidebar'>
    <div className='logo'>
        <div className='logoContent'>
            <img src='../media/icon-left-font-monochrome-white.svg' alt='logo-pic'></img>
        </div>
    </div>

    <div className='navigation'>
        <ul>
            <li>
                <Link exact="true" to='/'  className="navActive">
                    <i className='fas fa-home'></i>
                    <span> Accueil</span>
                </Link>
            </li>
            <li>
                <Link exact="true" to="/login" className="navActive">
                    <i className='fas fa-user'></i>
                    <span>Se connecter</span>
                </Link>
            </li>
            <li>
                <Link exact="true" to="/signup" className="navActive">
                <i><FontAwesomeIcon icon={['fab', 'apple']} /></i>

                <span>S'inscrire</span>
                </Link>
            </li>
            <li>
                <Link exact="true" to="/profile" className="navActive">
                    <i className=''></i>
                    <span>Mon profil</span>
                </Link>
            </li>
        </ul>
    </div>
</div>

    );
}; 

export default NavBar;
