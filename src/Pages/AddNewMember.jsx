import React, { useState } from 'react';

function AddNewMember({ onAddMember }) {
    const [newMember, setNewMember] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        joinDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMember(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onAddMember) {
            onAddMember(newMember);
            setNewMember({
                name: '',
                phone: '',
                email: '',
                address: '',
                joinDate: ''
            });
        }
    };

    return (
        <div className='p-6 rounded-xl bg-white shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>Add New Member</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={newMember.name}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border rounded-md p-2'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Phone</label>
                    <input
                        type='text'
                        name='phone'
                        value={newMember.phone}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border rounded-md p-2'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={newMember.email}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border rounded-md p-2'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Address</label>
                    <input
                        type='text'
                        name='address'
                        value={newMember.address}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border rounded-md p-2'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Join Date</label>
                    <input
                        type='date'
                        name='joinDate'
                        value={newMember.joinDate}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border rounded-md p-2'
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-primary-default text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors'
                >
                    Add Member
                </button>
            </form>
        </div>
    );
}

export default AddNewMember;
