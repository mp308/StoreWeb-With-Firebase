import React from 'react';
import Navbar from './Navbar';
import { Product } from './Product';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../global/UserAuthContext';
import { Button } from 'react-bootstrap';

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className=''>
      <Navbar user={user} />
      <div>
        <h1>Welcome to Home</h1>
        {user ? (
          <> 
            <p>UserName : {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>UID: {user.uid}</p>
            <Button onClick={handleLogout} variant='danger'>Logout</Button>
          </>
        ) : (
          <p>Please log in to view content.</p>
        )}
      </div>
      <Product />
    </div>
  );
};

export default Home;
