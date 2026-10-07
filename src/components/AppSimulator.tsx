import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Shield, 
  User, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowLeft, 
  Printer, 
  Code2, 
  Sparkles 
} from 'lucide-react';

export interface PackageItem {
  id: number;
  name: string;
  destination: string;
  days: number;
  price: number;
  description: string;
}

export interface BookingItem {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  packageId: number;
  packageName: string;
  destination: string;
  travelDate: string;
  persons: number;
  unitPrice: number;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: 1,
    name: "Goa Getaway",
    destination: "Goa",
    days: 4,
    price: 8500,
    description: "Experience golden sandy beaches, thrilling water sports at Baga Beach, vibrant night markets, Portuguese heritage in Old Goa, and scenic sunset cruises on the Mandovi River. Includes 3-star beach resort stay and breakfast."
  },
  {
    id: 2,
    name: "Manali Adventure",
    destination: "Himachal Pradesh",
    days: 5,
    price: 12000,
    description: "Explore the scenic Himalayan valley, snow activities at Solang Valley and Rohtang Pass, Hadimba Temple, hot sulfur springs at Vashisht, and river rafting in Beas River. Perfect for nature lovers and thrill seekers."
  },
  {
    id: 3,
    name: "Jaipur Heritage Tour",
    destination: "Rajasthan",
    days: 3,
    price: 6500,
    description: "Step into royal history with visits to the magnificent Amer Fort, City Palace, Hawa Mahal, and Jantar Mantar. Includes traditional Rajasthani dinner at Chokhi Dhani and guided cultural walks through colorful bazaars."
  },
  {
    id: 4,
    name: "Kerala Escape",
    destination: "Kerala",
    days: 6,
    price: 15500,
    description: "A picturesque journey through God's Own Country. Enjoy the cool tea plantations of Munnar, wildlife boat safari in Thekkady, traditional houseboat cruise in the Alleppey backwaters, and Ayurvedic rejuvenation therapies."
  }
];

const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: 1,
    userId: 2,
    userName: "Rahul Sharma",
    userEmail: "rahul@example.com",
    packageId: 1,
    packageName: "Goa Getaway",
    destination: "Goa",
    travelDate: "2026-11-15",
    persons: 2,
    unitPrice: 8500,
    totalPrice: 17000,
    status: "Confirmed",
    createdAt: "2026-10-01 10:30"
  },
  {
    id: 2,
    userId: 2,
    userName: "Rahul Sharma",
    userEmail: "rahul@example.com",
    packageId: 3,
    packageName: "Jaipur Heritage Tour",
    destination: "Rajasthan",
    travelDate: "2026-12-05",
    persons: 1,
    unitPrice: 6500,
    totalPrice: 6500,
    status: "Confirmed",
    createdAt: "2026-10-03 14:15"
  },
  {
    id: 3,
    userId: 3,
    userName: "Priya Patel",
    userEmail: "priya@example.com",
    packageId: 4,
    packageName: "Kerala Escape",
    destination: "Kerala",
    travelDate: "2026-11-20",
    persons: 3,
    unitPrice: 15500,
    totalPrice: 46500,
    status: "Confirmed",
    createdAt: "2026-10-05 16:40"
  }
];

interface AppSimulatorProps {
  onInspectFile: (fileName: string) => void;
}

