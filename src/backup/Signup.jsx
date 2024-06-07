import React, { useState } from 'react';
import { auth, db } from '../config/Config'; // Import auth and db from Config
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword from firebase/auth
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import Firestore functions

const Signup = () => {
    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    // signup
    const signup = async (e) => {
        e.preventDefault();
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await addDoc(collection(db, 'SignedUpUsersData'), {
                Name: name,
                Email: email,
                Password: password
            });
            setName('');
            setEmail('');
            setPassword('');
            setError('');
            navigate('/login'); // Use navigate function to redirect to /login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='container mx-auto max-w-md'>
            <h2 className='text-2xl font-semibold mb-4'>Sign up</h2>
            <form autoComplete="off" className='space-y-4' onSubmit={signup}>
                <div className=''>
                    <label htmlFor="name" className='block mb-1'>Name</label>
                    <input type="text" className='input' required
                        onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className=''>
                    <label htmlFor="email" className='block mb-1'>Email</label>
                    <input type="email" className='input' required
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className=''>
                    <label htmlFor="password" className='block mb-1'>Password</label>
                    <input type="password" className='input' required
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit" className='btn btn-green w-full'>SUBMIT</button>
            </form>
            {error && <span className='text-red-500'>{error}</span>}
            <div className='text-center mt-4'>
                Already have an account? <Link to="/login" className='text-blue-500'>Login Here</Link>
            </div>
        </div>
    );
};

export default Signup;
