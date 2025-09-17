import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import { mockFloats, mockAlerts } from "@/data/mockFloats";
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  AlertTriangle, 
  Download,
  Eye,
  BarChart3,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Dashboard = () => {
  const [selectedFloat, setSelectedFloat] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<"Scientist" | "Policymaker" | "Student">("Scientist");
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const selectedFloatData = selectedFloat 
    ? mockFloats.find(f => f.id === selectedFloat)
    : mockFloats[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-success";
      case "anomaly": return "text-destructive";
      case "inactive": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "anomaly": return "destructive";
      case "inactive": return "secondary";
      default: return "secondary";
    }
  };

  const handleExport = (format: "csv" | "pdf") => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`, {
      description: "Your ocean data report will be ready shortly"
    });
  };

  const getRoleView = () => {
    switch (currentRole) {
      case "Scientist":
        return {
          title: "Scientific Analysis Dashboard",
          description: "Comprehensive oceanographic data analysis and validation",
          showAdvanced: true
        };
      case "Policymaker":
        return {
          title: "Ocean Policy Dashboard", 
          description: "Executive summary of ocean conditions and policy implications",
          showAdvanced: false
        };
      case "Student":
        return {
          title: "Ocean Learning Dashboard",
          description: "Educational exploration of oceanographic data",
          showAdvanced: false
        };
    }
  };

  const roleView = getRoleView();

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Navigation currentRole={currentRole} onRoleChange={setCurrentRole} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-ocean bg-clip-text text-transparent">
              {roleView.title}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {roleView.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Activity className="h-3 w-3" />
              <span>{mockFloats.filter(f => f.status === 'active').length} Active Floats</span>
            </Badge>
            <Badge variant="destructive" className="flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>{mockFloats.filter(f => f.status === 'anomaly').length} Anomalies</span>
            </Badge>
            <Button 
              variant="float" 
              size="sm"
              onClick={() => handleExport("pdf")}
              className="flex items-center space-x-1"
            >
              <Download className="h-3 w-3" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>ARGO Float Locations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-gradient-depth rounded-lg overflow-hidden">
                  {!mapLoaded ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-sm text-primary-foreground">Loading ocean map...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      {/* Simulated Map with Float Markers */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20">
                        {mockFloats.map((float, index) => (
                          <div
                            key={float.id}
                            className={cn(
                              "absolute w-4 h-4 rounded-full cursor-pointer transition-ocean hover:scale-125",
                              float.status === 'active' && "bg-success animate-float",
                              float.status === 'anomaly' && "bg-destructive animate-bounce",
                              float.status === 'inactive' && "bg-muted-foreground",
                              selectedFloat === float.id && "ring-4 ring-primary ring-opacity-50 scale-125"
                            )}
                            style={{
                              left: `${20 + (index * 15) % 60}%`,
                              top: `${30 + (index * 10) % 40}%`,
                            }}
                            onClick={() => setSelectedFloat(float.id)}
                            title={`${float.id} - ${float.region}`}
                          />
                        ))}
                      </div>
                      
                      {/* Map Legend */}
                      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 shadow-float">
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-success rounded-full" />
                            <span>Active Float</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-destructive rounded-full" />
                            <span>Anomaly Detected</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                            <span>Inactive Float</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Float Details Panel */}
          <div className="space-y-6">
            {/* Selected Float Info */}
            <Card className="shadow-float">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Float Details</span>
                  <Badge variant={getStatusBadge(selectedFloatData?.status || "inactive")}>
                    {selectedFloatData?.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFloatData && (
                  <>
                    <div>
                      <h4 className="font-semibold text-lg">{selectedFloatData.id}</h4>
                      <p className="text-sm text-muted-foreground">{selectedFloatData.region}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-secondary/20 rounded-lg">
                        <Thermometer className="h-5 w-5 text-destructive mx-auto mb-1" />
                        <div className="text-sm font-medium">
                          {selectedFloatData.profile.temperature[0]}°C
                        </div>
                        <div className="text-xs text-muted-foreground">Surface Temp</div>
                      </div>
                      
                      <div className="text-center p-3 bg-secondary/20 rounded-lg">
                        <Droplets className="h-5 w-5 text-accent mx-auto mb-1" />
                        <div className="text-sm font-medium">
                          {selectedFloatData.profile.salinity[0]} PSU
                        </div>
                        <div className="text-xs text-muted-foreground">Surface Salinity</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Position:</span>
                        <span>{selectedFloatData.lat.toFixed(2)}°N, {selectedFloatData.lng.toFixed(2)}°E</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Last Update:</span>
                        <span>{new Date(selectedFloatData.lastUpdate).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    
                    <Button variant="ocean" className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Profile
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card className="shadow-float">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Active Alerts</span>
                  <Badge variant="destructive">{mockAlerts.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border border-destructive/20 rounded-lg bg-destructive/5">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="destructive" className="text-xs">
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      Float: {alert.floatId}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Charts */}
        <div className="mt-8">
          <Tabs defaultValue="profiles" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profiles">Temperature Profiles</TabsTrigger>
              <TabsTrigger value="timeseries">Time Series</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profiles">
              <Card className="shadow-ocean">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Depth vs Temperature Profile</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-b from-accent/10 to-primary/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4 animate-float" />
                      <p className="text-lg font-medium">Interactive Chart Placeholder</p>
                      <p className="text-sm text-muted-foreground">
                        Real implementation would show Recharts/D3 visualization
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeseries">
              <Card className="shadow-ocean">
                <CardHeader>
                  <CardTitle>Regional Time Series</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="h-12 w-12 text-accent mx-auto mb-4 animate-wave" />
                      <p className="text-lg font-medium">Time Series Chart</p>
                      <p className="text-sm text-muted-foreground">
                        Historical data trends and patterns
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-float">
                  <CardHeader>
                    <CardTitle>Physics Validation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <span className="text-sm">Density Consistency</span>
                        <Badge variant="default" className="bg-success text-success-foreground">Passed</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <span className="text-sm">T-S Relationship</span>
                        <Badge variant="default" className="bg-success text-success-foreground">Valid</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                        <span className="text-sm">Climatology Check</span>
                        <Badge variant="default" className="bg-warning text-warning-foreground">Review</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-float">
                  <CardHeader>
                    <CardTitle>Data Quality Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Completeness</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: "94%" }} />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Accuracy</span>
                        <span className="text-sm font-medium">98%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: "98%" }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;