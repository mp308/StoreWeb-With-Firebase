import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Alert, Button } from 'react-bootstrap';
import { useUserAuth } from '../global/UserAuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../config/Config'; // Import auth from your Config file
import { updateProfile } from 'firebase/auth';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signUp } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Create user with email and password
            const userCredential = await signUp(email, password);
    
            // Set the display name for the user
            await updateProfile(auth.currentUser, {
                displayName: name
            });
    
            // Add user data to Firestore
            const docRef = await addDoc(collection(db, 'SignedUpUsersData'), {
                name: name,
                email: email,
                password: password
            });
            setName('');
            setEmail('');
            setPassword('');
            setError('');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <>
            <div className='row'>
                <div className='col-md-6 mx-auto'>
                    <h2 className='mb-3'>Register</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3' controlId='formBasicUserName'>
                            <Form.Control
                                type='text'
                                placeholder='User Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Control
                                type='email'
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant='primary' type='submit'>Sign Up</Button>
                        </div>
                    </Form>
                    <div className="p-4 box mt-3 text-center"></div>
                    Already have an account? <Link to='/login'>Log in</Link>
                </div>
            </div>
        </>
    );
}

export default Register;
