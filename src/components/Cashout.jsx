import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../config/Config'; // Ensure the correct path to your config
import { CartContext } from '../global/CartContext';
import Navbar from './Navbar'; // Ensure the correct path to your Navbar component
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../global/UserAuthContext'; // Ensure the correct path to your hook
import { collection, doc, setDoc } from 'firebase/firestore';

export const Cashout = () => {
    const { user } = useUserAuth();
    const navigate = useNavigate();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // Defining state
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const cashoutSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            const date = new Date();
            const time = date.getTime();
            try {
                await setDoc(doc(collection(db, 'Buyer-info ' + user.displayName), '_' + time), {
                    BuyerName: user.displayName, // Assuming user object has name property
                    BuyerEmail: user.email, // Assuming user object has email property
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty
                });
                setCell('');
                setAddress('');
                dispatch({ type: 'EMPTY' });
                setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
                setTimeout(() => {
                    navigate('/');
                }, 5000);
            } catch (err) {
                setError(err.message);
            }
        }
    }

    return (
        <>
            <Navbar user={user} />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Cashout Details</h2>
                {successMsg && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{successMsg}</div>}
                <form autoComplete="off" className="space-y-4" onSubmit={cashoutSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required value={user?.displayName} disabled />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required value={user?.email} disabled />
                    </div>
                    <div>
                        <label htmlFor="cell" className="block text-sm font-medium text-gray-700">Cell No</label>
                        <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required onChange={(e) => setCell(e.target.value)} value={cell} placeholder="eg 03123456789" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                        <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required onChange={(e) => setAddress(e.target.value)} value={address} />
                    </div>
                    <div>
                        <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Price To Pay</label>
                        <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required value={totalPrice} disabled />
                    </div>
                    <div>
                        <label htmlFor="totalQty" className="block text-sm font-medium text-gray-700">Total No of Products</label>
                        <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required value={totalQty} disabled />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md shadow-sm">SUBMIT</button>
                </form>
                {error && <span className="block text-red-500 mt-4">{error}</span>}
            </div>
        </>
    );
};
