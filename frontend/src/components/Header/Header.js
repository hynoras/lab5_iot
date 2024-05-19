import React, { useState } from 'react';
import './header.css';
import Login from '../Login/Login';


function Header() {

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <header>
      <h1>Welcome to IoT System Dashboard of Group 9 </h1>
      <button 
        className='btnLogin'
        onClick={openModal}
      >
        Log in
      </button>
      <Login
        isOpen={isModalOpen} 
        onClose={closeModal}
      />
    </header>
  );
}

export default Header;  