export interface Partner {
  id: string;
  name: string;
}

export interface MetricCard {
  id: string;
  value: string;
  label: string;
  subValue?: string;
}

export interface CapabilityCard {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
}

export interface VoyageChoice {
  id: string;
  destination: string;
  distance: string;
  duration: string;
  vessel: string;
  epoch: string;
}

export interface SceneryOption {
  id: string;
  name: string;
  tags: string[];
}
