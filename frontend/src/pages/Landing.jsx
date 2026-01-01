import { MessageCircle, Search, Star, Users2, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
            {
                        id: 1,
                        icons: <Users2 />,
                        head: "Connect with Learners",
                        para: "Join a global community of learners and teachers to share knowledge."
            },
            {
                        id: 2,
                        icons: <Search />,
                        head: "Smart Matching",
                        para: "Find the perfect skill exchange with our intelligent matching system."
            },
            {
                        id: 3,
                        icons: <MessageCircle />,
                        head: "Built-in Chat",
                        para: "Communicate seamlessly with your learning partners in real-time.."
            },
            {
                        id: 4,
                        icons: <Star />,
                        head: "Skill Reviews",
                        para: "Build trust with verified reviews from your skill exchange partners."
            },
];

const LandingPage = () => {
            const [hoveredCard, setHoveredCard] = useState(null);
            const navigate = useNavigate();

            return (
                        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]">
                                    {/* Hero Section */}
                                    <section className="relative bg-gradient-to-br from-[#3B82F6] to-[#2563EB] py-24 md:py-32 flex flex-col items-center text-center px-4 overflow-hidden">
                                                {/* Decorative Background Elements */}
                                                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                                                            <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
                                                            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FBBF24] opacity-10 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10 max-w-4xl">
                                                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
                                                                        <Sparkles className="w-4 h-4" />
                                                                        Welcome to the Future of Learning
                                                            </div>

                                                            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                                                        Swap Skills, <br />
                                                                        <span className="text-[#FBBF24]">Grow Together</span>
                                                            </h1>

                                                            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                                                                        Connect with learners worldwide, share your expertise, and master new skills through our smart matching and built-in chat platform.
                                                            </p>

                                                            <button onClick={() => navigate("/browse")} className="group bg-white text-[#3B82F6] px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2">
                                                                        Get Started
                                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                            </button>
                                                </div>
                                    </section>

                                    {/* Why Choose Us Section */}
                                    <section className="py-20 bg-white relative">
                                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"></div>

                                                <div className="text-center mb-16">
                                                            <h2 className="text-[#1E293B] text-4xl md:text-5xl font-bold mb-4">
                                                                        Why Choose SkillSwap?
                                                            </h2>
                                                            <p className="text-[#1E293B] opacity-60 text-lg max-w-2xl mx-auto">
                                                                        Everything you need to exchange skills and grow your knowledge
                                                            </p>
                                                </div>

                                                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                                                            {cards.map((data) => (
                                                                        <div
                                                                                    key={data.id}
                                                                                    onMouseEnter={() => setHoveredCard(data.id)}
                                                                                    onMouseLeave={() => setHoveredCard(null)}
                                                                                    className="group bg-gradient-to-br from-white to-[#F8FAFC] p-8 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all border border-[#F8FAFC] relative overflow-hidden"
                                                                                    style={{
                                                                                                transform: hoveredCard === data.id ? 'translateY(-8px)' : 'translateY(0)',
                                                                                                transition: 'all 0.3s ease'
                                                                                    }}
                                                                        >
                                                                                    {/* Gradient overlay on hover */}
                                                                                    <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>

                                                                                    <div className="relative">
                                                                                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                                                                                            {data.icons}
                                                                                                </div>
                                                                                                <h3 className="text-[#1E293B] text-xl font-bold mb-3">{data.head}</h3>
                                                                                                <p className="text-[#1E293B] opacity-70 leading-relaxed">{data.para}</p>
                                                                                    </div>
                                                                        </div>
                                                            ))}
                                                </div>
                                    </section>

                                    {/* How It Works Section */}
                                    <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] relative overflow-hidden">
                                                {/* Background decoration */}
                                                <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B82F6] opacity-5 rounded-full blur-3xl"></div>

                                                <div className="text-center mb-16">
                                                            <h2 className="text-[#1E293B] text-4xl md:text-5xl font-bold mb-4">
                                                                        How SkillSwap Works
                                                            </h2>
                                                            <p className="text-[#1E293B] opacity-60 text-lg max-w-2xl mx-auto">
                                                                        Get started in 5 simple steps
                                                            </p>
                                                </div>

                                                <div className="max-w-6xl mx-auto px-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                                                        {[
                                                                                    { step: 1, title: 'Sign Up', desc: 'Create your free account in seconds.' },
                                                                                    { step: 2, title: 'Create an Offer', desc: 'List the skills you can teach and what you want to learn.' },
                                                                                    { step: 3, title: 'Find Matches', desc: 'Discover learners whose skills match your interests.' },
                                                                                    { step: 4, title: 'Send Request', desc: 'Connect with a learner to start your skill exchange.' },
                                                                                    { step: 5, title: 'Start Learning', desc: 'Begin your journey and grow your skills together!' },
                                                                        ].map(({ step, title, desc }) => (
                                                                                    <div key={step} className="relative">
                                                                                                {/* Connector line (hidden on mobile, shown on lg) */}
                                                                                                {step < 5 && (
                                                                                                            <div className="hidden lg:block absolute top-6 left-[calc(100%-1rem)] w-full h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#3B82F6]/20"></div>
                                                                                                )}

                                                                                                <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                                                                                                            <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg shadow-lg mb-4 mx-auto">
                                                                                                                        {step}
                                                                                                            </div>
                                                                                                            <h3 className="text-[#1E293B] text-lg font-bold mb-2 text-center">{title}</h3>
                                                                                                            <p className="text-[#1E293B] opacity-70 text-sm text-center leading-relaxed">{desc}</p>
                                                                                                </div>
                                                                                    </div>
                                                                        ))}
                                                            </div>
                                                </div>
                                    </section>

                                    {/* Join Now Section */}
                                    <section className="py-24 lg:min-h-[80vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white relative overflow-hidden">
                                                {/* Decorative elements */}
                                                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                                                            <div className="absolute top-20 left-20 w-64 h-64 bg-[#3B82F6] opacity-20 rounded-full blur-3xl"></div>
                                                            <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#FBBF24] opacity-20 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10 max-w-3xl">
                                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                                                        Ready to Start Your <br />
                                                                        <span className="text-[#FBBF24]">Learning Journey?</span>
                                                            </h2>
                                                            <p className="text-lg md:text-xl mb-10 opacity-90 leading-relaxed">
                                                                        Join thousands of learners and teachers already exchanging skills on SkillSwap. Start today and unlock a world of knowledge!
                                                            </p>
                                                            <button className="group bg-[#FBBF24] text-[#1E293B] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#F59E0B] transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-2">
                                                                        Join Now
                                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                            </button>
                                                </div>
                                    </section>

                                    {/* Footer Section */}
                                    <footer className="bg-[#0F172A] text-white py-12 text-center border-t border-white/10">
                                                <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#3B82F6] to-[#FBBF24] bg-clip-text text-transparent">
                                                            SkillSwap
                                                </div>
                                                <p className="opacity-60 text-sm">All rights reserved &copy; SkillSwap 2025</p>
                                    </footer>
                        </div>
            );
};

export default LandingPage;