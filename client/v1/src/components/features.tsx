import { 
    Lock, 
    Wallet, 
    Users, 
    Globe, 
    Shield, 
    Cpu 
  } from 'lucide-react';
  import { Card } from '@/components/ui/card';
  
  interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
      <Card className="group bg-gradient-to-br from-emerald-500/10 to-zinc-900 border-0 overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-emerald-500/50">
        <div className="h-full p-6 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-all duration-300">{title}</h3>
          <p className="text-zinc-300 flex-grow">{description}</p>
        </div>
      </Card>
    );
  };
  
  const Features = () => {
    const features = [
      {
        icon: <Shield className="w-6 h-6 text-emerald-400" />,
        title: "Smart Contracts",
        description: "Automate payment releases and project milestones with blockchain-powered smart contracts."
      },
      {
        icon: <Wallet className="w-6 h-6 text-emerald-400" />,
        title: "Crypto Payments",
        description: "Send and receive payments globally in various cryptocurrencies with minimal fees."
      },
      {
        icon: <Users className="w-6 h-6 text-emerald-400" />,
        title: "Decentralized Reputation",
        description: "Build an immutable reputation score stored on the blockchain that follows you everywhere."
      },
      {
        icon: <Globe className="w-6 h-6 text-emerald-400" />,
        title: "Global Access",
        description: "Connect with talent and clients from anywhere without regional restrictions or banks."
      },
      {
        icon: <Lock className="w-6 h-6 text-emerald-400" />,
        title: "Privacy Protection",
        description: "Own your data with advanced encryption and decentralized identity management."
      },
      {
        icon: <Cpu className="w-6 h-6 text-emerald-400" />,
        title: "AI Matching",
        description: "Find the perfect talent-client match with our decentralized AI recommendation engine."
      }
    ];
  
    return (
      <section id="features" className="relative py-20 bg-black overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Digital circuit pattern in background */}
        <div className="absolute inset-0">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10,30 L30,30 L30,10 L50,10 L50,30 L70,30 L70,50 L90,50 L90,70 L70,70 L70,90 L50,90 L50,70 L30,70 L30,50 L10,50 Z" 
                  stroke="rgba(16, 185, 129, 0.1)" 
                  strokeWidth="0.5" 
                  fill="none" />
            <path d="M0,20 L100,20" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.2" fill="none" />
            <path d="M0,40 L100,40" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.2" fill="none" />
            <path d="M0,60 L100,60" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.2" fill="none" />
            <path d="M0,80 L100,80" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.2" fill="none" />
            <path d="M20,0 L20,100" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.2" fill="none" />
            <path d="M40,0 L40,100" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.2" fill="none" />
            <path d="M60,0 L60,100" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.2" fill="none" />
            <path d="M80,0 L80,100" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>
        
        {/* Subtle gradient glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[150px] opacity-50"></div>
        
        <div className="container px-6 mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-400">Powered by Blockchain</h2>
            <p className="text-lg text-zinc-300">Experience the next evolution of freelancing with these revolutionary Web3 features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
