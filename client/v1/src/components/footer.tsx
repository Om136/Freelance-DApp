import { 
  Twitter, 
  Github, 
  Linkedin, 
  MessageCircle, 
  ChevronRight,
  Wallet
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 relative overflow-hidden pt-20 border-t border-zinc-700">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-zinc-900"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold">DF</span>
              </div>
              <span className="text-white font-bold text-xl">DeciFreelance</span>
            </Link>
            <p className="text-zinc-400 mb-6">
              A decentralized marketplace connecting global talent with innovative projects through blockchain technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#features" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Features</span>
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>How It Works</span>
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Categories</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Find Talent</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Find Work</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Documentation</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Crypto Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Community</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Help Center</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-zinc-400 mb-4">Stay updated with the latest features and releases</p>
            <div className="flex mb-6">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-zinc-800 border border-zinc-700 rounded-l-lg px-4 py-2 text-zinc-300 w-full focus:outline-none focus:border-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-r-lg px-4 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Wallet className="text-emerald-400 w-5 h-5 flex-shrink-0" />
              <p className="text-zinc-300 text-sm">Supports multiple blockchain networks</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-zinc-700 py-6 text-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} DeciFreelance. All rights reserved. Powered by blockchain technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
