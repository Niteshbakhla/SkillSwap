import { GraduationCap, Search, User, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import axiosinstance from "../axios/axios";

const SearchBar = ({ onSearch }) => {
            const [searchFilters, setSearchFilters] = useState({
                        general: '',
                        canTeach: '',
                        wantsToLearn: '',
                        user: ''
            });

            const handleInputChange = (field, value) => {
                        const newFilters = { ...searchFilters, [field]: value };
                        setSearchFilters(newFilters);
                        onSearch(newFilters);
            };

            const clearFilters = () => {
                        const emptyFilters = { general: '', canTeach: '', wantsToLearn: '', user: '' };
                        setSearchFilters(emptyFilters);
                        onSearch(emptyFilters);
            };

            const hasActiveFilters = Object.values(searchFilters).some(value => value.trim() !== '');

            return (
                        <div className="bg-white rounded-lg shadow-md border border-[var(--color-neutral-light)] p-4 mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                                <Search className="text-[var(--color-primary)]" size={20} />
                                                <h2 className="text-lg font-semibold text-[var(--color-neutral-dark)]">Search Offers</h2>
                                                {hasActiveFilters && (
                                                            <button
                                                                        onClick={clearFilters}
                                                                        className="ml-auto text-sm text-[var(--color-neutral-text)] hover:text-[var(--color-primary)] transition-colors"
                                                            >
                                                                        Clear all
                                                            </button>
                                                )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div>
                                                            <label className="block text-sm font-medium text-[var(--color-neutral-dark)] mb-2">
                                                                        General Search
                                                            </label>
                                                            <div className="relative">
                                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-neutral-text)]" size={16} />
                                                                        <input
                                                                                    type="text"
                                                                                    placeholder="Search anything..."
                                                                                    value={searchFilters.general}
                                                                                    onChange={(e) => handleInputChange('general', e.target.value)}
                                                                                    className="w-full pl-10 pr-4 py-2 border border-[var(--color-neutral-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                                        />
                                                            </div>
                                                </div>

                                                <div>
                                                            <label className="block text-sm font-medium text-[var(--color-neutral-dark)] mb-2">
                                                                        Can Teach
                                                            </label>
                                                            <div className="relative">
                                                                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-primary)]" size={16} />
                                                                        <input
                                                                                    type="text"
                                                                                    placeholder="e.g., JavaScript, Guitar"
                                                                                    value={searchFilters.canTeach}
                                                                                    onChange={(e) => handleInputChange('canTeach', e.target.value)}
                                                                                    className="w-full pl-10 pr-4 py-2 border border-[var(--color-neutral-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                                        />
                                                            </div>
                                                </div>

                                                <div>
                                                            <label className="block text-sm font-medium text-[var(--color-neutral-dark)] mb-2">
                                                                        Wants to Learn
                                                            </label>
                                                            <div className="relative">
                                                                        <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)]" size={16} />
                                                                        <input
                                                                                    type="text"
                                                                                    placeholder="e.g., Python, Piano"
                                                                                    value={searchFilters.wantsToLearn}
                                                                                    onChange={(e) => handleInputChange('wantsToLearn', e.target.value)}
                                                                                    className="w-full pl-10 pr-4 py-2 border border-[var(--color-neutral-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                                        />
                                                            </div>
                                                </div>

                                                <div>
                                                            <label className="block text-sm font-medium text-[var(--color-neutral-dark)] mb-2">
                                                                        User
                                                            </label>
                                                            <div className="relative">
                                                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-success)]" size={16} />
                                                                        <input
                                                                                    type="text"
                                                                                    placeholder="Search by name..."
                                                                                    value={searchFilters.user}
                                                                                    onChange={(e) => handleInputChange('user', e.target.value)}
                                                                                    className="w-full pl-10 pr-4 py-2 border border-[var(--color-neutral-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                                        />
                                                            </div>
                                                </div>
                                    </div>
                        </div>
            );
};


export default SearchBar;