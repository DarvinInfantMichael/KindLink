import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('kindlink_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [donations, setDonations] = useState(() => {
    const savedDonations = localStorage.getItem('kindlink_donations');
    return savedDonations ? JSON.parse(savedDonations) : [];
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('kindlink_all_users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [ngos, setNgos] = useState([
    { id: 'ngo-1', name: 'Food Rescue Foundation', category: 'Food', credential: '1111111111' },
    { id: 'ngo-2', name: 'Books for All', category: 'Books', credential: '2222222222' },
    { id: 'ngo-3', name: 'Hope Furniture Bank', category: 'Furniture', credential: '3333333333' },
    { id: 'ngo-4', name: 'Warm Clothing Drive', category: 'Clothes', credential: '4444444444' },
    { id: 'ngo-5', name: 'Global Relief Fund', category: 'Other', credential: '5555555555' },
  ]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('kindlink_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kindlink_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('kindlink_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('kindlink_ngos', JSON.stringify(ngos));
  }, [ngos]);

  useEffect(() => {
    localStorage.setItem('kindlink_all_users', JSON.stringify(users));
  }, [users]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addDonation = (donationData) => {
    setDonations((prev) => [{ ...donationData, id: Date.now().toString() }, ...prev]);
  };

  const updateDonationStatus = (donationId, newStatus) => {
    setDonations((prev) => 
      prev.map(d => d.id === donationId ? { ...d, status: newStatus } : d)
    );
  };

  const registerNgo = (ngoData) => {
    setNgos((prev) => [...prev, { ...ngoData, id: Date.now().toString() }]);
  };

  const registerUser = (userData) => {
    setUsers((prev) => [...prev, userData]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, donations, addDonation, updateDonationStatus, ngos, registerNgo, users, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
