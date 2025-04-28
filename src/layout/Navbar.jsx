import React, { useState, useEffect } from 'react';
import logo from '../assets/AnimesCafe.png';
import {Link, useLocation} from "react-router";
import useAuth from "../hooks/useAuth.jsx";

const Navbar = () => {
    const {user, signOutUser} = useAuth()
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Top Anime', path: '/top-anime' },
    ];

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    const handleSignOut = async () => {
        try {
            await signOutUser();
            setIsProfileMenuOpen(false);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
            isScrolled 
            ? 'bg-[#0B1622]/80 backdrop-blur-lg shadow-lg shadow-black/10' 
            : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img 
                            src={logo} 
                            alt="Animes Cafe" 
                            className="h-10 w-auto rounded-sm transform transition-transform duration-300 group-hover:scale-110"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 items-center justify-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    isActivePath(link.path)
                                    ? 'bg-sky-500/20 text-sky-400'
                                    : 'text-gray-300 hover:text-sky-400 hover:bg-white/5'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* User Profile/Sign In */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-300 group"
                                >
                                    <img 
                                        src={user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName)}
                                        alt={user.displayName}
                                        className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-sky-500/50 transition-all duration-300"
                                    />
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-sky-400">
                                        {user.displayName?.split(' ')[0]}
                                    </span>
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-[#0B1622]/95 backdrop-blur-xl rounded-lg shadow-lg ring-1 ring-white/10 py-1">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-sky-500/10 hover:text-sky-400"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-sky-500/10 hover:text-sky-400"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-6 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        {user && (
                            <img 
                                src={user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName)}
                                alt={user.displayName}
                                className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10"
                            />
                        )}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-sky-400 hover:bg-white/5 transition-colors duration-300"
                        >
                            <svg
                                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                ? 'max-h-screen opacity-100 visible'
                : 'max-h-0 opacity-0 invisible'
            }`}>
                <div className="px-4 pt-2 pb-3 bg-[#0B1622]/95 backdrop-blur-lg border-t border-white/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                                isActivePath(link.path)
                                ? 'bg-sky-500/20 text-sky-400'
                                : 'text-gray-300 hover:text-sky-400 hover:bg-white/5'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-sky-400 hover:bg-white/5"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                My Profile
                            </Link>
                            <button
                                onClick={() => {
                                    handleSignOut();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-sky-400 hover:bg-white/5"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="block px-4 py-3 mt-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white text-base font-medium transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;