import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import OfferCard from '../components/OfferCard';
import SearchBar from '../components/SearchBar';
import axiosinstance from '../axios/axios';
import { motion } from "framer-motion";

const OffersList = () => {
            const [filteredOffers, setFilteredOffers] = useState([]);
            const [searchFilters, setSearchFilters] = useState({
                        general: '',
                        canTeach: '',
                        wantsToLearn: '',
                        user: ''
            });
            const [offers, setOffers] = useState([]);


            useEffect(() => {
                        const fetchData = async () => {
                                    try {
                                                const { data } = await axiosinstance.get("/request/offer");
                                                setOffers(data.offers)
                                    } catch (error) {
                                                console.log("Fetch Data", error.message)
                                    }
                        }
                        fetchData();
            }, [])

            const handleSearch = (filters) => {
                        setSearchFilters(filters);

                        let filtered = offers;

                        // Apply filters
                        if (filters.general) {
                                    filtered = filtered.filter(offer =>
                                                offer.userId.name.toLowerCase().includes(filters.general.toLowerCase()) ||
                                                offer.description.toLowerCase().includes(filters.general.toLowerCase()) ||
                                                offer.teachSkill.some(skill => skill.toLowerCase().includes(filters.general.toLowerCase())) ||
                                                offer.learnSkill.some(skill => skill.toLowerCase().includes(filters.general.toLowerCase()))
                                    );
                        }

                        if (filters.canTeach) {
                                    filtered = filtered.filter(offer =>
                                                offer.teachSkill.some(skill => skill.toLowerCase().includes(filters.canTeach.toLowerCase()))
                                    );
                        }

                        if (filters.wantsToLearn) {
                                    filtered = filtered.filter(offer =>
                                                offer.learnSkill.some(skill => skill.toLowerCase().includes(filters.wantsToLearn.toLowerCase()))
                                    );
                        }

                        if (filters.user) {
                                    filtered = filtered.filter(offer =>
                                                offer.userId.name.toLowerCase().includes(filters.user.toLowerCase())
                                    );
                        }

                        setFilteredOffers(filtered);
            };

            React.useEffect(() => {
                        setFilteredOffers(offers);
            }, []);

            const displayOffers = filteredOffers.length > 0 ? filteredOffers : offers;

            return (
                        <div className="min-h-screen bg-[var(--color-neutral-bg)] p-4 sm:p-6 lg:p-8">
                                    <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="max-w-6xl mx-auto">
                                                <div className="text-center mb-8">
                                                            <h1 className="text-3xl font-bold text-[var(--color-neutral-dark)] mb-2">
                                                                        Skill Exchange Community
                                                            </h1>
                                                            <p className="text-[var(--color-neutral-text)]">
                                                                        Find people to teach you new skills and share your knowledge
                                                            </p>
                                                </div>

                                                <SearchBar onSearch={handleSearch} />

                                                <div className="mb-4 flex items-center justify-between">
                                                            <h2 className="text-xl font-semibold text-[var(--color-neutral-dark)]">
                                                                        Available Offers ({displayOffers.length})
                                                            </h2>
                                                            <div className="flex items-center gap-2">
                                                                        <Filter size={16} className="text-[var(--color-neutral-text)]" />
                                                                        <select className="px-3 py-1 border border-[var(--color-neutral-light)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                                                                                    <option>Latest</option>
                                                                                    <option>Highest Rated</option>
                                                                                    <option>Most Skills</option>
                                                                        </select>
                                                            </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            {displayOffers.map((offer) => (
                                                                        <OfferCard key={offer._id} offer={offer} />
                                                            ))}
                                                </div>

                                                {filteredOffers.length === 0 && (searchFilters.general || searchFilters.canTeach || searchFilters.wantsToLearn || searchFilters.user) && (
                                                            <div className="text-center py-12">
                                                                        <div className="text-[var(--color-neutral-text)] mb-4">
                                                                                    <Search size={48} className="mx-auto mb-4 opacity-50" />
                                                                                    <p className="text-lg">No offers found matching your search criteria.</p>
                                                                                    <p className="text-sm">Try adjusting your filters or search terms.</p>
                                                                        </div>
                                                            </div>
                                                )}
                                    </motion.div>
                        </div>
            );
};

export default OffersList;