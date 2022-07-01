import React from 'react';

const TableData = ({data, index}) => {
    const { _id, name, email, phone, amount } = data;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>${amount}</td>
            <td className='space-x-4'>
                <button>Edit</button> 
                <span>|</span> 
                <button>Delete</button>
            </td>
        </tr>
    );
};

export default TableData;