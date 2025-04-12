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
    <footer className="bg-dark-deeper relative overflow-hidden pt-20 border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple to-purple-dark rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">DF</span>
              </div>
              <span className="text-white font-bold text-xl">DeciFreelance</span>
            </Link>
            <p className="text-white/60 mb-6">
              A decentralized marketplace connecting global talent with innovative projects through blockchain technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-purple/20 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-purple/20 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-purple/20 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-purple/20 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#features" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Features</span>
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>How It Works</span>
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Categories</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Find Talent</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
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
                <Link href="/" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Documentation</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Crypto Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Community</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 hover:text-purple transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Help Center</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-white/60 mb-4">Stay updated with the latest features and releases</p>
            <div className="flex mb-6">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-white w-full focus:outline-none focus:border-purple/30"
              />
              <button className="bg-purple hover:bg-purple-deepdark text-white rounded-r-lg px-4 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-purple/10 border border-purple/20">
              <Wallet className="text-purple w-5 h-5 flex-shrink-0" />
              <p className="text-white/70 text-sm">Supports multiple blockchain networks</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/5 py-6 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} DeciFreelance. All rights reserved. Powered by blockchain technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
