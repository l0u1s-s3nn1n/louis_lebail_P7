import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='notFound'>
            <div className='notFoundContent'>
                <h3>Désolé, cette page n'éxiste pas!</h3>
                <Link to="/" exact>
                    <i className='fa fa-home'></i>
                    <span>Retour à l'accueil</span>
                </Link>
            </div>
        </div>   
    );
};

export default NotFound;