export const AppSimulator: React.FC<AppSimulatorProps> = ({ onInspectFile }) => {
  // Application Data States
  const [packages, setPackages] = useState<PackageItem[]>(() => {
    const saved = localStorage.getItem('travelease_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [bookings, setBookings] = useState<BookingItem[]>(() => {
    const saved = localStorage.getItem('travelease_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Current session user: default to customer Rahul Sharma for effortless demo
  const [user, setUser] = useState<UserProfile | null>({
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "customer"
  });

  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('index.php');
  const [selectedPkgId, setSelectedPkgId] = useState<number>(1);
  const [currentBookingId, setCurrentBookingId] = useState<number>(1);
  const [editingPkgId, setEditingPkgId] = useState<number | null>(null);

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Form States
  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState<string | null>(null);

  // Booking Form
  const [bookingDate, setBookingDate] = useState('2026-11-25');
  const [bookingPersons, setBookingPersons] = useState<number>(2);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Admin Add / Edit Form
  const [pkgFormName, setPkgFormName] = useState('');
  const [pkgFormDestination, setPkgFormDestination] = useState('');
  const [pkgFormDays, setPkgFormDays] = useState<number>(3);
  const [pkgFormPrice, setPkgFormPrice] = useState<number>(5000);
  const [pkgFormDesc, setPkgFormDesc] = useState('');
  const [pkgFormError, setPkgFormError] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const syncPackages = (newPkgs: PackageItem[]) => {
    setPackages(newPkgs);
    localStorage.setItem('travelease_packages', JSON.stringify(newPkgs));
  };

  const syncBookings = (newBkgs: BookingItem[]) => {
    setBookings(newBkgs);
    localStorage.setItem('travelease_bookings', JSON.stringify(newBkgs));
  };

  const resetAllData = () => {
    setPackages(INITIAL_PACKAGES);
    setBookings(INITIAL_BOOKINGS);
    localStorage.removeItem('travelease_packages');
    localStorage.removeItem('travelease_bookings');
    showNotification("Demo data reset to original MySQL schema values.");
  };

  const handleQuickLogin = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setUser({
        id: 1,
        name: "Admin User",
        email: "admin@travelease.com",
        role: "admin"
      });
      setCurrentPage('admin/dashboard.php');
      showNotification("Switched to Admin session (admin@travelease.com).");
    } else {
      setUser({
        id: 2,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        role: "customer"
      });
      setCurrentPage('packages.php');
      showNotification("Switched to Customer session (Rahul Sharma).");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login.php');
    showNotification("Logged out successfully.");
  };

  // Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (loginEmail === 'admin@travelease.com' && loginPassword === 'admin123') {
      setUser({ id: 1, name: "Admin User", email: "admin@travelease.com", role: "admin" });
      setCurrentPage('admin/dashboard.php');
      showNotification("Welcome back, Admin!");
    } else if (loginEmail === 'rahul@example.com' && loginPassword === 'user123') {
      setUser({ id: 2, name: "Rahul Sharma", email: "rahul@example.com", role: "customer" });
      setCurrentPage('packages.php');
      showNotification("Welcome back, Rahul!");
    } else if (loginEmail.trim() && loginPassword.length >= 6) {
      // Allow custom email demo login
      setUser({ id: 99, name: loginEmail.split('@')[0], email: loginEmail, role: "customer" });
      setCurrentPage('packages.php');
      showNotification(`Welcome, ${loginEmail}!`);
    } else {
      setLoginError("Invalid credentials. Try admin@travelease.com / admin123 or rahul@example.com / user123.");
    }
  };

  // Register submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    if (!regName.trim() || !regEmail.trim()) {
      setRegError("Please enter your name and email.");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError("Passwords do not match.");
      return;
    }

    setUser({
      id: Math.floor(Math.random() * 900) + 10,
      name: regName,
      email: regEmail,
      role: 'customer'
    });
    setCurrentPage('packages.php');
    showNotification("Account created successfully! Logged in as " + regName);
  };

  // Booking submission: Core Formula: Total = Price * Persons
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    const selectedPkg = packages.find(p => p.id === selectedPkgId);
    if (!selectedPkg) {
      setBookingError("Selected package not found.");
      return;
    }

    if (!bookingDate) {
      setBookingError("Please select a travel date.");
      return;
    }

    if (bookingPersons < 1) {
      setBookingError("Number of persons must be at least 1.");
      return;
    }

    const calculatedTotal = selectedPkg.price * bookingPersons;
    const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;

    const newBooking: BookingItem = {
      id: newId,
      userId: user?.id || 2,
      userName: user?.name || "Rahul Sharma",
      userEmail: user?.email || "rahul@example.com",
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      destination: selectedPkg.destination,
      travelDate: bookingDate,
      persons: bookingPersons,
      unitPrice: selectedPkg.price,
      totalPrice: calculatedTotal,
      status: "Confirmed",
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updated = [newBooking, ...bookings];
    syncBookings(updated);
    setCurrentBookingId(newId);
    setCurrentPage('confirmation.php');
    showNotification(`Booking #TE-${String(newId).padStart(5, '0')} confirmed successfully!`);
  };

  // Admin Add / Edit package
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    setPkgFormError(null);

    if (!pkgFormName.trim() || !pkgFormDestination.trim() || !pkgFormDesc.trim()) {
      setPkgFormError("Please fill out all required fields.");
      return;
    }
    if (pkgFormDays <= 0 || pkgFormPrice <= 0) {
      setPkgFormError("Days and price must be positive numbers.");
      return;
    }

    if (editingPkgId) {
      // Update
      const updated = packages.map(p => {
        if (p.id === editingPkgId) {
          return {
            ...p,
            name: pkgFormName,
            destination: pkgFormDestination,
            days: pkgFormDays,
            price: pkgFormPrice,
            description: pkgFormDesc
          };
        }
        return p;
      });
      syncPackages(updated);
      setEditingPkgId(null);
      setCurrentPage('admin/dashboard.php');
      showNotification("Package updated successfully!");
    } else {
      // Create new
      const nextId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1;
      const newPkg: PackageItem = {
        id: nextId,
        name: pkgFormName,
        destination: pkgFormDestination,
        days: pkgFormDays,
        price: pkgFormPrice,
        description: pkgFormDesc
      };
      syncPackages([newPkg, ...packages]);
      setCurrentPage('admin/dashboard.php');
      showNotification("New travel package published successfully!");
    }
  };

  const handleDeletePackage = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?\n(Demonstrates SQL ON DELETE CASCADE foreign key constraint)`)) {
      const updated = packages.filter(p => p.id !== id);
      syncPackages(updated);
      showNotification(`Package "${name}" deleted from database.`);
    }
  };

  const openEditPackage = (pkg: PackageItem) => {
    setEditingPkgId(pkg.id);
    setPkgFormName(pkg.name);
    setPkgFormDestination(pkg.destination);
    setPkgFormDays(pkg.days);
    setPkgFormPrice(pkg.price);
    setPkgFormDesc(pkg.description);
    setCurrentPage('admin/edit_package.php');
  };

  const openAddPackage = () => {
    setEditingPkgId(null);
    setPkgFormName('');
    setPkgFormDestination('');
    setPkgFormDays(4);
    setPkgFormPrice(7500);
    setPkgFormDesc('');
    setCurrentPage('admin/add_package.php');
  };

  // Selected package object for details & booking
  const activePackage = packages.find(p => p.id === selectedPkgId) || packages[0];
  const activeBooking = bookings.find(b => b.id === currentBookingId) || bookings[0];

  // Map active page to source file
  const getCorrespondingFile = (page: string) => {
    if (page === 'index.php') return 'index.php';
    if (page === 'packages.php') return 'packages.php';
    if (page === 'package_details.php') return 'package_details.php';
    if (page === 'booking.php') return 'booking.php';
    if (page === 'confirmation.php') return 'confirmation.php';
    if (page === 'my_bookings.php') return 'my_bookings.php';
    if (page === 'login.php') return 'login.php';
    if (page === 'register.php') return 'register.php';
    if (page === 'admin/dashboard.php') return 'dashboard.php';
    if (page === 'admin/add_package.php') return 'add_package.php';
    if (page === 'admin/edit_package.php') return 'edit_package.php';
    if (page === 'admin/bookings.php') return 'bookings.php';
    return 'index.php';
  };

  return (
    <div className="flex flex-col bg-slate-100 min-h-screen text-slate-800 font-sans">
      {/* Top Academic Simulation Ribbon */}
      <div className="bg-slate-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-sky-400">TravelEase Live Demo</span>
          <span className="text-slate-400">|</span>
          <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-amber-300">
            http://localhost/travelease/{currentPage}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400">Quick Role Switch:</span>
          <button
            onClick={() => handleQuickLogin('customer')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition ${
              user?.role === 'customer'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            👤 Customer (Rahul)
          </button>
          <button
            onClick={() => handleQuickLogin('admin')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition ${
              user?.role === 'admin'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🛡️ Admin Panel
          </button>
          <button
            onClick={() => onInspectFile(getCorrespondingFile(currentPage))}
            className="flex items-center gap-1 bg-indigo-600/80 hover:bg-indigo-600 text-white px-2.5 py-1 rounded text-xs font-medium transition"
            title="Inspect corresponding PHP source code"
          >
            <Code2 className="w-3.5 h-3.5" />
            View PHP Code
          </button>
          <button
            onClick={resetAllData}
            className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-2 py-1 rounded text-xs transition"
            title="Reset sample packages & bookings"
          >
            Reset DB
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-600 text-white text-sm py-2 px-4 text-center font-medium shadow-md flex items-center justify-center gap-2 transition animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* Simulation Browser Window Header / Nav (Mimics includes/header.php) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('index.php')} 
            className="flex items-center gap-2 text-xl font-bold text-sky-800 hover:opacity-90"
          >
            <span className="text-2xl">✈️</span>
            <span>Travel<span className="text-amber-600">Ease</span></span>
          </button>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <button
              onClick={() => setCurrentPage('index.php')}
              className={`hover:text-sky-600 transition ${currentPage === 'index.php' ? 'text-sky-600 font-bold' : 'text-slate-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('packages.php')}
              className={`hover:text-sky-600 transition ${currentPage === 'packages.php' ? 'text-sky-600 font-bold' : 'text-slate-600'}`}
            >
              Packages
            </button>

            {user ? (
              user.role === 'admin' ? (
                <>
                  <button
                    onClick={() => setCurrentPage('admin/dashboard.php')}
                    className="bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded font-semibold text-xs"
                  >
                    Admin Panel
                  </button>
                  <button
                    onClick={() => setCurrentPage('admin/bookings.php')}
                    className={`hover:text-sky-600 transition ${currentPage === 'admin/bookings.php' ? 'text-sky-600 font-bold' : 'text-slate-600'}`}
                  >
                    All Bookings
                  </button>
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs flex items-center gap-1 font-semibold">
                    🛡️ {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentPage('my_bookings.php')}
                    className={`hover:text-sky-600 transition ${currentPage === 'my_bookings.php' ? 'text-sky-600 font-bold' : 'text-slate-600'}`}
                  >
                    My Bookings
                  </button>
                  <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded text-xs flex items-center gap-1 font-semibold">
                    👤 {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" /> Logout
                  </button>
                </>
              )
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage('login.php')}
                  className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage('register.php')}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded text-xs font-semibold"
                >
                  Register
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main Body Pages View */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
        {/* 1. INDEX.PHP */}
        {currentPage === 'index.php' && (
          <div className="space-y-10">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-sky-600 to-sky-800 text-white rounded-2xl p-8 md:p-12 text-center shadow-md">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
                Discover Your Next Journey with TravelEase
              </h1>
              <p className="text-sky-100 text-base md:text-lg max-w-2xl mx-auto mb-6">
                Book curated holiday packages across India with transparent pricing, instant confirmation, and flexible scheduling.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setCurrentPage('packages.php')}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition"
                >
                  View All Packages 🌴
                </button>
                {user ? (
                  <button
                    onClick={() => setCurrentPage('my_bookings.php')}
                    className="border border-white/60 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
                  >
                    My Bookings
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentPage('register.php')}
                    className="border border-white/60 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Create Free Account
                  </button>
                )}
              </div>
            </div>

            {/* Popular Packages */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Popular Travel Packages</h2>
                <p className="text-slate-500 text-sm">Handpicked destinations with all-inclusive itineraries and verified accommodations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.slice(0, 4).map(pkg => (
                  <div key={pkg.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col">
                    <div className="bg-gradient-to-r from-sky-600 to-sky-500 text-white px-4 py-3 flex items-center justify-between text-xs font-semibold">
                      <span>📍 {pkg.destination}</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded-full">⏱️ {pkg.days} Days</span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-800 text-lg mb-1">{pkg.name}</h3>
                      <p className="text-slate-500 text-xs line-clamp-3 mb-4 flex-1">
                        {pkg.description}
                      </p>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Per Person</div>
                          <div className="text-lg font-bold text-sky-800">₹{pkg.price.toLocaleString()}</div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedPkgId(pkg.id);
                            setCurrentPage('package_details.php');
                          }}
                          className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded text-xs font-semibold transition"
                        >
                          View Details &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => setCurrentPage('packages.php')}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 rounded-lg text-sm transition"
                >
                  Explore All Travel Packages &rarr;
                </button>
              </div>
            </div>

            {/* How It Works Steps (For Viva / Evaluation) */}
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-slate-800 mb-2">How TravelEase Works</h3>
              <p className="text-slate-500 text-sm mb-6">Simple 3-step booking workflow designed for reliability and ease</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                  <div className="text-2xl mb-2">1️⃣</div>
                  <h4 className="font-bold text-slate-800 mb-1">Select Package</h4>
                  <p className="text-xs text-slate-500">Browse destinations, inspect duration, inclusions, and transparent per-person rates.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                  <div className="text-2xl mb-2">2️⃣</div>
                  <h4 className="font-bold text-slate-800 mb-1">Enter Travelers &amp; Date</h4>
                  <p className="text-xs text-slate-500">Pick upcoming departure date. System calculates: <code>Total Price = Price × Persons</code>.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                  <div className="text-2xl mb-2">3️⃣</div>
                  <h4 className="font-bold text-slate-800 mb-1">Instant Confirmation</h4>
                  <p className="text-xs text-slate-500">Generate reference ID, print booking receipt, and view status in My Bookings.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PACKAGES.PHP */}
        {currentPage === 'packages.php' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Explore All Travel Packages</h2>
              <p className="text-slate-500 text-sm">Choose from our handpicked destinations and plan your dream vacation today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col">
                  <div className="bg-gradient-to-r from-sky-600 to-sky-500 text-white px-4 py-3 flex items-center justify-between text-xs font-semibold">
                    <span>📍 {pkg.destination}</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full">⏱️ {pkg.days} Days</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-800 text-lg mb-2">{pkg.name}</h3>
                    <p className="text-slate-500 text-xs line-clamp-3 mb-6 flex-1">
                      {pkg.description}
                    </p>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Per Person</div>
                        <div className="text-xl font-bold text-sky-800">₹{pkg.price.toLocaleString()}</div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPkgId(pkg.id);
                          setCurrentPage('package_details.php');
                        }}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition"
                      >
                        View Details &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. PACKAGE_DETAILS.PHP */}
        {currentPage === 'package_details.php' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setCurrentPage('packages.php')}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 px-3 py-1.5 rounded-md bg-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to All Packages
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-5">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">{activePackage.name}</h1>
                  <div className="flex gap-2">
                    <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-semibold">
                      📍 Destination: {activePackage.destination}
                    </span>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
                      ⏱️ Duration: {activePackage.days} Days / {Math.max(1, activePackage.days - 1)} Nights
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-800 mb-2">Overview &amp; Itinerary</h3>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {activePackage.description}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 mb-2">
                    ✨ What is Included in this Package:
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    <li>✔️ Verified 3-star/4-star hotel accommodations</li>
                    <li>✔️ Daily complimentary breakfast and welcome drinks</li>
                    <li>✔️ Sightseeing transport with certified local tour guides</li>
                    <li>✔️ All state entry permits and parking charges</li>
                    <li>✔️ 24/7 round-the-clock emergency assistance helpline</li>
                  </ul>
                </div>
              </div>

              {/* Sidebar Booking Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-center text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider">Price Per Person</div>
                <div className="text-4xl font-extrabold text-sky-800 my-2">
                  ₹{activePackage.price.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mb-6">Taxes &amp; booking fees included</div>

                {user ? (
                  user.role === 'customer' ? (
                    <button
                      onClick={() => {
                        setSelectedPkgId(activePackage.id);
                        setCurrentPage('booking.php');
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg shadow-sm transition"
                    >
                      Book This Package Now &rarr;
                    </button>
                  ) : (
                    <button
                      onClick={() => openEditPackage(activePackage)}
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition"
                    >
                      ✏️ Edit Package (Admin)
                    </button>
                  )
                ) : (
                  <div>
                    <button
                      onClick={() => setCurrentPage('login.php')}
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition"
                    >
                      Login to Book &rarr;
                    </button>
                    <p className="text-xs text-slate-500 mt-2">
                      New customer?{' '}
                      <button onClick={() => setCurrentPage('register.php')} className="text-sky-600 font-semibold underline">
                        Register here
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. BOOKING.PHP */}
        {currentPage === 'booking.php' && (
          <div className="max-w-xl mx-auto">
            <div className="mb-4">
              <button
                onClick={() => setCurrentPage('package_details.php')}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 px-3 py-1.5 rounded-md bg-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Package Details
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Confirm Your Booking</h2>
                <p className="text-slate-500 text-xs">Complete reservation for <strong>{activePackage.name}</strong></p>
              </div>

              {/* Package Summary Bar */}
              <div className="bg-sky-50 border border-sky-100 rounded-lg p-4 mb-6 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800 text-sm">{activePackage.name}</div>
                  <div className="text-xs text-slate-500">📍 {activePackage.destination} &bull; ⏱️ {activePackage.days} Days</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase">Unit Price</div>
                  <div className="font-bold text-sky-800 text-base">₹{activePackage.price.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-400">per person</div>
                </div>
              </div>

              {bookingError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {bookingError}
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Account</label>
                  <input
                    type="text"
                    value={`${user?.name || 'Rahul Sharma'} (${user?.email || 'rahul@example.com'})`}
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Travel Departure Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    min="2026-10-08"
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                  <span className="text-[11px] text-slate-400">Please choose an upcoming departure date</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Persons <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={bookingPersons}
                    onChange={(e) => setBookingPersons(Math.max(1, parseInt(e.target.value) || 1))}
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                  <span className="text-[11px] text-slate-400">Total price updates instantly in real time</span>
                </div>

                {/* Calculation Summary Box (Demonstrating project requirement: total_price = package price * persons) */}
                <div className="bg-sky-50/70 border border-sky-200 rounded-lg p-4 my-4">
                  <div className="text-xs font-bold text-sky-900 mb-2">
                    📊 Booking Calculation (Formula: Price &times; Persons)
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Package Unit Price:</span>
                    <span>₹{activePackage.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 mb-2">
                    <span>Number of Travelers:</span>
                    <span>&times; {bookingPersons}</span>
                  </div>
                  <div className="pt-2 border-t border-sky-200 flex justify-between font-bold text-sky-900 text-base">
                    <span>Total Calculated Price:</span>
                    <span>₹{(activePackage.price * bookingPersons).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg text-sm shadow-sm transition"
                >
                  Confirm &amp; Book Package &rarr;
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 5. CONFIRMATION.PHP */}
        {currentPage === 'confirmation.php' && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-md">
              <div className="text-5xl mb-2">🎉</div>
              <h2 className="text-2xl font-bold text-slate-800">Booking Confirmed!</h2>
              <p className="text-slate-500 text-xs mb-6">
                Thank you, {activeBooking?.userName || 'Customer'}! Your reservation has been recorded in the database.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="text-slate-500">Booking Reference ID:</span>
                  <span className="font-mono font-bold text-slate-800">
                    #TE-{String(activeBooking?.id || 1).padStart(5, '0')}
                  </span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="text-slate-500">Package:</span>
                  <span className="font-semibold text-slate-800">{activeBooking?.packageName}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="text-slate-500">Destination:</span>
                  <span>📍 {activeBooking?.destination}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="text-slate-500">Travel Departure Date:</span>
                  <span className="font-semibold">📅 {activeBooking?.travelDate}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="text-slate-500">Travelers Count:</span>
                  <span>👥 {activeBooking?.persons} Person(s)</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="text-slate-500">Rate per Person:</span>
                  <span>₹{activeBooking?.unitPrice?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-sky-900 text-sm pt-1">
                  <span>Total Amount Paid / Due:</span>
                  <span>₹{activeBooking?.totalPrice?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Booking Status:</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                    ✅ {activeBooking?.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button
                  onClick={() => setCurrentPage('my_bookings.php')}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition"
                >
                  View All My Bookings &rarr;
                </button>
                <button
                  onClick={() => setCurrentPage('packages.php')}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-lg text-xs transition"
                >
                  Browse Packages
                </button>
                <button
                  onClick={() => window.print()}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg text-xs flex items-center gap-1 transition"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. MY_BOOKINGS.PHP */}
        {currentPage === 'my_bookings.php' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">My Travel Bookings</h2>
                <p className="text-slate-500 text-xs">Customer personal itinerary reservations for <strong>{user?.name}</strong></p>
              </div>
              <button
                onClick={() => setCurrentPage('packages.php')}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-3 py-1.5 rounded-lg text-xs"
              >
                + Book New Package
              </button>
            </div>

            {bookings.filter(b => b.userId === (user?.id || 2)).length > 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                      <th className="p-3">Booking ID</th>
                      <th className="p-3">Package &amp; Destination</th>
                      <th className="p-3">Travel Date</th>
                      <th className="p-3">Persons</th>
                      <th className="p-3">Total Price</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {bookings
                      .filter(b => b.userId === (user?.id || 2))
                      .map(b => (
                        <tr key={b.id} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-mono font-bold text-sky-800">
                            #TE-{String(b.id).padStart(5, '0')}
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-800">{b.packageName}</div>
                            <div className="text-[11px] text-slate-500">📍 {b.destination}</div>
                          </td>
                          <td className="p-3 font-medium">📅 {b.travelDate}</td>
                          <td className="p-3">👥 {b.persons}</td>
                          <td className="p-3 font-bold text-sky-900">₹{b.totalPrice.toLocaleString()}</td>
                          <td className="p-3">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                              {b.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setCurrentBookingId(b.id);
                                setCurrentPage('confirmation.php');
                              }}
                              className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs"
                            >
                              View Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <div className="text-4xl mb-3">🎒</div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">No Bookings Found</h3>
                <p className="text-slate-500 text-xs mb-4">You have not booked any packages yet.</p>
                <button
                  onClick={() => setCurrentPage('packages.php')}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg text-xs"
                >
                  Browse Available Packages &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* 7. LOGIN.PHP */}
        {currentPage === 'login.php' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Sign In to TravelEase</h2>
                <p className="text-slate-500 text-xs">Access customer bookings or admin management</p>
              </div>

              {/* Demo Credentials Helper */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-sky-900 mb-5">
                <div className="font-bold mb-1">💡 Demo Credentials for Evaluation &amp; Viva:</div>
                <div className="space-y-0.5">
                  <div>&bull; <strong>Admin:</strong> admin@travelease.com / <code>admin123</code></div>
                  <div>&bull; <strong>Customer:</strong> rahul@example.com / <code>user123</code></div>
                </div>
                <div className="flex gap-2 mt-2 pt-2 border-t border-sky-200">
                  <button
                    onClick={() => {
                      setLoginEmail('admin@travelease.com');
                      setLoginPassword('admin123');
                    }}
                    className="bg-white border border-sky-300 px-2 py-0.5 rounded text-[11px] font-semibold hover:bg-sky-100"
                  >
                    Autofill Admin
                  </button>
                  <button
                    onClick={() => {
                      setLoginEmail('rahul@example.com');
                      setLoginPassword('user123');
                    }}
                    className="bg-white border border-sky-300 px-2 py-0.5 rounded text-[11px] font-semibold hover:bg-sky-100"
                  >
                    Autofill Customer
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-lg text-sm transition"
                >
                  Sign In &rarr;
                </button>
              </form>

              <div className="text-center mt-4 text-xs text-slate-500">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentPage('register.php')}
                  className="text-sky-600 font-semibold underline"
                >
                  Create an Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. REGISTER.PHP */}
        {currentPage === 'register.php' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Create an Account</h2>
                <p className="text-slate-500 text-xs">Join TravelEase to book curated tour packages</p>
              </div>

              {regError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {regError}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-lg text-sm transition"
                >
                  Register Account &rarr;
                </button>
              </form>

              <div className="text-center mt-4 text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentPage('login.php')}
                  className="text-sky-600 font-semibold underline"
                >
                  Login here
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 9. ADMIN/DASHBOARD.PHP */}
        {currentPage === 'admin/dashboard.php' && (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Admin Management Dashboard</h2>
                <p className="text-slate-500 text-xs">System Control Panel &bull; Role: Administrator</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={openAddPackage}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Package
                </button>
                <button
                  onClick={() => setCurrentPage('admin/bookings.php')}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs"
                >
                  View All Bookings
                </button>
              </div>
            </div>

            {/* Dashboard Statistics Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="text-2xl mb-1">📦</div>
                <div className="text-2xl font-bold text-slate-800">{packages.length}</div>
                <div className="text-xs text-slate-500 font-medium">Active Packages</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="text-2xl mb-1">📅</div>
                <div className="text-2xl font-bold text-slate-800">{bookings.length}</div>
                <div className="text-xs text-slate-500 font-medium">Total Bookings</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="text-2xl mb-1">👥</div>
                <div className="text-2xl font-bold text-slate-800">2</div>
                <div className="text-xs text-slate-500 font-medium">Registered Customers</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-2xl font-bold text-sky-800">
                  ₹{bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 font-medium">Total Booking Revenue</div>
              </div>
            </div>

            {/* Packages Management CRUD Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800 text-sm">Manage Travel Packages</h3>
                <span className="text-xs text-slate-500">{packages.length} total packages in MySQL database</span>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                    <th className="p-3">ID</th>
                    <th className="p-3">Package Name</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Unit Price</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {packages.map(pkg => (
                    <tr key={pkg.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-500">#{pkg.id}</td>
                      <td className="p-3 font-bold text-slate-800">{pkg.name}</td>
                      <td className="p-3">📍 {pkg.destination}</td>
                      <td className="p-3">⏱️ {pkg.days} Days</td>
                      <td className="p-3 font-bold text-sky-900">₹{pkg.price.toLocaleString()}</td>
                      <td className="p-3 text-right space-x-1.5">
                        <button
                          onClick={() => {
                            setSelectedPkgId(pkg.id);
                            setCurrentPage('package_details.php');
                          }}
                          className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => openEditPackage(pkg)}
                          className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                          className="bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 10. ADMIN/ADD_PACKAGE.PHP & EDIT_PACKAGE.PHP */}
        {(currentPage === 'admin/add_package.php' || currentPage === 'admin/edit_package.php') && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <button
                onClick={() => setCurrentPage('admin/dashboard.php')}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 px-3 py-1.5 rounded-md bg-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  {editingPkgId ? `Edit Travel Package (#${editingPkgId})` : 'Add New Travel Package'}
                </h2>
                <p className="text-slate-500 text-xs">
                  {editingPkgId
                    ? 'Update itinerary, duration, and pricing in MySQL'
                    : 'Publish a brand new vacation package to the catalog'}
                </p>
              </div>

              {pkgFormError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {pkgFormError}
                </div>
              )}

              <form onSubmit={handleSavePackage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Package Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={pkgFormName}
                    onChange={(e) => setPkgFormName(e.target.value)}
                    placeholder="e.g. Goa Beach Holiday"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Destination <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={pkgFormDestination}
                      onChange={(e) => setPkgFormDestination(e.target.value)}
                      placeholder="e.g. Goa"
                      required
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Duration (Days) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={pkgFormDays}
                      onChange={(e) => setPkgFormDays(parseInt(e.target.value) || 1)}
                      required
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price per Person (₹) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={100}
                    step="0.01"
                    value={pkgFormPrice}
                    onChange={(e) => setPkgFormPrice(parseFloat(e.target.value) || 0)}
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detailed Description &amp; Itinerary <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={pkgFormDesc}
                    onChange={(e) => setPkgFormDesc(e.target.value)}
                    placeholder="Describe activities, inclusions, accommodations, and sightseeing spots..."
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-sky-600"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-lg text-sm transition"
                  >
                    {editingPkgId ? 'Update Package Changes &rarr;' : 'Save & Publish Package &rarr;'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('admin/dashboard.php')}
                    className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold px-5 py-2.5 rounded-lg text-sm transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 11. ADMIN/BOOKINGS.PHP */}
        {currentPage === 'admin/bookings.php' && (
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">All Customer Bookings (Master View)</h2>
                <p className="text-slate-500 text-xs">Review every vacation reservation placed in the system</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage('admin/dashboard.php')}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs"
                >
                  &larr; Back to Dashboard
                </button>
                <button
                  onClick={openAddPackage}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs"
                >
                  + Add Package
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Customer Details</th>
                    <th className="p-3">Package &amp; Destination</th>
                    <th className="p-3">Travel Date</th>
                    <th className="p-3">Persons</th>
                    <th className="p-3">Total Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date Booked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-sky-800">
                        #TE-{String(b.id).padStart(5, '0')}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">{b.userName}</div>
                        <div className="text-[11px] text-slate-500">{b.userEmail}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-sky-800">{b.packageName}</div>
                        <div className="text-[11px] text-slate-500">📍 {b.destination}</div>
                      </td>
                      <td className="p-3 font-medium">📅 {b.travelDate}</td>
                      <td className="p-3">👥 {b.persons}</td>
                      <td className="p-3">
                        <div className="font-bold text-sky-900 text-sm">₹{b.totalPrice.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-400">
                          (₹{b.unitPrice?.toLocaleString()} &times; {b.persons})
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px]">{b.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer Layout (Mimics includes/footer.php) */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-6xl mx-auto px-4 space-y-1">
          <p><strong>TravelEase</strong> &ndash; Travel Package Booking System</p>
          <p>Designed for College Software Engineering &amp; Testing Project (Demonstration of SRS, SDLC, &amp; Testing)</p>
          <p>&copy; {new Date().getFullYear()} TravelEase. Simple PHP &amp; MySQL Modular Architecture.</p>
        </div>
      </footer>
    </div>
  );
};
