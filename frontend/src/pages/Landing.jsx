import { MessageCircle, SearchIcon, Stars, Users2Icon } from 'lucide-react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const cards = [
            {
                        icons: <Users2Icon />,
                        head: "Connect with Learners",
                        para: "Join a global community of learners and teachers to share knowledge."
            },
            {
                        icons: <SearchIcon />,
                        head: "Smart Matching",
                        para: "Find the perfect skill exchange with our intelligent matching system."
            },
            {
                        icons: <MessageCircle />,
                        head: "Built-in Chat",
                        para: "Communicate seamlessly with your learning partners in real-time.."
            },
            {
                        icons: <Stars />,
                        head: "Skill Reviews",
                        para: "Build trust with verified reviews from your skill exchange partners."
            },

]

const LandingPage = () => {
            const navigate = useNavigate();
            return (
                        <div className="min-h-screen flex flex-col">
                                    {/* Hero Section */}
                                    <section className="bg-[var(--color-neutral-bg)] py-20 flex flex-col items-center text-center">
                                                <h1 className="text-heading text-4xl md:text-5xl font-bold mb-6">
                                                            Swap Skills, Grow Together with SkillSwap
                                                </h1>
                                                <p className="text-body text-lg md:text-xl max-w-2xl mb-8">
                                                            Connect with learners worldwide, share your expertise, and master new skills through our smart matching and built-in chat platform.
                                                </p>
                                                <button onClick={() => navigate("/browse")} className="btn-primary text-lg">
                                                            Get Started
                                                </button>
                                    </section>

                                    {/* Why Choose Us Section */}
                                    <section className="py-16 bg-white">
                                                <h2 className="text-heading text-3xl md:text-4xl font-bold text-center mb-12">
                                                            Why Choose SkillSwap?
                                                </h2>
                                                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                                                            {
                                                                        cards.map((data) => (
                                                                                    <motion.div whileInView={{ opacity: 1 }} whileHover={{ scale: 1.1 }} className="card text-center">
                                                                                                <div className="text-[var(--color-primary)] text-3xl mb-4 flex justify-center">{data.icons}</div>
                                                                                                <h3 className="text-heading text-xl font-semibold mb-2">{data.head}</h3>
                                                                                                <p className="text-body">{data.para}</p>
                                                                                    </motion.div>
                                                                        ))
                                                            }

                                                </div>
                                    </section>

                                    {/* How It Works Section */}
                                    <motion.section whileInView={{ scale: 1 }} initial={{ scale: 0.9 }} className="py-16 bg-[var(--color-neutral-bg)]">
                                                <h2 className="text-heading text-3xl md:text-4xl font-bold text-center mb-12">
                                                            How SkillSwap Works
                                                </h2>
                                                <div className="max-w-4xl mx-auto px-4 ">
                                                            <div className="flex flex-wrap lg:flex-nowrap gap-8">
                                                                        {[
                                                                                    { step: 1, title: 'Sign Up', desc: 'Create your free account in seconds.' },
                                                                                    { step: 2, title: 'Create an Offer', desc: 'List the skills you can teach and what you want to learn.' },
                                                                                    { step: 3, title: 'Find Matches', desc: 'Discover learners whose skills match your interests.' },
                                                                                    { step: 4, title: 'Send Request', desc: 'Connect with a learner to start your skill exchange.' },
                                                                                    { step: 5, title: 'Start Learning', desc: 'Begin your journey and grow your skills together!' },
                                                                        ].map(({ step, title, desc }) => (
                                                                                    <div key={step} className="flex items-start gap-4 flex-col ">
                                                                                                <div className="bg-[var(--color-primary)]  text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                                                                                                            {step}
                                                                                                </div>
                                                                                                <div>
                                                                                                            <h3 className="text-heading text-xl font-semibold">{title}</h3>
                                                                                                            <p className="text-body">{desc}</p>
                                                                                                </div>
                                                                                    </div>
                                                                        ))}
                                                            </div>
                                                </div>
                                    </motion.section>

                                    {/* Join Now Section */}
                                    <motion.section
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                className="py-20  lg:h-[90vh] lg:flex flex-col justify-center items-center text-heading text-center">
                                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                                            Ready to Start Your Learning Journey?
                                                </h2>
                                                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                                                            Join thousands of learners and teachers already exchanging skills on SkillSwap. Start today and unlock a world of knowledge!
                                                </p>
                                                <button className="btn-secondary text-lg">
                                                            Join Now
                                                </button>
                                    </motion.section>

                                    {/* Footer Section */}
                                    <footer className="bg-[var(--color-neutral-dark)] text-white py-8 text-center">
                                                <div className="text-2xl font-bold mb-2">[SkillSwap Logo]</div>
                                                <p className="text-[var(--color-neutral-light)]">All rights reserved &copy; SkillSwap 2025</p>
                                    </footer>
                        </div>
            );
};

export default LandingPage;