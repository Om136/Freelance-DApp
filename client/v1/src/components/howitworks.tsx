import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  isActive?: boolean;
}

const StepCard = ({
  number,
  title,
  description,
  isActive = false,
}: StepCardProps) => {
  return (
    <Card
      className={cn(
        "relative border-0 overflow-hidden transition-all duration-300",
        isActive
          ? "bg-gradient-to-br from-emerald-500/20 to-zinc-900 shadow-lg"
          : "bg-zinc-900/50"
      )}
    >
      <div className="p-6">
        <div
          className={cn(
            "flex items-center gap-4 mb-4",
            isActive && "text-emerald-400"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold",
              isActive
                ? "bg-emerald-500 text-black"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700"
            )}
          >
            {number}
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-zinc-400">{description}</p>
      </div>
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300"></div>
      )}
    </Card>
  );
};

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-500/10"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-500/10"></div>

      {/* Blockchain Node Visualization */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Node points */}
          <g filter="url(#glow)">
            <circle cx="10" cy="20" r="0.5" fill="#9b87f5" />
            <circle cx="25" cy="10" r="0.5" fill="#9b87f5" />
            <circle cx="40" cy="30" r="0.5" fill="#9b87f5" />
            <circle cx="60" cy="15" r="0.5" fill="#9b87f5" />
            <circle cx="75" cy="35" r="0.5" fill="#9b87f5" />
            <circle cx="90" cy="25" r="0.5" fill="#9b87f5" />
            <circle cx="15" cy="50" r="0.5" fill="#9b87f5" />
            <circle cx="35" cy="65" r="0.5" fill="#9b87f5" />
            <circle cx="55" cy="50" r="0.5" fill="#9b87f5" />
            <circle cx="70" cy="75" r="0.5" fill="#9b87f5" />
            <circle cx="85" cy="60" r="0.5" fill="#9b87f5" />
            <circle cx="25" cy="85" r="0.5" fill="#9b87f5" />
            <circle cx="45" cy="95" r="0.5" fill="#9b87f5" />
            <circle cx="65" cy="90" r="0.5" fill="#9b87f5" />
            <circle cx="80" cy="80" r="0.5" fill="#9b87f5" />
          </g>

          {/* Connection lines */}
          <g opacity="0.2">
            <line
              x1="10"
              y1="20"
              x2="25"
              y2="10"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="25"
              y1="10"
              x2="40"
              y2="30"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="40"
              y1="30"
              x2="60"
              y2="15"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="60"
              y1="15"
              x2="75"
              y2="35"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="75"
              y1="35"
              x2="90"
              y2="25"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="15"
              y1="50"
              x2="35"
              y2="65"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="35"
              y1="65"
              x2="55"
              y2="50"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="55"
              y1="50"
              x2="70"
              y2="75"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="70"
              y1="75"
              x2="85"
              y2="60"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="25"
              y1="85"
              x2="45"
              y2="95"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="45"
              y1="95"
              x2="65"
              y2="90"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="65"
              y1="90"
              x2="80"
              y2="80"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="40"
              y1="30"
              x2="15"
              y2="50"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="60"
              y1="15"
              x2="55"
              y2="50"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="75"
              y1="35"
              x2="70"
              y2="75"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="90"
              y1="25"
              x2="85"
              y2="60"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="35"
              y1="65"
              x2="25"
              y2="85"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="55"
              y1="50"
              x2="65"
              y2="90"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
            <line
              x1="70"
              y1="75"
              x2="80"
              y2="80"
              stroke="#9b87f5"
              strokeWidth="0.1"
            />
          </g>
        </svg>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-400">
            How It Works
          </h2>
          <p className="text-lg text-zinc-400">
            Simple steps to start working in the decentralized economy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <StepCard
            number={1}
            title="Connect Wallet"
            description="Link your crypto wallet to create your decentralized identity on the platform."
            isActive={true}
          />
          <StepCard
            number={2}
            title="Create Profile"
            description="Build your profile showcasing skills, portfolio and services you offer."
          />
          <StepCard
            number={3}
            title="Find Projects"
            description="Discover opportunities or post your own projects for freelancers."
          />
          <StepCard
            number={4}
            title="Get Paid"
            description="Complete work and receive crypto payments directly to your wallet."
          />
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="p-6 bg-zinc-800/50 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-white">
              Secure Escrow System
            </h3>
            <p className="text-zinc-400">
              Funds are held in secure smart contracts until work is approved.
              Our decentralized escrow system ensures both clients and
              freelancers are protected throughout the entire process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
