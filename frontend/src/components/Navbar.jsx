import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChartArea, Home, LogOut, Plus, Search, User, Users2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { logout } from '../redux/slices/authSlice';
import { useEffect } from 'react';
import { fetchRequest } from '../redux/slices/requestSlice';

const navbarItem = [
            { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
            { name: 'Browse', path: '/browse', icon: <Search className="w-5 h-5" /> },
            { name: 'My Offer', path: '/my-offer', icon: <Plus className="w-5 h-5" /> },
            { name: 'Request', path: '/request', icon: <Users2 className="w-5 h-5" /> },
            { name: 'Chat', path: '/chat', icon: <ChartArea className="w-5 h-5" /> },
            { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
];

const Navbar = () => {
            const { isLogin, user } = useSelector((state) => state.auth);
            const { request } = useSelector(state => state.request)
            const [isMenuOpen, setIsMenuOpen] = useState(false);
            const [isShow, setIsShow] = useState(false);
            const navigate = useNavigate();
            const dispatch = useDispatch();

            const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

            useEffect(() => {
                        document.addEventListener("click", (e) => {
                                    if (e.target.tagName !== 'BUTTON') {
                                                setIsShow(false)
                                    }
                        })
            }, [])


            const handleLogout = async () => {
                        try {
                                    dispatch(logout()).unwrap().then((data) => {
                                                toast.success(data.message);
                                                navigate("/login");
                                    });
                        } catch (error) {
                                    toast.error(error.response?.data.message);
                        }
                        toggleMenu();
            };

            // Get first letter of username or fallback to 'U' if not available
            const profileInitial = user?.username?.charAt(0).toUpperCase() || 'U';


            return (
                        <nav className="bg-white shadow-lg sticky top-0 z-50">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                <div className="flex justify-between items-center py-4">
                                                            {/* Logo Section */}
                                                            <div className="flex items-center">
                                                                        <NavLink to="/" className="text-2xl font-bold text-indigo-600">
                                                                                    SkillSwap
                                                                        </NavLink>
                                                            </div>

                                                            {/* Desktop Navigation Links */}
                                                            <div className="hidden md:flex items-center space-x-4">
                                                                        {isLogin ? (
                                                                                    <>
                                                                                                {navbarItem.map((item) => (
                                                                                                            <NavLink
                                                                                                                        key={item.name}
                                                                                                                        to={item.path}
                                                                                                                        className={({ isActive }) =>
                                                                                                                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                                                                                                                                ? 'bg-indigo-100 text-indigo-700'
                                                                                                                                                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                                                                                                                                    }`
                                                                                                                        }
                                                                                                            >
                                                                                                                        {item.icon}
                                                                                                                        <button className="ml-2">{item.name} </button>
                                                                                                            </NavLink>
                                                                                                ))}
                                                                                                {/* Circular Profile Icon */}
                                                                                                <div className="relative ">
                                                                                                            <button
                                                                                                                        onClick={() => setIsShow(true)}
                                                                                                                        className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-indigo-600 text-white text-lg font-semibold"
                                                                                                            >
                                                                                                                        {user?.name.slice(0, 1).toUpperCase()}
                                                                                                            </button>
                                                                                                            {
                                                                                                                        isShow && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1  group-hover:block">
                                                                                                                                    <button
                                                                                                                                                onClick={handleLogout}
                                                                                                                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                                                                                                                    >
                                                                                                                                                <LogOut className="w-5 h-5 mr-2" />
                                                                                                                                                Logout
                                                                                                                                    </button>
                                                                                                                        </div>
                                                                                                            }
                                                                                                </div>
                                                                                    </>
                                                                        ) : (
                                                                                    <div className="flex space-x-4">
                                                                                                <NavLink
                                                                                                            to="/signup"
                                                                                                            className={({ isActive }) =>
                                                                                                                        `px-4 py-2 rounded-md text-sm font-medium ${isActive
                                                                                                                                    ? 'bg-indigo-600 text-white'
                                                                                                                                    : 'bg-gray-200 text-gray-700 hover:bg-indigo-600 hover:text-white'
                                                                                                                        } transition-colors duration-200`
                                                                                                            }
                                                                                                >
                                                                                                            Sign Up
                                                                                                </NavLink>
                                                                                                <NavLink
                                                                                                            to="/login"
                                                                                                            className={({ isActive }) =>
                                                                                                                        `px-4 py-2 rounded-md text-sm font-medium ${isActive
                                                                                                                                    ? 'bg-indigo-600 text-white'
                                                                                                                                    : 'bg-gray-200 text-gray-700 hover:bg-indigo-600 hover:text-white'
                                                                                                                        } transition-colors duration-200`
                                                                                                            }
                                                                                                >
                                                                                                            Login
                                                                                                </NavLink>
                                                                                    </div>
                                                                        )}
                                                            </div>

                                                            {/* Mobile Menu Button */}
                                                            <div className="md:hidden">
                                                                        <button
                                                                                    onClick={toggleMenu}
                                                                                    className="text-gray-600 hover:text-indigo-600 focus:outline-none"
                                                                        >
                                                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                <path
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                            strokeWidth="2"
                                                                                                            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                                                                                />
                                                                                    </svg>
                                                                        </button>
                                                            </div>
                                                </div>

                                                {/* Mobile Menu */}
                                                {isMenuOpen && (
                                                            <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-6">
                                                                        {isLogin ? (
                                                                                    <div className="flex flex-col space-y-3">
                                                                                                {navbarItem.map((item) => (
                                                                                                            <NavLink
                                                                                                                        key={item.name}
                                                                                                                        to={item.path}
                                                                                                                        className={({ isActive }) =>
                                                                                                                                    `flex items-center px-4 py-3 rounded-md text-base font-medium ${isActive
                                                                                                                                                ? 'bg-indigo-100 text-indigo-700'
                                                                                                                                                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                                                                                                                                    } transition-colors duration-200`
                                                                                                                        }
                                                                                                                        onClick={toggleMenu}
                                                                                                            >
                                                                                                                        {item.icon}
                                                                                                                        <span className="ml-3">{item.name}</span>
                                                                                                            </NavLink>
                                                                                                ))}
                                                                                                <div className="flex items-center px-4 py-3">
                                                                                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white text-lg font-semibold">
                                                                                                                        {profileInitial}
                                                                                                            </div>
                                                                                                            <button
                                                                                                                        onClick={handleLogout}
                                                                                                                        className="ml-3 flex items-center text-base font-medium text-gray-600 hover:text-indigo-600"
                                                                                                            >
                                                                                                                        <LogOut className="w-5 h-5 mr-2" />
                                                                                                                        Logout
                                                                                                            </button>
                                                                                                </div>
                                                                                    </div>
                                                                        ) : (
                                                                                    <div className="flex flex-col space-y-3">
                                                                                                <NavLink
                                                                                                            to="/signup"
                                                                                                            className={({ isActive }) =>
                                                                                                                        `px-4 py-3 rounded-md text-base font-medium ${isActive
                                                                                                                                    ? 'bg-indigo-600 text-white'
                                                                                                                                    : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                                                                                                                        } transition-colors duration-200`
                                                                                                            }
                                                                                                            onClick={toggleMenu}
                                                                                                >
                                                                                                            Sign Up
                                                                                                </NavLink>
                                                                                                <NavLink
                                                                                                            to="/login"
                                                                                                            className={({ isActive }) =>
                                                                                                                        `px-4 py-3 rounded-md text-base font-medium ${isActive
                                                                                                                                    ? 'bg-indigo-600 text-white'
                                                                                                                                    : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                                                                                                                        } transition-colors duration-200`
                                                                                                            }
                                                                                                            onClick={toggleMenu}
                                                                                                >
                                                                                                            Login
                                                                                                </NavLink>
                                                                                    </div>
                                                                        )}
                                                            </div>
                                                )}
                                    </div>
                        </nav>
            );
};

export default Navbar;