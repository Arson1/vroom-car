/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Car, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Users, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook,
  Plus,
  Minus,
  Menu,
  X,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

// --- Types ---
interface CarItem {
  id: string;
  name: string;
  price: number;
  passengers: number;
  engine: string;
  transmission: string;
  image: string;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  stars: number;
  date?: string;
  content: string;
  avatar: string;
}

// --- Data ---
const CARS: CarItem[] = [
  {
    id: '1',
    name: 'Dacia Duster',
    price: 80,
    passengers: 5,
    engine: 'Diesel',
    transmission: 'Auto',
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Toyota Yaris Cross',
    price: 100,
    passengers: 5,
    engine: 'Hybride',
    transmission: 'Auto',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Renault Clio 5',
    price: 48,
    passengers: 5,
    engine: 'Diesel',
    transmission: 'Manuelle',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Peugeot 3008',
    price: 120,
    passengers: 5,
    engine: 'Diesel',
    transmission: 'Auto',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop'
  }
];

const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Location Courte & Longue Durée',
    description: 'Une flexibilité totale pour tous vos trajets à la Réunion.',
    icon: <Clock className="w-8 h-8 text-premium-pink" />
  },
  {
    id: 's2',
    title: 'Accompagnement Achat/Vente',
    description: 'Des experts à vos côtés pour concrétiser vos projets automobiles.',
    icon: <Users className="w-8 h-8 text-premium-purple" />
  },
  {
    id: 's3',
    title: 'Service Premium & Qualité',
    description: 'Une flotte entretenue et un accueil personnalisé garanti.',
    icon: <ShieldCheck className="w-8 h-8 text-premium-blue" />
  }
];

const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'Comment procéder à la réservation d\'un véhicule ?',
    answer: 'Vous pouvez réserver directement sur notre site web en choisissant vos dates et votre modèle, ou nous contacter par téléphone pour un accompagnement personnalisé.'
  },
  {
    id: 'f2',
    question: 'Quelle est la démarche pour la caution ?',
    answer: 'La caution est effectuée par empreinte bancaire au moment du départ du véhicule. Elle n\'est pas débitée sauf en cas de dommages constatés.'
  },
  {
    id: 'f3',
    question: 'Où puis-je récupérer ma voiture ?',
    answer: 'Nous proposons la récupération à notre agence de Saint-Leu, ou la livraison directe à l\'aéroport Roland Garros selon votre formule.'
  },
  {
    id: 'f4',
    question: 'À qui dois-je m\'adresser en cas de panne ou d\'accident ?',
    answer: 'Un numéro d\'assistance 24/7 vous est communiqué lors de la remise des clés. Nous intervenons rapidement partout sur l\'île.'
  }
];

