import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, doc, setDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // We keep `user` in localStorage for seamless prototype login experience
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('kindlink_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ngoEvents, setNgoEvents] = useState([]);
  const [isFirebaseEnabled, setIsFirebaseEnabled] = useState(false);

  useEffect(() => {
    // Check if Firebase is configured properly
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      console.warn("Firebase is not configured yet. Please update the .env file.");
      setIsFirebaseEnabled(false);
      return;
    }
    
    setIsFirebaseEnabled(true);

    const unsubDonations = onSnapshot(collection(db, 'donations'), (snapshot) => {
      setDonations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    
    const unsubNgos = onSnapshot(collection(db, 'ngos'), (snapshot) => {
      setNgos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubReviews = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubEvents = onSnapshot(collection(db, 'events'), (snapshot) => {
      setNgoEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubDonations();
      unsubNgos();
      unsubUsers();
      unsubReviews();
      unsubEvents();
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('kindlink_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kindlink_user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addDonation = async (donationData) => {
    if (!isFirebaseEnabled) return;
    try {
      const docRef = await addDoc(collection(db, 'donations'), { ...donationData, createdAt: new Date().toISOString() });
    } catch (e) {
      console.error("Error adding donation:", e);
    }
  };

  const updateDonationStatus = async (donationId, newStatus) => {
    if (!isFirebaseEnabled) return;
    try {
      await updateDoc(doc(db, 'donations', donationId), { status: newStatus });
    } catch (e) {
      console.error("Error updating donation:", e);
    }
  };

  const removeDonation = async (donationId) => {
    if (!isFirebaseEnabled) return;
    try {
      await deleteDoc(doc(db, 'donations', donationId));
    } catch (e) {
      console.error("Error deleting donation:", e);
    }
  };

  const registerNgo = async (ngoData) => {
    if (!isFirebaseEnabled) return;
    try {
      await setDoc(doc(db, 'ngos', ngoData.id), { ...ngoData, rating: 5.0 });
    } catch (e) {
      console.error("Error registering NGO:", e);
    }
  };

  const registerUser = async (userData) => {
    if (!isFirebaseEnabled) return;
    try {
      await setDoc(doc(db, 'users', userData.id), { ...userData, rating: 5.0 });
    } catch (e) {
      console.error("Error registering user:", e);
    }
  };

  const toggleLikeReview = async (reviewId, userId) => {
    if (!isFirebaseEnabled) return;
    try {
      const review = reviews.find(r => r.id === reviewId);
      if (!review) return;
      const hasLiked = review.likes.includes(userId);
      const newLikes = hasLiked ? review.likes.filter(id => id !== userId) : [...review.likes, userId];
      await updateDoc(doc(db, 'reviews', reviewId), { likes: newLikes });
    } catch (e) {
      console.error("Error toggling like:", e);
    }
  };

  const addNgoEvent = async (eventData) => {
    if (!isFirebaseEnabled) return;
    try {
      await addDoc(collection(db, 'events'), eventData);
    } catch (e) {
      console.error("Error adding event:", e);
    }
  };

  const deleteNgoEvent = async (eventId) => {
    if (!isFirebaseEnabled) return;
    try {
      await deleteDoc(doc(db, 'events', eventId));
    } catch (e) {
      console.error("Error deleting event:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, 
      donations, addDonation, updateDonationStatus, removeDonation, 
      ngos, registerNgo, 
      users, registerUser,
      reviews, toggleLikeReview,
      ngoEvents, addNgoEvent, deleteNgoEvent
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
