import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderCircleIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
            const [formData, setFormData] = useState({ email: '', password: '' });
            const [error, setError] = useState('');
            const navigate = useNavigate();
            const dispatch = useDispatch()
            const { loading } = useSelector(state => state.auth)

            const handleChange = (e) => {
                        setFormData({ ...formData, [e.target.name]: e.target.value });
            };

            const handleSubmit = async (e) => {
                        e.preventDefault();
                        if (!formData.email || !formData.password) {
                                    setError('Please fill in all fields');
                                    return;
                        }
                        // const { data } = await axiosinstance.post('/auth/login', formData);
                        dispatch(login(formData))
                                    .unwrap()
                                    .then((data) => {
                                                toast.success(data.message || "Login success")
                                                navigate("/")
                                    })
                                    .catch((err) => {
                                                console.error(err)
                                                setError(err)
                                                toast.error(err)
                                    })

            };

            return (
                        <div className=" lg:h-[90vh] min-h-[80vh]  lg:bg-[var(--color-neutral-bg)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                                    <div className="max-w-md w-full card">
                                                <h2 className="text-heading text-3xl font-bold text-center mb-6">Login to SkillSwap</h2>
                                                {error && <p className="text-[var(--color-error)] text-center mb-4">{error}</p>}
                                                <form onSubmit={handleSubmit} type="submit" className="space-y-6">
                                                            <div>
                                                                        <label htmlFor="email" className="text-body block text-sm font-medium">
                                                                                    Email
                                                                        </label>
                                                                        <input
                                                                                    type="email"
                                                                                    name="email"
                                                                                    value={formData.email}
                                                                                    onChange={handleChange}
                                                                                    className="mt-1 block w-full px-3 py-2 border border-[var(--color-neutral-light)] rounded-md text-body focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                                                    required
                                                                        />
                                                            </div>
                                                            <div>
                                                                        <label htmlFor="password" className="text-body block text-sm font-medium">
                                                                                    Password
                                                                        </label>
                                                                        <input
                                                                                    type="password"
                                                                                    name="password"
                                                                                    value={formData.password}
                                                                                    onChange={handleChange}
                                                                                    className="card mt-1 block w-full px-3 py-2 border border-[var(--color-neutral-light)] rounded-md text-body focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                                                    required
                                                                        />
                                                            </div>
                                                            <button type="submit" className="btn-primary w-full flex justify-center">
                                                                        {
                                                                                    loading ? <LoaderCircleIcon className='animate-spin' /> : "Login"
                                                                        }
                                                            </button>
                                                </form>
                                                <p className="text-body text-center mt-4">
                                                            Don't have an account? <Link to="/signup" className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)]">Sign Up</Link>
                                                </p>
                                    </div>
                        </div>
            );
};

export default Login;