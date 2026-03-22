import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coins, Info, Mail, Shield, FileText, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Calculator', path: '/', icon: <Coins className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl">
      <div className="glass rounded-[2rem] px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-all duration-300">
            <Coins className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-slate-900">
            Loot<span className="text-indigo-600">Splitter</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-all duration-300 hover:text-indigo-600 ${
                location.pathname === link.path ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden absolute top-full left-0 right-0 glass rounded-[2rem] mt-2 overflow-hidden p-4"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    location.pathname === link.path
                      ? 'bg-indigo-500/10 text-indigo-600'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="mt-40 border-t border-slate-100 bg-slate-50/50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <Coins className="w-6 h-6 text-indigo-600" />
              <span className="font-display font-bold text-2xl text-slate-900">LootSplitter</span>
            </Link>
            <p className="text-slate-500 max-w-sm leading-relaxed text-lg">
              The definitive tool for modern adventuring parties. 
              Mathematically perfect loot distribution.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-slate-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-500 hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-widest text-xs">Connect</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-slate-500 hover:text-indigo-600 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-100 text-center text-slate-400 text-xs uppercase tracking-widest font-medium">
          <p>© {new Date().getFullYear()} LootSplitter. Not affiliated with Wizards of the Coast.</p>
        </div>
      </div>
    </footer>
  );
};

const AdPlaceholder = ({ label = "Advertisement", className = "" }) => (
  <div className={`w-full bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center min-h-[100px] p-4 ${className}`}>
    <span className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em]">{label}</span>
  </div>
);

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 -mb-16">
      <ol className="flex items-center space-x-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
        <li>
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const label = value.replace(/-/g, ' ');

          return (
            <li key={to} className="flex items-center space-x-2">
              <span>/</span>
              {last ? (
                <span className="text-indigo-600 font-bold">{label}</span>
              ) : (
                <Link to={to} className="hover:text-indigo-600 transition-colors">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://ais-dev-zvekkqiqa2cw3xqejfibak-23495064725.europe-west2.run.app/"
            },
            ...pathnames.map((value, index) => ({
              "@type": "ListItem",
              "position": index + 2,
              "name": value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' '),
              "item": `https://ais-dev-zvekkqiqa2cw3xqejfibak-23495064725.europe-west2.run.app/${pathnames.slice(0, index + 1).join('/')}`
            }))
          ]
        })}
      </script>
    </nav>
  );
};

export { Navbar, Footer, AdPlaceholder, Breadcrumbs };

