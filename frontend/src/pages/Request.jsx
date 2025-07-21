import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import axiosinstance from '../axios/axios';
import { motion } from "framer-motion"
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Requests = () => {
            const { isLogin, loading, error } = useSelector((state) => state.auth);
            const [receivedRequests, setReceivedRequests] = useState([]);
            const navigate = useNavigate();

            useEffect(() => {
                        const getRequest = async () => {
                                    try {
                                                const { data } = await axiosinstance.get("/request");
                                                setReceivedRequests(data.received);
                                    } catch (error) {
                                                console.log(error);
                                    }
                        }
                        getRequest();
            }, [])

            const handleAccept = async (id, status) => {
                        try {
                                    const { data } = await axiosinstance.patch(`/request/${id}`, { status })
                                    toast.success(data.request.status);
                        } catch (error) {
                                    console.log(error)
                        }

            }


            if (loading) return <div className="text-center py-12 text-[var(--color-neutral-text)] text-lg">Loading...</div>;
            if (error) return <div className="text-[var(--color-error)] text-center py-12 text-lg">{error}</div>;
            if (!isLogin) return <div className="text-center py-12 text-[var(--color-neutral-text)] text-lg">Please log in to view requests</div>;
            if (!receivedRequests || receivedRequests.length === 0) {
                        return <div className="text-center py-12 text-[var(--color-neutral-text)] text-lg">No requests received yet</div>;
            }

            return (
                        <div className="min-h-screen bg-[var(--color-neutral-bg)] py-12 px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="max-w-4xl mx-auto">
                                                <h1 className="text-heading text-3xl sm:text-4xl font-bold text-center mb-8">Received Skill Exchange Requests</h1>
                                                <div className="space-y-6">
                                                            {receivedRequests.map((request) => (
                                                                        <div
                                                                                    key={request._id}
                                                                                    className="card bg-white shadow-lg rounded-xl p-6 animate-fade-in-up"
                                                                        >
                                                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                                                                                <div>
                                                                                                            <h2 className="text-heading text-xl sm:text-2xl font-semibold">
                                                                                                                        From: {request.fromUserId.name}
                                                                                                            </h2>
                                                                                                            <p className="text-body text-sm sm:text-base text-[var(--color-neutral-text)]">
                                                                                                                        Received: {format(new Date(request.createdAt), 'PPP')}
                                                                                                            </p>
                                                                                                </div>
                                                                                                <span
                                                                                                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${request.status === 'pending'
                                                                                                                        ? 'bg-[var(--color-success)] text-white'
                                                                                                                        : request.status === 'accepted'
                                                                                                                                    ? 'bg-[var(--color-primary)] text-white'
                                                                                                                                    : 'bg-[var(--color-neutral-light)] text-[var(--color-neutral-text)]'
                                                                                                                        }`}
                                                                                                >
                                                                                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                                                                </span>
                                                                                    </div>
                                                                                    <div className="mt-4">
                                                                                                <h3 className="text-heading text-lg font-medium mb-2">Offer Details</h3>
                                                                                                <p className="text-body text-base">{request.offerId.description || 'No description provided'}</p>
                                                                                                <div className="mt-3 flex flex-wrap gap-2">
                                                                                                            <div>
                                                                                                                        <span className="text-body text-sm font-medium">Skills Offered:</span>
                                                                                                                        {request.offerId.teachSkill.length > 0 ? (
                                                                                                                                    request.offerId.teachSkill.map((skill, index) => (
                                                                                                                                                <span
                                                                                                                                                            key={index}
                                                                                                                                                            className="inline-block bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-sm font-medium ml-2 hover:bg-[var(--color-primary-dark)] transition-all duration-200"
                                                                                                                                                >
                                                                                                                                                            {skill}
                                                                                                                                                </span>
                                                                                                                                    ))
                                                                                                                        ) : (
                                                                                                                                    <span className="text-body text-sm ml-2">None</span>
                                                                                                                        )}
                                                                                                            </div>
                                                                                                </div>
                                                                                                <div className="mt-2 flex flex-wrap gap-2">
                                                                                                            <div>
                                                                                                                        <span className="text-body text-sm font-medium">Skills Requested:</span>
                                                                                                                        {request.offerId.learnSkill.length > 0 ? (
                                                                                                                                    request.offerId.learnSkill.map((skill, index) => (
                                                                                                                                                <span
                                                                                                                                                            key={index}
                                                                                                                                                            className="inline-block bg-[var(--color-secondary)] text-white px-3 py-1 rounded-full text-sm font-medium ml-2 hover:bg-[var(--color-secondary-light)] transition-all duration-200"
                                                                                                                                                >
                                                                                                                                                            {skill}
                                                                                                                                                </span>
                                                                                                                                    ))
                                                                                                                        ) : (
                                                                                                                                    <span className="text-body text-sm ml-2">None</span>
                                                                                                                        )}
                                                                                                            </div>
                                                                                                </div>
                                                                                    </div>
                                                                                    {request.status === 'pending' && (
                                                                                                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                                                                                            <button
                                                                                                                        onClick={() => handleAccept(request._id, "accepted")}
                                                                                                                        className="flex-1 bg-[var(--color-success)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                                                        disabled={loading}
                                                                                                            >
                                                                                                                        Accept
                                                                                                            </button>
                                                                                                            <button
                                                                                                                        onClick={() => handleAccept(request._id, "declined")}
                                                                                                                        className="flex-1 bg-[var(--color-error)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                                                        disabled={loading}
                                                                                                            >
                                                                                                                        Decline
                                                                                                            </button>
                                                                                                </div>
                                                                                    )}

                                                                                    {
                                                                                                request.status === "accepted" &&
                                                                                                <div className='mt- flex flex-col sm:flex-row gap-4 items-center pt-6 '>
                                                                                                            <button
                                                                                                                        onClick={() => navigate("/caht")}
                                                                                                                        className="flex-1 flex justify-center gap-2 bg-[var(--color-success)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                                                        disabled={loading}
                                                                                                            >
                                                                                                                        Chat <Send size={20} />
                                                                                                            </button>
                                                                                                            <button
                                                                                                                        onClick={() => handleAccept(request._id, "declined")}
                                                                                                                        className="flex-1  bg-[var(--color-error)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                                                        disabled={loading}
                                                                                                            >
                                                                                                                        Decline
                                                                                                            </button>
                                                                                                </div>
                                                                                    }
                                                                        </div>
                                                            ))}
                                                </div>
                                    </motion.div>
                        </div>
            );
};

export default Requests;