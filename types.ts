// Import React to resolve the "Cannot find namespace 'React'" error
import React from 'react';

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Course {
  id: number;
  title: string;
  level: string;
  description: string;
  image: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
}