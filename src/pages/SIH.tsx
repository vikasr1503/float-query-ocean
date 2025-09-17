import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Lightbulb, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Globe,
  ArrowRight,
  Award,
  Book
} from "lucide-react";

const SIH = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Title Slide */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-ocean bg-clip-text text-transparent">FloatChat</span>
          </h1>
          <p className="text-2xl text-muted-foreground mb-6">
            AI-Powered Ocean Data Portal for ARGO Float Analytics
          </p>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Problem Statement ID: SIH-2025-OCEAN-001
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Smart India Hackathon 2025
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            "Ask the ocean. Get trusted answers." - Revolutionizing oceanographic research 
            through conversational AI and real-time data visualization.
          </p>
        </div>

        {/* Problem Statement & Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-ocean">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-destructive" />
                <span>Problem Statement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Current ocean data analysis systems are fragmented, requiring extensive technical 
                knowledge and manual processing. Researchers, policymakers, and students struggle 
                to access, interpret, and validate oceanographic data efficiently.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  <span>Complex data formats and access methods</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  <span>Lack of real-time anomaly detection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  <span>Limited physics-based validation tools</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  <span>Inadequate decision-support systems</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-ocean">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                <span>Our Solution</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                FloatChat is an AI-powered conversational interface that democratizes access to 
                ARGO float data through natural language queries, real-time visualization, 
                and automated validation.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span>Natural language query interface with RAG-powered responses</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span>Interactive dashboard with real-time data visualization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span>Automated physics validation and anomaly detection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span>Role-based interfaces for different user types</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Unique Contributions */}
        <Card className="shadow-depth mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-primary" />
              <span>Unique Contributions & Innovation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold">Conversational Ocean Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      First-of-its-kind natural language interface for ARGO data queries with 
                      confidence scoring and source attribution.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold">Real-time Physics Validation</h4>
                    <p className="text-sm text-muted-foreground">
                      Automated T-S relationship validation and density consistency checks 
                      with climatology-based anomaly detection.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold">Multi-Stakeholder Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Adaptive UI/UX that transforms complexity based on user role - from 
                      detailed scientific analysis to policy summaries.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold">Decision-Ready Exports</h4>
                    <p className="text-sm text-muted-foreground">
                      Automated generation of publication-ready reports with confidence 
                      metrics and validation status for immediate decision-making.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feasibility & Implementation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-float">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-success" />
                <span>Technical Feasibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React + TypeScript</Badge>
                    <Badge variant="outline">Node.js + Express</Badge>
                    <Badge variant="outline">RAG Architecture</Badge>
                    <Badge variant="outline">Leaflet Maps</Badge>
                    <Badge variant="outline">Recharts</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Data Integration</h4>
                  <ul className="text-sm space-y-1">
                    <li>• ARGO Global Data Assembly Centre (GDAC) APIs</li>
                    <li>• Real-time data streaming capabilities</li>
                    <li>• Scalable vector database for RAG implementation</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Development Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">MVP Development</span>
                      <Badge variant="secondary">4 weeks</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Full Implementation</span>
                      <Badge variant="secondary">12 weeks</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-float">  
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-accent" />
                <span>Impact & Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Target Beneficiaries</span>
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• 1000+ Ocean researchers and scientists</li>
                    <li>• 500+ Policy makers and government agencies</li>
                    <li>• 5000+ Students and educators</li>
                    <li>• Maritime industry stakeholders</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Quantifiable Impact</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <div className="text-lg font-bold text-success">80%</div>
                      <div className="text-xs text-muted-foreground">Time Reduction</div>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-lg font-bold text-primary">24/7</div>
                      <div className="text-xs text-muted-foreground">Monitoring</div>
                    </div>
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="text-lg font-bold text-accent">95%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-warning/10 rounded-lg">
                      <div className="text-lg font-bold text-warning">3x</div>
                      <div className="text-xs text-muted-foreground">Faster Analysis</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research & References */}
        <Card className="shadow-ocean mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-primary" />
              <span>Research Foundation & References</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Key Research Papers</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Roemmich et al. (2019): "On the Future of Argo: A Global, Full-Depth Ocean Observing System"</li>
                  <li>• Wong et al. (2020): "Argo Data Quality Control Manual"</li>
                  <li>• Maze et al. (2017): "Coherent Heat Patterns from Argo Data"</li>
                  <li>• Gould et al. (2004): "From Swallow Floats to Argo—The Development of Neutrally Buoyant Floats"</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Technical Standards</h4>
                <ul className="space-y-2 text-sm">
                  <li>• ARGO Data Management Handbook</li>
                  <li>• NetCDF Climate and Forecast Conventions</li>
                  <li>• OceanOPS Technical Guidelines</li>
                  <li>• GODAE OceanView Best Practices</li>
                </ul>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-center">
              <h4 className="font-medium mb-3">Data Sources & Partnerships</h4>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline">ARGO Global Data Assembly Centre</Badge>
                <Badge variant="outline">INCOIS, Hyderabad</Badge>
                <Badge variant="outline">NIOT, Chennai</Badge>
                <Badge variant="outline">Copernicus Marine Service</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Ocean Data Analysis?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Experience the future of oceanographic research with FloatChat. 
            Join us in making ocean data accessible, actionable, and impactful for all stakeholders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Try the Demo
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIH;