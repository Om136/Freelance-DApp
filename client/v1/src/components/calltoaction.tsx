import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Complex Blockchain Visualization */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="emeraldGlow" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>
          </defs>

          {/* Hexagonal grid pattern - blockchain inspired */}
          <pattern
            id="hexGrid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M5,0 L10,2.5 L10,7.5 L5,10 L0,7.5 L0,2.5 Z"
              fill="none"
              stroke="rgba(16, 185, 129, 0.1)"
              strokeWidth="0.2"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#hexGrid)" />

          {/* Glowing Path */}
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="url(#emeraldGlow)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-5xl mx-auto glass-panel overflow-hidden">
          <div className="p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-emerald-400">
              Ready to Join the Decentralized Economy?
            </h2>
            <p className="text-lg text-zinc-300 mb-8 max-w-3xl mx-auto">
              Start earning or hiring with crypto payments, smart contracts, and
              blockchain-verified credentials today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
                Launch App
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 px-8 py-6 text-lg"
              >
                <span>Learn More</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
