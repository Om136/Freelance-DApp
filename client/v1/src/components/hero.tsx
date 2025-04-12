import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F0F13]">
      <div className="h-screen w-screen">
        <iframe
          src="https://my.spline.design/unchained-8hUw5POSdcae7jhZkEFOeuIa/"
          width="100%"
          height="100%"
        ></iframe>
      </div>

      {/* Content */}
      <div className="container px-6 absolute z-10 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
            <span className="text-sm font-medium text-emerald-400">
              Web3 Powered Freelance Marketplace
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
            Decentralized Talent Network for the Future of Work
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Connect, collaborate, and transact securely with global talent
            through blockchain-verified contracts and decentralized payments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-6 text-lg">
              Start Exploring
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 px-6 py-6 text-lg"
            >
              <span>Post a Project</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* <div className="mt-24 animate-bounce cursor-pointer" onClick={scrollToFeatures}>
            <ChevronDown className="mx-auto w-8 h-8 text-white/50" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
