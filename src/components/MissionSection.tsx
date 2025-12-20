
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation, animate } from 'framer-motion';
import {
  Globe,
  User,
  Search,
  TrendingUp,
  Megaphone,
  Briefcase,
  Zap,
  Beaker,
  Archive,
  PackageCheck,
  Focus,
  MessagesSquare,
  ClipboardList,
  ChevronRight
} from 'lucide-react';

/**
 * INTEGRATED SCROLL REVEAL COMPONENT
 * Included here for single-file portability as requested.
 */
const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
}: {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom';
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      scale: direction === 'zoom' ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * INTEGRATED COUNTER COMPONENT
 */
const Counter = ({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        onUpdate: (value) => setCount(Math.floor(value)),
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

export default function MissionSection() {
  const features = [
    {
      icon: Briefcase,
      title: 'Business Website',
      description: 'Every business needs a solid foundation online. We build professional, easy-to-navigate websites that clearly showcase what you offer, making it simple for potential customers to understand your value and take the next step.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: User,
      title: 'Personal Portfolio',
      description: 'Your work is your story. Don’t just list it "Present it". We create stunning, Iconic portfolios that do more than display your projects, they capture your unique style and build a personal brand that makes you impossible to forget.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: Search,
      title: 'On-Page SEO',
      description: 'What good is a beautiful website if no one can find it? We meticulously optimize every page from content to code to rank higher on Google, helping you attract a steady stream of the right customers, Neptrax is where great designs meets strategic growth with.',
      image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: TrendingUp,
      title: 'SEO Audit & Strategy',
      description: 'Feeling lost in the search results? We provide a deep-dive analysis of your current site and competitors, delivering a clear, actionable roadmap to climb the rankings and dominate your niche. Your path to growth starts here with Better data and Clear direction..',
      image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: Megaphone,
      title: 'Marketing Website',
      description: 'Stop letting visitors leave empty-handed. We design and build high-converting landing pages and sales funnels focused on a single goal: turning viewers into leads and customers. Maximize your ROI with a website built for action.',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: Globe,
      title: 'Brand Endorsement',
      description: 'Your digital presence is your modern-day handshake. We build websites that go beyond looks, creating a genuine connection with your audience by authentically communicating your values, building lasting trust, and turning visitors into believers.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const benefits = [
    { title: 'Local Expertise', description: 'Leverage our deep, country-wide expertise to drive growth and connect with customers across the United States.' },
    { title: 'Proven Results', description: 'We deliver measurable success in digital traffic, qualified leads, and revenue growth.' },
    { title: 'Tailored Strategys', description: 'Get a custom digital strategy designed to solve your unique business challenges.' },
    { title: 'Dedicated Partnership', description: 'Stay informed and in control with transparent communication every step of the way.' },
    { title: 'Smart Investment', description: 'Achieve outstanding digital quality and results without stretching your budget.' },
    { title: 'Digital Transformation', description: 'We provide integrated solutions from web development to social media management.' },
  ];

  const flowFeatures = [
    { icon: Beaker, title: "Project Mapping", desc: "Break down complex projects into clear, actionable tasks for a seamless workflow." },
    { icon: Archive, title: "Intelligent Progress Tracking", desc: "Automatically file away completed milestones maintaining a focused workspace." },
    { icon: PackageCheck, title: "Assets Ready for Deployment", desc: "Receive final deliverables that are ready for instant implementation." },
    { icon: Focus, title: "Project Lens", desc: "Customize your view to highlight immediate priorities and filter out irrelevant information." },
    { icon: MessagesSquare, title: "Team Dialogue", desc: "Embed discussions and feedback within specific tasks to enhance collaboration." },
    { icon: ClipboardList, title: "Faster Delivery", desc: "Use structured templates to accelerate delivery while maintaining high standards." }
  ];

  return (
    <section className="bg-[#28282B] text-white overflow-hidden pb-32">
      
      {/* 1. Impactful Mission Header Section - Redesigned to match high-end agency aesthetic */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          <ScrollReveal direction="right" duration={1} className="lg:col-span-7 h-full">
            <div className="relative h-full flex flex-col justify-center">
              {/* Branding Label */}
              <div className="flex items-center gap-4 mb-12">
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">
                  NEPTRAX® 2025
                </div>
                <div className="h-px w-16 bg-white/10"></div>
              </div>

              {/* Ultra Large Heading - Inspired by the Clivelle design */}
              <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.85] tracking-tighter mb-16">
                Smooth <br />
                <span className="text-white">Experiences</span> <br />
                <span className="text-indigo-500 italic relative inline-block">
                  Engage
                  <span className="absolute -top-6 -right-12 text-indigo-400 text-6xl font-light not-italic">*</span>
                </span>
              </h2>

              {/* Testimonial - Clean & Aligned */}
              <div className="max-w-xl relative pl-10 border-l-2 border-indigo-500/40">
                <p className="text-2xl md:text-3xl font-medium text-slate-300 mb-8 leading-tight">
                  "Neptrax delivered beyond expectations. The website feels modern, fast, and truly professional in every way. It changed how clients see our brand."
                </p>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white tracking-tight">Oliver Hayes</span>
                  <span className="text-slate-500 text-sm font-bold tracking-widest uppercase mt-1">CEO at PixelReach Studios</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-5 flex flex-col space-y-8">
            <ScrollReveal direction="left" delay={200} className="relative group flex-grow h-[500px] lg:h-auto">
              {/* Image Container with high-end effects */}
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/30 to-transparent rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative h-full overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl bg-[#1e1e21]">
                <img
                  src="https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=1200"
                  alt="Agency Studio"
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                />
                
                {/* Visual Anchors */}
                <div className="absolute top-10 left-10">
                  <div className="px-5 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Viper Style®</span>
                  </div>
                </div>
                
                <div className="absolute bottom-10 right-10">
                  <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-600/40 group-hover:rotate-12 transition-transform">
                    <Zap className="text-white w-6 h-6 fill-white" />
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </ScrollReveal>

            {/* Stats - Integrated Counter Animations */}
            <div className="grid grid-cols-2 gap-6">
              <ScrollReveal direction="zoom" delay={400}>
                <div className="relative p-10 rounded-[2.5rem] glass-card overflow-hidden group hover:border-indigo-500/40 transition-all duration-500">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="text-5xl md:text-6xl font-black text-indigo-500 mb-2 tabular-nums">
                    <Counter from={0} to={97} suffix="%" />
                  </div>
                  <div className="text-slate-500 font-bold uppercase tracking-[0.25em] text-[10px]">Client Retention</div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="zoom" delay={500}>
                <div className="relative p-10 rounded-[2.5rem] glass-card overflow-hidden group hover:border-violet-500/40 transition-all duration-500">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="text-5xl md:text-6xl font-black text-violet-500 mb-2 tabular-nums">
                    <Counter from={0} to={100} suffix="+" />
                  </div>
                  <div className="text-slate-500 font-bold uppercase tracking-[0.25em] text-[10px]">Projects Delivered</div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Streamline Your Digital Flow - Icon Grid */}
      <div className="py-40 bg-[#1e1e21]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-32">
              <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">Streamline Your <span className="text-indigo-500">Digital Flow</span></h2>
              <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
                Take full control of your digital presence. Simplify content management, collaborate with clarity, and accelerate your business with our intuitive workflows.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {flowFeatures.map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 100}>
                <div className="group flex flex-col items-start p-10 rounded-[3rem] glass-card hover:bg-white/5 transition-all duration-500 border border-white/5 hover:border-indigo-500/30">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-8 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-base">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Services Section - Restored Full Descriptions */}
      <div className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Our Core <span className="text-indigo-500 italic">Expertise</span></h2>
                <p className="text-slate-400 text-xl">We blend artistic vision with technical precision to build digital masterpieces.</p>
              </div>
              <div className="h-px flex-grow bg-white/5 mx-12 hidden lg:block"></div>
              <button className="px-8 py-4 rounded-full border border-white/10 hover:bg-white hover:text-black font-bold transition-all duration-300 shrink-0 uppercase tracking-widest text-xs">
                View All Works
              </button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <div className="group flex flex-col h-full glass-card rounded-[3.5rem] overflow-hidden hover:translate-y-[-10px] transition-all duration-700 border border-white/5 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.3)]">
                  <div className="h-64 overflow-hidden relative">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-indigo-950/20 mix-blend-multiply opacity-60 group-hover:opacity-0 transition-opacity"></div>
                    <div className="absolute top-6 right-6">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                         <feature.icon size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="p-12 flex-grow flex flex-col">
                    <h3 className="text-3xl font-black mb-6 tracking-tight group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-10 flex-grow">{feature.description}</p>
                    <a href="#" className="inline-flex items-center gap-3 text-white font-bold group/link text-sm uppercase tracking-widest">
                      Explore Service <ChevronRight size={18} className="transition-transform group-hover/link:translate-x-2 text-indigo-500" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Why Choose Neptrax? - Restored Content */}
      <div className="py-40 bg-white/[0.02] relative border-y border-white/5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-32">
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Why Choose <span className="text-indigo-500">Neptrax?</span></h2>
              <p className="text-slate-400 text-xl font-bold uppercase tracking-[0.4em] text-[10px]">World-Class Expertise • Professional Execution</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {benefits.map((benefit, i) => (
              <ScrollReveal 
                key={i} 
                direction={i % 2 === 0 ? "right" : "left"} 
                delay={i * 50}
              >
                <div className="group p-12 rounded-[3rem] glass-card border border-white/5 hover:border-indigo-500/40 transition-all duration-500">
                  <div className="flex flex-col gap-6">
                    <div className="w-3 h-12 bg-indigo-500 group-hover:h-16 transition-all rounded-full shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
                    <div>
                      <h4 className="text-2xl font-black mb-4 group-hover:text-indigo-400 transition-colors tracking-tight">{benefit.title}</h4>
                      <p className="text-slate-400 text-base leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Enhanced Outcomes & About Section */}
      <div className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <ScrollReveal direction="up">
              <div className="space-y-10">
                <div className="inline-block px-5 py-2 rounded-full bg-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] border border-indigo-600/30">
                  Impact & Outcomes
                </div>
                <h2 className="text-6xl lg:text-[100px] font-black leading-[0.8] tracking-tighter">
                  Fast <br /><span className="text-gradient">Functional</span> <br />Effective
                </h2>
                <div className="flex gap-6 items-center">
                   <div className="h-px w-24 bg-indigo-500"></div>
                   <p className="text-slate-300 font-bold uppercase tracking-[0.2em] text-sm">Enhanced Outcomes®</p>
                </div>
                <p className="text-slate-400 text-xl leading-relaxed max-w-xl">
                  From responsive design to solid SEO foundations, we elevate and streamline your entire online presence. Our goal is to make your business stand out in a crowded digital landscape.
                </p>
                <div className="pt-8 flex gap-16">
                   <div className="group">
                     <p className="text-5xl font-black text-white group-hover:text-indigo-500 transition-colors">8+</p>
                     <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">Years of Exp.</p>
                   </div>
                   <div className="group">
                     <p className="text-5xl font-black text-white group-hover:text-indigo-500 transition-colors">24/7</p>
                     <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">Expert Support</p>
                   </div>
                   <div className="group">
                     <p className="text-5xl font-black text-white group-hover:text-indigo-500 transition-colors">100%</p>
                     <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">Affordable</p>
                   </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="zoom" delay={300}>
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-tr from-indigo-600/30 via-violet-600/30 to-blue-600/30 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative glass-card rounded-[4rem] p-16 overflow-hidden border border-white/10 group-hover:border-indigo-500/50 transition-all duration-700">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full -translate-x-[-30%] translate-y-[-30%] blur-[80px]"></div>
                  
                  <div className="flex items-center gap-4 mb-12">
                     <h3 className="text-4xl font-black tracking-tighter">About Neptrax</h3>
                     <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
                  </div>
                  
                  <div className="space-y-8 text-slate-300 text-lg leading-relaxed">
                    <p>
                      Based in <span className="text-white font-black underline decoration-indigo-500 underline-offset-8">Chicago</span>, Neptrax designs and develops apps, creates custom websites, improves Google rankings, and manages social media. 
                    </p>
                    <p>
                      With 8+ years of experience, the work stays reliable, affordable, and shaped around your business needs, serving clients across the US and internationally. Whether you're starting out or growing, the process stays simple and smooth.
                    </p>
                  </div>
                  
                  <div className="mt-16 p-8 rounded-[2rem] bg-white text-black flex items-center justify-between group-hover:scale-[1.03] transition-transform duration-500 cursor-pointer shadow-2xl">
                     <span className="font-black text-2xl tracking-tighter uppercase">Work with Us</span>
                     <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                        <ChevronRight size={28} />
                     </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

    </section>
  );
}
