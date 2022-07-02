import React from 'react';

const TableData = ({ billing, handleEditBilling, handleDeleteBilling }) => {
    return (
        <>
            {
                billing.map((bill, index) => <tr key={bill._id}>
                    <td>{index + 1}</td>
                    <td>{bill._id}</td>
                    <td>{bill.name}</td>
                    <td>{bill.email}</td>
                    <td>{bill.phone}</td>
                    <td>${bill.amount}</td>
                    <td className='space-x-4'>
                        <button onClick={() => handleEditBilling(bill._id)}><label htmlFor="add-billing-Modal" className="cursor-pointer modal-button">Edit</label></button>

                        <span>|</span>
                        <button onClick={() => handleDeleteBilling(bill._id)}>Delete</button>
                    </td>
                </tr>)
            }
        </>
    );
};

export default TableData;