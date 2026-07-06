import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, Heart, Users, Globe, BookOpen, Zap,
  Briefcase, Leaf, Building2, HandHeart, DollarSign, ChevronDown,
  Search, Calendar, MapPin, Phone, Mail, Facebook, Twitter,
  Instagram, Youtube, Linkedin, Star, Quote, Award, Target,
  CheckCircle, Clock, GraduationCap, Laptop, TrendingUp,
  Eye, Play, Send, Filter
} from "lucide-react";

type Page = "home" | "about" | "programs" | "impact" | "events" | "gallery" | "testimonials" | "blog" | "faq" | "contact";

// ─── Animated Counter Card ────────────────────────────────────────────────────
function CounterCard({ target, suffix = "", label, color, bg }: {
  target: number; suffix?: string; label: string; color: string; bg: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const step = target / (2000 / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 16);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className={`text-center p-8 rounded-3xl ${bg} group hover:-translate-y-1 transition-all duration-300 cursor-default`}>
      <div className={`text-5xl font-bold mb-2 font-['Poppins'] ${color} group-hover:scale-110 transition-transform duration-300 inline-block`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 font-medium text-sm mt-1">{label}</div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ currentPage, setPage }: { currentPage: Page; setPage: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems: { label: string; page: Page }[] = [
    { label: "Home", page: "home" }, { label: "About", page: "about" },
    { label: "Programs", page: "programs" }, { label: "Impact", page: "impact" },
    { label: "Events", page: "events" }, { label: "Gallery", page: "gallery" },
    { label: "Blog", page: "blog" }, { label: "Contact", page: "contact" },
  ];

  const navigate = (p: Page) => {
    setPage(p); setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "backdrop-blur-2xl bg-white/85 shadow-sm shadow-gray-900/5 border-b border-gray-100/60" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <button onClick={() => navigate("home")} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-['Poppins'] font-bold text-xl text-gray-900 tracking-tight">
            In<span className="text-[#2563EB]">Amigos</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map(({ label, page }) => (
            <button key={page} onClick={() => navigate(page)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentPage === page
                  ? "bg-[#2563EB]/10 text-[#2563EB] font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate("contact")}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-200">
            Join Us <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 backdrop-blur-2xl bg-white/97">
          <div className="px-6 py-4 space-y-1">
            {navItems.map(({ label, page }) => (
              <button key={page} onClick={() => navigate(page)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === page ? "bg-[#2563EB]/10 text-[#2563EB] font-semibold" : "text-gray-700 hover:bg-gray-50"
                }`}>
                {label}
              </button>
            ))}
            <button onClick={() => navigate("contact")}
              className="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-semibold text-center">
              Join Us →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const navigate = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-['Poppins'] font-bold text-xl tracking-tight">InAmigos</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering youth and inspiring change through education, digital skills, and community development across India.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#2563EB] flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <Icon className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-['Poppins'] font-semibold mb-5 text-sm uppercase tracking-wider text-gray-300">Quick Links</h4>
            <ul className="space-y-3">
              {(["home", "about", "programs", "impact", "events", "gallery", "blog"] as Page[]).map((page) => (
                <li key={page}>
                  <button onClick={() => navigate(page)}
                    className="text-gray-400 text-sm hover:text-white capitalize transition-colors">
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-['Poppins'] font-semibold mb-5 text-sm uppercase tracking-wider text-gray-300">Programs</h4>
            <ul className="space-y-3">
              {["Education Support", "Digital Skills", "Entrepreneurship", "Plantation Drives", "Community Dev", "Volunteering", "Fundraising"].map((p) => (
                <li key={p}>
                  <button onClick={() => navigate("programs")} className="text-gray-400 text-sm hover:text-white transition-colors text-left">
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-['Poppins'] font-semibold mb-5 text-sm uppercase tracking-wider text-gray-300">Contact</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#2563EB]" />
                <span>12, Social Impact Hub, Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#2563EB]" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#2563EB]" />
                hello@inamigos.org
              </li>
            </ul>
            <p className="text-xs text-gray-500 mb-2 font-medium">Newsletter</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email"
                className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 outline-none focus:border-[#2563EB]/50 transition-colors" />
              <button className="px-3 py-2.5 rounded-xl bg-[#2563EB] text-sm font-medium hover:opacity-90 transition-opacity">→</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2025 InAmigos Foundation. All rights reserved. Reg. No. MH/2015/0089124</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
              <button key={link} className="text-gray-500 text-sm hover:text-white transition-colors">{link}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const navigate = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const programs = [
    { icon: BookOpen, title: "Education Support", desc: "Scholarships, tutoring, and learning resources for underprivileged students from grades 6–12.", gradFrom: "from-blue-50", gradTo: "to-blue-100/40", iconBg: "bg-[#2563EB]/10", iconColor: "text-[#2563EB]" },
    { icon: Laptop, title: "Digital Skills", desc: "Intensive coding bootcamps, digital literacy, and tech career pathways for urban and rural youth.", gradFrom: "from-purple-50", gradTo: "to-purple-100/40", iconBg: "bg-[#7C3AED]/10", iconColor: "text-[#7C3AED]" },
    { icon: TrendingUp, title: "Entrepreneurship", desc: "End-to-end business incubation — from ideation workshops to seed funding up to ₹1 lakh.", gradFrom: "from-teal-50", gradTo: "to-teal-100/40", iconBg: "bg-[#14B8A6]/10", iconColor: "text-[#14B8A6]" },
  ];

  const testimonials = [
    { name: "Priya Sharma", role: "Software Engineer, Bangalore", img: "photo-1494790108377-be9c29b29330", quote: "InAmigos gave me access to coding education I could never afford. Today I work at a leading tech startup — they changed my life's trajectory completely." },
    { name: "Arjun Mehta", role: "Volunteer & Program Mentor", img: "photo-1507003211169-0a1dd7228f2d", quote: "Volunteering here showed me that small, consistent actions create massive ripples. Our plantation drives have grown into a city-wide movement." },
    { name: "Dr. Anita Patel", role: "Partner NGO Director", img: "photo-1487412720507-e7ab37603c6f", quote: "InAmigos is one of the most transparent and impact-driven organizations I've collaborated with in 20 years of the development sector." },
  ];

  const events = [
    { title: "Annual Youth Summit 2025", date: "Mar 15, 2025", location: "Mumbai, India", category: "Conference", img: "photo-1540575467063-178a50c2df87" },
    { title: "Digital Literacy Workshop", date: "Mar 22, 2025", location: "Delhi, India", category: "Workshop", img: "photo-1531482615713-2afd69097998" },
    { title: "Green Earth Plantation Drive", date: "Apr 5, 2025", location: "Pune, India", category: "Community", img: "photo-1466692476868-aef1dfb1e735" },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-purple-50/60" />
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/8 border border-[#2563EB]/15 text-[#2563EB] text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              Empowering Communities Since 2015
            </div>
            <h1 className="font-['Poppins'] text-5xl xl:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6">
              Empowering Youth.{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                Inspiring Change.
              </span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl">
              InAmigos Foundation bridges the gap between potential and opportunity — nurturing the next generation of leaders through education, digital skills, and community-driven programs.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate("contact")}
                className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold text-lg hover:opacity-90 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
                Join Our Mission
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate("programs")}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur text-gray-700 font-semibold text-lg hover:border-[#2563EB]/30 hover:text-[#2563EB] hover:scale-105 transition-all duration-300">
                Explore Programs
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/15 ring-1 ring-white/60">
              <img
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=620&fit=crop&auto=format"
                alt="Youth empowerment and education"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 backdrop-blur-2xl bg-white/90 border border-white/80 rounded-2xl p-4 shadow-xl shadow-blue-900/8">
              <div className="font-['Poppins'] text-2xl font-bold text-[#2563EB]">15,000+</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">Students Impacted</div>
            </div>
            <div className="absolute -top-6 -right-6 backdrop-blur-2xl bg-white/90 border border-white/80 rounded-2xl p-4 shadow-xl shadow-purple-900/8">
              <div className="font-['Poppins'] text-2xl font-bold text-[#7C3AED]">120+</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">Cities Reached</div>
            </div>
            <div className="absolute top-1/2 -right-4 backdrop-blur-2xl bg-white/90 border border-white/80 rounded-2xl p-4 shadow-xl">
              <div className="font-['Poppins'] text-2xl font-bold text-[#14B8A6]">500K+</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">Trees Planted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <CounterCard target={15000} suffix="+" label="Students Impacted" color="text-[#2563EB]" bg="bg-blue-50" />
          <CounterCard target={2500} suffix="+" label="Active Volunteers" color="text-[#7C3AED]" bg="bg-purple-50" />
          <CounterCard target={48} suffix="" label="Programs Running" color="text-[#14B8A6]" bg="bg-teal-50" />
          <CounterCard target={120} suffix="+" label="Cities Reached" color="text-orange-500" bg="bg-orange-50" />
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 border-y border-gray-100 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-10">
            Trusted Partners & Supporters
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16">
            {["UNICEF", "UNESCO", "UNDP", "Gates Foundation", "Tata Trusts", "Infosys CSR", "NASSCOM"].map((p) => (
              <span key={p} className="text-gray-300 font-bold text-lg lg:text-xl hover:text-gray-600 transition-colors cursor-default select-none">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-[0.15em]">What We Do</span>
            <h2 className="font-['Poppins'] text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-5 tracking-tight">
              Programs That Transform Lives
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Comprehensive, community-centered programs designed to unlock human potential and build resilient futures.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map(({ icon: Icon, title, desc, gradFrom, gradTo, iconBg, iconColor }) => (
              <div key={title} className={`group p-8 rounded-3xl bg-gradient-to-br ${gradFrom} ${gradTo} border border-white hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-2 transition-all duration-300 cursor-pointer`}>
                <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="font-['Poppins'] text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
                <div className={`mt-5 flex items-center gap-1.5 ${iconColor} text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate("programs")}
              className="px-8 py-3.5 rounded-2xl border-2 border-[#2563EB]/20 text-[#2563EB] font-semibold hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              View All 7 Programs →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-gradient-to-br from-[#2563EB] via-[#4338CA] to-[#7C3AED] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Poppins'] text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">Stories That Inspire</h2>
            <p className="text-blue-200 text-lg">Real impact, real people.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, img, quote }) => (
              <div key={name} className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-3xl p-8 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <Quote className="w-8 h-8 text-white/25 mb-4" />
                <p className="text-white/90 leading-relaxed mb-6 text-sm">{quote}</p>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <div className="flex items-center gap-3">
                  <img src={`https://images.unsplash.com/${img}?w=48&h=48&fit=crop&auto=format`} alt={name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20" />
                  <div>
                    <div className="text-white font-semibold text-sm">{name}</div>
                    <div className="text-blue-200 text-xs mt-0.5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate("testimonials")}
              className="px-8 py-3.5 rounded-2xl border-2 border-white/25 text-white font-semibold hover:bg-white/10 transition-all duration-300">
              Read All Stories →
            </button>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12">
            <div>
              <span className="text-[#14B8A6] font-semibold text-sm uppercase tracking-[0.15em]">Upcoming</span>
              <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 mt-2 tracking-tight">Latest Events</h2>
            </div>
            <button onClick={() => navigate("events")}
              className="mt-4 lg:mt-0 text-[#2563EB] font-semibold flex items-center gap-1.5 hover:gap-3 transition-all duration-200">
              View All Events <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map(({ title, date, location, category, img }) => (
              <div key={title} className="group rounded-3xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img src={`https://images.unsplash.com/${img}?w=400&h=250&fit=crop&auto=format`} alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-700">
                    {category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-['Poppins'] font-bold text-gray-900 text-lg mb-3 leading-tight">{title}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2"><Calendar className="w-4 h-4" />{date}</div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-5"><MapPin className="w-4 h-4" />{location}</div>
                  <button className="w-full py-2.5 rounded-xl border-2 border-[#2563EB]/15 text-[#2563EB] text-sm font-semibold hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all duration-200">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-br from-[#F8FAFC] via-blue-50/40 to-purple-50/30">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-['Poppins'] text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Stay in the Loop</h2>
          <p className="text-gray-500 mb-8 text-lg">Monthly updates on programs, events, and impact stories — delivered to your inbox.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/10 transition-all" />
            <button className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold text-sm hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25 transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  const navigate = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const values = [
    { icon: Heart, title: "Compassion", desc: "Every program begins with empathy for the people we serve.", color: "text-red-500", bg: "bg-red-50" },
    { icon: Target, title: "Impact-First", desc: "We measure success by outcomes — real, measurable change in real lives.", color: "text-[#2563EB]", bg: "bg-blue-50" },
    { icon: Users, title: "Inclusivity", desc: "Equal access and opportunity for every young person, regardless of background.", color: "text-[#7C3AED]", bg: "bg-purple-50" },
    { icon: Globe, title: "Community", desc: "Sustainable change happens from within communities, not imposed from outside.", color: "text-[#14B8A6]", bg: "bg-teal-50" },
    { icon: CheckCircle, title: "Transparency", desc: "Full accountability to donors, partners, and the communities we serve.", color: "text-green-600", bg: "bg-green-50" },
    { icon: Zap, title: "Innovation", desc: "Constantly evolving our methods to maximize reach and effectiveness.", color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const timeline = [
    { year: "2015", title: "Foundation Established", desc: "InAmigos was born in a small Mumbai apartment with 5 volunteers and a shared vision to change lives." },
    { year: "2017", title: "First 1,000 Students", desc: "Reached our first milestone — 1,000 students enrolled across 3 cities with 12 active volunteers." },
    { year: "2019", title: "Digital Skills Launch", desc: "Partnered with tech companies to launch our flagship coding bootcamp program in 8 cities." },
    { year: "2021", title: "National Recognition", desc: "Awarded the National CSR Award for Outstanding Youth Development by the Ministry of Corporate Affairs." },
    { year: "2023", title: "Pan-India Expansion", desc: "Expanded to 120+ cities across 22 states with 48 active programs and 2,500+ volunteers." },
    { year: "2025", title: "15,000 Lives Changed", desc: "Celebrating 10 years of impact with our largest-ever Annual Youth Summit and global partnerships." },
  ];

  const team = [
    { name: "Rahul Verma", role: "Founder & CEO", img: "photo-1472099645785-5658abf4ff4e" },
    { name: "Priya Nair", role: "Director of Programs", img: "photo-1494790108377-be9c29b29330" },
    { name: "Arjun Singh", role: "Head of Technology", img: "photo-1507003211169-0a1dd7228f2d" },
    { name: "Meera Joshi", role: "Community Relations", img: "photo-1438761681033-6461ffad8d80" },
    { name: "Dev Patel", role: "Finance & Operations", img: "photo-1500648767791-00dcc994a43e" },
    { name: "Sanya Gupta", role: "Volunteer Coordinator", img: "photo-1534528741775-53994a69daeb" },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-[#F8FAFC] to-[#7C3AED]/5" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-[0.15em]">Our Story</span>
            <h1 className="font-['Poppins'] text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">
              A Decade of<br />Purpose & Impact
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              InAmigos Foundation was born from a simple belief: that every young person, regardless of background, deserves a fair shot at a meaningful life. For 10 years, we've been turning that belief into action — one student, one community, one city at a time.
            </p>
            <div className="flex gap-4">
              <button onClick={() => navigate("impact")}
                className="px-6 py-3 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all">
                See Our Impact
              </button>
              <button onClick={() => navigate("contact")}
                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-[#2563EB]/30 hover:text-[#2563EB] transition-all">
                Work With Us
              </button>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px]">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=500&fit=crop&auto=format"
              alt="InAmigos team" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2563EB]/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#4338CA] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-['Poppins'] text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-blue-100 leading-relaxed text-lg">
              To empower underprivileged youth through holistic education, digital skills, and community-driven programs — creating a generation of confident, capable, and compassionate leaders who drive sustainable change.
            </p>
          </div>
          <div className="p-10 rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-['Poppins'] text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-purple-100 leading-relaxed text-lg">
              An India where every young person has equal access to quality education, skill development, and entrepreneurial opportunity — where potential, not privilege, determines one's future.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#14B8A6] font-semibold text-sm uppercase tracking-[0.15em]">What Drives Us</span>
            <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 mt-3 tracking-tight">Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-['Poppins'] font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-[0.15em]">Our Journey</span>
            <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 mt-3 tracking-tight">Milestones That Matter</h2>
          </div>
          <div className="space-y-8">
            {timeline.map(({ year, title, desc }, i) => (
              <div key={year} className={`flex gap-6 items-start ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <div className="flex-1">
                  <div className={`p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${i % 2 !== 0 ? "text-right" : ""}`}>
                    <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest mb-2 block">{year}</span>
                    <h3 className="font-['Poppins'] font-bold text-gray-900 mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
                <div className="w-12 flex-shrink-0 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] ring-4 ring-white shadow-md mt-6" />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-[#2563EB]/30 to-[#7C3AED]/30 mt-2 h-16" />}
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#7C3AED] font-semibold text-sm uppercase tracking-[0.15em]">The People</span>
            <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 mt-3 tracking-tight">Meet Our Team</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Passionate individuals united by purpose — building a better tomorrow, one community at a time.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map(({ name, role, img }) => (
              <div key={name} className="group text-center p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <img src={`https://images.unsplash.com/${img}?w=120&h=120&fit=crop&auto=format`} alt={name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto mb-5 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-['Poppins'] font-bold text-gray-900">{name}</h3>
                <p className="text-[#2563EB] text-sm font-medium mt-1">{role}</p>
                <div className="flex justify-center gap-2 mt-4">
                  {[Linkedin, Twitter].map((Icon, i) => (
                    <button key={i} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-[#2563EB] flex items-center justify-center transition-colors group/icon">
                      <Icon className="w-3.5 h-3.5 text-gray-400 group-hover/icon:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <CounterCard target={10} suffix=" Yrs" label="Years of Service" color="text-gray-800" bg="bg-gray-100" />
          <CounterCard target={15000} suffix="+" label="Lives Changed" color="text-[#2563EB]" bg="bg-blue-50" />
          <CounterCard target={87} suffix="%" label="Direct Program Spend" color="text-green-600" bg="bg-green-50" />
          <CounterCard target={42} suffix="" label="Awards Received" color="text-[#7C3AED]" bg="bg-purple-50" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-['Poppins'] text-4xl font-bold text-white mb-4 tracking-tight">Join Our Mission</h2>
          <p className="text-blue-100 text-lg mb-10">Whether as a volunteer, donor, or partner — there is always a place for you in our community.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("contact")}
              className="px-8 py-4 rounded-2xl bg-white text-[#2563EB] font-semibold text-lg hover:bg-blue-50 hover:scale-105 transition-all">
              Get Involved Today
            </button>
            <button onClick={() => navigate("programs")}
              className="px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all">
              View Our Programs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PROGRAMS PAGE ────────────────────────────────────────────────────────────
function ProgramsPage({ setPage }: { setPage: (p: Page) => void }) {
  const navigate = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const programs = [
    {
      icon: GraduationCap, title: "Education Support", tag: "Flagship Program",
      desc: "Comprehensive scholarships, tutoring sessions, and learning resources for underprivileged students from grades 6–12. Includes mentoring, study materials, and career counseling.",
      features: ["1,200+ active scholarships", "Free textbooks & materials", "Weekly tutoring sessions", "Career guidance & counseling"],
      gradFrom: "from-blue-50", gradTo: "to-blue-100/40", iconBg: "bg-[#2563EB]/10", iconColor: "text-[#2563EB]", tagBg: "bg-[#2563EB]/10 text-[#2563EB]",
    },
    {
      icon: Laptop, title: "Digital Skills", tag: "High Impact",
      desc: "8-week intensive coding bootcamps covering web development, mobile apps, and data science. Includes device support, internet access, and job placement assistance post-completion.",
      features: ["8-week intensive bootcamps", "Industry mentors & guides", "Job placement support", "Devices provided where needed"],
      gradFrom: "from-purple-50", gradTo: "to-purple-100/40", iconBg: "bg-[#7C3AED]/10", iconColor: "text-[#7C3AED]", tagBg: "bg-[#7C3AED]/10 text-[#7C3AED]",
    },
    {
      icon: TrendingUp, title: "Entrepreneurship", tag: "New 2025",
      desc: "End-to-end entrepreneurship support for youth with innovative ideas — from ideation workshops and business plan development to mentoring and seed funding up to ₹1 lakh.",
      features: ["Ideation & validation workshops", "Business plan development", "Seed funding up to ₹1L", "Investor connect events"],
      gradFrom: "from-teal-50", gradTo: "to-teal-100/40", iconBg: "bg-[#14B8A6]/10", iconColor: "text-[#14B8A6]", tagBg: "bg-[#14B8A6]/10 text-[#14B8A6]",
    },
    {
      icon: Leaf, title: "Plantation Drives", tag: "Environmental",
      desc: "Community-led plantation drives engaging youth in direct environmental action. Over 500,000 trees planted across 80 cities, turning awareness into lasting ecological impact.",
      features: ["500K+ trees planted to date", "80+ cities covered", "Youth leadership roles", "Quarterly seasonal drives"],
      gradFrom: "from-green-50", gradTo: "to-green-100/40", iconBg: "bg-green-500/10", iconColor: "text-green-600", tagBg: "bg-green-500/10 text-green-600",
    },
    {
      icon: Building2, title: "Community Development", tag: "Social Impact",
      desc: "Infrastructure and capacity building in underserved neighborhoods. Includes library creation, playground development, sanitation awareness, and women's skill development programs.",
      features: ["Libraries in 40+ villages", "Women's empowerment programs", "Sanitation awareness campaigns", "Sports & rec facilities"],
      gradFrom: "from-orange-50", gradTo: "to-orange-100/40", iconBg: "bg-orange-500/10", iconColor: "text-orange-500", tagBg: "bg-orange-500/10 text-orange-500",
    },
    {
      icon: HandHeart, title: "Volunteer Program", tag: "Join Us",
      desc: "A structured volunteering framework where professionals, students, and retirees contribute their skills. Flexible time commitments with online and on-ground opportunities across India.",
      features: ["Flexible 2hr+ commitments", "Online & offline roles", "Training & orientation", "Certificate of service"],
      gradFrom: "from-pink-50", gradTo: "to-pink-100/40", iconBg: "bg-pink-500/10", iconColor: "text-pink-500", tagBg: "bg-pink-500/10 text-pink-500",
    },
    {
      icon: DollarSign, title: "Fundraising Campaigns", tag: "Support Us",
      desc: "Transparent, cause-specific fundraising campaigns from sponsoring a child's education to funding an entire plantation drive. 87% of donations flow directly to programs.",
      features: ["87% direct program impact", "80G tax-deductible", "Real-time impact reports", "Corporate CSR eligible"],
      gradFrom: "from-yellow-50", gradTo: "to-amber-100/40", iconBg: "bg-yellow-500/10", iconColor: "text-yellow-600", tagBg: "bg-yellow-500/10 text-yellow-700",
    },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-[0.15em]">What We Offer</span>
          <h1 className="font-['Poppins'] text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">
            Programs & Services
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Seven flagship programs designed to holistically empower youth — from classroom to career, seedling to forest.
          </p>
        </div>
      </section>

      <section className="py-12 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {programs.map(({ icon: Icon, title, tag, desc, features, gradFrom, gradTo, iconBg, iconColor, tagBg }) => (
              <div key={title} className={`group p-8 rounded-3xl bg-gradient-to-br ${gradFrom} ${gradTo} border border-white hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-2 transition-all duration-300`}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${tagBg}`}>{tag}</span>
                </div>
                <h3 className="font-['Poppins'] text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>
                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-gray-700 text-sm">
                      <CheckCircle className={`w-4 h-4 ${iconColor} flex-shrink-0 mt-0.5`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate("contact")}
                  className={`w-full py-3 rounded-xl ${iconBg} ${iconColor} font-semibold text-sm border-2 border-transparent hover:opacity-80 transition-opacity`}>
                  Learn More / Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── IMPACT PAGE ──────────────────────────────────────────────────────────────
function ImpactPage({ setPage }: { setPage: (p: Page) => void }) {
  const navigate = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const stories = [
    { name: "Kavitha Rajan", location: "Chennai, Tamil Nadu", program: "Digital Skills", img: "photo-1573497019940-1c28c88b4f3e", story: "I was about to drop out of school when InAmigos stepped in. Not only did they cover my fees, they gave me a laptop and enrolled me in their coding bootcamp. Three years later, I'm a software engineer at a Bengaluru startup." },
    { name: "Mohammed Iqbal", location: "Hyderabad, Telangana", program: "Entrepreneurship", img: "photo-1506277886164-e25aa3f4ef7f", story: "My family couldn't afford college. InAmigos connected me with a scholarship and an entrepreneurship mentor. I launched a food-tech startup at 21 that now employs 12 people from my own neighborhood." },
    { name: "Lakshmi Bai Sharma", location: "Jaipur, Rajasthan", program: "Plantation Drives", img: "photo-1544005313-94ddf0286df2", story: "The plantation drive brought our entire village together. We have planted 3,000 trees in two years. The air is cleaner, youth are engaged, and three neighboring villages are now copying our model." },
  ];

  const photoGrid = [
    { img: "photo-1529390079861-591de354faf5", col: "col-span-2 row-span-2", h: "h-96" },
    { img: "photo-1524178232363-1fb2b075b655", col: "", h: "h-44" },
    { img: "photo-1488521787991-ed7bbaae773c", col: "", h: "h-44" },
    { img: "photo-1559027615-cd4628902d4a", col: "", h: "h-52" },
    { img: "photo-1491438590914-bc09fcaaf77a", col: "", h: "h-52" },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#2563EB]/5 to-[#7C3AED]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#14B8A6] font-semibold text-sm uppercase tracking-[0.15em]">Real Numbers</span>
          <h1 className="font-['Poppins'] text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">Our Impact</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Ten years of dedication, measured in lives changed.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <CounterCard target={15000} suffix="+" label="Students Supported" color="text-[#2563EB]" bg="bg-blue-50" />
          <CounterCard target={500000} suffix="+" label="Trees Planted" color="text-green-600" bg="bg-green-50" />
          <CounterCard target={2500} suffix="+" label="Volunteers Engaged" color="text-[#7C3AED]" bg="bg-purple-50" />
          <CounterCard target={48} suffix="" label="Active Programs" color="text-[#14B8A6]" bg="bg-teal-50" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <CounterCard target={120} suffix="+" label="Cities Reached" color="text-orange-500" bg="bg-orange-50" />
          <CounterCard target={92} suffix="%" label="Completion Rate" color="text-blue-600" bg="bg-blue-50" />
          <CounterCard target={850} suffix="+" label="Corporate Partners" color="text-[#7C3AED]" bg="bg-purple-50" />
          <CounterCard target={10} suffix="" label="Years of Impact" color="text-gray-800" bg="bg-gray-100" />
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-[0.15em]">Real Stories</span>
            <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 mt-3 tracking-tight">Success Stories</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {stories.map(({ name, location, program, img, story }) => (
              <div key={name} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-52 bg-gray-100">
                  <img src={`https://images.unsplash.com/${img}?w=400&h=220&fit=crop&auto=format`} alt={name}
                    className="w-full h-full object-cover" />
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#2563EB] text-white text-xs font-semibold">{program}</span>
                </div>
                <div className="p-8">
                  <h3 className="font-['Poppins'] font-bold text-gray-900 text-lg mb-1">{name}</h3>
                  <p className="text-[#14B8A6] text-sm font-medium mb-4">{location}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">"{story}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 tracking-tight">Moments of Change</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
            <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden bg-gray-100 h-80">
              <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop&auto=format" alt="Youth summit"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            {[
              "photo-1524178232363-1fb2b075b655",
              "photo-1488521787991-ed7bbaae773c",
              "photo-1559027615-cd4628902d4a",
              "photo-1491438590914-bc09fcaaf77a",
            ].map((img, i) => (
              <div key={i} className="rounded-3xl overflow-hidden bg-gray-100 h-36">
                <img src={`https://images.unsplash.com/${img}?w=300&h=200&fit=crop&auto=format`} alt="Impact"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
            {[
              "photo-1466692476868-aef1dfb1e735",
              "photo-1531482615713-2afd69097998",
              "photo-1448375240586-882707db888b",
            ].map((img, i) => (
              <div key={i} className="rounded-3xl overflow-hidden bg-gray-100 h-44">
                <img src={`https://images.unsplash.com/${img}?w=300&h=220&fit=crop&auto=format`} alt="Program"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 mb-4 tracking-tight">Community Reach</h2>
            <p className="text-gray-500">Active in 120+ cities across 22 states of India.</p>
          </div>
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 overflow-hidden h-80 flex items-center justify-center">
            <div className="text-center">
              <Globe className="w-16 h-16 text-[#2563EB] mx-auto mb-4 opacity-40" />
              <p className="text-gray-700 font-semibold text-xl font-['Poppins']">120+ Cities Across India</p>
              <p className="text-gray-500 text-sm mt-2 mb-6">22 states • 48 active programs • 2,500+ volunteers</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto px-4">
                {["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Rajasthan", "Gujarat", "West Bengal", "Telangana", "UP", "Bihar", "Madhya Pradesh", "Odisha"].map((state) => (
                  <span key={state} className="px-3 py-1.5 rounded-full bg-white shadow-sm text-xs font-semibold text-gray-600 border border-gray-100">
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-['Poppins'] text-4xl font-bold text-white mb-4 tracking-tight">Be Part of the Impact</h2>
          <p className="text-blue-100 text-lg mb-10">Your support — as a volunteer, donor, or partner — multiplies the change we create together.</p>
          <button onClick={() => navigate("contact")}
            className="px-8 py-4 rounded-2xl bg-white text-[#2563EB] font-semibold text-lg hover:bg-blue-50 hover:scale-105 transition-all">
            Get Involved Today →
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── EVENTS PAGE ──────────────────────────────────────────────────────────────
function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcoming = [
    { title: "Annual Youth Summit 2025", date: "March 15, 2025", time: "9:00 AM – 6:00 PM", location: "NSCI Dome, Mumbai", category: "Conference", spots: 48, img: "photo-1540575467063-178a50c2df87", desc: "Our flagship annual summit bringing 500+ youth changemakers, industry leaders, and impact investors together under one roof." },
    { title: "Digital Literacy Workshop", date: "March 22, 2025", time: "10:00 AM – 2:00 PM", location: "IIT Delhi, New Delhi", category: "Workshop", spots: 30, img: "photo-1531482615713-2afd69097998", desc: "Hands-on workshop covering essential digital tools, online safety, and career opportunities in India's tech sector." },
    { title: "Green Earth Plantation Drive", date: "April 5, 2025", time: "7:00 AM – 12:00 PM", location: "Aravalli Hills, Gurugram", category: "Community", spots: 120, img: "photo-1466692476868-aef1dfb1e735", desc: "Join 500 volunteers to plant 5,000 native saplings across the Aravalli biodiversity zone. Tools & refreshments provided." },
    { title: "Entrepreneurship Bootcamp", date: "April 12–14, 2025", time: "9:00 AM – 5:00 PM", location: "T-Hub, Hyderabad", category: "Bootcamp", spots: 15, img: "photo-1556761175-b413da4baf72", desc: "3-day intensive bootcamp for aspiring young entrepreneurs. Includes mentorship sessions, ideation workshops, and pitch practice." },
    { title: "Fundraising Gala Dinner", date: "April 28, 2025", time: "7:00 PM – 11:00 PM", location: "Taj Hotels, Bangalore", category: "Fundraiser", spots: 200, img: "photo-1519167758481-83f550bb49b3", desc: "Annual gala dinner with performances, live impact reports, and exclusive networking with InAmigos donors and patrons." },
    { title: "Community Art Exhibition", date: "May 10, 2025", time: "11:00 AM – 7:00 PM", location: "NGMA, Mumbai", category: "Art & Culture", spots: 300, img: "photo-1518998053901-5348d3961a04", desc: "Artworks by students from our programs on display — celebrating creativity as a vehicle for social change." },
  ];

  const past = [
    { title: "Youth Tech Hackathon 2024", date: "Dec 14–15, 2024", location: "Microsoft Campus, Hyderabad", participants: 340, category: "Hackathon", img: "photo-1504384308090-c894fdcc538d" },
    { title: "Plantation Drive – Monsoon 2024", date: "July 2024", location: "Western Ghats, Maharashtra", participants: 620, category: "Community", img: "photo-1448375240586-882707db888b" },
    { title: "Digital Skills Graduation 2024", date: "Oct 18, 2024", location: "IIT Bombay, Mumbai", participants: 180, category: "Graduation", img: "photo-1523580494863-6f3031224c94" },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-50/60 to-blue-50/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#14B8A6] font-semibold text-sm uppercase tracking-[0.15em]">Join Us</span>
          <h1 className="font-['Poppins'] text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">Events</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Conferences, workshops, plantation drives, and celebrations — there is always a reason to come together.</p>
        </div>
      </section>

      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1 mb-12 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm w-fit">
            {(["upcoming", "past"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                  activeTab === tab ? "bg-[#2563EB] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}>
                {tab} Events
              </button>
            ))}
          </div>

          {activeTab === "upcoming" && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {upcoming.map(({ title, date, time, location, category, spots, img, desc }) => (
                <div key={title} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-44 bg-gray-100">
                    <img src={`https://images.unsplash.com/${img}?w=400&h=200&fit=crop&auto=format`} alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-700">{category}</span>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#14B8A6] text-white text-xs font-bold">{spots} spots</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Poppins'] font-bold text-gray-900 text-lg mb-2 leading-tight">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
                    <div className="space-y-1.5 mb-5 text-sm text-gray-400">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{date}</div>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{time}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{location}</div>
                    </div>
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "past" && (
            <div className="grid md:grid-cols-3 gap-6">
              {past.map(({ title, date, location, participants, category, img }) => (
                <div key={title} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="relative h-44 bg-gray-100">
                    <img src={`https://images.unsplash.com/${img}?w=400&h=200&fit=crop&auto=format`} alt={title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gray-900/15" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-gray-700">{category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Poppins'] font-bold text-gray-900 text-lg mb-2">{title}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1"><Calendar className="w-4 h-4" />{date}</div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4"><MapPin className="w-4 h-4" />{location}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#2563EB] font-semibold text-sm">{participants} participants</span>
                      <button className="text-gray-400 text-sm hover:text-gray-700 transition-colors font-medium">View Recap →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Education", "Events", "Volunteers", "Community", "Nature"];

  const images = [
    { img: "photo-1529390079861-591de354faf5", cat: "Education" },
    { img: "photo-1524178232363-1fb2b075b655", cat: "Events" },
    { img: "photo-1559027615-cd4628902d4a", cat: "Volunteers" },
    { img: "photo-1488521787991-ed7bbaae773c", cat: "Community" },
    { img: "photo-1466692476868-aef1dfb1e735", cat: "Nature" },
    { img: "photo-1491438590914-bc09fcaaf77a", cat: "Education" },
    { img: "photo-1531482615713-2afd69097998", cat: "Events" },
    { img: "photo-1540575467063-178a50c2df87", cat: "Events" },
    { img: "photo-1516549655169-df83a0774514", cat: "Community" },
    { img: "photo-1503676260728-1c00da094a0b", cat: "Education" },
    { img: "photo-1448375240586-882707db888b", cat: "Nature" },
    { img: "photo-1523580494863-6f3031224c94", cat: "Education" },
    { img: "photo-1504384308090-c894fdcc538d", cat: "Events" },
    { img: "photo-1517457373958-b7bdd4587205", cat: "Community" },
    { img: "photo-1517486808906-6ca8b3f04846", cat: "Volunteers" },
    { img: "photo-1522202176988-66273c2fd55f", cat: "Education" },
  ];

  const filtered = activeFilter === "All" ? images : images.filter((img) => img.cat === activeFilter);

  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-purple-50/60 to-teal-50/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#7C3AED] font-semibold text-sm uppercase tracking-[0.15em]">Visual Stories</span>
          <h1 className="font-['Poppins'] text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">Gallery</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Moments captured across our programs, events, and communities across India.</p>
        </div>
      </section>

      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#2563EB]/30 hover:text-[#2563EB]"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {filtered.map(({ img, cat }, i) => (
              <div key={`${img}-${i}`} className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden bg-gray-100 cursor-pointer">
                <img src={`https://images.unsplash.com/${img}?w=400&h=600&fit=crop&auto=format`} alt={`${cat} moment`}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold backdrop-blur">{cat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── TESTIMONIALS PAGE ────────────────────────────────────────────────────────
function TestimonialsPage() {
  const sections = [
    {
      title: "Students", accent: "text-[#2563EB]", testimonials: [
        { name: "Kavitha Rajan", role: "Software Engineer, Bengaluru", img: "photo-1494790108377-be9c29b29330", rating: 5, review: "InAmigos didn't just teach me to code. They believed in me when no one else did. The mentors became family. I went from almost dropping out to working at a top startup." },
        { name: "Siddharth Rao", role: "IIT Madras Graduate", img: "photo-1507003211169-0a1dd7228f2d", rating: 5, review: "Without the InAmigos scholarship, IIT would have remained a dream. Today, I mentor the next batch of scholarship recipients — giving back what was given to me." },
        { name: "Fatima Khan", role: "UX Designer, Pune", img: "photo-1438761681033-6461ffad8d80", rating: 5, review: "The digital skills program opened a world I didn't know existed. I discovered design through InAmigos, and now I work with clients across three continents." },
      ]
    },
    {
      title: "Volunteers", accent: "text-[#7C3AED]", testimonials: [
        { name: "Arun Krishnamurthy", role: "Senior Engineer, Google India", img: "photo-1472099645785-5658abf4ff4e", rating: 5, review: "I've volunteered for 4 years. InAmigos is run with remarkable professional discipline. Every weekend I spend teaching feels more meaningful than the whole work week." },
        { name: "Neha Sharma", role: "Marketing Manager, Zomato", img: "photo-1534528741775-53994a69daeb", rating: 5, review: "InAmigos made volunteering accessible — flexible hours, clear tasks, and visible impact. A combination that is rare in the development sector." },
        { name: "Vikram Desai", role: "Startup Founder", img: "photo-1500648767791-00dcc994a43e", rating: 5, review: "As a mentor in the entrepreneurship program, I've learned as much from the youth as they have from me. Their resilience and creativity are humbling." },
      ]
    },
    {
      title: "Partners & Donors", accent: "text-[#14B8A6]", testimonials: [
        { name: "Dr. Anita Patel", role: "CEO, Teach For India", img: "photo-1487412720507-e7ab37603c6f", rating: 5, review: "InAmigos is a benchmark for program execution in the development sector. Our joint programs have delivered exceptional outcomes that exceed every KPI we set together." },
        { name: "Rajan Mehta", role: "CSR Head, Infosys Foundation", img: "photo-1507003211169-0a1dd7228f2d", rating: 5, review: "After 5 years of partnership, InAmigos continues to exceed expectations for impact per rupee invested. Their reporting is transparent and data-driven." },
        { name: "Sarah Williams", role: "Program Officer, UNICEF India", img: "photo-1573497019940-1c28c88b4f3e", rating: 5, review: "Rare transparency. Rare accountability. InAmigos reports impact with data rigour that would satisfy any institutional donor or development finance institution." },
      ]
    },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-yellow-50/60 to-orange-50/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-[0.15em]">Voices</span>
          <h1 className="font-['Poppins'] text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">Testimonials</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">The most authentic measure of our work — the people we've worked with.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center cursor-pointer group">
            <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=450&fit=crop&auto=format" alt="Video testimonial"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
              <p className="text-white font-['Poppins'] font-semibold text-xl">InAmigos Impact Story 2024</p>
              <p className="text-white/50 text-sm">12:34 min documentary</p>
            </div>
          </div>
        </div>
      </section>

      {sections.map(({ title, accent, testimonials }) => (
        <section key={title} className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className={`font-['Poppins'] text-3xl font-bold mb-8 ${accent} tracking-tight`}>{title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map(({ name, role, img, rating, review }) => (
                <div key={name} className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <Quote className="w-8 h-8 text-gray-100 mb-3" />
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm">{review}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    <img src={`https://images.unsplash.com/${img}?w=48&h=48&fit=crop&auto=format`} alt={name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100" />
                    <div>
                      <div className="font-['Poppins'] font-semibold text-gray-900 text-sm">{name}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

// ─── BLOG PAGE ────────────────────────────────────────────────────────────────
function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Education", "Technology", "Community", "Impact Stories", "Fundraising"];

  const featured = {
    title: "How Digital Skills Are Transforming Rural India: InAmigos' 5-Year Journey",
    date: "February 28, 2025", author: "Rahul Verma", readTime: "8 min read",
    excerpt: "When we launched our first coding bootcamp in a small room in Dharavi, we had 12 students, two laptops, and a shared internet connection. Five years later, 3,200 alumni work in tech companies across 40 cities. This is the story of what changed — and how.",
    category: "Impact Stories", img: "photo-1498050108023-c5249f4df085",
  };

  const articles = [
    { title: "5 Ways to Support Youth Education Without Donating Money", date: "Feb 20, 2025", category: "Education", readTime: "4 min", img: "photo-1503676260728-1c00da094a0b", author: "Priya Nair" },
    { title: "The Plantation That Became a Movement: The Aravalli Story", date: "Feb 15, 2025", category: "Community", readTime: "6 min", img: "photo-1448375240586-882707db888b", author: "Meera Joshi" },
    { title: "Youth Entrepreneurship in 2025: Trends and Opportunities", date: "Feb 10, 2025", category: "Technology", readTime: "5 min", img: "photo-1556761175-b413da4baf72", author: "Arjun Singh" },
    { title: "Annual Impact Report 2024: The Numbers Behind the Change", date: "Feb 1, 2025", category: "Impact Stories", readTime: "10 min", img: "photo-1531482615713-2afd69097998", author: "Rahul Verma" },
    { title: "Corporate CSR Meets Community Needs: A New Partnership Model", date: "Jan 25, 2025", category: "Fundraising", readTime: "7 min", img: "photo-1540575467063-178a50c2df87", author: "Dev Patel" },
    { title: "Digital Literacy for Seniors: Our New Intergenerational Program", date: "Jan 18, 2025", category: "Education", readTime: "3 min", img: "photo-1524178232363-1fb2b075b655", author: "Sanya Gupta" },
  ];

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-orange-50/40 to-yellow-50/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-[0.15em]">Insights</span>
          <h1 className="font-['Poppins'] text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">Blog</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Stories, insights, and ideas from the frontlines of social impact in India.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="group grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-400 cursor-pointer">
            <div className="relative bg-gray-100 min-h-80 lg:min-h-auto overflow-hidden">
              <img src={`https://images.unsplash.com/${featured.img}?w=600&h=500&fit=crop&auto=format`} alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center bg-white">
              <span className="px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold w-fit mb-4">{featured.category}</span>
              <h2 className="font-['Poppins'] text-2xl lg:text-3xl font-bold text-gray-900 mb-5 leading-tight">{featured.title}</h2>
              <p className="text-gray-500 leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                <span className="font-medium">By {featured.author}</span>
                <span>•</span><span>{featured.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
              </div>
              <button className="flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all w-fit">
                Read Full Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat ? "bg-[#2563EB] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#2563EB]/30 hover:text-[#2563EB]"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full lg:w-72 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/10" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">No articles match your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(({ title, date, category, readTime, img, author }) => (
                <div key={title} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img src={`https://images.unsplash.com/${img}?w=400&h=250&fit=crop&auto=format`} alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-gray-700">{category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Poppins'] font-bold text-gray-900 text-lg mb-3 leading-tight">{title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <span>By {author}</span><span>•</span><span>{date}</span>
                      <span>•</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime}</span>
                    </div>
                    <button className="text-[#2563EB] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── FAQ PAGE ─────────────────────────────────────────────────────────────────
function FAQPage({ setPage }: { setPage: (p: Page) => void }) {
  const navigate = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "How can I volunteer with InAmigos Foundation?", a: "Volunteering is simple! Fill out our volunteer interest form on the Contact page, and our team will reach out within 48 hours to match your skills and availability with current opportunities. We offer both online and on-ground roles, with flexible time commitments starting from just 2 hours per week." },
    { q: "Is InAmigos Foundation an 80G registered organization?", a: "Yes! InAmigos Foundation is registered under Section 12A and 80G of the Income Tax Act, 1961. All donations are tax-deductible, and we provide official receipts within 72 hours of receiving your contribution. Corporate donations also qualify for CSR credit under Schedule VII of the Companies Act, 2013." },
    { q: "How can I donate to a specific program?", a: "You can donate to any of our 7 flagship programs by specifying your preference on the donation form. Options include Education Support, Digital Skills, Entrepreneurship, Plantation Drives, Community Development, Volunteer Program, and Fundraising Campaigns. 87% of program-specific donations flow directly to that program with full reporting." },
    { q: "How can my organization partner with InAmigos?", a: "We welcome partnerships with corporates, NGOs, academic institutions, and government bodies. Partnerships take many forms — CSR programs, co-designed interventions, technology support, or event collaboration. Email us at partnerships@inamigos.org with a brief about your organization and goals, and our team will follow up within 5 working days." },
    { q: "What percentage of donations go directly to programs?", a: "We are proud to report that 87% of every rupee donated goes directly to program delivery. The remaining 13% covers essential operational costs including program management, monitoring & evaluation, and administrative infrastructure. Full audited financial reports are published annually on our website and shared with all donors." },
    { q: "Do you work outside India?", a: "Currently, InAmigos Foundation operates exclusively within India across 22 states and 120+ cities. However, we collaborate with international organizations like UNICEF and UNESCO on research and knowledge-sharing. We have strategic plans to expand our digital skills model to South and Southeast Asia by 2027." },
    { q: "How can a student apply for a scholarship?", a: "Students in grades 6–12 from families with annual income below ₹3 lakhs can apply for our scholarships. Applications open every April and October on our website. Required documents include school records, income certificate, and a short personal essay. Our selection committee reviews all applications within 30 days." },
    { q: "Can I volunteer from abroad?", a: "Absolutely! Our digital programs welcome online volunteers from anywhere in the world. Remote volunteers typically support digital skills training, content development, career mentoring, and fundraising campaigns. We accommodate different time zones and provide all necessary resources and orientation remotely." },
    { q: "How do I stay updated on InAmigos events and news?", a: "Subscribe to our monthly newsletter via the form on the Home page or in the footer. You can also follow us on Instagram (@inamigos_foundation), Facebook, Twitter, LinkedIn, and YouTube where we post program updates, event announcements, and impact stories multiple times per week." },
    { q: "Where is InAmigos Foundation headquartered?", a: "Our main office is at 12, Social Impact Hub, Bandra West, Mumbai 400050, Maharashtra. We also have regional offices in New Delhi, Bangalore, Hyderabad, and Jaipur. All offices are open Monday–Friday, 9:00 AM – 6:00 PM IST. Walk-in visits are welcome with a prior appointment." },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50/60 to-purple-50/40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-[0.15em]">Help Center</span>
          <h1 className="font-['Poppins'] text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">
            Frequently Asked<br />Questions
          </h1>
          <p className="text-xl text-gray-500">Everything you need to know about InAmigos Foundation — from volunteering to donations and partnerships.</p>
        </div>
      </section>

      <section className="py-16 pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-3 mb-16">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i ? "border-[#2563EB]/20 bg-[#2563EB]/3 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200"
              }`}>
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4">
                  <span className="font-['Poppins'] font-semibold text-gray-900 text-base leading-snug">{q}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    openIndex === i ? "bg-[#2563EB]" : "bg-gray-100"
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-all duration-300 ${openIndex === i ? "text-white rotate-180" : "text-gray-500"}`} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-48" : "max-h-0"}`}>
                  <p className="px-6 pb-6 text-gray-600 leading-relaxed text-sm">{a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white">
            <h3 className="font-['Poppins'] font-bold text-2xl mb-3">Still have questions?</h3>
            <p className="text-blue-100 mb-6 text-sm">Our team is happy to help. Reach out and we'll respond within 48 hours.</p>
            <button onClick={() => navigate("contact")}
              className="px-8 py-3.5 rounded-xl bg-white text-[#2563EB] font-semibold text-sm hover:bg-blue-50 hover:scale-105 transition-all">
              Contact Us →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", type: "general", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setFormData({ name: "", email: "", type: "general", subject: "", message: "" });
  };

  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-50/60 to-blue-50/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#14B8A6] font-semibold text-sm uppercase tracking-[0.15em]">Reach Out</span>
          <h1 className="font-['Poppins'] text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Volunteer, donate, partner, or just say hello — we would love to hear from you.</p>
        </div>
      </section>

      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 lg:p-10 shadow-sm">
            <h2 className="font-['Poppins'] text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-8">We respond within 24–48 hours on working days.</p>

            {sent && (
              <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-100 text-green-700 text-sm font-medium flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rahul Verma"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/10 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/10 focus:bg-white transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Inquiry Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/10 focus:bg-white transition-all">
                  <option value="general">General Inquiry</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donation">Donation</option>
                  <option value="partnership">Partnership / CSR</option>
                  <option value="scholarship">Scholarship Application</option>
                  <option value="media">Media & Press</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
                <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/10 focus:bg-white transition-all" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry — the more detail, the better we can help..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/10 focus:bg-white transition-all resize-none" />
              </div>

              <button type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-200">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-100 h-56 flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#2563EB] mx-auto mb-3 opacity-50" />
                <p className="font-['Poppins'] font-semibold text-gray-800 text-lg">InAmigos Foundation HQ</p>
                <p className="text-gray-500 text-sm mt-1 mb-3">12, Social Impact Hub, Bandra West, Mumbai</p>
                <button className="text-[#2563EB] text-sm font-semibold hover:underline underline-offset-2 transition-colors">
                  Open in Google Maps →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8">
              <h3 className="font-['Poppins'] font-bold text-gray-900 text-xl mb-6">Office Information</h3>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: "12, Social Impact Hub, Bandra West, Mumbai – 400050, Maharashtra" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                  { icon: Mail, label: "Email", value: "hello@inamigos.org" },
                  { icon: Clock, label: "Hours", value: "Monday – Friday, 9:00 AM – 6:00 PM IST" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-gray-700 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-3xl p-8 text-white">
              <h3 className="font-['Poppins'] font-bold text-xl mb-3">Follow Our Journey</h3>
              <p className="text-blue-100 text-sm mb-6">Daily updates, impact stories, and event announcements across our social channels.</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Youtube, label: "YouTube" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-sm font-medium">
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":         return <HomePage setPage={setCurrentPage} />;
      case "about":        return <AboutPage setPage={setCurrentPage} />;
      case "programs":     return <ProgramsPage setPage={setCurrentPage} />;
      case "impact":       return <ImpactPage setPage={setCurrentPage} />;
      case "events":       return <EventsPage />;
      case "gallery":      return <GalleryPage />;
      case "testimonials": return <TestimonialsPage />;
      case "blog":         return <BlogPage />;
      case "faq":          return <FAQPage setPage={setCurrentPage} />;
      case "contact":      return <ContactPage />;
      default:             return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen font-['Inter'] bg-[#F8FAFC]" style={{ scrollBehavior: "smooth" }}>
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="min-h-screen">{renderPage()}</main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
}
