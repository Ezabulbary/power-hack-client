import React, { useEffect, useState } from 'react';
import TableData from './TableData';

const Body = () => {
    const [ document, setDocument ] = useState([]);
    useEffect(() => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => { setDocument(data) })
    }, []);
    return (
        <section>
            <div className="navbar bg-base-300 xl:max-w-7xl mx-auto mt-10">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Billings</a>
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered" />
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <button className="btn btn-base-content">Add New Bill</button>
                </div>
            </div>

            <div class="bg-base-300 xl:max-w-7xl mx-auto mt-4 ">
                <table class="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Billing ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Paid Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            document.map((data, index) => <TableData 
                            key={data._id} 
                            data={data} 
                            index={index}></TableData>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Body;