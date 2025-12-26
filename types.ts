import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl: string;
}

export interface PortfolioItem {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
}

export interface NavLink {
  name: string;
  href: string;
}