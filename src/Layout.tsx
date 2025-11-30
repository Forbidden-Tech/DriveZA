import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Car, Menu, Search, Plus, Phone, ChevronUp, ArrowRight } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPageName: string;
}

export default function Layout({ children, currentPageName }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'Browse Cars', page: 'Browse' },
    { name: 'Sell Your Car', page: 'SellCar' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHomePage = currentPageName === 'Home';
  const headerBg = scrolled || !isHomePage ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent';

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Drive<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">ZA</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`text-sm font-medium transition-colors ${
                    currentPageName === link.page 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link to={createPageUrl('Browse')}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('SellCar')}>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Sell Your Car
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/5"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-[#0a0a0a] border-l border-white/10">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-8 pt-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">
                      Drive<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">ZA</span>
                    </span>
                  </div>
                  
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.page}
                        to={createPageUrl(link.page)}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                          currentPageName === link.page 
                            ? 'bg-white/5 text-white' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="mt-auto pb-8">
                    <Link to={createPageUrl('SellCar')} onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Sell Your Car
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className={isHomePage ? '' : 'h-20'} />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link to={createPageUrl('Home')} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Drive<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">ZA</span>
                </span>
              </Link>
              <p className="text-gray-500 text-sm mb-6">
                South Africa's most intelligent car marketplace. Buy and sell with confidence.
              </p>
              <div className="flex gap-3">
                {['𝕏', 'f', 'in'].map((icon, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-bold"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Browse Cars', 'Sell Your Car', 'Dealers', 'Car Finance'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Makes */}
            <div>
              <h4 className="font-semibold text-white mb-4">Popular Makes</h4>
              <ul className="space-y-3">
                {['Toyota', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Ford'].map((make, i) => (
                  <li key={i}>
                    <Link 
                      to={createPageUrl(`Browse?make=${make}`)} 
                      className="text-gray-500 hover:text-white transition-colors text-sm"
                    >
                      {make}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-500">
                  <Phone className="w-4 h-4" />
                  <span>0800 DRIVE ZA</span>
                </li>
                <li className="text-gray-500">
                  hello@driveza.co.za
                </li>
                <li className="text-gray-500">
                  Mon - Fri: 8am - 6pm<br />
                  Sat: 9am - 2pm
                </li>
              </ul>
              
              {/* Newsletter */}
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-3">Subscribe for deals</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email address"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <Button size="icon" className="bg-gradient-to-r from-emerald-500 to-teal-500">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 DriveZA. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all z-40"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}