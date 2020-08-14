import React from 'react';
import './Navbar.scss';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='main-nav'>
            <Link to='/'>Home</Link>
            <ul>
                <li>
                    <Link to='/estates'>Estates</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
