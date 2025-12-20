
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
  ChevronRight,
  Quote
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

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
      description: 'Every business needs a solid foundation online. We build professional, easy-to-navigate websites that clearly showcase what you offer, making it simple for customers to understand your value.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: User,
      title: 'Personal Portfolio',
      description: 'Your work is your story. Don’t just list it—Present it. We create stunning portfolios that capture your unique style and build a personal brand that makes you impossible to forget.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: Search,
      title: 'On-Page SEO',
      description: 'What good is a beautiful website if no one can find it? We meticulously optimize every page from content to code to rank higher on Google, helping you attract the right customers.',
      image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: TrendingUp,
      title: 'SEO Strategy',
      description: 'Feeling lost in search results? We provide deep-dive analysis of your current site and competitors, delivering a clear roadmap to climb rankings and dominate your niche.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: Megaphone,
      title: 'Marketing Website',
      description: 'Stop letting visitors leave empty-handed. We design high-converting landing pages and sales funnels focused on a single goal: turning viewers into leads and customers.',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: Globe,
      title: 'Brand Endorsement',
      description: 'Your digital presence is your handshake. We build websites that go beyond looks, creating a genuine connection by authentically communicating your values and building trust.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const benefits = [
    { title: 'Local Expertise', description: 'Leverage our deep, country-wide expertise to drive growth across the United States.' },
    { title: 'Proven Results', description: 'We deliver measurable success in digital traffic, qualified leads, and revenue growth.' },
    { title: 'Tailored Strategy', description: 'Get a custom digital strategy designed to solve your unique business challenges.' },
    { title: 'Dedicated Partnership', description: 'Stay informed and in control with transparent communication every step of the way.' },
    { title: 'Smart Investment', description: 'Achieve outstanding digital quality and results without stretching your budget.' },
    { title: 'Digital Transformation', description: 'Integrated solutions from web development to full social media management.' },
  ];

  const flowFeatures = [
    { icon: Beaker, title: "Project Mapping", desc: "Break down complex projects into clear, actionable tasks for a seamless workflow." },
    { icon: Archive, title: "Intelligent Progress", desc: "Automatically file away completed milestones maintaining a focused workspace." },
    { icon: PackageCheck, title: "Deployment Ready", desc: "Receive final deliverables that are ready for instant global implementation." },
    { icon: Focus, title: "Project Lens", desc: "Customize your view to highlight immediate priorities and filter out irrelevant noise." },
    { icon: MessagesSquare, title: "Team Dialogue", desc: "Embed discussions and feedback within specific tasks to enhance collaboration." },
    { icon: ClipboardList, title: "Faster Delivery", desc: "Use structured templates to accelerate delivery while maintaining high standards." }
  ];

  return (
    <section className="bg-[#28282B] text-white overflow-hidden">
      
      {/* 1. Hero / Projects Showcase Section */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="right" duration={0.8}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/3] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000"
                  alt="Modern Office"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#28282B]/60 to-transparent"></div>
              </div>
            </div>
          </ScrollReveal>

<div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
  {/* Content section - now on LEFT */}
  <div className="flex-1">
    <div className="flex flex-col space-y-8">
      <ScrollReveal direction="left">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Providing Smooth Client Experiences
        </h2>
      </ScrollReveal>

      <ScrollReveal direction="bottom" delay={200}>
        <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
          {/* Smooth fade-in gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/5 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
          
          <p className="text-xl md:text-2xl font-medium italic text-slate-200 mb-6 leading-relaxed relative z-10 transform transition-all duration-500 ease-out hover:scale-[1.02]">
            "Neptrax delivered beyond expectations. The website feels modern, fast, and truly professional. It changed how clients see our brand."
          </p>
          <div className="flex items-center gap-4 relative z-10">
            <div>
              <h4 className="font-bold text-lg">Oliver Hayes</h4>
              <p className="text-slate-400 text-sm font-medium">CEO at PixelReach Studios</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* PLACEMENT RESTORED: Stats Section inside the grid */}
      <div className="grid grid-cols-2 gap-6 pt-4">
        <ScrollReveal direction="zoom" delay={400}>
          <div className="relative p-6 rounded-2xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
            {/* Slick Card Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl" />
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
            
            {/* Floating accent elements */}
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-indigo-600/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700 ease-out" />
            <div className="absolute left-4 bottom-4 w-12 h-12 bg-indigo-400/5 rounded-full blur-xl group-hover:scale-125 transition-all duration-700 ease-out delay-100" />
            
            <div className="relative z-10">
              <div className="text-4xl md:text-5xl font-black text-indigo-500 mb-1 transform transition-all duration-500 group-hover:scale-105">
                <Counter from={0} to={97} suffix="%" />
              </div>
              <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Client Retention</div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="zoom" delay={500}>
          <div className="relative p-6 rounded-2xl overflow-hidden group hover:border-violet-500/30 transition-all duration-500">
            {/* Slick Card Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl" />
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
            
            {/* Floating accent elements */}
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-violet-600/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700 ease-out" />
            <div className="absolute left-4 bottom-4 w-12 h-12 bg-violet-400/5 rounded-full blur-xl group-hover:scale-125 transition-all duration-700 ease-out delay-100" />
            
            <div className="relative z-10">
              <div className="text-4xl md:text-5xl font-black text-violet-500 mb-1 transform transition-all duration-500 group-hover:scale-105">
                <Counter from={0} to={100} suffix="+" />
              </div>
              <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Global Projects</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>

  {/* Image section - now on RIGHT */}
  <div className="flex-1">
    {/* Your existing image component goes here */}
    {/* This stays exactly as it was, just positioned on the right */}
  </div>
</div>
</div>

      {/* 2. Streamline Your Digital Flow (6 features) */}
      <div className="py-32 bg-[#1e1e21]/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Streamline Your <span className="text-indigo-400">Digital Flow</span></h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Take full control of your digital presence with tools designed for speed, clarity, and precision.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flowFeatures.map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 100}>
                <div className="group p-8 rounded-3xl glass-card hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-indigo-500/30">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Services / Offerings Section */}
      <div className="bg-[#1e1e21] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Premium <span className="text-indigo-400">Expertise</span></h2>
              <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <div className="group h-full flex flex-col glass-card rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)]">
                  <div className="h-48 overflow-hidden relative">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Zap className="text-white w-10 h-10" />
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
                        <feature.icon size={20} />
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{feature.description}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-indigo-400 font-bold group/link">
                      Learn More <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Why Choose Neptrax? */}
      <div className="py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Neptrax?</h2>
              <p className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-xs">Global Standards • Fast Execution</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <ScrollReveal 
                key={i} 
                direction={i % 2 === 0 ? "right" : "left"} 
                delay={i * 50}
              >
                <div className="p-8 rounded-2xl glass-card border border-white/5 hover:border-indigo-500/40 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-8 bg-indigo-500 group-hover:h-12 transition-all rounded-full shrink-0"></div>
                    <div>
                      <h4 className="text-lg font-bold mb-2 group-hover:text-indigo-300 transition-colors">{benefit.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Enhanced Outcomes & Chicago Office Section */}
      <div className="py-32 bg-white/5 rounded-[4rem] mx-6 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="up">
              <div className="space-y-8">
                <div className="inline-block px-4 py-1 rounded-full bg-indigo-600/20 text-indigo-400 text-xs font-black uppercase tracking-widest border border-indigo-600/30">
                  Impact Focus
                </div>
                <h2 className="text-5xl lg:text-7xl font-black leading-none">Enhanced <br /><span className="text-gradient">Outcomes</span></h2>
                <div className="flex gap-4 items-center">
                   <div className="h-px w-20 bg-indigo-500"></div>
                   <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Fast • Functional • Effective</p>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                  From responsive design to solid SEO foundations, we elevate and streamline your entire online presence. Our goal is to make your business stand out in a crowded digital landscape.
                </p>
                <div className="pt-4 flex gap-12">
                   <div>
                     <p className="text-3xl font-bold text-white">8+</p>
                     <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Years Exp.</p>
                   </div>
                   <div>
                     <p className="text-3xl font-bold text-white">24/7</p>
                     <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Support</p>
                   </div>
                   <div>
                     <p className="text-3xl font-bold text-white">100%</p>
                     <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Dedication</p>
                   </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="zoom" delay={300}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600/30 via-violet-600/30 to-blue-600/30 blur-2xl opacity-50"></div>
                <div className="relative glass-card rounded-[3rem] p-12 overflow-hidden border border-white/10 group-hover:border-indigo-500/50 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/10 rounded-full -translate-x-[-20%] translate-y-[-20%] blur-3xl"></div>
                  <h3 className="text-3xl font-bold mb-6">About Neptrax</h3>
                  <div className="space-y-6 text-slate-300 leading-relaxed">
                    <p>
                      Based in <span className="text-white font-bold">Chicago</span>, Neptrax designs and develops apps, creates custom websites, improves Google rankings, and manages social media. 
                    </p>
                    <p>
                      With 8+ years of experience, our work stays reliable, affordable, and shaped around your business needs, serving clients across the US and internationally.
                    </p>
                  </div>
                  <div className="mt-10 p-6 rounded-2xl bg-indigo-600 flex items-center justify-between group-hover:scale-[1.02] transition-transform duration-500 cursor-pointer shadow-xl shadow-indigo-600/20">
                     <span className="font-bold text-lg">Work with Us</span>
                     <ChevronRight size={24} />
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
