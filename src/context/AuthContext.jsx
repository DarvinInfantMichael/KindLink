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

  const [ngos, setNgos] = useState(() => {
    const savedNgos = localStorage.getItem('kindlink_ngos');
    if (savedNgos) {
      return JSON.parse(savedNgos);
    }
    return [
      { id: 'ngo-1', name: 'Food Rescue Foundation', category: 'Food', credential: '1111111111', rating: 5.0 },
      { id: 'ngo-2', name: 'Books for All', category: 'Books', credential: '2222222222', rating: 5.0 },
      { id: 'ngo-3', name: 'Hope Furniture Bank', category: 'Furniture', credential: '3333333333', rating: 4.8 },
      { id: 'ngo-4', name: 'Warm Clothing Drive', category: 'Clothes', credential: '4444444444', rating: 4.9 },
      { id: 'ngo-5', name: 'Global Relief Fund', category: 'Other', credential: '5555555555', rating: 4.5 },
    ];
  });

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('kindlink_reviews_v2');
    if (savedReviews) return JSON.parse(savedReviews);
    return [
      { id: 'r1', donatorName: 'Sarah Jenkins', ngoName: 'Food Rescue Foundation', category: 'Food', date: '2026-08-10', rating: 5, comment: 'Amazing experience. The volunteers arrived exactly on time and were so polite. I feel great knowing my extra food went to a good cause!', likes: ['user-2', 'user-3'], image: '/images/review1.png' },
      { id: 'r2', donatorName: 'Michael Chen', ngoName: 'Warm Clothing Drive', category: 'Clothes', date: '2026-08-12', rating: 4, comment: 'Very straightforward process. I donated 3 bags of winter coats. Only giving 4 stars because the pickup was slightly delayed, but otherwise perfect.', likes: ['user-1'], image: '/images/review2.png' },
      { id: 'r3', donatorName: 'Emily Rodriguez', ngoName: 'Books for All', category: 'Books', date: '2026-08-14', rating: 5, comment: 'I loved how easy the platform was to use. I cleared out my entire bookshelf and they handled the rest. Highly recommended!', likes: [], image: '/images/review3.png' },
      { id: 'r4', donatorName: 'David Kim', ngoName: 'Hope Furniture Bank', category: 'Furniture', date: '2026-08-09', rating: 5, comment: 'The movers were professional and careful when taking the sofa out. A wonderful organization.', likes: ['user-1', 'user-4', 'user-5'], image: '/images/review4.png' }
    ];
  });

  const [ngoEvents, setNgoEvents] = useState(() => {
    const savedEvents = localStorage.getItem('kindlink_events_v2');
    if (savedEvents) return JSON.parse(savedEvents);
    return [
      { id: 'e1', title: 'Community Food Drive', ngoName: 'Food Rescue Foundation', date: '2026-08-15', location: 'Downtown Square, NY', description: 'Join us to distribute meals to over 500 homeless individuals. We are looking for volunteers to help pack and hand out the food.', image: '/images/event1.png' },
      { id: 'e2', title: 'Winter Clothes Collection', ngoName: 'Warm Clothing Drive', date: '2026-09-01', location: 'City Hall Plaza', description: 'Help us gather winter coats, blankets, and scarves. Every piece of clothing goes directly to families in need ahead of the harsh winter.', image: '/images/event2.png' },
      { id: 'e3', title: 'Literacy Awareness Walk', ngoName: 'Books for All', date: '2026-09-10', location: 'Central Park', description: 'A 5k walk to raise awareness for children\'s literacy. All funds raised will be used to build small community libraries in underserved neighborhoods.', image: '/images/event3.png' },
      { id: 'e4', title: 'Shelter Renovation Day', ngoName: 'Hope Furniture Bank', date: '2026-09-20', location: 'Brooklyn Community Center', description: 'Volunteer with us as we paint and refurnish the local community center to provide a safe space for youth after school.', image: '/images/event4.png' }
    ];
  });

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

  useEffect(() => {
    localStorage.setItem('kindlink_reviews_v2', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('kindlink_events_v2', JSON.stringify(ngoEvents));
  }, [ngoEvents]);

  // Listen for cross-tab updates for donations
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'kindlink_donations') {
        setDonations(e.newValue ? JSON.parse(e.newValue) : []);
      }
      if (e.key === 'kindlink_reviews_v2') {
        setReviews(e.newValue ? JSON.parse(e.newValue) : []);
      }
      if (e.key === 'kindlink_events_v2') {
        setNgoEvents(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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
    setNgos((prev) => [...prev, { ...ngoData, id: Date.now().toString(), rating: 5.0 }]);
  };

  const registerUser = (userData) => {
    setUsers((prev) => [...prev, userData]);
  };

  const toggleLikeReview = (reviewId, userId) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        const hasLiked = review.likes.includes(userId);
        return {
          ...review,
          likes: hasLiked ? review.likes.filter(id => id !== userId) : [...review.likes, userId]
        };
      }
      return review;
    }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, 
      donations, addDonation, updateDonationStatus, 
      ngos, registerNgo, 
      users, registerUser,
      reviews, toggleLikeReview,
      ngoEvents
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
