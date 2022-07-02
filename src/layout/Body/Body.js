import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TableData from './TableData';

const Body = () => {
    const [query, setQuery] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [billing, setBilling] = useState([]);
    const [billingCount, setBillingCount] = useState(0);
    const [billingPage, setBillingPage] = useState(0);
    const [size, setSize] = useState(10);
    const [billWithId, setBillWithId] = useState({});

    const keys = ['name', 'email', 'phone'];

    const search = events => {
        return events.filter(event => keys.some(key  => event[key].toLowerCase().includes(query)));
    }

    useEffect(() => {
        fetch('http://localhost:5000/billing-list-count')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10);
                setBillingCount(pages);
            })
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/billing-list?billingPage=${billingPage}&size=${size}`)
            .then(res => res.json())
            .then(data => { setBilling(data) })
    }, [billingPage, size]);

    const handleEmail = event => {
        setEmail(event.target.value);
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
            setError('')
            return (true)
        }
        else {
            setError("You have entered an invalid email address!")
            return;
        }
    }

    const handlePhoneNumber = event => {
        setPhone(event.target.value);
        if (/^[-\s.]?[0-9]{3}[)]?[-\s.]?[0-9]{2}[-\s.]?[0-9]{6}$/.test(event.target.value)) {
            setError('')
            return (true)
        }
        else {
            setError("phone number should be 11 digit, Not allow blank value!")
            return;
        }
    }

    const handleAddData = (e) => {
        e.preventDefault()
        const billingData = {
            name: e.target.name.value,
            email: email,
            phone: phone,
            amount: e.target.amount.value,
        }

        fetch('http://localhost:5000/add-billing', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(billingData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Your Data is successfully Added!')
                window.location.reload();
            })
    }

    const handleEditBilling = (id) => {
       if(id){
           fetch(`http://localhost:5000/update-billing/${id}`, {
               method: 'PUT',
               headers: {
                   'content-type': 'application/json'
               }
           })
               .then(res => res.json())
               .then(data => {
                   console.log(data);
                   setBillWithId(data)
                   if (data.matchedCount){
                       toast.success('Bill is Updated!')
                       window.location.reload();
                   }
               })
       }
    }

    const handleDeleteBilling = (id) => {
        const proceed = window.confirm('Are you sure you want to delete this item?')
        if (proceed) {
            fetch(`http://localhost:5000/delete-billing/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.deletedCount) {
                        toast.success('Bill is Deleted!')
                        window.location.reload();
                    }
                })
        }
    }
    return (
        <section>
            <div className="navbar bg-base-300 xl:max-w-7xl mx-auto mt-10">
                <div className="flex-1">
                    <p className="text-xl px-6">Billings</p>
                    <div className="form-control">
                        <input type="text" placeholder="Search..." className="input input-bordered w-32 lg:w-96" onChange={e => setQuery(e.target.value)} />
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
                                    <input name='name' type="text" required defaultValue={billWithId?.item?.name} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Email</span>

                                    </label>
                                    <input onChange={handleEmail} name='email' type="text" required defaultValue={billWithId?.item?.email} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">PhoneNumber</span>

                                    </label>
                                    <input onChange={handlePhoneNumber} name='number' type="number" required defaultValue={parseInt(billWithId?.item?.phone)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Paid Amount</span>

                                    </label>
                                    <input name='amount' type="number" required defaultValue={parseInt(billWithId?.item?.amount)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
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
                        <TableData 
                        billing={search(billing)} 
                        handleEditBilling={handleEditBilling} 
                        handleDeleteBilling={handleDeleteBilling} ></TableData>
                    </tbody>
                </table>
            </div>

            <div className='xl:max-w-7xl mx-auto flex justify-center items-center my-16 space-x-4'>
                {
                    [...Array(billingCount).keys()].map(number => <button className={billingPage === number ? 'border-2 rounded p-2 bg-black text-white' : 'border-2 rounded p-2 bg-slate-300'} onClick={() => setBillingPage(number)}>{number + 1}</button>)
                }
                <select className='border-2 rounded p-2 bg-slate-300' onChange={e => setSize(e.target.value)}>
                    <option value="10">10</option>
                </select>
            </div>
        </section>
    );
};

export default Body;