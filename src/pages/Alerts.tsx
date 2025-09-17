import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockAlerts, mockFloats } from "@/data/mockFloats";
import { 
  AlertTriangle, 
  Bell, 
  Clock, 
  MapPin, 
  Thermometer, 
  Droplets,
  Send,
  Eye,
  CheckCircle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Alerts = () => {
  const [currentRole, setCurrentRole] = useState<"Scientist" | "Policymaker" | "Student">("Scientist");
  const [alertStatus, setAlertStatus] = useState<{[key: string]: 'active' | 'acknowledged' | 'resolved'}>({
    ALT001: 'active',
    ALT002: 'active'
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive bg-destructive/10 border-destructive/20";
      case "medium": return "text-warning bg-warning/10 border-warning/20";
      case "low": return "text-success bg-success/10 border-success/20";
      default: return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "outline";
    }
  };

  const handleAlertAction = (alertId: string, action: 'acknowledge' | 'resolve' | 'send') => {
    if (action === 'send') {
      toast.success("Alert sent to coastal authorities", {
        description: "Emergency response teams have been notified"
      });
    } else {
      setAlertStatus(prev => ({
        ...prev,
        [alertId]: action === 'acknowledge' ? 'acknowledged' : 'resolved'
      }));
      toast.success(`Alert ${action}d successfully`);
    }
  };

  const getAlertStatusIcon = (alertId: string) => {
    const status = alertStatus[alertId];
    switch (status) {
      case 'acknowledged': return <CheckCircle className="h-4 w-4 text-warning" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Navigation currentRole={currentRole} onRoleChange={setCurrentRole} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-ocean-text">Ocean Alert System</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Real-time monitoring and anomaly detection for ARGO float data
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="destructive" className="flex items-center space-x-1">
              <Bell className="h-3 w-3" />
              <span>{mockAlerts.length} Active Alerts</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>Arabian Sea Region</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Last Update: {new Date().toLocaleTimeString()}</span>
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Alerts */}
          <div className="lg:col-span-2">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span>Active Alerts</span>
                  </div>
                  <Badge variant="destructive">{mockAlerts.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAlerts.map((alert) => {
                  const floatData = mockFloats.find(f => f.id === alert.floatId);
                  return (
                    <Card key={alert.id} className={cn("shadow-float", getSeverityColor(alert.severity))}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            {getAlertStatusIcon(alert.id)}
                            <Badge variant={getSeverityBadge(alert.severity) as any}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">{alert.type.replace('_', ' ').toUpperCase()}</h4>
                          <p className="text-sm">{alert.message}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 p-3 bg-secondary/20 rounded-lg">
                          <div>
                            <span className="text-xs text-muted-foreground">Float ID</span>
                            <div className="font-medium">{alert.floatId}</div>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">Location</span>
                            <div className="font-medium">
                              {alert.location.lat.toFixed(2)}°N, {alert.location.lng.toFixed(2)}°E
                            </div>
                          </div>
                        </div>

                        {floatData && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-destructive/10 rounded-lg">
                              <Thermometer className="h-5 w-5 text-destructive mx-auto mb-1" />
                              <div className="text-sm font-medium">
                                {floatData.profile.temperature[0]}°C
                              </div>
                              <div className="text-xs text-muted-foreground">Current Temp</div>
                            </div>
                            
                            <div className="text-center p-3 bg-accent/10 rounded-lg">
                              <Droplets className="h-5 w-5 text-accent mx-auto mb-1" />
                              <div className="text-sm font-medium">
                                {floatData.profile.salinity[0]} PSU
                              </div>
                              <div className="text-xs text-muted-foreground">Current Salinity</div>
                            </div>
                          </div>
                        )}

                        <Separator />
                        
                        <div className="flex flex-wrap gap-2">
                          {alertStatus[alert.id] === 'active' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                                className="flex-1"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Acknowledge
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleAlertAction(alert.id, 'send')}
                                className="flex-1"
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Send Alert
                              </Button>
                            </>
                          )}
                          
                          {alertStatus[alert.id] === 'acknowledged' && (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleAlertAction(alert.id, 'resolve')}
                              className="flex-1"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Resolved
                            </Button>
                          )}
                          
                          {alertStatus[alert.id] === 'resolved' && (
                            <Badge variant="default" className="flex-1 justify-center py-2">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolved
                            </Badge>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toast.info("Opening float details...")}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Float
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Alert Statistics */}
          <div className="space-y-6">
            <Card className="shadow-float">
              <CardHeader>
                <CardTitle>Alert Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
                    <span className="text-sm font-medium">High Priority</span>
                    <Badge variant="destructive">1</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                    <span className="text-sm font-medium">Medium Priority</span>
                    <Badge variant="secondary">1</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                    <span className="text-sm font-medium">Low Priority</span>
                    <Badge variant="outline">0</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">&lt; 5 min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Resolution Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Monitors</span>
                    <span className="font-medium">{mockFloats.filter(f => f.status === 'active').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-float">
              <CardHeader>
                <CardTitle>Alert Recipients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm">Coastal Authority</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm">Maritime Safety</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm">Research Team</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm">Fisheries Dept</span>
                    <Badge variant="secondary">Standby</Badge>
                  </div>
                </div>
                
                <Button variant="ocean" size="sm" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Configure Recipients
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;