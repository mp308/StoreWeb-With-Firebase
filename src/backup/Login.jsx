import React, { useState } from 'react'
import { auth } from '../config/Config'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const login = async (e) => {
        e.preventDefault();
        const sg = await signInWithEmailAndPassword(auth,email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError('');
                navigate('/');
            })
            .catch(err => setError(err.message));
    }

    return (
        <div className='container mx-auto max-w-md'>
            <h2 className='text-2xl font-semibold mb-4'>Login</h2>
            <form autoComplete="off" className='space-y-4' onSubmit={login}>
                <div>
                    <label htmlFor="email" className='block mb-1'>Email</label>
                    <input type="email" className='input' required
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label htmlFor="password" className='block mb-1'>Password</label>
                    <input type="password" className='input' required
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit" className='btn btn-green w-full'>LOGIN</button>
            </form>
            {error && <span className='text-red-500'>{error}</span>}
            <div className='text-center mt-4'>
                Don't have an account? <Link to="/signup" className='text-blue-500'>Register Here</Link>
            </div>
        </div>
    )
}

export default Login;