const REVIEWS: Testimonial[] = [
  {
    id: 'r1',
    name: 'Sarah Baro',
    role: 'Cliente Google',
    stars: 5,
    date: 'Il y a 2 jours',
    content: 'Super expérience ! Très ravie de cette location chez Vroomcar 974. Accueil au top et véhicule neuf parfaitement propre.',
    avatar: 'https://i.pravatar.cc/150?u=r1'
  },
  {
    id: 'r2',
    name: 'Sébastien Robert',
    role: 'Client Google',
    stars: 5,
    date: 'Il y a 1 semaine',
    content: 'Rien à dire. Loueur sérieux mettant à disposition des véhicules propres et récents.',
    avatar: 'https://i.pravatar.cc/150?u=r2'
  },
  {
    id: 'r3',
    name: 'Franck Jaeger',
    role: 'Client Google',
    stars: 5,
    date: 'Il y a 2 semaines',
    content: 'Une location d\'une semaine qui s\'est très bien passée. La voiture était irréprochable et le loueur très pro.',
    avatar: 'https://i.pravatar.cc/150?u=r3'
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
            <Car className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-light tracking-premium uppercase">
            VROOM<span className="font-semibold">CAR</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest text-white/60">
          <a href="#" className="text-white border-b border-white/20 pb-1">ACCUEIL</a>
          <a href="#vehicles" className="hover:text-white transition-colors">NOS VÉHICULES</a>
          <a href="#services" className="hover:text-white transition-colors">NOS SERVICES</a>
          <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
        </div>

        <div className="hidden md:flex w-10 h-10 border border-white/20 rounded-full items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
          <div className="w-4 h-[1px] bg-white"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 py-6 md:hidden px-6 flex flex-col gap-4 text-center"
          >
            <a href="#" className="text-lg font-medium" onClick={() => setIsOpen(false)}>ACCUEIL</a>
            <a href="#vehicles" className="text-lg font-medium" onClick={() => setIsOpen(false)}>NOS VÉHICULES</a>
            <a href="#services" className="text-lg font-medium" onClick={() => setIsOpen(false)}>NOS SERVICES</a>
            <a href="#contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>CONTACT</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 h-[120%]"
      >
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop" 
          alt="Premium Car Hero" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
        <div className="max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[10px] uppercase tracking-ultra text-white/40 mb-6 block"
          >
            Curated Automobile Experience
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-light tracking-tight leading-tight mb-8"
          >
            Découvrez l'univers <br /> 
            <span className="font-bold text-gradient italic">Premium & Singulier.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-lg text-white/40 mb-12 font-light max-w-lg mx-auto leading-relaxed"
          >
            VroomCar : Une sélection méticuleuse d'automobiles conçues pour transcender les frontières du luxe contemporain.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-10 py-3 border border-white/20 rounded-full text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Explorer la flotte
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-10 py-3 border border-white/10 rounded-full text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-all"
            >
              Contact Direct
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CarCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % CARS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActiveIndex((prev) => (prev + 1) % CARS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + CARS.length) % CARS.length);

  return (
    <section id="vehicles" className="py-24 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <span className="text-[10px] uppercase tracking-ultra text-white/40 mb-4 block italic">Our Finest Selection</span>
        <h2 className="text-4xl font-light tracking-tight mb-4 lowercase">Nos véhicules <span className="font-bold uppercase text-gradient tracking-premium">premium</span></h2>
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Desktop View: Styled Cards */}
            <div className="hidden md:grid grid-cols-3 gap-8 w-full">
              {CARS.slice(0, 3).map((car, idx) => (
                <motion.div 
                  key={car.id}
                  whileHover={{ y: -10, borderColor: "rgba(255, 255, 255, 0.2)" }}
                  className="bg-surface border border-white/5 p-8 rounded-3xl group transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-8">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-medium italic">{car.name}</h3>
                    <span className="text-[10px] font-mono text-premium-pink tracking-tighter">0{idx + 1} / 04</span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed mb-8">
                    Performance et raffinement pour une conduite sans compromis sur les routes de la Réunion.
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/20 uppercase tracking-widest">Tarif journalier</span>
                      <span className="text-xl font-light tracking-tight">{car.price} €</span>
                    </div>
                    <button className="px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                      Réserver
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile View: Dynamic Carousel with Peek */}
            <div className="md:hidden w-full relative h-[450px] flex items-center justify-center overflow-visible">
              <AnimatePresence mode="popLayout" initial={false}>
                {CARS.map((car, idx) => {
                  // Calculate distance from active index for cyclic array
                  let diff = idx - activeIndex;
                  if (diff > CARS.length / 2) diff -= CARS.length;
                  if (diff < -CARS.length / 2) diff += CARS.length;
                  
                  // Display current, previous and next
                  if (Math.abs(diff) > 1) return null;

                  return (
                    <motion.div
                      key={car.id}
                      initial={{ 
                        x: diff > 0 ? 300 : -300, 
                        scale: 0.8, 
                        opacity: 0 
                      }}
                      animate={{ 
                        x: diff * 260, // Adjust this value to control how much the side cards peek
                        scale: diff === 0 ? 1 : 0.8, 
                        opacity: diff === 0 ? 1 : 0.3,
                        zIndex: diff === 0 ? 20 : 10
                      }}
                      exit={{ 
                        x: diff > 0 ? 300 : -300, 
                        opacity: 0,
                        scale: 0.8
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 26 
                      }}
                      className="absolute w-[85%]"
                    >
                      <div className="bg-surface border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
                         <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] font-mono text-premium-pink tracking-tighter">0{idx + 1} / 04</span>
                            <div className="flex gap-1">
                               <div className="w-1.5 h-1.5 rounded-full bg-premium-blue"></div>
                               <div className="w-1.5 h-1.5 rounded-full bg-premium-purple"></div>
                               <div className="w-1.5 h-1.5 rounded-full bg-premium-pink"></div>
                            </div>
                         </div>
                         <h3 className="text-2xl font-medium italic mb-2">{car.name}</h3>
                         <div className="relative aspect-video overflow-hidden rounded-xl mb-6 border border-white/5">
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex justify-between items-center mt-auto">
                            <div className="flex flex-col">
                               <span className="text-[10px] text-white/20 uppercase tracking-widest">Tarif jour</span>
                               <span className="text-lg font-light">{car.price} €</span>
                            </div>
                            <button className="px-6 py-2 rounded-full border border-white/20 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                               Explorer
                            </button>
                         </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Custom Pagination */}
        <div className="flex justify-center gap-3 mt-16">
          {CARS.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-[2px] transition-all duration-300 ${activeIndex === idx ? 'w-12 bg-linear-to-r from-premium-blue to-premium-pink' : 'w-4 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-zinc-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-ultra text-white/40 mb-4 block">Excellence in Service</span>
          <h2 className="text-4xl font-light tracking-tight lowercase">
             L'expérience <span className="font-bold uppercase text-gradient tracking-premium">VroomCar.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16">
          {SERVICES.map((service) => (
            <div key={service.id} className="flex flex-col items-center text-center group">
              <div className="mb-10 w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-premium-purple/40 transition-colors bg-surface-muted/50">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium mb-6 italic tracking-tight">{service.title}</h3>
              <p className="text-white/40 font-light leading-relaxed mb-8 text-sm">
                {service.description}
              </p>
              <button className="text-[10px] uppercase tracking-ultra text-white/60 hover:text-white flex items-center gap-4 transition-all">
                <span>Explorer le service</span>
                <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-premium-pink transition-all"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  return (
    <section className="py-32 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-white/40 mb-6 block italic">Our Heritage & Promise</span>
          <h2 className="text-5xl font-light tracking-tight mb-12 leading-tight">
            Pourquoi choisir <br/>
            <span className="font-bold uppercase text-gradient tracking-premium">La Distinction.</span>
          </h2>
          <div className="space-y-12">
            <div className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-premium-blue"></div>
                <h3 className="text-lg font-medium italic">Sélection Curatée</h3>
              </div>
              <p className="text-white/40 text-sm font-light leading-relaxed pl-6 border-l border-white/10 group-hover:border-premium-blue transition-colors">
                Parcourez une flotte d'exception, des citadines raffinées aux SUV luxueux, pour une expérience sans pareil.
              </p>
            </div>
            <div className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-premium-purple"></div>
                <h3 className="text-lg font-medium italic">Service Privé</h3>
              </div>
              <p className="text-white/40 text-sm font-light leading-relaxed pl-6 border-l border-white/10 group-hover:border-premium-purple transition-colors">
                Retrouvez notre agence à Sainte-Marie, ou profitez de notre service de conciergerie à l'aéroport.
              </p>
            </div>
            <div className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-premium-pink"></div>
                <h3 className="text-lg font-medium italic">Disponibilité Absolue</h3>
              </div>
              <p className="text-white/40 text-sm font-light leading-relaxed pl-6 border-l border-white/10 group-hover:border-premium-pink transition-colors">
                Notre équipe de concierges est à votre disposition 24/7 pour répondre à chaque exigence de votre séjour.
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-premium-purple/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10 border border-white/10 p-4 rounded-3xl bg-surface-muted/30 backdrop-blur-sm">
            <img 
              src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1000&auto=format&fit=crop" 
              alt="Premium Interior" 
              className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-32 bg-black border-t border-white/5 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-ultra text-white/40 mb-4 block italic">Knowledge Base</span>
          <h2 className="text-4xl font-light tracking-tight lowercase italic">
            Questions <span className="font-bold text-gradient uppercase tracking-premium not-italic">Fréquentes.</span>
          </h2>
        </div>
        
        <div className="space-y-6">
          {FAQS.map((faq) => (
            <div 
              key={faq.id} 
              className={`border border-white/5 rounded-3xl transition-all duration-500 overflow-hidden ${openId === faq.id ? 'bg-surface border-white/20' : 'bg-transparent hover:border-white/10'}`}
            >
              <button 
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-8 py-8 flex justify-between items-center text-left"
              >
                <span className="text-lg font-medium italic tracking-tight">{faq.question}</span>
                <div className={`w-10 h-10 border border-white/10 rounded-full flex items-center justify-center transition-transform duration-500 ${openId === faq.id ? 'rotate-180 border-premium-pink' : ''}`}>
                  <ChevronDown className={`w-4 h-4 transition-colors ${openId === faq.id ? 'text-premium-pink' : 'text-white/40'}`} />
                </div>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-white/40 font-light leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16 relative z-10">
        <div className="col-span-1">
          <div className="text-2xl font-light tracking-premium uppercase mb-8">
            VROOM<span className="font-semibold">CAR</span>
          </div>
          <p className="text-white/30 text-[11px] uppercase tracking-widest leading-relaxed mb-8">
            Une expérience automobile <br/> curatée à l'île de la Réunion.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-premium-pink transition-colors text-white/40 hover:text-white">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-premium-blue transition-colors text-white/40 hover:text-white">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-ultra font-medium text-white/20 mb-10">Nous Contacter</h4>
          <ul className="space-y-4 text-xs text-white/40 uppercase tracking-widest font-light">
            <li className="flex items-start gap-4">
              <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="leading-relaxed">413 Avenue du Beau Pays, <br/>Sainte-Marie</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-3.5 h-3.5" />
              <span>0692 47 07 17</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-ultra font-medium text-white/20 mb-10">L'Expérience</h4>
          <ul className="space-y-4 text-xs text-white/40 uppercase tracking-widest font-light">
            <li><a href="#" className="hover:text-white transition-colors">Notre Vision</a></li>
            <li><a href="#vehicles" className="hover:text-white transition-colors">La Flotte</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-ultra font-medium text-white/20 mb-10">Signature</h4>
          <div className="flex flex-col gap-6">
            <p className="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">
              Inscrivez-vous pour recevoir nos sélections exclusives.
            </p>
            <div className="border-b border-white/10 flex items-center justify-between pb-2">
              <input type="email" placeholder="VOTRE EMAIL" className="bg-transparent border-none focus:ring-0 text-[10px] uppercase tracking-widest text-white w-full placeholder:text-white/20" />
              <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-premium-pink">Sinscrire</button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/10 uppercase tracking-ultra border-t border-white/5 pt-10">
        <div>© {new Date().getFullYear()} VroomCar — Distinction & Excellence</div>
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-premium-pink animate-pulse"></div>
          <span>Service Disponible 24/7</span>
        </div>
      </div>

      {/* Decorative Leaks in Footer */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-premium-blue/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </footer>
  );
};

const Testimonials = () => {
  return (
    <section className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-ultra uppercase text-white/40">Verified Live Feed</span>
          </div>
          <h2 className="text-4xl font-light tracking-tight italic">
             L'avis de nos <span className="font-bold text-gradient uppercase tracking-premium not-italic">Ambassadeurs.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-surface-muted border border-white/5 p-10 rounded-[2.5rem] relative flex flex-col group hover:border-white/10 transition-colors">
              <div className="flex justify-between items-start mb-10">
                <div className="flex gap-1.5 text-premium-pink">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                {review.date && (
                  <span className="text-[9px] text-white/20 uppercase tracking-ultra font-medium">
                    {review.date}
                  </span>
                )}
              </div>
              <p className="text-white/40 font-light italic leading-relaxed mb-12 text-sm flex-grow">
                "{review.content}"
              </p>
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div>
                    <h4 className="font-medium text-sm tracking-tight flex items-center gap-1.5">
                      {review.name}
                      <ShieldCheck className="w-3 h-3 text-premium-blue" />
                    </h4>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4 opacity-10 group-hover:opacity-30 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Leaks */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-premium-pink/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none"></div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-premium-purple selection:text-white relative overflow-hidden">
      {/* Decorative Light Leaks */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-premium-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-premium-pink/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none z-0"></div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <CarCarousel />
        <Services />
        <WhyUs />
        <Testimonials />
        
        {/* Island Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1614030424751-62d9485701d7?q=80&w=2000&auto=format&fit=crop" 
              alt="Reunion Island" 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 uppercase tracking-tighter">
              L'île de la Réunion, <br />
              <span className="text-gradient">L'ÎLE INTENSE.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-400 font-light italic mb-12">
              "Un sanctuaire de nature sauvage, entre volcan majestueux et lagons turquoises."
            </p>
             <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all uppercase tracking-widest text-sm">
              Préparer mon itinéraire
            </button>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
