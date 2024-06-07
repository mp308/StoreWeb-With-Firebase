import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Alert, Button } from 'react-bootstrap'; 3
import { useUserAuth } from '../global/UserAuthContext'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { logIn } = useUserAuth();

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            await logIn(email,password);
            navigate('/');
        }catch(err) {
            setError(err.message);
            console.log(err)
        }
    };

  return (
    <>
    <div className='row'>
        <div className='col-md-6 mx-auto'>
            <h2 className='mb-3'>Login</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}> 
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Control
                        type='email'
                        placeholder='Email Address'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant='primary' type='submit'>Sign In</Button> 
                </div>
            </Form>

            <div className="p-4 box mt-3 text-center"></div>
            Already have an account? <Link to='/login'>Log in</Link>
        </div>
    </div>
</>
  )
}

export default Login