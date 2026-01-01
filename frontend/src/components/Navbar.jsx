import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart3, Home, LogOut, Plus, Search, User, Users2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { logout } from '../redux/slices/authSlice';
import { useEffect } from 'react';
import { fetchRequest } from '../redux/slices/requestSlice';

const navbarItem = [
            { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
            { name: 'Browse', path: '/browse', icon: <Search className="w-5 h-5" /> },
            { name: 'My Offer', path: '/my-offer', icon: <Plus className="w-5 h-5" /> },
            { name: 'Request', path: '/request', icon: <Users2 className="w-5 h-5" /> },
            { name: 'Chat', path: '/chat', icon: <BarChart3 className="w-5 h-5" /> },
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
                        <nav className="bg-white shadow-md sticky top-0 z-50">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                <div className="flex justify-between items-center py-4">
                                                            {/* Logo Section */}
                                                            <div className="flex items-center">
                                                                        <NavLink to="/" className="text-2xl font-bold text-[#3B82F6]">
                                                                                    SkillSwap
                                                                        </NavLink>
                                                            </div>

                                                            {/* Desktop Navigation Links */}
                                                            <div className="hidden md:flex items-center space-x-2">
                                                                        {isLogin ? (
                                                                                    <>
                                                                                                {navbarItem.map((item) => (
                                                                                                            <NavLink
                                                                                                                        key={item.name}
                                                                                                                        to={item.path}
                                                                                                                        className={({ isActive }) =>
                                                                                                                                    `flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                                                                                                                                ? 'bg-[#3B82F6] text-white shadow-md'
                                                                                                                                                : 'text-[#1E293B] hover:bg-[#F8FAFC]'
                                                                                                                                    }`
                                                                                                                        }
                                                                                                            >
                                                                                                                        {item.icon}
                                                                                                                        <button className="ml-2 flex items-center gap-2">{item.name} {item.name === "Request" && <span className='block w-4 h-4 text-[10px]  rounded-full  bg-red-500 text-white'>{request?.length}</span>}</button>

                                                                                                            </NavLink>
                                                                                                ))}
                                                                                                {/* Circular Profile Icon */}
                                                                                                <div className="relative ">
                                                                                                            <button
                                                                                                                        onClick={() => setIsShow(true)}
                                                                                                                        className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-[#3B82F6] text-white text-lg font-semibold shadow-md hover:bg-[#2563EB] transition-all"
                                                                                                            >
                                                                                                                        {user?.name.slice(0, 1).toUpperCase()}
                                                                                                            </button>
                                                                                                            {
                                                                                                                        isShow && <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg py-2">
                                                                                                                                    <button
                                                                                                                                                onClick={handleLogout}
                                                                                                                                                className="flex items-center w-full px-4 py-2 text-sm text-[#1E293B] hover:bg-[#F8FAFC] rounded-xl mx-1"
                                                                                                                                    >
                                                                                                                                                <LogOut className="w-5 h-5 mr-2" />
                                                                                                                                                Logout
                                                                                                                                    </button>
                                                                                                                        </div>
                                                                                                            }
                                                                                                </div>
                                                                                    </>
                                                                        ) : (
                                                                                    <div className="flex space-x-3">
                                                                                                <NavLink
                                                                                                            to="/signup"
                                                                                                            className={({ isActive }) =>
                                                                                                                        `px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md ${isActive
                                                                                                                                    ? 'bg-[#3B82F6] text-white'
                                                                                                                                    : 'bg-[#F8FAFC] text-[#1E293B] hover:bg-[#3B82F6] hover:text-white'
                                                                                                                        }`
                                                                                                            }
                                                                                                >
                                                                                                            Sign Up
                                                                                                </NavLink>
                                                                                                <NavLink
                                                                                                            to="/login"
                                                                                                            className={({ isActive }) =>
                                                                                                                        `px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md ${isActive
                                                                                                                                    ? 'bg-[#3B82F6] text-white'
                                                                                                                                    : 'bg-[#F8FAFC] text-[#1E293B] hover:bg-[#3B82F6] hover:text-white'
                                                                                                                        }`
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
                                                                                    className="text-[#1E293B] hover:text-[#3B82F6] focus:outline-none"
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
                                                            <div className="md:hidden bg-white border-t border-[#F8FAFC] px-4 pt-4 pb-6">
                                                                        {isLogin ? (
                                                                                    <div className="flex flex-col space-y-2">
                                                                                                {navbarItem.map((item) => (
                                                                                                            <NavLink
                                                                                                                        key={item.name}
                                                                                                                        to={item.path}
                                                                                                                        className={({ isActive }) =>
                                                                                                                                    `flex items-center px-4 py-3 rounded-full text-base font-medium transition-all duration-200 ${isActive
                                                                                                                                                ? 'bg-[#3B82F6] text-white shadow-md'
                                                                                                                                                : 'text-[#1E293B] hover:bg-[#F8FAFC]'
                                                                                                                                    }`
                                                                                                                        }
                                                                                                                        onClick={toggleMenu}
                                                                                                            >
                                                                                                                        {item.icon}
                                                                                                                        <span className="ml-3">{item.name}</span>
                                                                                                            </NavLink>
                                                                                                ))}
                                                                                                <div className="flex items-center px-4 py-3 mt-2">
                                                                                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3B82F6] text-white text-lg font-semibold shadow-md">
                                                                                                                        {profileInitial}
                                                                                                            </div>
                                                                                                            <button
                                                                                                                        onClick={handleLogout}
                                                                                                                        className="ml-3 flex items-center text-base font-medium text-[#1E293B] hover:text-[#3B82F6]"
                                                                                                            >
                                                                                                                        <LogOut className="w-5 h-5 mr-2" />
                                                                                                                        Logout
                                                                                                            </button>
                                                                                                </div>
                                                                                    </div>
                                                                        ) : (
                                                                                    <div className="flex flex-col space-y-2">
                                                                                                <NavLink
                                                                                                            to="/signup"
                                                                                                            className={({ isActive }) =>
                                                                                                                        `px-4 py-3 rounded-full text-base font-medium text-center transition-all duration-200 shadow-md ${isActive
                                                                                                                                    ? 'bg-[#3B82F6] text-white'
                                                                                                                                    : 'text-[#1E293B] bg-[#F8FAFC] hover:bg-[#3B82F6] hover:text-white'
                                                                                                                        }`
                                                                                                            }
                                                                                                            onClick={toggleMenu}
                                                                                                >
                                                                                                            Sign Up
                                                                                                </NavLink>
                                                                                                <NavLink
                                                                                                            to="/login"
                                                                                                            className={({ isActive }) =>
                                                                                                                        `px-4 py-3 rounded-full text-base font-medium text-center transition-all duration-200 shadow-md ${isActive
                                                                                                                                    ? 'bg-[#3B82F6] text-white'
                                                                                                                                    : 'text-[#1E293B] bg-[#F8FAFC] hover:bg-[#3B82F6] hover:text-white'
                                                                                                                        }`
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