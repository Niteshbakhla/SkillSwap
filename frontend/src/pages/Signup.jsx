import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosinstance from '../axios/axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';

const Signup = () => {
            const [formData, setFormData] = useState({
                        name: '',
                        email: '',
                        password: '',
                        bio: '',
                        skillsToTeach: '',
                        skillsToLearn: '',
            });
            const [error, setError] = useState('');
            const navigate = useNavigate();
            const dispatch = useDispatch();

            const handleChange = (e) => {
                        setFormData({ ...formData, [e.target.name]: e.target.value });
            };

            const handleSubmit = async (e) => {
                        e.preventDefault();
                        setError('');
                        // Basic client-side validation
                        if (!formData.name || !formData.email || !formData.password) {
                                    setError('Please fill in all required fields');
                                    return;
                        }
                        if (!/\S+@\S+\.\S+/.test(formData.email)) {
                                    setError('Please enter a valid email');
                                    return;
                        }
                        // Prepare data, converting comma-separated skills to arrays
                        const userData = {
                                    ...formData,
                                    skillsToTeach: formData.skillsToTeach ? formData.skillsToTeach.split(',').map(s => s.trim()) : [],
                                    skillsToLearn: formData.skillsToLearn ? formData.skillsToLearn.split(',').map(s => s.trim()) : [],
                        };

                        try {
                                    const data = await dispatch(signup(userData)).unwrap();
                                    toast.success(data.message || "Registered successfully");
                                    navigate("/")
                        } catch (error) {
                                    toast.error(error);
                                    setError(error);
                        }

            };

            return (
                        <div className="min-h-screen bg-[var(--color-neutral-bg)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                    <div className="card max-w-md w-full space-y-8">
                                                <div>
                                                            <h2 className="text-heading text-3xl font-bold text-center">Join SkillSwap</h2>
                                                            <p className="text-body mt-2 text-center">Create an account to start sharing and learning skills!</p>
                                                </div>
                                                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                                            {error && (
                                                                        <div className="text-[var(--color-error)] text-center">{error}</div>
                                                            )}
                                                            <div className="space-y-4">
                                                                        <div>
                                                                                    <label htmlFor="name" className="text-body text-sm font-medium">
                                                                                                Name *
                                                                                    </label>
                                                                                    <input
                                                                                                id="name"
                                                                                                name="name"
                                                                                                type="text"
                                                                                                className="mt-1 block w-full px-3 py-2 border-[var(--color-neutral-light)] rounded-md text-body focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                                                                value={formData.name}
                                                                                                onChange={handleChange}
                                                                                                required
                                                                                    />
                                                                        </div>
                                                                        <div>
                                                                                    <label htmlFor="email" className="text-body text-sm font-medium">
                                                                                                Email *
                                                                                    </label>
                                                                                    <input
                                                                                                id="email"
                                                                                                name="email"
                                                                                                type="email"
                                                                                                className="mt-1 block w-full px-3 py-2 border border-[var(--color-neutral-light)] rounded-md text-body focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                                                                value={formData.email}
                                                                                                onChange={handleChange}
                                                                                                required
                                                                                    />
                                                                        </div>
                                                                        <div>
                                                                                    <label htmlFor="password" className="text-body text-sm font-medium">
                                                                                                Password *
                                                                                    </label>
                                                                                    <input
                                                                                                id="password"
                                                                                                name="password"
                                                                                                type="password"
                                                                                                className="mt-1 block w-full px-3 py-2 border border-[var(--color-neutral-light)] rounded-md text-body focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                                                                value={formData.password}
                                                                                                onChange={handleChange}
                                                                                                required
                                                                                    />
                                                                        </div>
                                                                        <div>
                                                                                    <label htmlFor="bio" className="text-body text-sm font-medium">
                                                                                                Bio (Optional)
                                                                                    </label>
                                                                                    <textarea
                                                                                                id="bio"
                                                                                                name="bio"
                                                                                                className="mt-1 block w-full px-3 py-2 border border-[var(--color-neutral-light)] rounded-md text-body focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                                                                value={formData.bio}
                                                                                                onChange={handleChange}
                                                                                                rows="4"
                                                                                    />
                                                                        </div>
                                                                        <div>
                                                                                    <label htmlFor="skillsToTeach" className="text-body text-sm font-medium">
                                                                                                Skills to Teach (Optional, comma-separated)
                                                                                    </label>
                                                                                    <input
                                                                                                id="skillsToTeach"
                                                                                                name="skillsToTeach"
                                                                                                type="text"
                                                                                                placeholder="e.g., JavaScript, Guitar, Cooking"
                                                                                                className="mt-1 block w-full px-3 py-2 border border-[var(--color-neutral-light)] rounded-md text-body focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                                                                value={formData.skillsToTeach}
                                                                                                onChange={handleChange}
                                                                                    />
                                                                        </div>
                                                                        <div>
                                                                                    <label htmlFor="skillsToLearn" className="text-body text-sm font-medium">
                                                                                                Skills to Learn (Optional, comma-separated)
                                                                                    </label>
                                                                                    <input
                                                                                                id="skillsToLearn"
                                                                                                name="skillsToLearn"
                                                                                                type="text"
                                                                                                placeholder="e.g., Python, Piano, Photography"
                                                                                                className="mt-1 block w-full px-3 py-2 border border-[var(--color-neutral-light)] rounded-md text-body focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                                                                value={formData.skillsToLearn}
                                                                                                onChange={handleChange}
                                                                                    />
                                                                        </div>
                                                            </div>
                                                            <button type="submit" className="btn-primary w-full">
                                                                        Sign Up
                                                            </button>
                                                            <p className="text-body text-center text-sm mt-2">
                                                                        Already have an account?{' '}
                                                                        <Link to="/login" className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)]">
                                                                                    Login
                                                                        </Link>
                                                            </p>
                                                </form>
                                    </div>
                        </div>
            );
};

export default Signup;