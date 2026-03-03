import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MousePointer2, Activity, Hexagon, CircleDashed } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* --- MICRO-INTERACTIONS --- */
const MagneticButton = ({ children, className, variant = 'primary', onClick }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    const ctx = gsap.context(() => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.2, y: y * 0.2, scale: 1.03, duration: 0.4, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      });
    }, btn);
    return () => ctx.revert();
  }, []);

  const variants = {
    primary: 'bg-[#CC5833] text-[#F2F0E9] hover:bg-[#a64526]',
    secondary: 'bg-transparent text-[#F2F0E9] border border-[#F2F0E9]/30 hover:border-[#F2F0E9]',
    dark: 'bg-[#2E4036] text-[#F2F0E9] hover:bg-[#1f2b24]',
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-full font-heading font-medium transition-colors flex items-center gap-2 will-change-transform ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

/* --- ARTIFACT CARDS --- */
const ShufflerCard = () => {
  const [items, setItems] = useState(['Co-creation Protocol', 'Iterative Alignment', 'Shared Vision Matrix']);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        newArr.unshift(newArr.pop());
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F2F0E9] rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#2E4036]/10 h-64 relative overflow-hidden flex flex-col justify-end">
      <div className="absolute top-8 left-8">
        <h3 className="font-heading font-bold text-[#1A1A1A] text-xl">Symbiotic Partnership</h3>
        <p className="font-data text-xs text-[#2E4036]/60 mt-2 uppercase tracking-widest">Willing to partner</p>
      </div>
      <div className="relative h-24 w-full">
        {items.map((item, i) => (
          <div 
            key={item}
            className="absolute w-full p-3 rounded-xl bg-[#2E4036] text-[#F2F0E9] font-data text-sm flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              top: `${i * 10}px`,
              scale: 1 - (i * 0.05),
              opacity: 1 - (i * 0.3),
              zIndex: 10 - i,
            }}
          >
            <span>{item}</span>
            <Activity size={14} className="text-[#CC5833]" />
          </div>
        ))}
      </div>
    </div>
  );
};

const TypewriterCard = () => {
  const fullText = "Analyzing brand topography... Executing high-fidelity visual systems... Delivering measurable market impact.";
  const [text, setText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        setTimeout(() => { i = 0; setText(""); }, 4000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1A1A1A] rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#CC5833]/20 h-64 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-[#F2F0E9] text-xl">Domain Authority</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse" />
          <span className="font-data text-xs text-[#CC5833] uppercase">Live Feed</span>
        </div>
      </div>
      <p className="font-data text-sm text-[#F2F0E9]/80 leading-relaxed flex-1">
        {text}<span className="inline-block w-2 h-4 bg-[#CC5833] ml-1 animate-pulse" />
      </p>
      <p className="font-data text-xs text-[#F2F0E9]/40 uppercase tracking-widest mt-4 border-t border-[#F2F0E9]/10 pt-4">Industry Experts</p>
    </div>
  );
};

