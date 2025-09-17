import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/Navigation";
import { mockChatResponses } from "@/data/mockFloats";
import { Send, Bot, User, MapPin, TrendingUp, AlertCircle, CheckCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  response?: {
    answer: string;
    cited_floats: string[];
    confidence: number;
    visual_link: string;
    physics_check: { passed: boolean; notes: string };
  };
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Hello! I'm FloatChat, your AI assistant for ARGO ocean data. Ask me about salinity profiles, temperature trends, float locations, or any ocean data question!",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState<"Scientist" | "Policymaker" | "Student">("Scientist");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    "Show me salinity profiles near equator March 2023",
    "Compare BGC parameters in Arabian Sea last 6 months", 
    "Nearest floats to 14.5N, 72.9E",
    "Temperature anomalies in the last week",
    "Oxygen levels in the Indian Ocean",
    "Chlorophyll concentrations during monsoon"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (query: string) => {
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Find matching response or generate generic one
    const queryLower = query.toLowerCase();
    let response = Object.entries(mockChatResponses).find(([key]) => 
      queryLower.includes(key.split(" ")[0]) || queryLower.includes(key.split(" ")[1])
    )?.[1];

    if (!response) {
      response = {
        answer: `Based on available ARGO float data, I found relevant information for your query about "${query}". The analysis shows patterns consistent with expected oceanographic conditions in the region.`,
        cited_floats: ["ARGO001", "ARGO003"],
        confidence: 0.75,
        visual_link: "/dashboard",
        physics_check: { passed: true, notes: "Data passes basic validation checks" }
      };
    }

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "assistant", 
      content: response.answer,
      timestamp: new Date(),
      response
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
    
    toast.success("Analysis complete!", {
      description: `Found data from ${response.cited_floats.length} ARGO floats`
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-success";
    if (confidence >= 0.7) return "text-warning";
    return "text-destructive";
  };

  const getRoleContext = (role: string) => {
    switch (role) {
      case "Scientist":
        return "Detailed technical analysis with full methodology";
      case "Policymaker": 
        return "Executive summary with policy implications";
      case "Student":
        return "Educational explanation with learning resources";
      default:
        return "Standard analysis";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Navigation currentRole={currentRole} onRoleChange={setCurrentRole} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-ocean bg-clip-text text-transparent">FloatChat</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Ask the ocean. Get trusted answers.
          </p>
          <Badge variant="outline" className="mb-4">
            Context: {getRoleContext(currentRole)}
          </Badge>
        </div>

        {/* Suggested Queries */}
        <Card className="mb-6 shadow-float">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              <span>Try asking about...</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="justify-start h-auto p-3 text-left hover:bg-accent/50 transition-ocean"
                  onClick={() => handleSubmit(query)}
                >
                  <span className="text-sm">{query}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <div className="space-y-6 mb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-4 animate-fade-in",
                message.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.type === "assistant" && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-ocean flex items-center justify-center shadow-float">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-4 shadow-float transition-ocean",
                  message.type === "user" 
                    ? "bg-primary text-primary-foreground ml-12" 
                    : "bg-card text-card-foreground"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {message.response && (
                  <div className="mt-4 space-y-3">
                    <Separator />
                    
                    {/* Analysis Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Analysis Details</span>
                        <div className="flex items-center space-x-2">
                          {message.response.physics_check.passed ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                          <span className="text-xs text-muted-foreground">Physics Check</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Confidence: <span className={getConfidenceColor(message.response.confidence)}>
                            {(message.response.confidence * 100).toFixed(0)}%
                          </span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {message.response.cited_floats.length} floats cited
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <strong>Cited Floats:</strong> {message.response.cited_floats.join(", ")}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <strong>Validation:</strong> {message.response.physics_check.notes}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              
              {message.type === "user" && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-float">
                    <User className="h-5 w-5 text-secondary-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-ocean flex items-center justify-center shadow-float animate-float">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <div className="bg-card text-card-foreground rounded-lg p-4 shadow-float">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <span className="text-sm text-muted-foreground ml-2">Analyzing ocean data...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <Card className="shadow-depth sticky bottom-4">
          <CardContent className="p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(input);
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ARGO float data, ocean conditions, or specific locations..."
                className="flex-1 transition-ocean focus:shadow-float"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="ocean"
                disabled={isLoading || !input.trim()}
                className="px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;