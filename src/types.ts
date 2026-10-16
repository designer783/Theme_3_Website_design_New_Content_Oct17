export type PageRoute = 
  | 'home' 
  | 'vehicle-history' 
  | 'sample' 
  | 'pricing' 
  | 'contact' 
  | 'login' 
  | 'terms' 
  | 'privacy' 
  | 'style-guide';

export interface VehicleSpec {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  bodyStyle: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  assemblyCountry: string;
  exteriorColor: string;
  interiorColor: string;
  originalMsrp: number;
  currentMarketValue: {
    tradeIn: number;
    privateParty: number;
    dealerRetail: number;
    averageDaysOnMarket: number;
  };
  ownersCount: number;
  accidentsCount: number;
  mileage: number;
  titleStatus: 'Clean' | 'Salvage' | 'Rebuilt' | 'Flood Damage' | 'Lemon';
  odometerStatus: 'Normal & Verified' | 'Discrepancy Suspected' | 'Exempt';
  imageUrl: string;
}

export interface VehicleReportData extends VehicleSpec {
  salesHistory: Array<{
    date: string;
    price: number;
    sellerType: string;
    mileage: number;
    condition: string;
  }>;
  ownershipTimeline: Array<{
    ownerNumber: number;
    yearPurchased: number;
    yearEnded: number | string;
    duration: string;
    location: string;
    usageType: 'Personal' | 'Commercial' | 'Rental' | 'Lease';
    estimatedMilesPerYear: number;
  }>;
  serviceRecords: Array<{
    date: string;
    odometer: number;
    source: string;
    description: string;
  }>;
  titleBrands: Array<{
    name: string;
    passed: boolean;
    description: string;
  }>;
  safetyRecalls: Array<{
    nhtsaCampaignId: string;
    component: string;
    summary: string;
    remedyStatus: 'Completed' | 'Open' | 'No Open Recalls';
  }>;
  windowStickerData?: WindowStickerDetails;
  buildSheetData?: BuildSheetDetails;
}

export interface BuildSheetRpoCode {
  code: string;
  category: 'Powertrain' | 'Exterior' | 'Interior' | 'Safety' | 'Infotainment' | 'Packages' | 'Chassis';
  description: string;
  type: 'Standard' | 'Optional' | 'Package';
  price?: number;
}

export interface BuildSheetDetails {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  assemblyPlant: string;
  plantCode: string;
  buildDate: string;
  sequenceNumber: string;
  marketRegion: string;
  paintCode: string;
  paintName: string;
  interiorCode: string;
  interiorName: string;
  engineCode: string;
  engineDescription: string;
  transmissionCode: string;
  transmissionDescription: string;
  axleRatio: string;
  orderNumber: string;
  gvwr: string;
  rpoCodes: BuildSheetRpoCode[];
}

export interface WindowStickerDetails {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  basePrice: number;
  totalOptionsPrice: number;
  destinationCharge: number;
  totalMSRP: number;
  exteriorColor: string;
  interiorColor: string;
  standardFeatures: Array<{
    category: string;
    items: string[];
  }>;
  optionalEquipment: Array<{
    name: string;
    code?: string;
    price: number;
  }>;
  fuelEconomy: {
    cityMpg: number;
    highwayMpg: number;
    combinedMpg: number;
    annualFuelCost: number;
  };
  safetyRatings: {
    overall?: number;
    frontalCrash?: number;
    sideCrash?: number;
    rollover?: number;
  };
  warranty: string[];
}

export type WindowStickerData = WindowStickerDetails;

export interface PricingPackage {
  id: string;
  code: string; // plan code from plans.json, sent as cart_plan
  checkoutType: 'sticker' | 'vhr';
  name: string;
  reportsCount: number;
  price: number;
  originalPrice?: number;
  badge?: string;
  popular?: boolean;
  isPopular?: boolean;
  perReportPrice?: number;
  description: string;
  features: string[];
  ctaText: string;
  billingCycle?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  country: string;
  rating: number;
  title?: string;
  content: string;
  quote?: string;
  date?: string;
  verified: boolean;
  vehicleChecked?: string;
}

export interface ContactFormData {
  name?: string;
  fullName?: string;
  email: string;
  phone?: string;
  vin?: string;
  subject?: string;
  message: string;
}
