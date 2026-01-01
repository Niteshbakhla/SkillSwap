import { BookOpen, Calendar, GraduationCap, MapPin, Send, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../axios/axios";
import toast from "react-hot-toast";
import { fetchRequest } from "../redux/slices/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const OfferCard = ({ offer }) => {
            const [isRequestLoading, setIsRequestLoading] = useState(false);
            const [loader, setLoader] = useState(false);
            const { request } = useSelector(state => state.request)
            const [getReques, setGetReuquest] = useState(request);
            const navigate = useNavigate();
            const dispatch = useDispatch();
            const existRequest = getReques.find(req => req.offerId === offer._id || req.offerId?._id === offer._id)

            const handleSendRequest = async () => {

                        setIsRequestLoading(true);

                        try {
                                    const requestData = {
                                                toUserId: offer.userId._id,
                                                offerId: offer._id
                                    }
                                    const { data } = await axiosinstance.post("/request", requestData);
                                    if (data.request) {
                                                setTimeout(() => {
                                                            setGetReuquest(prev => [...prev, data.request]);
                                                            toast.success(data.message)
                                                            setIsRequestLoading(false)
                                                }, 1000);
                                    } else {
                                                setTimeout(() => {
                                                            setGetReuquest(prev => prev.filter(item => item.offerId !== offer._id));
                                                            toast.success(data.message);
                                                            setIsRequestLoading(false)
                                                }, 1000);
                                    }
                        } catch (error) {
                                    console.error('Error sending request:', error);
                        }
            };


            const showExistRequest = () => {
                        if (!existRequest) {
                                    return <span onClick={handleSendRequest} className="text-sm">Request</span>
                        }
                        else if (existRequest.status === "pending") {
                                    return <span onClick={handleSendRequest} className="text-sm">Unsend</span>
                        } else if (existRequest.status === "accepted") {
                                    return <span onClick={() => navigate("/chat")} className="text-sm">Chat</span>
                        }
            }
            useEffect(() => {

                        try {
                                    dispatch(fetchRequest())
                        } catch (error) {
                                    console.log(error)
                        }
            }, [])

            const handleViewProfile = () => {
                        navigate(`/profile/${offer.userId._id}`)
            };

            return (
                        <div className="bg-white rounded-lg shadow-md border border-[var(--color-neutral-light)] p-4 hover:shadow-lg transition-shadow duration-200">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                            <img
                                                                        src={offer?.userId?.avatar}
                                                                        alt={offer?.userId?.name}
                                                                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-neutral-light)]"
                                                            />
                                                            <div>
                                                                        <h3 className="font-semibold text-[var(--color-neutral-dark)] text-lg">{offer.userId?.name}</h3>
                                                                        <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-text)]">
                                                                                    <MapPin size={14} />
                                                                                    <span>{offer.userId?.location}</span>
                                                                                    <Star size={14} className="fill-yellow-400 text-yellow-400 ml-1" />
                                                                                    <span>{offer.userId?.rating}</span>
                                                                        </div>
                                                            </div>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-[var(--color-neutral-text)]">
                                                            <Calendar size={12} />
                                                            <span>{new Date(offer.createdAt).toDateString()}</span>
                                                </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="space-y-3 mb-4">
                                                <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                        <GraduationCap size={16} className="text-[var(--color-primary)]" />
                                                                        <span className="text-sm font-medium text-[var(--color-neutral-dark)]">Can Teach</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1">
                                                                        {offer.teachSkill.slice(0, 3).map((skill, index) => (
                                                                                    <span key={index} className="px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs rounded-full">
                                                                                                {skill}
                                                                                    </span>
                                                                        ))}
                                                                        {offer.teachSkill.length > 3 && (
                                                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                                                                +{offer.teachSkill.length - 3} more
                                                                                    </span>
                                                                        )}
                                                            </div>
                                                </div>

                                                <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                        <BookOpen size={16} className="text-[var(--color-secondary)]" />
                                                                        <span className="text-sm font-medium text-[var(--color-neutral-dark)]">Wants to Learn</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1">
                                                                        {offer.learnSkill.slice(0, 3).map((skill, index) => (
                                                                                    <span key={index} className="px-2 py-1 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs rounded-full">
                                                                                                {skill}
                                                                                    </span>
                                                                        ))}
                                                                        {offer.learnSkill.length > 3 && (
                                                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                                                                +{offer.learnSkill.length - 3} more
                                                                                    </span>
                                                                        )}
                                                            </div>
                                                </div>
                                    </div>

                                    {/* Description */}
                                    {offer.description && (
                                                <p className="text-[var(--color-neutral-text)] text-sm mb-4 line-clamp-2">
                                                            {offer.description}
                                                </p>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                                <button
                                                            onClick={handleViewProfile}
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[var(--color-neutral-light)] text-[var(--color-neutral-text)] rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                            <User size={16} />
                                                            <span className="text-sm">Profile</span>
                                                </button>
                                                <button
                                                            disabled={isRequestLoading}
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-light)] disabled:opacity-50 transition-colors duration-200"
                                                >
                                                            {isRequestLoading ? (
                                                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                            ) : (
                                                                        <Send size={16} />
                                                            )}
                                                            {
                                                                        showExistRequest()
                                                            }
                                                </button>
                                    </div>
                        </div>
            );
};

export default OfferCard;