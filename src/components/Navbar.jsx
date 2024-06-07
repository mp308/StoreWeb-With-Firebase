import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import logo from '../assets/images/logo.png';
import { auth } from '../config/Config';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.log("Logout Error: ", error);
    }
  };

  return (
    <div className="bg-black p-6 text-white flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img className="h-20 w-auto flex" src={logo} alt="CEO" />
      </Link>
      {!user ? (
        <div className="space-x-4 text-3xl">
          <Link to="/register" className="hover:underline font-bebas">
            Signup
          </Link>
          <Link to="/Login" className="hover:underline font-bebas">
            Login
          </Link>
        </div>
      ) : (
        <div className="space-x-4 text-3xl flex items-center">
          <span>
            <Link to="/" className="hover:underline font-bebas">
              {user.displayName}
            </Link>
          </span>
          <span>
            <Link to="/cartproducts" className="hover:underline font-bebas">
            <FaShoppingCart />
            </Link>
          </span>
          <span>
            <button className="hover:underline font-bebas" onClick={logout}>
              Logout
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
