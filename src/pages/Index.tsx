import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { 
  Waves, 
  MessageCircle, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  ArrowRight,
  Play,
  Download,
  Users,
  TrendingUp,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// Hero background animation component
const OceanWaves = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/40" />
    <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full animate-float" />
    <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full animate-wave" />
    <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary-glow/30 rounded-full animate-ripple" style={{ animationDelay: "1s" }} />
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<"Scientist" | "Policymaker" | "Student">("Scientist");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until component is mounted and router context is available
  if (!mounted) {
    return <div className="min-h-screen bg-gradient-depth flex items-center justify-center">
      <div className="text-primary-foreground">Loading...</div>
    </div>;
  }

  const features = [
    {
      icon: MessageCircle,
      title: "Conversational AI",
      description: "Ask questions in natural language and get trusted answers from ARGO float data",
      color: "text-primary"
    },
    {
      icon: BarChart3, 
      title: "Interactive Dashboard",
      description: "Visualize ocean data with maps, charts, and real-time monitoring tools",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Physics Validation",
      description: "Automated consistency checks and climatology-based anomaly detection",
      color: "text-success"
    },
    {
      icon: Zap,
      title: "Real-time Alerts",
      description: "Instant notifications for ocean anomalies and critical conditions",
      color: "text-warning"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access data from 4000+ ARGO floats worldwide with continuous updates",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Multi-Role Design",
      description: "Tailored interfaces for scientists, policymakers, and students",
      color: "text-accent"
    }
  ];

  const stats = [
    { label: "ARGO Floats", value: "4,000+", icon: Waves },
    { label: "Ocean Profiles", value: "2M+", icon: TrendingUp },
    { label: "Countries Served", value: "30+", icon: Globe },
    { label: "Data Points", value: "500M+", icon: BarChart3 }
  ];

  const useCases = [
    {
      role: "Scientist",
      title: "Research & Analysis",
      description: "Deep dive into oceanographic data with advanced analytics and validation tools",
      examples: ["Temperature-salinity analysis", "BGC parameter studies", "Climate research"]
    },
    {
      role: "Policymaker", 
      title: "Decision Support",
      description: "Get executive summaries and policy-relevant insights from ocean data",
      examples: ["Coastal management", "Climate policy", "Maritime safety"]
    },
    {
      role: "Student",
      title: "Education & Learning",
      description: "Explore ocean science through interactive tools and guided analysis",
      examples: ["Ocean circulation", "Climate patterns", "Data literacy"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation currentRole={currentRole} onRoleChange={setCurrentRole} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-depth overflow-hidden">
        <OceanWaves />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm animate-fade-in">
              <Sparkles className="h-4 w-4 mr-2" />
              Smart India Hackathon 2025 • Ocean Data Innovation
            </Badge>
            
            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
              <span className="text-primary-foreground">Ask the </span>
              <span className="gradient-ocean-text">Ocean</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-2xl md:text-3xl text-primary-foreground/90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Get trusted answers from AI-powered ARGO float analytics
            </p>
            
            {/* Description */}
            <p className="text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
              FloatChat revolutionizes oceanographic research with conversational AI, 
              real-time visualization, and automated validation for scientists, 
              policymakers, and students worldwide.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate("/chat")}
                className="group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-ocean" />
                Try FloatChat Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-ocean" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                View Dashboard
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => navigate("/sih")}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Download className="h-5 w-5 mr-2" />
                SIH Details
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="h-8 w-8 text-primary-foreground/60 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                    <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-ocean bg-clip-text text-transparent">Powerful Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI capabilities designed for modern oceanographic research and decision-making
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-float hover:shadow-ocean transition-ocean hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-ocean rounded-lg shadow-float">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Built for <span className="gradient-ocean bg-clip-text text-transparent">Every Ocean Stakeholder</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Adaptive interfaces and tailored experiences for different user needs and expertise levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card 
                key={index} 
                className={cn(
                  "shadow-depth hover:shadow-ocean transition-ocean cursor-pointer",
                  currentRole === useCase.role && "ring-2 ring-primary shadow-ocean"
                )}
                onClick={() => setCurrentRole(useCase.role as any)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{useCase.title}</CardTitle>
                    <Badge 
                      variant={currentRole === useCase.role ? "default" : "secondary"}
                      className="transition-ocean"
                    >
                      {useCase.role}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-primary">Example Use Cases:</h4>
                  <ul className="space-y-2">
                    {useCase.examples.map((example, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-ocean text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Ocean Research?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of researchers, policymakers, and students who trust FloatChat 
            for their oceanographic data analysis needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate("/chat")}
              className="group"
            >
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-ocean" />
              Start Chatting with Ocean Data
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-ocean" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Explore the Dashboard
            </Button>
          </div>
          
          <div className="text-center opacity-75">
            <p className="text-sm">
              🌊 Powered by ARGO Global Ocean Observing System • 
              🚀 Smart India Hackathon 2025 Innovation
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Waves className="h-6 w-6 text-primary animate-wave" />
              <span className="text-xl font-bold gradient-ocean bg-clip-text text-transparent">
                FloatChat
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <button onClick={() => navigate("/sih")}>SIH 2025</button>
              <button onClick={() => navigate("/chat")}>Demo</button>
              <button onClick={() => navigate("/dashboard")}>Dashboard</button>
              <span>© 2025 FloatChat Team</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;