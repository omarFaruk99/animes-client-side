import React, { useState, useEffect } from 'react';
import logo from '../assets/AnimesCafe.png';
import {Link, useLocation} from "react-router";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        { name: 'Movies', path: '/movies' },
        { name: 'New Season', path: '/new-season' }
    ];

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
            isScrolled 
            ? 'bg-[#0B1622]/80 backdrop-blur-lg shadow-lg shadow-black/10' 
            : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img 
                            src={logo} 
                            alt="Animes Cafe" 
                            className="h-10 w-auto rounded-sm transform transition-transform duration-300 group-hover:scale-110"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
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
                        <Link
                            to="/login"
                            className="ml-4 px-6 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25"
                        >
                            Sign In
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-sky-400 hover:bg-white/5 transition-colors duration-300"
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
                    <Link
                        to="/login"
                        className="block px-4 py-3 mt-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white text-base font-medium transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;