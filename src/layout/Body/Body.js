import React, { useEffect, useState } from 'react';
import TableData from './TableData';

const Body = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [document, setDocument] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/data')
            .then(res => res.json())
            .then(data => { setDocument(data) })
    }, []);

    const handlePhoneNumber = event => {
        setPhoneNumber(event.target.value);
        if (/^[-\s\.]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{6}$/.test(event.target.value)) {
            setError('')
            return (true)
        }
        else{
            setError("phone number should be 11 digit, Not allow blank value!")
            return;
        }
    }

    const handleAddData = (e) => {
        e.preventDefault()
        const profile = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: phoneNumber,
            amount: e.target.amount.value,
        }

        console.log(profile)
        // fetch(`https://fathomless-lake-35584.herokuapp.com/myprofile/`, {
        //     method: 'PUT',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(profile)

        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         // toast.success('Your Info Set to DB')
        //     })
    }
    return (
        <section>
            <div className="navbar bg-base-300 xl:max-w-7xl mx-auto mt-10">
                <div className="flex-1">
                    <p className="text-xl px-6">Billings</p>
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-32 lg:w-96" />
                    </div>
                </div>
                <div className="flex-none gap-2 ">
                    <label htmlFor="add-billing-Modal" className="btn modal-button">Add New Bill</label>

                    <input type="checkbox" id="add-billing-Modal" className="modal-toggle" />
                    <div className="modal">
                        <form onSubmit={handleAddData} className="modal-box relative">
                            <label htmlFor="add-billing-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <div className='grid justify-center'>
                                <h3 className="font-bold text-lg">Add Your New Bill</h3>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input name='name' type="text" required placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Email</span>

                                    </label>
                                    <input name='email' type="text" required placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">PhoneNumber</span>

                                    </label>
                                    <input onChange={handlePhoneNumber} name='number' type="number" required placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Paid Amount</span>

                                    </label>
                                    <input name='amount' type="number" required placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>

                                <p className='text-danger'>{error}</p>

                                <input className='btn w-full max-w-xs mt-4' type="submit" value='submit' />
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <div className="bg-base-300 xl:max-w-7xl mx-auto mt-4 ">
                <table className="table table-compact w-full">
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

            <div className='xl:max-w-7xl flex justify-center items-center mt-16'>
                1,2,3
            </div>
        </section>
    );
};

export default Body;