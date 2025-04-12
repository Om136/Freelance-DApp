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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className='h-screen w-screen'>
        <iframe src='https://my.spline.design/unchained-8hUw5POSdcae7jhZkEFOeuIa/' width='100%' height='100%'></iframe>
        </div>
      

      {/* Content */}
      <div className="container px-6 absolute z-10 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1 rounded-full bg-white/5 border border-purple/20 backdrop-blur-sm">
            <span className="text-sm font-medium text-purple-light">Web3 Powered Freelance Marketplace</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-purple-light bg-clip-text text-transparent">
            Decentralized Talent Network for the Future of Work
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Connect, collaborate, and transact securely with global talent through blockchain-verified contracts and decentralized payments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-purple hover:bg-purple-deepdark text-white px-6 py-6 text-lg btn-glow">
              Start Exploring
            </Button>
            <Button variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:border-white/20 px-6 py-6 text-lg">
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
