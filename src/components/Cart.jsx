import React, { useContext, useEffect } from 'react';
import { CartContext } from '../global/CartContext';
import Navbar from './Navbar';  // Correctly import Navbar

import { FaTrash } from "react-icons/fa";
import { MdNotInterested } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/Config';
import { useUserAuth } from '../global/UserAuthContext';

export const Cart = () => {
    const { user } = useUserAuth();
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <>
            <Navbar user={user} />
            <div className="container mx-auto">
                <div className="p-8">
                    <h1 className="text-2xl font-bold">Your Cart</h1>
                    {user && (
                        <div className="mt-4">
                            <p className="text-lg">UserName: {user.displayName}</p>
                            <p className="text-lg">Email: {user.email}</p>
                            <p className="text-lg">UID: {user.uid}</p>
                        </div>
                    )}
                </div>

                {shoppingCart.length !== 0 && (
                    <h2 className="text-xl font-bold px-8">Cart Items</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                    {shoppingCart.length === 0 ? (
                        <div className="text-center">
                            <p className="text-lg">No items in your cart or slow internet causing trouble. Please refresh the page or login.</p>
                            <Link to="/" className="text-blue-500 underline">Return to Home page</Link>
                        </div>
                    ) : (
                        shoppingCart.map((cart) => (
                            <div className='cart-card border rounded-lg p-4' key={cart.ProductID}>
                                <div className='cart-img'>
                                    <img src={cart.productImg} alt={cart.productName} className="w-full h-48 object-cover" />
                                </div>
                                <div className='cart-name mt-2'>{cart.productName}</div>
                                <div className='cart-price mt-2'>Rs {cart.productPrice}.00</div>
                                <div className='cart-quantity flex items-center justify-center mt-2'>
                                    <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                        <IoIosAddCircle className="text-green-500 cursor-pointer" />
                                    </div>
                                    <div className='quantity mx-2'>{cart.qty}</div>
                                    <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                        <MdNotInterested className="text-red-500 cursor-pointer" />
                                    </div>
                                </div>
                                <div className='cart-total-price mt-2'>Rs {cart.TotalProductPrice}.00</div>
                                <button className='delete-btn bg-red-500 text-white rounded-md px-4 py-2 mt-2' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {shoppingCart.length > 0 && (
                    <div className='cart-summary p-8'>
                        <div className='cart-summary-heading text-xl font-bold mb-4'>Cart Summary</div>
                        <div className='cart-summary-price flex justify-between mb-2'>
                            <span>Total Price</span>
                            <span>Rs {totalPrice?.toFixed(2) || '0.00'}</span>
                        </div>
                        <div className='cart-summary-price flex justify-between'>
                            <span>Total Qty</span>
                            <span>{totalQty || '0'}</span>
                        </div>
                        <Link to='/cashout' className='cashout-link mt-4'>
                            <button className='btn btn-success btn-md bg-green-500 text-white px-4 py-2'>
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
