export type NavItem = {
  id: string;
  label: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type OtherModel = {
  name: string;
  badge: string;
  tagline: string;
  normalPrice: string;
  specialPrice: string;
  save: string;
  highlights: string[];
  color: string;
};

export type Testimonial = {
  name: string;
  role: string;
  car: string;
  rating: number;
  text: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type FeatureItem = {
  title: string;
  desc: string;
};

export type EverestTrendOffer = {
  name: string;
  normalPrice: string;
  specialPrice: string;
  save: string;
  note: string;
  offerUrl: string;
  allOffersUrl: string;
};

export type CarouselImageItem = {
  src: string;
  caption: string;
};

export type FordModel = {
  name: string;
  price: number;
};
