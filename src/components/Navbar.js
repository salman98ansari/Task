import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav class="navbar navbar-light bg-light ">
            <div className="container">
            <div class="container-fluid">
                <Link to={'/'} class="navbar-brand">21Twelve Task</Link>
            </div>
            </div>
        </nav>       
    )
}

export default Navbar;