const SchedulerCard = () => {
  const gridRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: 120, y: 40, duration: 1, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }) // click
        .to('.day-cell-active', { backgroundColor: '#CC5833', color: '#F2F0E9', duration: 0.2 }, "-=0.1")
        .to(cursorRef.current, { x: 220, y: 110, duration: 0.8, ease: "power2.inOut", delay: 0.5 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }) // click save
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .to('.day-cell-active', { backgroundColor: 'transparent', color: '#1A1A1A', duration: 0.2 }, "+=0.5");
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#F2F0E9] rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#2E4036]/10 h-64 relative overflow-hidden">
      <h3 className="font-heading font-bold text-[#1A1A1A] text-xl mb-1">Creative Synthesis</h3>
      <p className="font-data text-xs text-[#2E4036]/60 uppercase tracking-widest mb-6">Extremely Creative</p>
      
      <div ref={gridRef} className="relative">
        <div className="flex gap-2 font-data text-xs font-medium text-[#1A1A1A]">
          {['S','M','T','W','T','F','S'].map((day, i) => (
            <div key={i} className={`w-8 h-8 rounded-lg border border-[#2E4036]/10 flex items-center justify-center transition-colors ${i === 3 ? 'day-cell-active' : ''}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <div className="px-4 py-1.5 rounded-full bg-[#2E4036] text-[#F2F0E9] font-heading text-xs">Deploy Sprint</div>
        </div>
        <MousePointer2 ref={cursorRef} className="absolute top-0 left-0 text-[#1A1A1A] fill-[#F2F0E9] w-6 h-6 z-10 drop-shadow-md" style={{ transform: 'translate(-50%, -50%)' }} />
      </div>
    </div>
  );
};

/* --- MAIN APPLICATION --- */
export default function App() {
  const heroRef = useRef(null);
  const philRef = useRef(null);
  const protocolRef = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    // Nav Scroll Logic
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-elem', {
        y: 40, opacity: 0, duration: 1.2,
        stagger: 0.08, ease: 'power3.out', delay: 0.2
      });

      // Philosophy Reveal
      gsap.from('.phil-word', {
        scrollTrigger: { trigger: philRef.current, start: 'top 60%' },
        y: 20, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'power2.out'
      });

      // Protocol Stacking
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
        });
        if (i !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.9, filter: "blur(10px)", opacity: 0.4,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom", end: "top top", scrub: true
            }
          });
        }
      });
      
      // Animations inside Protocol Cards
      gsap.to('.rotate-motif', { rotation: 360, duration: 20, repeat: -1, ease: 'linear' });
      gsap.to('.laser-line', { top: '100%', duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' });

    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="noise-overlay"></div>

      {/* A. NAVBAR */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between gap-12 w-[90%] max-w-4xl
        ${navScrolled ? 'bg-[#F2F0E9]/80 backdrop-blur-xl border border-[#2E4036]/10 shadow-lg text-[#1A1A1A]' : 'bg-transparent text-[#F2F0E9]'}`}>
        <span className="font-heading font-bold text-lg tracking-tight">Hample Design House</span>
        <div className="hidden md:flex items-center gap-8 font-data text-sm">
          <a href="#expertise" className="hover:-translate-y-[1px] transition-transform">Expertise</a>
          <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Philosophy</a>
          <a href="#work" className="hover:-translate-y-[1px] transition-transform">Work</a>
        </div>
        <MagneticButton variant={navScrolled ? 'primary' : 'secondary'} className="text-sm py-2 px-4">
          Reach Out <ArrowUpRight size={16} />
        </MagneticButton>
      </nav>

      {/* B. HERO */}
      <section ref={heroRef} className="relative h-[100dvh] w-full bg-[#2E4036] flex items-end pb-24 px-8 md:px-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618365908648-e71bf8c187be?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent"></div>
        
        <div className="relative z-10 max-w-5xl">
          <p className="hero-elem font-data text-[#CC5833] text-sm md:text-base mb-6 uppercase tracking-widest flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#CC5833]"></span> A Digital Web & Graphic Company
          </p>
          <h1 className="text-[#F2F0E9] leading-[0.9]">
            <span className="hero-elem block font-heading font-bold text-5xl md:text-7xl mb-2">Digital presence is the</span>
            <span className="hero-elem block font-drama italic text-8xl md:text-[11rem] text-[#CC5833] pr-8">Catalyst.</span>
          </h1>
          <div className="hero-elem mt-12 flex flex-wrap gap-4">
            <MagneticButton variant="primary">Fill Out Form</MagneticButton>
            <MagneticButton variant="secondary">View Work</MagneticButton>
          </div>
        </div>
      </section>

      {/* C. FEATURES (Artifacts) */}
      <section id="expertise" className="py-32 px-8 md:px-16 bg-[#F2F0E9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <ShufflerCard />
          <TypewriterCard />
          <SchedulerCard />
        </div>
      </section>

      {/* D. PHILOSOPHY */}
      <section id="philosophy" ref={philRef} className="relative py-40 px-8 md:px-16 bg-[#1A1A1A] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-fixed opacity-10"></div>
        <div className="relative z-10 max-w-4xl">
          <p className="font-heading text-[#F2F0E9]/60 text-xl md:text-2xl mb-8 flex flex-wrap justify-center gap-1">
            { "Most agencies focus on: rigid templates and transactional output.".split(" ").map((word, i) => <span key={i} className="phil-word inline-block">{word}</span>) }
          </p>
          <h2 className="font-drama italic text-5xl md:text-8xl text-[#F2F0E9] leading-tight flex flex-wrap justify-center gap-x-4 gap-y-2">
            { "We focus on: organic growth and lasting ".split(" ").map((word, i) => <span key={i} className="phil-word inline-block">{word}</span>) }
            <span className="phil-word text-[#CC5833]">partnerships.</span>
          </h2>
        </div>
      </section>

      {/* E. PROTOCOL (Stacking Archive) */}
      <section id="protocol" className="bg-[#2E4036] relative">
        {/* Card 1 */}
        <div className="protocol-card h-screen w-full bg-[#2E4036] sticky top-0 flex items-center px-8 md:px-24 border-b border-[#F2F0E9]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl mx-auto items-center">
            <div>
              <span className="font-data text-[#CC5833] text-6xl">01</span>
              <h2 className="font-heading font-bold text-5xl text-[#F2F0E9] mt-6 mb-4">Discovery & Synthesis</h2>
              <p className="font-data text-[#F2F0E9]/70 text-lg">We map your brand's DNA, identifying the organic core of your visual identity and web architecture.</p>
            </div>
            <div className="flex justify-center">
              <Hexagon className="rotate-motif text-[#F2F0E9]/20 w-64 h-64" strokeWidth={0.5} />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="protocol-card h-screen w-full bg-[#1F2B24] sticky top-0 flex items-center px-8 md:px-24 border-b border-[#F2F0E9]/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl mx-auto items-center">
            <div>
              <span className="font-data text-[#CC5833] text-6xl">02</span>
              <h2 className="font-heading font-bold text-5xl text-[#F2F0E9] mt-6 mb-4">High-Fidelity Execution</h2>
              <p className="font-data text-[#F2F0E9]/70 text-lg">Translating strategy into pixel-perfect precision. Every interface, graphic, and interaction is meticulously crafted.</p>
            </div>
            <div className="relative w-full h-64 bg-grid border border-[#F2F0E9]/10 rounded-[2rem] overflow-hidden">
              <div className="laser-line absolute left-0 w-full h-[2px] bg-[#CC5833] shadow-[0_0_15px_#CC5833]"></div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="protocol-card h-screen w-full bg-[#151D18] sticky top-0 flex items-center px-8 md:px-24 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl mx-auto items-center">
            <div>
              <span className="font-data text-[#CC5833] text-6xl">03</span>
              <h2 className="font-heading font-bold text-5xl text-[#F2F0E9] mt-6 mb-4">Launch & Evolution</h2>
              <p className="font-data text-[#F2F0E9]/70 text-lg">Deploying the ecosystem to the market. We remain engaged to analyze data and refine the organism.</p>
            </div>
            <div className="flex justify-center">
              <CircleDashed className="text-[#CC5833] w-64 h-64 animate-pulse" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* F. MEMBERSHIP / GET STARTED */}
      <section className="py-32 px-8 md:px-16 bg-[#F2F0E9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading font-bold text-4xl text-[#1A1A1A] mb-4">Engagement Models</h2>
            <p className="font-data text-[#2E4036]/70">Select the partnership protocol that fits your scale.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Tier 1 */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-[#2E4036]/10">
              <h3 className="font-heading font-bold text-2xl mb-2">Project Sprint</h3>
              <p className="font-data text-sm text-[#1A1A1A]/60 mb-8">For distinct visual identity or targeted web builds.</p>
              <MagneticButton variant="dark" className="w-full justify-center">Inquire</MagneticButton>
            </div>

            {/* Tier 2 (Pops) */}
            <div className="bg-[#2E4036] rounded-[3rem] p-12 shadow-xl ring-4 ring-[#CC5833]/20 relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#CC5833] text-[#F2F0E9] font-data text-xs px-4 py-1 rounded-full uppercase tracking-widest">Recommended</div>
              <h3 className="font-heading font-bold text-3xl text-[#F2F0E9] mb-2">Retainer Protocol</h3>
              <p className="font-data text-sm text-[#F2F0E9]/60 mb-8">Continuous design and engineering partnership.</p>
              <MagneticButton variant="primary" className="w-full justify-center text-lg py-4">Reach Out</MagneticButton>
            </div>

            {/* Tier 3 */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-[#2E4036]/10">
              <h3 className="font-heading font-bold text-2xl mb-2">Enterprise</h3>
              <p className="font-data text-sm text-[#1A1A1A]/60 mb-8">Full-scale digital transformation and system architecture.</p>
              <MagneticButton variant="dark" className="w-full justify-center">Book Consultation</MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* G. FOOTER */}
      <footer className="bg-[#1A1A1A] rounded-t-[4rem] pt-24 pb-12 px-8 md:px-16 mt-[-4rem] relative z-20 text-[#F2F0E9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <h2 className="font-heading font-bold text-3xl mb-4">Hample Design House</h2>
            <p className="font-data text-sm text-[#F2F0E9]/50 max-w-sm">A digital web and graphic company building clinical, avant-garde digital ecosystems.</p>
          </div>
          <div>
            <h4 className="font-data text-xs text-[#CC5833] uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-3 font-heading text-[#F2F0E9]/80">
              <li><a href="#expertise" className="hover:text-[#F2F0E9] transition-colors">Expertise</a></li>
              <li><a href="#philosophy" className="hover:text-[#F2F0E9] transition-colors">Philosophy</a></li>
              <li><a href="#protocol" className="hover:text-[#F2F0E9] transition-colors">Protocol</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-data text-xs text-[#CC5833] uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-3 font-heading text-[#F2F0E9]/80">
              <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">Dribbble</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-[#F2F0E9]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-data text-xs text-[#F2F0E9]/40">© {new Date().getFullYear()} Hample Design House. All rights reserved.</p>
          <div className="flex items-center gap-3 bg-[#F2F0E9]/5 px-4 py-2 rounded-full border border-[#F2F0E9]/10">
            <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse"></div>
            <span className="font-data text-xs text-[#F2F0E9]/80 uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
