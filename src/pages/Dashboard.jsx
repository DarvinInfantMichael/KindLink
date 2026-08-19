import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, ImagePlus, Calendar, Clock, HeartHandshake, CheckCircle2, ChevronDown, MapPin, User, Building2, Phone, TrendingUp, Quote, X, Trash2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageTransition from '../components/PageTransition';
import ThemeToggle from '../components/ThemeToggle';
import RecentReviews from '../components/RecentReviews';
import NgoEvents from '../components/NgoEvents';
import HelpingDay from '../components/HelpingDay';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { createPortal } from 'react-dom';

// Fix Leaflet default marker icon paths for React/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function Dashboard() {
  const { user, logout, ngos, addDonation, updateDonationStatus, removeDonation, donations, users } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-emerald-950/20 dark:to-gray-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-brand-50/80 via-white/80 to-teal-50/80 dark:from-brand-950/80 dark:via-gray-950/80 dark:to-teal-950/80 backdrop-blur-md border-b border-brand-100 dark:border-brand-900 sticky top-0 z-10 transition-all duration-300 hover:shadow-md hover:shadow-brand-500/10 hover:border-brand-300 dark:hover:border-brand-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-8 h-8 text-brand-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">KindLink</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-sm hidden sm:block">
              <span className="text-gray-500 dark:text-gray-400">Welcome, </span>
              <span className="font-semibold text-gray-900 dark:text-white">{user?.name}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-6 sm:p-10 border border-white/50 dark:border-gray-800/50 min-h-[80vh]">
          <AnimatePresence mode="wait">
            {user?.role === 'donator' ? (
              <DonatorDashboard key="donator" ngos={ngos} addDonation={addDonation} currentUser={user} donations={donations} removeDonation={removeDonation} />
            ) : (
              <ReceiverDashboard key="receiver" donations={donations} currentUser={user} updateDonationStatus={updateDonationStatus} removeDonation={removeDonation} users={users} ngos={ngos} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </PageTransition>
  );
}

