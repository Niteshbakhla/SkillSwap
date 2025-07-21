import { useState } from 'react';
import { Plus, X, Send, Loader2, BookOpen, GraduationCap, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosinstance from '../axios/axios';
import { motion } from "framer-motion"

const OfferSubmissionPage = () => {
            const [formData, setFormData] = useState({
                        teachSkill: [''],
                        learnSkill: [''],
                        description: ''
            });
            const [isLoading, setIsLoading] = useState(false);
            const [errors, setErrors] = useState({});

            const validateForm = () => {
                        const newErrors = {};

                        // Validate teach skills
                        const validTeachSkills = formData.teachSkill.filter(skill => skill.trim() !== '');
                        if (validTeachSkills.length === 0) {
                                    newErrors.teachSkill = 'At least one skill to teach is required';
                        }

                        // Validate learn skills
                        const validLearnSkills = formData.learnSkill.filter(skill => skill.trim() !== '');
                        if (validLearnSkills.length === 0) {
                                    newErrors.learnSkill = 'At least one skill to learn is required';
                        }

                        setErrors(newErrors);
                        return Object.keys(newErrors).length === 0;
            };

            const handleSubmit = async (e) => {
                        e.preventDefault();

                        if (!validateForm()) return;
                        setIsLoading(true);

                        try {
                                    // Filter out empty skills
                                    const cleanedData = {
                                                teachSkill: formData.teachSkill.filter(skill => skill.trim() !== ''),
                                                learnSkill: formData.learnSkill.filter(skill => skill.trim() !== ''),
                                                description: formData.description.trim()
                                    };

                                    // Here you would make your axios call
                                    const { data } = await axiosinstance.post('/request/offer', cleanedData);

                                    toast.success(data.message)
                                    // Simulate API call
                                    // await new Promise(resolve => setTimeout(resolve, 2000));

                                    // Reset form on success
                                    setFormData({
                                                teachSkill: [''],
                                                learnSkill: [''],
                                                description: ''
                                    });
                                    setErrors({});

                                    alert('Offer submitted successfully!');

                        } catch (error) {
                                    console.error('Error submitting offer:', error);
                                    toast.error("Error submitting offer. Please try again")
                        } finally {
                                    setIsLoading(false);
                        }
            };

            const addSkillField = (type) => {
                        setFormData(prev => ({ ...prev, [type]: [...prev[type], ''] }));
            };

            const removeSkillField = (type, index) => {
                        setFormData(prev => ({
                                    ...prev,
                                    [type]: prev[type].filter((_, i) => i !== index)
                        }));
            };

            const updateSkillField = (type, index, value) => {
                        setFormData(prev => ({
                                    ...prev,
                                    [type]: prev[type].map((skill, i) => i === index ? value : skill)
                        }));
            };

            const renderSkillInputs = (type, icon, title, placeholder) => {
                        const skills = formData[type];
                        const error = errors[type];

                        return (
                                    <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                            {icon}
                                                            <label className="text-lg font-semibold text-[var(--color-neutral-dark)]">
                                                                        {title}
                                                            </label>
                                                </div>

                                                <div className="space-y-2">
                                                            {skills.map((skill, index) => (
                                                                        <div key={index} className="flex gap-2">
                                                                                    <input
                                                                                                type="text"
                                                                                                value={skill}
                                                                                                onChange={(e) => updateSkillField(type, index, e.target.value)}
                                                                                                placeholder={placeholder}
                                                                                                className="flex-1 px-4 py-3 border border-[var(--color-neutral-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
                                                                                    />
                                                                                    {skills.length > 1 && (
                                                                                                <button
                                                                                                            type="button"
                                                                                                            onClick={() => removeSkillField(type, index)}
                                                                                                            className="p-3 text-[var(--color-error)] hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                                                                >
                                                                                                            <X size={20} />
                                                                                                </button>
                                                                                    )}
                                                                        </div>
                                                            ))}
                                                </div>

                                                <button
                                                            type="button"
                                                            onClick={() => addSkillField(type)}
                                                            className="inline-flex items-center gap-2 px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors duration-200"
                                                >
                                                            <Plus size={16} />
                                                            Add another skill
                                                </button>

                                                {error && (
                                                            <p className="text-[var(--color-error)] text-sm mt-1">{error}</p>
                                                )}
                                    </div>
                        );
            };

            return (
                        <div className="min-h-screen bg-[var(--color-neutral-bg)] py-6 px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="max-w-2xl mx-auto">
                                                {/* Header */}
                                                <div className="text-center mb-8">
                                                            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-neutral-dark)] mb-4">
                                                                        Create Your Skill Exchange Offer
                                                            </h1>
                                                            <p className="text-[var(--color-neutral-text)] text-lg">
                                                                        Share what you can teach and what you'd like to learn
                                                            </p>
                                                </div>

                                                {/* Form Card */}
                                                <div className="bg-white border border-[var(--color-neutral-light)] shadow-sm rounded-lg p-6">
                                                            <div className="space-y-8">
                                                                        {/* Skills to Teach */}
                                                                        {renderSkillInputs(
                                                                                    'teachSkill',
                                                                                    <GraduationCap className="text-[var(--color-primary)]" size={24} />,
                                                                                    'Skills I Can Teach',
                                                                                    'e.g., JavaScript, Guitar, Photography'
                                                                        )}

                                                                        {/* Skills to Learn */}
                                                                        {renderSkillInputs(
                                                                                    'learnSkill',
                                                                                    <BookOpen className="text-[var(--color-secondary)]" size={24} />,
                                                                                    'Skills I Want to Learn',
                                                                                    'e.g., Python, Piano, Cooking'
                                                                        )}

                                                                        {/* Description */}
                                                                        <div className="space-y-3">
                                                                                    <div className="flex items-center gap-2">
                                                                                                <FileText className="text-[var(--color-success)]" size={24} />
                                                                                                <label className="text-lg font-semibold text-[var(--color-neutral-dark)]">
                                                                                                            Description (Optional)
                                                                                                </label>
                                                                                    </div>
                                                                                    <textarea
                                                                                                value={formData.description}
                                                                                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                                                                                placeholder="Tell us more about your skills, teaching style, or what you're looking for..."
                                                                                                rows={4}
                                                                                                className="w-full px-4 py-3 border border-[var(--color-neutral-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 resize-none"
                                                                                    />
                                                                        </div>

                                                                        {/* Submit Button */}
                                                                        <div className="flex justify-center pt-6">
                                                                                    <button
                                                                                                onClick={handleSubmit}
                                                                                                disabled={isLoading}
                                                                                                className="inline-flex items-center gap-3 px-8 py-2 text-lg font-semibold min-w-[200px] justify-center bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-light)] active:bg-[var(--color-primary-dark)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                    >
                                                                                                {isLoading ? (
                                                                                                            <>
                                                                                                                        <Loader2 className="animate-spin" size={20} />
                                                                                                                        Submitting...
                                                                                                            </>
                                                                                                ) : (
                                                                                                            <>
                                                                                                                        <Send size={20} />
                                                                                                                        Submit Offer
                                                                                                            </>
                                                                                                )}
                                                                                    </button>
                                                                        </div>
                                                            </div>
                                                </div>

                                                {/* Info Cards */}
                                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                                            <div className="bg-white border border-[var(--color-neutral-light)] shadow-sm rounded-lg p-6">
                                                                        <div className="flex items-center gap-3 mb-3">
                                                                                    <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                                                                                                <GraduationCap className="text-[var(--color-primary)]" size={20} />
                                                                                    </div>
                                                                                    <h3 className="font-semibold text-[var(--color-neutral-dark)]">Teaching</h3>
                                                                        </div>
                                                                        <p className="text-[var(--color-neutral-text)] text-sm">
                                                                                    Share your expertise and help others learn new skills while building your reputation in the community.
                                                                        </p>
                                                            </div>

                                                            <div className="bg-white border border-[var(--color-neutral-light)] shadow-sm rounded-lg p-6">
                                                                        <div className="flex items-center gap-3 mb-3">
                                                                                    <div className="p-2 bg-[var(--color-secondary)]/10 rounded-lg">
                                                                                                <BookOpen className="text-[var(--color-secondary)]" size={20} />
                                                                                    </div>
                                                                                    <h3 className="font-semibold text-[var(--color-neutral-dark)]">Learning</h3>
                                                                        </div>
                                                                        <p className="text-[var(--color-neutral-text)] text-sm">
                                                                                    Discover new skills from community members and expand your knowledge through peer-to-peer learning.
                                                                        </p>
                                                            </div>
                                                </div>
                                    </motion.div>
                        </div>
            );
};

export default OfferSubmissionPage;