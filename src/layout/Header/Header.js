import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    
    return (
        <section className='bg-base-300'>
            <div className="navbar w-full xl:max-w-7xl mx-auto">
                <div className="navbar-start">
                    <Link to='/' className="btn btn-ghost normal-case text-2xl">Power Hack</Link>
                </div>
                <div className="navbar-end">
                    <p className="text-xl">Paid Total = 0</p>
                </div>
            </div>
        </section>
    );
};

export default Header;