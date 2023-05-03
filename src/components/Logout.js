import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import { logout } from '../icon/icons';
import { Link } from 'react-router-dom';

const Logout = () => {

    const {setLoggedIn} = useContext(AuthContext)


    return (
        <Link onClick={()=> setLoggedIn({})}> 
            {logout}
        </Link>
    );
};

export default Logout;