function UpcomingActivitiesView({ activities, title, subtitle, isNgo, onAdd, onDelete }) {
  const [registered, setRegistered] = useState({});

  const handleRegister = (activityId) => {
    setRegistered(prev => ({
      ...prev,
      [activityId]: { status: 'registered', reminder: false }
    }));
  };

  const handleSetReminder = (activityId) => {
    setRegistered(prev => ({
      ...prev,
      [activityId]: { ...prev[activityId], reminder: true }
    }));
    alert('Reminder set for 1 day before the event!');
  };

  return (
    <div className="pt-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
        </div>
        {isNgo && (
          <button 
            onClick={onAdd}
            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            + New Activity
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <AnimatePresence>
           {activities.map(activity => (
             <motion.div 
               key={activity.id} 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="glass p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden flex flex-col"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 pointer-events-none"></div>
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="p-3 bg-brand-50 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 rounded-xl">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md">
                      {activity.participants || 0} Registered
                    </span>
                    {isNgo && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Activity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{activity.title}</h3>
                {!isNgo && <p className="text-sm font-medium text-brand-600 dark:text-brand-400 mb-1">{activity.ngoName}</p>}
                <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mb-4 flex-1">
                   {activity.date}
                </p>
                
                <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{activity.time || '10:00 AM - 2:00 PM'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{activity.location}</span>
                  </div>
                </div>
                
                {!isNgo && (
                  <div className="mt-5 flex flex-col gap-2 pt-5 border-t border-gray-100 dark:border-gray-800">
                    {!registered[activity.id] ? (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRegister(activity.id); }}
                        className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-brand-500/20 transition-all active:scale-95"
                      >
                        Register Now
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="w-full py-2 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 cursor-default">
                          <CheckCircle2 className="w-4 h-4" /> Registered
                        </div>
                        {!registered[activity.id].reminder && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleSetReminder(activity.id); }}
                            className="w-full py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-600 dark:hover:text-brand-400 rounded-xl text-xs font-medium transition-colors shadow-sm"
                          >
                            Set Reminder (1 Day Before)
                          </button>
                        )}
                        {registered[activity.id].reminder && (
                          <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" /> Reminder set for 1 day before
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
             </motion.div>
           ))}
         </AnimatePresence>
      </div>
    </div>
  );
}

function DonatorDashboard({ ngos, addDonation, currentUser, donations, removeDonation }) {
  const { width, height } = useWindowSize();
  const { ngoEvents } = useAuth();
  const [selectedNgo, setSelectedNgo] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [dateSlot, setDateSlot] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060 }); // Default: New York
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation access denied or failed. Using default location.", error);
        }
      );
    }
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLocation(e.latlng);
      },
    });
    return location ? <Marker position={location} /> : null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const donationData = {
      ngoId: selectedNgo,
      donatorId: currentUser.id,
      category,
      customCategory: category === 'Other' ? customCategory : '',
      image: imagePreview,
      dateSlot,
      timeSlot,
      location,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      addDonation(donationData);
      setIsSubmitting(false);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        setSelectedNgo('');
        setCategory('');
        setCustomCategory('');
        setImagePreview(null);
        setDateSlot('');
        setTimeSlot('');
      }, 3000);
    }, 1000);
  };

  const categories = ['Food', 'Furniture', 'Clothes', 'Books', 'Other'];

  const staggerList = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="w-full">
      {success && typeof document !== 'undefined' && createPortal(
        <Confetti 
          width={width} 
          height={height} 
          recycle={true} 
          numberOfPieces={800} 
          gravity={0.15}
          colors={['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 999999, pointerEvents: 'none' }} 
        />,
        document.body
      )}

      {/* User Profile & Rating Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-brand-100 dark:border-brand-900/30 bg-gradient-to-r from-brand-50 to-emerald-50 dark:from-brand-950/20 dark:to-emerald-950/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-brand-100 dark:bg-brand-500/20 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h3>
            <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">KindLink Donor</p>
          </div>
        </div>
        <div className="flex flex-col sm:items-end">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Community Rating</span>
          <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 w-fit">
            ⭐ {currentUser.rating ? currentUser.rating.toFixed(1) : '5.0'}
          </span>
        </div>
      </motion.div>

      <RecentReviews />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="glass max-w-2xl mx-auto rounded-2xl p-6 sm:p-8"
      >
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div 
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="py-12 text-center flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Donation Scheduled!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Thank you for your kindness. The NGO has been notified.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSuccess(false)} 
              className="text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700"
            >
              Make another donation
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Make a Donation</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Fill out the details below to schedule your pickup/drop-off.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NGO Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Organization</label>
                <div className="relative">
                  <select
                    required
                    value={selectedNgo}
                    onChange={(e) => setSelectedNgo(e.target.value)}
                    className="w-full appearance-none rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-3 pl-4 pr-10 shadow-sm border outline-none"
                  >
                    <option value="" disabled>Choose an NGO...</option>
                    {ngos.map((ngo) => (
                      <option key={ngo.id} value={ngo.id}>{ngo.name} ({ngo.category}) - {ngo.rating ? ngo.rating.toFixed(1) : '5.0'} ⭐</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What are you donating?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-4 rounded-xl border transition-all text-sm font-medium ${
                        category === cat 
                          ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-brand-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-brand-500/50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom Category Input */}
              <AnimatePresence>
                {category === 'Other' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Please specify</label>
                      <input
                        type="text"
                        required
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-2.5 px-4 shadow-sm border outline-none"
                        placeholder="E.g., Blankets, Toys"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Image</label>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    imagePreview 
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-500/10' 
                      : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-brand-500 dark:hover:bg-gray-800'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <AnimatePresence mode="wait">
                    {imagePreview ? (
                      <motion.div 
                        key="preview"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm"
                      >
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-medium flex items-center gap-2">
                            <ImagePlus className="w-5 h-5" /> Change Image
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"
                      >
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-3">
                          <ImagePlus className="w-6 h-6 text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">Click to upload a photo</span>
                        <span className="text-xs">PNG, JPG up to 5MB</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={dateSlot}
                      onChange={(e) => setDateSlot(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-2.5 pl-10 shadow-sm border outline-none"
                    />
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Time Slot</label>
                  <div className="relative">
                    <select
                      required
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full appearance-none rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-2.5 pl-10 pr-10 shadow-sm border outline-none"
                    >
                      <option value="" disabled>Select a slot...</option>
                      <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                      <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                      <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
                    </select>
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                    <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Map Location Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pickup Location</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Drag the map and click to pinpoint your exact pickup location.</p>
                <div className="h-64 w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm relative z-0">
                  <MapContainer 
                    center={location} 
                    zoom={13} 
                    scrollWheelZoom={false} 
                    className="w-full h-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                  </MapContainer>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || !selectedNgo || !category || (category==='Other' && !customCategory) || !dateSlot || !timeSlot}
                  className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-brand-500/30"
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Donation'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donator History */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Donated Items to NGOs</h3>
        {donations.filter(d => d.donatorId === currentUser.id).length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 dark:text-gray-400 py-8 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800"
          >
            You haven't made any donations yet.
          </motion.div>
        ) : (
          <motion.div 
            variants={staggerList}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {donations.filter(d => d.donatorId === currentUser.id).map(donation => {
              const ngo = ngos.find(n => n.id === donation.ngoId);
              return (
                <motion.div 
                  variants={listItem}
                  key={donation.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4"
                >
                  {donation.image ? (
                    <img src={donation.image} alt="Donation" className="w-16 h-16 rounded-lg object-cover" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                      <ImagePlus className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {donation.category === 'Other' ? donation.customCategory : donation.category}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">To: {ngo ? ngo.name : 'Unknown NGO'}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(donation.dateSlot).toLocaleDateString()} • {donation.timeSlot}
                    </p>
                  </div>
                  <div className="text-right">
                    {donation.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-green-50 text-green-700 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 text-xs font-semibold border">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20 text-xs font-semibold border">
                        <motion.span 
                          animate={{ opacity: [1, 0.5, 1] }} 
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-1.5 h-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400"
                        />
                        Pending
                      </span>
                    )}
                    {donation.status !== 'verified' && (
                      <button
                        onClick={() => removeDonation(donation.id)}
                        className="ml-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors inline-flex items-center justify-center"
                        title="Cancel Donation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
      </motion.div>
      
      <div className="mt-8 border-t border-gray-200 dark:border-gray-800">
        <UpcomingActivitiesView 
          activities={ngoEvents}
          title="Upcoming Activities"
          subtitle="Explore events and drives organized by our partner NGOs."
          isNgo={false}
        />
      </div>

      <NgoEvents />
      <HelpingDay />
      <AppRating />
    </div>
  );
}

function AppRating() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-8 glass rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-800 flex flex-col items-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <HeartHandshake className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You for Your Feedback!</h3>
        <p className="text-gray-500 dark:text-gray-400">Your rating and feedback help us improve KindLink and bring more smiles to the community.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 glass rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">How is your experience with KindLink?</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">We value your feedback and it helps us connect more donors with NGOs efficiently.</p>
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleRate(star)}
            className="p-2 transition-colors focus:outline-none"
          >
            <Star 
              className={`w-10 h-10 transition-colors duration-200 ${
                star <= (hoveredRating || rating) 
                  ? 'fill-brand-500 text-brand-500 drop-shadow-md' 
                  : 'text-gray-300 dark:text-gray-600'
              }`} 
            />
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence>
        {rating > 0 && !submitted && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mt-6 max-w-lg mx-auto overflow-hidden"
          >
            <p className="mb-4 font-bold text-brand-600 dark:text-brand-400">
              {['Needs Improvement', 'Fair', 'Good', 'Very Good', 'Excellent!'][rating - 1]}
            </p>
            <textarea
              placeholder="Tell us more about your experience... (optional)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all p-4 shadow-sm border outline-none min-h-[100px] resize-y mb-4"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-md shadow-brand-500/20 transition-all"
            >
              Submit Feedback
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReceiverDashboard({ donations, currentUser, updateDonationStatus, removeDonation, users, ngos }) {
  const { ngoEvents, addNgoEvent, deleteNgoEvent } = useAuth();
  
  const myDonations = donations.filter(d => d.ngoId === currentUser.id);
  const myNgoInfo = ngos?.find(n => n.id === currentUser.id);

  // Derive today's donations
  const todaysDonations = myDonations.filter(d => {
    const today = new Date().toISOString().split('T')[0];
    return d.dateSlot >= today; // simplified logic for demo, considering future or today slots as today/upcoming
  });

  const chartData = [
    { name: 'Mon', donations: 4 },
    { name: 'Tue', donations: 7 },
    { name: 'Wed', donations: 5 },
    { name: 'Thu', donations: 10 },
    { name: 'Fri', donations: 8 },
    { name: 'Sat', donations: 15 },
    { name: 'Sun', donations: 12 },
  ];

  const helperQuotes = [
    { text: "We make a living by what we get, but we make a life by what we give.", author: "Winston Churchill" },
    { text: "No one has ever become poor by giving.", author: "Anne Frank" },
    { text: "The meaning of life is to find your gift. The purpose of life is to give it away.", author: "Pablo Picasso" }
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % helperQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const myUpcomingActivities = ngoEvents?.filter(e => e.ngoName === currentUser.name || e.ngoId === currentUser.id) || [];

  const [showActivityModal, setShowActivityModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    date: '',
    time: '',
    location: ''
  });

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (newActivity.title && newActivity.date && newActivity.time && newActivity.location) {
      addNgoEvent({
        title: newActivity.title,
        date: newActivity.date,
        time: newActivity.time,
        location: newActivity.location,
        participants: 0,
        ngoName: currentUser.name,
        ngoId: currentUser.id,
        description: `Join us for the ${newActivity.title} on ${newActivity.date}. We look forward to your support!`,
        image: 'https://images.unsplash.com/photo-1593113514676-538b3f1a0e40?q=80&w=600&auto=format&fit=crop'
      });
      setNewActivity({ title: '', date: '', time: '', location: '' });
      setShowActivityModal(false);
    }
  };

  const handleDeleteActivity = (id) => {
    deleteNgoEvent(id);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Attractive Message Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-brand-800 p-8 sm:p-10 text-white shadow-xl shadow-brand-500/20 border border-brand-500/20">
        <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
           <HeartHandshake className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wider mb-4 border border-white/20 uppercase">
            KindLink Information
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Together, we amplify kindness.</h2>
          <p className="text-brand-100 text-lg leading-relaxed">
            Your organization is at the heart of our mission. By connecting generous donors directly to your cause, we streamline the process of receiving essential resources, empowering you to focus on what matters most: helping those in need.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NGO Info */}
        <div className="glass rounded-2xl p-6 lg:col-span-1 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-brand-100 dark:bg-brand-500/20 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{myNgoInfo?.name || currentUser.name}</h3>
                <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">{myNgoInfo?.category || 'Registered NGO'}</p>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{myNgoInfo?.address || 'Location on file'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{myNgoInfo?.credential || currentUser.credential}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Community Rating</span>
              <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1 bg-brand-50 dark:bg-brand-500/20 px-2 py-1 rounded-md text-brand-700 dark:text-brand-400 text-sm">
                ⭐ {myNgoInfo?.rating ? myNgoInfo.rating.toFixed(1) : '5.0'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats & Chart */}
        <div className="glass rounded-2xl p-6 lg:col-span-2 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="grid grid-cols-2 gap-4 mb-6">
             <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
               <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Today's Active Donations</p>
               <div className="flex items-end gap-2">
                 <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{todaysDonations.length}</span>
                 <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded font-medium flex items-center mb-1.5 border border-green-100 dark:border-green-500/20"><TrendingUp className="w-3 h-3 mr-1"/> Activity</span>
               </div>
             </div>
             <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
               <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Received</p>
               <div className="flex items-end gap-2">
                 <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{myDonations.length}</span>
                 <span className="text-xs text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-1.5 py-0.5 rounded font-medium flex items-center mb-1.5 border border-brand-100 dark:border-brand-500/20">All time</span>
               </div>
             </div>
          </div>
          <div className="flex-1 w-full min-h-[160px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#8884d8" opacity={0.15} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} />
                 <Tooltip 
                   cursor={{fill: 'rgba(14, 165, 233, 0.05)'}} 
                   contentStyle={{borderRadius: '12px', border: '1px solid rgba(229, 231, 235, 0.5)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                   itemStyle={{color: '#0ea5e9', fontWeight: 'bold'}}
                 />
                 <Bar dataKey="donations" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Helper Quotes */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-center shadow-xl border border-green-500/20 bg-gradient-to-r from-green-500 to-emerald-700 text-white shadow-green-500/20">
         <div className="absolute -top-10 -left-10 opacity-10 pointer-events-none">
           <Quote className="w-64 h-64" />
         </div>
         <div className="h-24 flex flex-col items-center justify-center relative z-10 mt-2">
           <AnimatePresence mode="wait">
             <motion.div
               key={quoteIndex}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.5 }}
               className="max-w-2xl"
             >
               <p className="text-xl sm:text-2xl font-medium leading-tight">"{helperQuotes[quoteIndex].text}"</p>
               <p className="text-sm text-green-100 mt-4 font-bold tracking-wide uppercase">— {helperQuotes[quoteIndex].author}</p>
             </motion.div>
           </AnimatePresence>
         </div>
      </div>

      {/* Upcoming Activities (NEW) */}
      <UpcomingActivitiesView 
        activities={myUpcomingActivities}
        title="Your Upcoming Activities"
        subtitle="Events and drives organized by your NGO."
        isNgo={true}
        onAdd={() => setShowActivityModal(true)}
        onDelete={handleDeleteActivity}
      />

      {/* Incoming Donations */}
      <div className="pt-4">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Incoming Donations</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Manage resources directed to your organization.</p>
          </div>
        </div>

        {myDonations.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border-dashed border-2 border-gray-200 dark:border-gray-800"
          >
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-5 shadow-inner">
              <HeartHandshake className="w-10 h-10 text-brand-400 dark:text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Awaiting Donations</h3>
            <p className="max-w-md text-gray-500 dark:text-gray-400">When generous individuals schedule a donation to your organization, the details will seamlessly appear right here.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {myDonations.map((donation) => {
                const donator = users?.find(u => u.id === donation.donatorId);
                return (
                <motion.div 
                  variants={item}
                  layout
                  key={donation.id} 
                  className="glass rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
                >
                  {donation.image ? (
                    <div className="w-full h-48 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                      <img src={donation.image} alt="Donation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-xs font-bold text-brand-700 dark:text-brand-400 rounded-lg shadow-sm border border-white/20 dark:border-gray-800/50">
                        {donation.category === 'Other' ? donation.customCategory : donation.category}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center border-b border-gray-100 dark:border-gray-800">
                      <ImagePlus className="w-10 h-10 mb-3 text-gray-300 dark:text-gray-700" />
                      <span className="text-sm font-medium text-gray-400 dark:text-gray-600">No image attached</span>
                    </div>
                  )}
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-blue-50 dark:bg-blue-500/10 p-1.5 rounded-md text-blue-600 dark:text-blue-400">
                           <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {new Date(donation.dateSlot).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{donation.timeSlot}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-purple-50 dark:bg-purple-500/10 p-1.5 rounded-md text-purple-600 dark:text-purple-400">
                           <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{donator ? donator.name : 'Generous Donor'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{donator ? donator.credential : 'Contact not available'}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        {donation.status === 'verified' ? (
                          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-green-50 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 text-xs font-bold shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20 text-xs font-bold shadow-sm">
                            <motion.span 
                              animate={{ opacity: [1, 0.5, 1] }} 
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="w-1.5 h-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400"
                            />
                            Pending
                          </span>
                        )}
                        {donation.location && (
                          <a 
                            href={`https://www.google.com/maps?q=${donation.location.lat},${donation.location.lng}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1 bg-brand-50 dark:bg-brand-500/10 px-2.5 py-1.5 rounded-lg transition-colors border border-brand-100 dark:border-brand-500/20 hover:bg-brand-100 dark:hover:bg-brand-500/20 shadow-sm"
                          >
                            <MapPin className="w-3.5 h-3.5" /> Location
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <motion.button 
                        whileTap={{ scale: donation.status === 'verified' ? 1 : 0.97 }}
                        onClick={() => updateDonationStatus(donation.id, 'verified')}
                        disabled={donation.status === 'verified'}
                        className={`flex-1 py-2.5 font-bold rounded-xl transition-all text-sm shadow-sm ${
                          donation.status === 'verified' 
                            ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700'
                            : 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-brand-500/30 hover:shadow-lg'
                        }`}
                      >
                        {donation.status === 'verified' ? 'Verified Successfully' : 'Verify Reception'}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => removeDonation(donation.id)}
                        className="px-4 py-2.5 font-bold rounded-xl transition-all text-sm shadow-sm bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 border border-red-100 dark:border-red-500/20 flex items-center justify-center"
                        title="Remove Donation"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* New Activity Modal */}
      <AnimatePresence>
        {showActivityModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create New Activity</h3>
                <button 
                  onClick={() => setShowActivityModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddActivity} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Name</label>
                  <input
                    type="text"
                    required
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                    placeholder="e.g., Blood Donation Camp"
                    className="w-full px-4 py-2.5 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all shadow-sm border"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newActivity.date}
                      onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all shadow-sm border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 10:00 AM - 2:00 PM"
                      value={newActivity.time}
                      onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all shadow-sm border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 123 Main Street, Community Hall"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all shadow-sm border"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowActivityModal(false)}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-brand-500/30 transition-all"
                  >
                    Create Activity
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
