import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [billing, setBilling] = useState([]);

    let total = 0;
    billing.forEach(bill => {
        total += parseInt(bill.amount);
    })
    useEffect(() => {
        fetch(`https://aqueous-ravine-07648.herokuapp.com/billing-list`)
            .then(res => res.json())
            .then(data => { setBilling(data) })
    }, []);

    return (
        <section className='bg-base-300'>
            <div className="navbar w-full xl:max-w-7xl mx-auto">
                <div className="navbar-start">
                    <Link to='/' className="btn btn-ghost normal-case text-2xl">Power Hack</Link>
                </div>
                <div className="navbar-end">
                    <p className="text-xl">Paid Total = {total}</p>
                </div>
            </div>
        </section>
    );
};

export default Header;