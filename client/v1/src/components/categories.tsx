import { 
    Code, 
    PenTool, 
    BarChart3, 
    Megaphone, 
    FileText, 
    Globe, 
    VideoIcon, 
    Headphones 
  } from 'lucide-react';
  import { Card } from '@/components/ui/card';
  import { cn } from '@/lib/utils';
  
  interface CategoryCardProps {
    icon: React.ReactNode;
    title: string;
    jobCount: number;
    color?: string;
  }
  
  const CategoryCard = ({ icon, title, jobCount, color = "bg-emerald" }: CategoryCardProps) => {
    return (
      <Card className="group border-0 overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1">
        <div className="bg-gradient-to-br from-emerald-500/10 to-zinc-900 p-6 h-full flex flex-col items-center text-center">
          <div className={cn(
            "w-14 h-14 rounded-lg mb-4 flex items-center justify-center transition-colors",
            `${color}/10 group-hover:${color}/20`
          )}>
            <div className="group-hover:text-white transition-colors">
              {icon}
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2 text-white group-hover:text-emerald-400 transition-all duration-300">{title}</h3>
          <p className="text-zinc-300 text-sm">{jobCount} active jobs</p>
        </div>
      </Card>
    );
  };
  
  const Categories = () => {
    const categories = [
      {
        icon: <Code className="w-6 h-6 text-emerald-400 group-hover:text-white" />,
        title: "Development & Programming",
        jobCount: 2543
      },
      {
        icon: <PenTool className="w-6 h-6 text-emerald-400 group-hover:text-white" />,
        title: "Design & Creative",
        jobCount: 1879,
        color: "bg-emerald"
      },
      {
        icon: <BarChart3 className="w-6 h-6 text-emerald-400 group-hover:text-white" />,
        title: "Finance & Blockchain",
        jobCount: 1456
      },
      {
        icon: <Megaphone className="w-6 h-6 text-emerald-400 group-hover:text-white" />,
        title: "Marketing & SEO",
        jobCount: 1245,
        color: "bg-emerald"
      },
      {
        icon: <FileText className="w-6 h-6 text-emerald-400 group-hover:text-white" />,
        title: "Writing & Translation",
        jobCount: 1120
      },
      {
        icon: <Globe className="w-6 h-6 text-emerald-400 group-hover:text-white" />,
        title: "Web3 & NFT Services",
        jobCount: 986,
        color: "bg-emerald"
      },
      {
        icon: <VideoIcon className="w-6 h-6 text-emerald-400 group-hover:text-white" />,
        title: "Video & Animation",
        jobCount: 854
      },
      {
        icon: <Headphones className="w-6 h-6 text-emerald-400 group-hover:text-white" />,
        title: "Music & Audio",
        jobCount: 765,
        color: "bg-emerald"
      }
    ];
  
    return (
      <section id="categories" className="py-20 relative overflow-hidden bg-black">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Complex Blockchain Visualization */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="smallGrid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.2"/>
              </pattern>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="url(#smallGrid)"/>
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="0.2"/>
              </pattern>
            </defs>
            
            <rect width="100" height="100" fill="url(#grid)" opacity="0.2"/>
            
            {/* Digital data flow visualization */}
            <path d="M0,20 Q30,40 50,20 T100,30" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.3" strokeDasharray="1,2" />
            <path d="M0,40 Q40,60 70,40 T100,50" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.3" strokeDasharray="1,2" />
            <path d="M0,70 Q20,50 50,70 T100,60" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.3" strokeDasharray="1,2" />
          </svg>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px] opacity-30"></div>
        
        <div className="container px-6 mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-400">Explore Categories</h2>
            <p className="text-lg text-zinc-300">Browse top skills in demand on the decentralized marketplace</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard 
                key={index}
                icon={category.icon}
                title={category.title}
                jobCount={category.jobCount}
                color={category.color}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Categories;
