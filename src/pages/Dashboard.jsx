import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, ImagePlus, Calendar, Clock, HeartHandshake, CheckCircle2, ChevronDown, MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ThemeToggle from '../components/ThemeToggle';
import RecentReviews from '../components/RecentReviews';
import NgoEvents from '../components/NgoEvents';
import HelpingDay from '../components/HelpingDay';

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
  const { user, logout, ngos, addDonation, updateDonationStatus, donations, users } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageTransition className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 transition-colors duration-300">
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

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {user?.role === 'donator' ? (
            <DonatorDashboard key="donator" ngos={ngos} addDonation={addDonation} currentUser={user} donations={donations} />
          ) : (
            <ReceiverDashboard key="receiver" donations={donations} currentUser={user} updateDonationStatus={updateDonationStatus} users={users} />
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
}

function DonatorDashboard({ ngos, addDonation, currentUser, donations }) {
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
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
      </motion.div>
      
      <NgoEvents />
      <HelpingDay />
    </div>
  );
}

function ReceiverDashboard({ donations, currentUser, updateDonationStatus, users }) {
  const myDonations = donations.filter(d => d.ngoId === currentUser.id);

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
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Incoming Donations</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage donations directed to your organization.</p>
      </div>

      {myDonations.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"
        >
          <HeartHandshake className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No donations yet</h3>
          <p className="max-w-sm">When generous people choose to donate to your organization, they will appear here.</p>
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
                className="glass rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow border-gray-100 dark:border-gray-800"
              >
                {donation.image ? (
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-900 relative">
                    <img src={donation.image} alt="Donation" className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-sm font-semibold text-brand-700 dark:text-brand-400 rounded-full shadow-sm">
                      {donation.category === 'Other' ? donation.customCategory : donation.category}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center text-gray-400 dark:text-gray-600">
                      <ImagePlus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <span className="text-sm font-medium">No image provided</span>
                    </div>
                  </div>
                )}
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(donation.dateSlot).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{donation.timeSlot}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <User className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{donator ? donator.name : 'Unknown Donator'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Contact: {donator ? donator.credential : 'No info'}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
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
                          Pending Pickup
                        </span>
                      )}
                      {donation.location && (
                        <a 
                          href={`https://www.google.com/maps?q=${donation.location.lat},${donation.location.lng}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1"
                        >
                          <MapPin className="w-4 h-4" /> View Map
                        </a>
                      )}
                    </div>
                  </div>
                  <motion.button 
                    whileTap={{ scale: donation.status === 'verified' ? 1 : 0.95 }}
                    onClick={() => updateDonationStatus(donation.id, 'verified')}
                    disabled={donation.status === 'verified'}
                    className={`mt-5 w-full py-2 font-medium rounded-lg transition-colors text-sm ${
                      donation.status === 'verified' 
                        ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20'
                    }`}
                  >
                    {donation.status === 'verified' ? 'Verified' : 'Verify'}
                  </motion.button>
                </div>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
