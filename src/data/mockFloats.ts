// Mock ARGO Float Data for FloatChat Demo
export interface ArgoFloat {
  id: string;
  lat: number;
  lng: number;
  profile: {
    depth: number[];
    temperature: number[];
    salinity: number[];
    timestamp: string;
  };
  region: string;
  status: 'active' | 'anomaly' | 'inactive';
  lastUpdate: string;
}

export const mockFloats: ArgoFloat[] = [
  {
    id: "ARGO001",
    lat: 15.5,
    lng: 68.7,
    profile: {
      depth: [0, 10, 50, 100, 200, 500, 1000],
      temperature: [28.5, 27.8, 25.2, 22.1, 18.5, 12.3, 8.7],
      salinity: [35.2, 35.1, 34.9, 34.8, 34.7, 34.6, 34.5],
      timestamp: "2025-09-15T00:00:00Z"
    },
    region: "Arabian Sea",
    status: "active",
    lastUpdate: "2025-09-15T06:30:00Z"
  },
  {
    id: "ARGO002", 
    lat: 12.3,
    lng: 76.8,
    profile: {
      depth: [0, 10, 50, 100, 200, 500, 1000],
      temperature: [29.2, 28.1, 24.8, 21.5, 17.9, 11.8, 8.2],
      salinity: [35.0, 34.9, 34.8, 34.7, 34.6, 34.5, 34.4],
      timestamp: "2025-09-15T00:00:00Z"
    },
    region: "Arabian Sea",
    status: "anomaly",
    lastUpdate: "2025-09-15T06:15:00Z"
  },
  {
    id: "ARGO003",
    lat: 8.2,
    lng: 77.3,
    profile: {
      depth: [0, 10, 50, 100, 200, 500, 1000],
      temperature: [31.1, 29.8, 26.5, 23.2, 19.8, 13.5, 9.1],
      salinity: [34.8, 34.7, 34.6, 34.5, 34.4, 34.3, 34.2],
      timestamp: "2025-09-15T00:00:00Z"
    },
    region: "Indian Ocean",
    status: "active",
    lastUpdate: "2025-09-15T06:45:00Z"
  },
  {
    id: "ARGO004",
    lat: 20.1,
    lng: 65.5,
    profile: {
      depth: [0, 10, 50, 100, 200, 500, 1000],
      temperature: [27.8, 26.9, 23.4, 20.1, 16.8, 10.9, 7.8],
      salinity: [35.4, 35.3, 35.1, 35.0, 34.9, 34.8, 34.7],
      timestamp: "2025-09-15T00:00:00Z"
    },
    region: "Arabian Sea",
    status: "active",
    lastUpdate: "2025-09-15T06:00:00Z"
  },
  {
    id: "ARGO005",
    lat: 5.8,
    lng: 79.2,
    profile: {
      depth: [0, 10, 50, 100, 200, 500, 1000],
      temperature: [30.5, 29.2, 25.8, 22.7, 18.9, 12.8, 8.9],
      salinity: [34.9, 34.8, 34.7, 34.6, 34.5, 34.4, 34.3],
      timestamp: "2025-09-15T00:00:00Z"
    },
    region: "Indian Ocean", 
    status: "active",
    lastUpdate: "2025-09-15T06:20:00Z"
  },
  {
    id: "ARGO006",
    lat: 18.7,
    lng: 72.9,
    profile: {
      depth: [0, 10, 50, 100, 200, 500, 1000],
      temperature: [32.1, 30.5, 27.2, 24.1, 20.3, 14.2, 9.8],
      salinity: [35.1, 35.0, 34.9, 34.8, 34.7, 34.6, 34.5],
      timestamp: "2025-09-15T00:00:00Z"
    },
    region: "Arabian Sea",
    status: "anomaly",
    lastUpdate: "2025-09-15T06:10:00Z"
  }
];

export const mockChatResponses = {
  "salinity profiles near equator march 2023": {
    answer: "Based on analysis of ARGO floats near the equatorial region, salinity profiles show typical stratification with surface values around 34.8-35.2 PSU, decreasing with depth to 34.2-34.5 PSU at 1000m. The halocline is most pronounced between 50-200m depth.",
    cited_floats: ["ARGO003", "ARGO005"],
    confidence: 0.89,
    visual_link: "/dashboard#profile",
    physics_check: { passed: true, notes: "Density stratification consistent with T-S relationship" }
  },
  "bgc parameters arabian sea last 6 months": {
    answer:  "Arabian Sea BGC analysis reveals elevated chlorophyll concentrations during monsoon periods, with oxygen minimum zones between 200-1000m. Surface productivity peaks correlate with upwelling events along the western coast.",
    cited_floats: ["ARGO001", "ARGO004", "ARGO006"],
    confidence: 0.92,
    visual_link: "/dashboard#bgc",
    physics_check: { passed: true, notes: "Biogeochemical cycles within expected seasonal ranges" }
  },
  "nearest floats to 14.5n 72.9e": {
    answer: "Closest active ARGO floats to coordinates 14.5°N, 72.9°E are ARGO006 (18.7°N, 72.9°E) at ~460km distance and ARGO001 (15.5°N, 68.7°E) at ~420km distance. Both floats show recent data within the last 6 hours.",
    cited_floats: ["ARGO006", "ARGO001"], 
    confidence: 0.95,
    visual_link: "/dashboard#map",
    physics_check: { passed: true, notes: "Geographic proximity and data currency verified" }
  }
};

export const mockAlerts = [
  {
    id: "ALT001",
    floatId: "ARGO002",
    type: "temperature_anomaly",
    message: "Rapid temperature increase detected in surface waters (+2.3°C above normal)",
    timestamp: "2025-09-15T06:15:00Z",
    severity: "high",
    location: { lat: 12.3, lng: 76.8 }
  },
  {
    id: "ALT002", 
    floatId: "ARGO006",
    type: "salinity_spike",
    message: "Unusual salinity spike in mixed layer (35.8 PSU, +0.6 above climatology)",
    timestamp: "2025-09-15T06:10:00Z", 
    severity: "medium",
    location: { lat: 18.7, lng: 72.9 }
  }
];