export interface FuelEconomy {
  cityMpg: number;
  highwayMpg: number;
  combinedMpg: number;
  annualFuelCost: number;
}

export interface SafetyRatings {
  overall: number;
  frontalCrash: number;
  sideCrash: number;
  rollover: number;
}

export interface StickerData {
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
  standardFeatures: { category: string; items: string[] }[];
  optionalEquipment: { name: string; code: string; price: number; standard?: boolean }[];
  fuelEconomy: FuelEconomy;
  safetyRatings: SafetyRatings;
  warranty: string[];
}

export interface SalesRecord {
  date: string;
  price: number;
  sellerType: string;
  mileage: number;
  condition: string;
}

export interface OwnershipRecord {
  ownerNumber: number;
  yearPurchased: number;
  yearEnded: string;
  duration: string;
  location: string;
  usageType: string;
  estimatedMilesPerYear: number;
}

export interface ServiceRecord {
  date: string;
  odometer: number;
  source: string;
  description: string;
}

export interface TitleBrand {
  name: string;
  passed: boolean;
  description: string;
}

export interface SafetyRecall {
  id: string;
  component: string;
  description: string;
  status: "Open" | "Closed";
  closedDate?: string;
}

export interface Report {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
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
  titleStatus: string;
  odometerStatus: string;
  imageUrl: string;
  salesHistory: SalesRecord[];
  ownershipTimeline: OwnershipRecord[];
  serviceRecords: ServiceRecord[];
  titleBrands: TitleBrand[];
  safetyRecalls: SafetyRecall[];
  windowStickerData: StickerData;
}

export interface BuildSheet {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  bodyStyle: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  assemblyCountry: string;
  exteriorColor: string;
  interiorColor: string;
  originalMsrp: number;
  optionalEquipment: { name: string; code: string; price: number; standard?: boolean }[];
}

const AUDI_STICKER: StickerData = {
  vin: "WAUFFAFC5HN007408",
  year: 2017,
  make: "Audi",
  model: "S6",
  trim: "Prestige",
  basePrice: 70900,
  totalOptionsPrice: 31340,
  destinationCharge: 950,
  totalMSRP: 103190,
  exteriorColor: "Brilliant Black",
  interiorColor: "Black w/Valcona Leather Seating Surfaces",
  standardFeatures: [
    {
      category: "Exterior",
      items: [
        'Body-Colored Front Bumper',
        "Light Tinted Glass",
        "Fixed Rear Window w/Defroster",
        "Steel Spare Wheel",
        "Compact Spare Tire Mounted Inside Under Cargo",
        "Galvanized Steel/Aluminum Panels",
        "Front And Rear Fog Lamps",
        "Aluminum Door Handles",
        "Metal-Look Grille w/Chrome Surround",
        "LED Brakelights",
        "Front Windshield -inc: Sun Visor Strip",
        "Express Open/Close Sliding And Tilting Glass 1st Row Sunroof w/Sunshade",
        "Programmable Projector Beam High Intensity Low/High Beam Daytime Running Auto-Leveling Headlamps w/Delay-Off",
        "Body-Colored Rear Bumper",
        "Lip Spoiler",
        "Chrome Side Windows Trim and Black Front Windshield Trim",
        'Wheels: 19" 5-Parallel-Spoke S-Design',
        'Tires: P255/40R19 100Y XL Summer',
        "Aluminum Power Heated Auto Dimming Side Mirrors w/Power Folding and Turn Signal Indicator",
        "Speed Sensitive Rain Detecting Variable Intermittent Wipers w/Heated Jets",
        "Laminated Glass",
        "Heated Front S6 Sport Seats",
        "255/40YR19.0",
      ],
    },
    {
      category: "Interior",
      items: [
        "Heated Front S6 Sport Seats -inc: 8-way power front seats w/driver 4-way power lumbar and driver memory",
        "60-40 Folding Bench Front Facing Fold Forward Seatback Rear Seat",
        "Valcona Leather Seating Surfaces -inc: diamond stitching",
        "Sport Leather Steering Wheel w/Auto Tilt-Away",
        "Memory Settings -inc: Door Mirrors, Steering Wheel and HVAC",
        "Gauges -inc: Speedometer, Odometer, Engine Coolant Temp, Tachometer, Oil Level, Trip Odometer and Trip Computer",
        "Compass",
        "Outside Temp Gauge",
        "Full Floor Console w/Storage, Mini Overhead Console w/Storage and 3 12V DC Power Outlets",
        "Refrigerated/Cooled Box Located In The Glovebox",
        "Front Center Armrest w/Storage and Rear Center Armrest w/Pass-Thru w/Storage",
        "Leather/Chrome Gear Shifter Material",
        "Illuminated Locking Glove Box",
        "Day-Night Auto-Dimming Rearview Mirror",
        "Full Carpet Floor Covering -inc: Carpet Front And Rear Floor Mats",
        "Full Cloth Headliner",
      ],
    },
    {
      category: "Mechanical Feature",
      items: [
        "Dual Stainless Steel Exhaust w/Chrome Tailpipe Finisher",
        "Quattro All-Wheel Drive",
        "Multi-Link Rear Suspension w/Air Springs",
        "19.8gal. Fuel Tank",
        "Electric Power-Assist Speed-Sensing Steering",
        "4-Corner Auto-Leveling Suspension",
        "Engine: 4.0 TFSI 8 Cylinder 450 HP",
        "Transmission: 7-Speed S tronic Automatic",
        "95-Amp/Hr Maintenance-Free Battery w/Run Down Protection",
        "Front And Rear Anti-Roll Bars",
        "Multi-Link Front Suspension w/Air Springs",
      ],
    },
    {
      category: "Safety / Security",
      items: [
        "Electronic Stability Control (ESC)",
        "ABS And Driveline Traction Control",
        "Dual Stage Driver And Passenger Seat-Mounted Side Airbags",
        "Front And Rear Parking Sensors",
        "Audi Side Assist Blind Spot",
        "Audi pre sense basic and Audi pre sense rear",
        "Low Tire Pressure Warning",
        "Dual Stage Driver And Passenger Front Airbags",
        "SIDEGUARD Curtain 1st And 2nd Row Airbags",
        "Driver And Passenger Knee Airbag",
        "Outboard Front Lap And Shoulder Safety Belts -inc: Rear Center 3 Point, Height Adjusters and Pretensioners",
        "Back-Up Camera",
      ],
    },
  ],
  optionalEquipment: [
    { name: "Prestige Package", code: "PRST", price: 3200 },
    { name: "Driver Assistance Package", code: "DRVA", price: 2550 },
    { name: "Comfort Seating Package", code: "CMFT", price: 1850 },
    { name: "Audi Design Selection Arras Red", code: "ARRS", price: 1250 },
    { name: "Black Optic Package", code: "BLKP", price: 1500 },
    { name: "LED Headlights", code: "LEDH", price: 1400 },
    { name: "quattro Door Decal - Brilliant Black", code: "QTDO", price: 90 },
    { name: "Titanium Sport Exhaust System", code: "TSPE", price: 10950 },
    { name: "Power Rear & Manual Rear Side Window Sunshades", code: "SUNP", price: 500 },
    { name: "Audi Beam-Rings", code: "BMRG", price: 250 },
    { name: "Night Vision Assistant", code: "NVAI", price: 2500 },
    { name: "Bang & Olufsen Advanced Sound System", code: "BOSS", price: 4900 },
    { name: "Rear Side Airbags", code: "RSAI", price: 350 },
    { name: "Audi First Aid Kit", code: "FAID", price: 50 },
    { name: "Engine: 4.0 TFSI 8 Cylinder 450 HP", code: "ENGI", price: 0, standard: true },
    { name: "Transmission: 7-Speed S tronic Automatic", code: "TRAN", price: 0, standard: true },
    { name: 'Wheels: 19" 5-Parallel-Spoke S-Design', code: "WHLR", price: 0, standard: true },
    { name: "Monotone Paint Application", code: "PAIN", price: 0, standard: true },
    { name: "Radio: Audi MMI Navigation Plus w/MMI Touch", code: "MMIN", price: 0, standard: true },
    { name: "Valcona Leather Seating Surfaces", code: "VLSS", price: 0, standard: true },
  ],
  fuelEconomy: { cityMpg: 18, highwayMpg: 27, combinedMpg: 21, annualFuelCost: 3096 },
  safetyRatings: { overall: 4, frontalCrash: 4, sideCrash: 4, rollover: 3 },
  warranty: [
    "Basic warranty: 48 months/50,000 miles",
    "Corrosion perforation warranty: 144 months/ unlimited distance",
    "Maintenance warranty: 12 months/10,000 miles",
    "Powertrain warranty: 48 months/50,000 miles",
    "Roadside assistance coverage: 48 months/ unlimited distance",
  ],
};

const FORD_STICKER: StickerData = {
  vin: "1FTFW1RG6LFA12962",
  year: 2020,
  make: "Ford",
  model: "F-150",
  trim: "Lariat SuperCrew 4x4",
  basePrice: 47690,
  totalOptionsPrice: 7255,
  destinationCharge: 1495,
  totalMSRP: 56440,
  exteriorColor: "Agate Black Metallic",
  interiorColor: "Blue Accent w/Recaro Unique Leather Insert",
  standardFeatures: [
    {
      category: "Exterior",
      items: [
        "Body-Color Molded Wheelwell Flare Extensions",
        "Body-Color Front, Rear, and Side Impact Beams",
        "Chromed Gas Fill Door on Fuel Tank",
        "Body-Color Door Handles",
        "Tilt & Slide Rear Windows in SuperCab",
        'Wheels: 20" Black Appearance Aluminum',
        'Tires: All-Season P265/60R20',
        "Front, Center, and Rear Parking Sensors",
        "Exterior Vision Package -inc: Front and Rear Park Assist, 360-Degree Camera, Trailer Backup Guide and Trailer Side View Camera",
      ],
    },
    {
      category: "Interior",
      items: [
        "Recaro Front Bucket Seats w/Leather Insert",
        "8-Way Power Driver Seat Adjustment",
        "4-Way Power Passenger Seat Adjustment",
        "Leatherwrapped Tilt/Telescoping Steering Column",
        "Illuminated Entry System w/Speed Activated Door Locks",
        "Driver and Passenger Vanity Mirrors",
        "Rear Center Armrest",
        "Front And Rear Cargo Lights",
        "Dual Remote Keyless Entry",
        "Dual Zone Automatic Climate Control",
      ],
    },
    {
      category: "Mechanical Feature",
      items: [
        "Engine: 3.5L V6 EcoBoost 400 HP/400 ft.-lbs.",
        "Transmission: 10-Speed Automatic w/Electronic Shift Controls",
        "4x4 w/Electronic On-Demand Traction Management",
        "3300 lbs. Maximum Conventional Trailer Sway Control",
        "102 gal. Fuel Tank",
        "6.1-ft. x 5.5-ft. Box Size",
        "Tow Hook - Front and Rear",
        "Engine Block Heater",
      ],
    },
    {
      category: "Safety / Security",
      items: [
        "Anti-Theft System -inc: Perimeter and Vehicle Immobilizer",
        "Front, Front Side, and Front and 2nd Row Curtain Airbags",
        "Anti-Roll Stabilization",
        "4-Wheel Antilock Brakes w/EBD, Brake Assist, and Electronic Stability Control",
        "Adaptive Cruise Control w/Stop and Go",
        "Blind Spot Information System (BLIS)",
        "Cross-Traffic Alert",
        "Rear Cross-Traffic Alert",
        "Low Tire Pressure Warning",
        "Backup Camera",
      ],
    },
  ],
  optionalEquipment: [
    { name: "Recaro Seat Package", code: "RECP", price: 1995 },
    { name: "Tow Package", code: "TOWP", price: 1795 },
    { name: "Lariat Appearance Package", code: "LAAP", price: 1875 },
    { name: "Premium Audio System", code: "AUDI", price: 995 },
    { name: "360-Degree Camera System", code: "CAM3", price: 595 },
    { name: "Engine: 3.5L V6 EcoBoost 400 HP", code: "ENGI", price: 0, standard: true },
    { name: "Transmission: 10-Speed Automatic", code: "TRAN", price: 0, standard: true },
    { name: "4x4 Drive System", code: "DRVS", price: 0, standard: true },
  ],
  fuelEconomy: { cityMpg: 18, highwayMpg: 23, combinedMpg: 20, annualFuelCost: 1986 },
  safetyRatings: { overall: 5, frontalCrash: 5, sideCrash: 5, rollover: 4 },
  warranty: [
    "Basic warranty: 36 months/36,000 miles",
    "Powertrain warranty: 60 months/70,000 miles",
    "Corrosion perforation warranty: 60 months/unlimited miles",
    "Roadside assistance coverage: 24 months/unlimited distance",
  ],
};

const MERCEDES_STICKER: StickerData = {
  vin: "W1N4N4HB1NJ342468",
  year: 2022,
  make: "Mercedes-Benz",
  model: "GLA 250",
  trim: "4MATIC",
  basePrice: 33275,
  totalOptionsPrice: 3630,
  destinationCharge: 1495,
  totalMSRP: 38400,
  exteriorColor: "Digital White Metallic",
  interiorColor: "Titanium Gray/Black w/Leather Upholstery",
  standardFeatures: [
    {
      category: "Exterior",
      items: [
        "17\" AMG-Style Light Alloy Wheels",
        'Tires: P225/55R17 99H All-Season',
        "Body-Color Door Handles and Side Molding",
        "LED High Performance Headlamps",
        "Front Fog Lights",
        "Roof Rail Cross Bars",
        "Automatic On/Off LED Headlamps",
      ],
    },
    {
      category: "Interior",
      items: [
        "Leather-Upholstered Sport Seats",
        "8-Way Power Driver Seat Adjustment",
        "4-Way Power Passenger Seat Adjustment",
        "Dual Zone Automatic Climate Control",
        "6.5\" Color Display Screen",
        "Premium Audio System w/10 Speakers",
        "Keyless Go with Remote Keyless Entry and Push-Button Start",
        "Leatherwrapped Steering Wheel",
      ],
    },
    {
      category: "Mechanical Feature",
      items: [
        "Engine: 2.0L I4 Turbo 228 HP",
        "Transmission: 8-Speed shiftronic Automatic",
        "4MATIC All-Wheel Drive",
        "14.8 gal. Fuel Tank",
        "Variable Sport-Tuned Suspension",
      ],
    },
    {
      category: "Safety / Security",
      items: [
        "Antilock Brake System w/Electronic Brakeforce Distribution",
        "Front and Side (Curtain) Airbags",
        "Stability Control w/Traction Control",
        "Attention Assist Drowsiness Detection",
        "Blind Spot Monitoring",
        "Rear Cross-Traffic Alert",
        "Parking Package w/ParkTronic",
        "Backup Camera",
      ],
    },
  ],
  optionalEquipment: [
    { name: "AMG Line Package", code: "AMGL", price: 2250 },
    { name: "Night Package", code: "NITE", price: 450 },
    { name: "Burmester 3D Surround Sound System", code: "BURM", price: 930 },
    { name: "Engine: 2.0L I4 Turbo 228 HP", code: "ENGI", price: 0, standard: true },
    { name: "Transmission: 8-Speed shiftronic Automatic", code: "TRAN", price: 0, standard: true },
    { name: "4MATIC All-Wheel Drive", code: "DRVS", price: 0, standard: true },
  ],
  fuelEconomy: { cityMpg: 25, highwayMpg: 32, combinedMpg: 28, annualFuelCost: 1700 },
  safetyRatings: { overall: 5, frontalCrash: 4, sideCrash: 5, rollover: 4 },
  warranty: [
    "Basic warranty: 48 months/50,000 miles",
    "Corrosion perforation warranty: 120 months/unlimited miles",
    "Roadside assistance coverage: 48 months/unlimited distance",
  ],
};

const TUNDRA_STICKER: StickerData = {
  vin: "2T1BURHE0FC320645",
  year: 2015,
  make: "Toyota",
  model: "Tundra",
  trim: "SR5 CrewMax 4WD",
  basePrice: 39215,
  totalOptionsPrice: 3840,
  destinationCharge: 1500,
  totalMSRP: 44555,
  exteriorColor: "Super White",
  interiorColor: "Black Cloth",
  standardFeatures: [
    {
      category: "Exterior",
      items: [
        'Wheels: 18" Steel',
        'Tires: P265/70R17 All-Season',
        "Body-Color Door Handles and Mirror Caps",
        "Hill-Start Assist Control",
      ],
    },
    {
      category: "Interior",
      items: [
        "Cloth 60/40 Split-Bench Front Facing Fold Forward Front Seat",
        "Automatic Temperature Control",
        "Audio -inc: 6 Speakers and AM/FM",
        "Cruise Control",
      ],
    },
    {
      category: "Mechanical Feature",
      items: ["Engine: 5.7L V8 381 HP", "Transmission: 6-Speed Automatic", "4WD", "20 gal. Fuel Tank"],
    },
    {
      category: "Safety / Security",
      items: ["Antilock Brakes", "Front, Front Side, and Side Curtain Airbags", "Stability Control", "Backup Camera"],
    },
  ],
  optionalEquipment: [
    { name: "Premium Package", code: "PREM", price: 2350 },
    { name: "Tow Package", code: "TOWP", price: 990 },
    { name: "Bedliner", code: "BLNR", price: 500 },
    { name: "Engine: 5.7L V8 381 HP", code: "ENGI", price: 0, standard: true },
    { name: "Transmission: 6-Speed Automatic", code: "TRAN", price: 0, standard: true },
  ],
  fuelEconomy: { cityMpg: 14, highwayMpg: 17, combinedMpg: 15, annualFuelCost: 2175 },
  safetyRatings: { overall: 4, frontalCrash: 5, sideCrash: 5, rollover: 3 },
  warranty: [
    "Basic warranty: 36 months/60,000 miles",
    "Powertrain warranty: 60 months/100,000 miles",
    "Corrosion perforation warranty: 60 months/unlimited miles",
  ],
};

const ACCORD_STICKER: StickerData = {
  vin: "1HGFA15547L116880",
  year: 2012,
  make: "Honda",
  model: "Accord",
  trim: "EX-L Sedan",
  basePrice: 25890,
  totalOptionsPrice: 1480,
  destinationCharge: 1495,
  totalMSRP: 28865,
  exteriorColor: "Alabaster Silver Metallic",
  interiorColor: "Ivory Leather",
  standardFeatures: [
    {
      category: "Exterior",
      items: ['Wheels: 18" Aluminum', "LED Daytime Running Lights", "Auto-On/Off Headlamps"],
    },
    {
      category: "Interior",
      items: ["Leather-Seated Front Bucket Seats", "Heated Front Seats", "Dual Zone Automatic Climate Control", "Premium Audio System"],
    },
    {
      category: "Mechanical Feature",
      items: ["Engine: 2.4L I4 185 HP", "Transmission: 5-Speed Automatic", "Front-Wheel Drive", "15.9 gal. Fuel Tank"],
    },
    {
      category: "Safety / Security",
      items: ["VSA w/EBD and ABS", "Front, Side, and Side Curtain Airbags", "Backup Camera", "Collision Mitigation Braking System"],
    },
  ],
  optionalEquipment: [
    { name: "Premium Package", code: "PREM", price: 1480 },
    { name: "Engine: 2.4L I4 185 HP", code: "ENGI", price: 0, standard: true },
    { name: "Transmission: 5-Speed Automatic", code: "TRAN", price: 0, standard: true },
  ],
  fuelEconomy: { cityMpg: 24, highwayMpg: 34, combinedMpg: 28, annualFuelCost: 1725 },
  safetyRatings: { overall: 5, frontalCrash: 5, sideCrash: 5, rollover: 4 },
  warranty: [
    "Basic warranty: 36 months/36,000 miles",
    "Powertrain warranty: 60 months/100,000 miles",
    "Corrosion perforation warranty: 60 months/unlimited miles",
  ],
};

const V_OK: TitleBrand[] = [
  { name: "Salvage / Junk", passed: true, description: "No salvage record on file across all 50 states." },
  { name: "Flood & Water Damage", passed: true, description: "Clean flood audit. No hurricane or water damage claims." },
  { name: "Fire / Total Loss", passed: true, description: "Clean loss claim history verified." },
  { name: "Odometer Rollback", passed: true, description: "Chronological progression verified with no tampering." },
];

const AUDI_REPORT: Report = {
  vin: "WAUFFAFC5HN007408",
  year: 2017,
  make: "Audi",
  model: "S6",
  trim: "Prestige",
  bodyStyle: "2-Door Coupe",
  engine: "4.0L TFSI V8 450 HP",
  transmission: "7-Speed S tronic Automatic",
  drivetrain: "Quattro All-Wheel Drive (AWD)",
  fuelType: "Gasoline",
  assemblyCountry: "Germany",
  exteriorColor: "Brilliant Black",
  interiorColor: "Black w/Valcona Leather Seating Surfaces",
  originalMsrp: 70900,
  currentMarketValue: { tradeIn: 32500, privateParty: 36900, dealerRetail: 40800, averageDaysOnMarket: 32 },
  ownersCount: 1,
  accidentsCount: 0,
  mileage: 46800,
  titleStatus: "Clean",
  odometerStatus: "Normal & Verified",
  imageUrl: "https://digitalbuildsheetsep282026.vercel.app/Thumbnail-1.webp",
  salesHistory: [
    { date: "09/14/2017", price: 70900, sellerType: "Authorized OEM Franchise Dealership", mileage: 8, condition: "Factory Delivery Clean" },
  ],
  ownershipTimeline: [
    {
      ownerNumber: 1,
      yearPurchased: 2017,
      yearEnded: "Present",
      duration: "7+ Years",
      location: "Connecticut / Northeast Region",
      usageType: "Personal",
      estimatedMilesPerYear: 6600,
    },
  ],
  serviceRecords: [
    {
      date: "11/02/2018",
      odometer: 9800,
      source: "Audi Certified Service Center",
      description: "First service, oil & filter, tire rotation, brake inspection — all within spec.",
    },
    {
      date: "05/19/2021",
      odometer: 31200,
      source: "Audi Certified Service Center",
      description: "40k milestone service, coolant flush, cabin air filter, 4-wheel alignment.",
    },
  ],
  titleBrands: V_OK,
  safetyRecalls: [
    {
      id: "17V-572",
      component: "Brake light switch",
      description: "Switch wear may delay brake lamp illumination. Dealer-inspected and replaced at no cost.",
      status: "Closed",
      closedDate: "05/2021",
    },
  ],
  windowStickerData: AUDI_STICKER,
};

const FORD_REPORT: Report = {
  vin: "1FTFW1RG6LFA12962",
  year: 2020,
  make: "Ford",
  model: "F-150",
  trim: "Lariat SuperCrew 4x4",
  bodyStyle: "Pickup / SuperCrew",
  engine: "3.5L V6 EcoBoost 400 HP",
  transmission: "10-Speed Automatic",
  drivetrain: "4x4 w/Electronic On-Demand Traction",
  fuelType: "Gasoline",
  assemblyCountry: "United States",
  exteriorColor: "Agate Black Metallic",
  interiorColor: "Blue Accent w/Recaro Unique Leather Insert",
  originalMsrp: 56440,
  currentMarketValue: { tradeIn: 38700, privateParty: 43200, dealerRetail: 47500, averageDaysOnMarket: 28 },
  ownersCount: 2,
  accidentsCount: 0,
  mileage: 58300,
  titleStatus: "Clean",
  odometerStatus: "Normal & Verified",
  imageUrl: "https://digitalbuildsheetsep282026.vercel.app/Thumbnail-2.webp",
  salesHistory: [
    { date: "06/30/2020", price: 56440, sellerType: "Authorized OEM Franchise Dealership", mileage: 4, condition: "Factory Delivery Clean" },
    { date: "02/11/2023", price: 44900, sellerType: "Private Seller / Classifieds", mileage: 31500, condition: "Clean Title, No Damage" },
  ],
  ownershipTimeline: [
    {
      ownerNumber: 1,
      yearPurchased: 2020,
      yearEnded: "2023",
      duration: "3 Years",
      location: "Texas / South Central Region",
      usageType: "Personal",
      estimatedMilesPerYear: 10500,
    },
    {
      ownerNumber: 2,
      yearPurchased: 2023,
      yearEnded: "Present",
      duration: "2+ Years",
      location: "Ohio / Midwest Region",
      usageType: "Personal",
      estimatedMilesPerYear: 12800,
    },
  ],
  serviceRecords: [
    {
      date: "08/15/2021",
      odometer: 12300,
      source: "Ford Authorized Service",
      description: "Oil, filter, and multipoint inspection. Tire rotation and TPMS reset.",
    },
    {
      date: "04/02/2024",
      odometer: 52700,
      source: "Independent Certified Shop",
      description: "55k service, front and rear differential fluid, brake inspection.",
    },
  ],
  titleBrands: V_OK,
  safetyRecalls: [],
  windowStickerData: FORD_STICKER,
};

const GLA_REPORT: Report = {
  vin: "W1N4N4HB1NJ342468",
  year: 2022,
  make: "Mercedes-Benz",
  model: "GLA 250",
  trim: "4MATIC",
  bodyStyle: "5-Dr Hatchback",
  engine: "2.0L I4 Turbo 228 HP",
  transmission: "8-Speed shiftronic Automatic",
  drivetrain: "4MATIC All-Wheel Drive (AWD)",
  fuelType: "Gasoline",
  assemblyCountry: "United States",
  exteriorColor: "Digital White Metallic",
  interiorColor: "Titanium Gray/Black w/Leather Upholstery",
  originalMsrp: 38400,
  currentMarketValue: { tradeIn: 21800, privateParty: 24900, dealerRetail: 27600, averageDaysOnMarket: 24 },
  ownersCount: 1,
  accidentsCount: 0,
  mileage: 27400,
  titleStatus: "Clean",
  odometerStatus: "Normal & Verified",
  imageUrl: "https://digitalbuildsheetsep282026.vercel.app/Thumbnail-3.webp",
  salesHistory: [
    { date: "11/08/2021", price: 38400, sellerType: "Authorized OEM Franchise Dealership", mileage: 12, condition: "Factory Delivery Clean" },
  ],
  ownershipTimeline: [
    {
      ownerNumber: 1,
      yearPurchased: 2022,
      yearEnded: "Present",
      duration: "3+ Years",
      location: "Georgia / Southeast Region",
      usageType: "Personal",
      estimatedMilesPerYear: 9100,
    },
  ],
  serviceRecords: [
    {
      date: "03/21/2023",
      odometer: 9200,
      source: "Mercedes-Benz Star Certified Center",
      description: "A-Service: oil change, tire rotation, brake and suspension check.",
    },
    {
      date: "09/14/2024",
      odometer: 24600,
      source: "Mercedes-Benz Star Certified Center",
      description: "B-Service: oil, cabin air filter, brake inspection, software update.",
    },
  ],
  titleBrands: V_OK,
  safetyRecalls: [],
  windowStickerData: MERCEDES_STICKER,
};

const TUNDRA_REPORT: Report = {
  vin: "2T1BURHE0FC320645",
  year: 2015,
  make: "Toyota",
  model: "Tundra",
  trim: "SR5 CrewMax 4WD",
  bodyStyle: "Pickup / CrewMax",
  engine: "5.7L V8 381 HP",
  transmission: "6-Speed Automatic",
  drivetrain: "4WD",
  fuelType: "Gasoline",
  assemblyCountry: "United States",
  exteriorColor: "Super White",
  interiorColor: "Black Cloth",
  originalMsrp: 44555,
  currentMarketValue: { tradeIn: 16200, privateParty: 18900, dealerRetail: 21400, averageDaysOnMarket: 41 },
  ownersCount: 3,
  accidentsCount: 1,
  mileage: 92700,
  titleStatus: "Clean",
  odometerStatus: "Normal & Verified",
  imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  salesHistory: [
    { date: "07/22/2015", price: 44555, sellerType: "Authorized OEM Franchise Dealership", mileage: 11, condition: "Factory Delivery Clean" },
    { date: "10/05/2019", price: 31995, sellerType: "Independent Used Lot", mileage: 58400, condition: "Clean Title, Minor Rear Damage (Repaired)" },
  ],
  ownershipTimeline: [
    {
      ownerNumber: 1,
      yearPurchased: 2015,
      yearEnded: "2017",
      duration: "2 Years",
      location: "Arizona / Southwest Region",
      usageType: "Personal",
      estimatedMilesPerYear: 14200,
    },
    {
      ownerNumber: 2,
      yearPurchased: 2017,
      yearEnded: "2019",
      duration: "2 Years",
      location: "Nevada / Southwest Region",
      usageType: "Fleet",
      estimatedMilesPerYear: 19800,
    },
    {
      ownerNumber: 3,
      yearPurchased: 2019,
      yearEnded: "Present",
      duration: "5+ Years",
      location: "Colorado / Mountain Region",
      usageType: "Personal",
      estimatedMilesPerYear: 11400,
    },
  ],
  serviceRecords: [
    {
      date: "02/18/2020",
      odometer: 61200,
      source: "Independent Certified Shop",
      description: "60k service, transmission fluid, rear brake pads replaced.",
    },
    {
      date: "06/30/2023",
      odometer: 84900,
      source: "Toyota Authorized Service",
      description: "85k service, coolant flush, control arm inspection, TPMS service.",
    },
  ],
  titleBrands: V_OK,
  safetyRecalls: [
    {
      id: "15T-281",
      component: "Instrument cluster",
      description: "Cluster may display inaccurate odometer readings. Recalibrated by dealer at no cost.",
      status: "Closed",
      closedDate: "08/2016",
    },
  ],
  windowStickerData: TUNDRA_STICKER,
};

const ACCORD_REPORT: Report = {
  vin: "1HGFA15547L116880",
  year: 2012,
  make: "Honda",
  model: "Accord",
  trim: "EX-L Sedan",
  bodyStyle: "4-Dr Sedan",
  engine: "2.4L I4 185 HP",
  transmission: "5-Speed Automatic",
  drivetrain: "Front-Wheel Drive (FWD)",
  fuelType: "Gasoline",
  assemblyCountry: "United States",
  exteriorColor: "Alabaster Silver Metallic",
  interiorColor: "Ivory Leather",
  originalMsrp: 28865,
  currentMarketValue: { tradeIn: 7900, privateParty: 9800, dealerRetail: 11500, averageDaysOnMarket: 35 },
  ownersCount: 2,
  accidentsCount: 0,
  mileage: 118900,
  titleStatus: "Clean",
  odometerStatus: "Normal & Verified",
  imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  salesHistory: [
    { date: "12/01/2011", price: 28865, sellerType: "Authorized OEM Franchise Dealership", mileage: 5, condition: "Factory Delivery Clean" },
    { date: "08/23/2016", price: 16750, sellerType: "Private Seller / Classifieds", mileage: 61200, condition: "Clean Title, No Damage" },
  ],
  ownershipTimeline: [
    {
      ownerNumber: 1,
      yearPurchased: 2012,
      yearEnded: "2016",
      duration: "4 Years",
      location: "Massachusetts / Northeast Region",
      usageType: "Personal",
      estimatedMilesPerYear: 12600,
    },
    {
      ownerNumber: 2,
      yearPurchased: 2016,
      yearEnded: "Present",
      duration: "8+ Years",
      location: "Virginia / Mid-Atlantic Region",
      usageType: "Personal",
      estimatedMilesPerYear: 10100,
    },
  ],
  serviceRecords: [
    {
      date: "03/12/2018",
      odometer: 88400,
      source: "Honda Authorized Service",
      description: "Oil, tire rotation, brake inspection. Battery replaced.",
    },
    {
      date: "07/29/2022",
      odometer: 112300,
      source: "Independent Certified Shop",
      description: "110k service, spark plugs, coolant, serpentine belt.",
    },
  ],
  titleBrands: V_OK,
  safetyRecalls: [],
  windowStickerData: ACCORD_STICKER,
};

/** Exact fallback used by the approved app when an unknown VIN is submitted. */
export const FALLBACK_REPORT: Report = {
  vin: "WDDGF5EB3BR183192",
  year: 2021,
  make: "Verified Domestic/Import",
  model: "Certified Vehicle",
  trim: "Premium Package",
  bodyStyle: "Sedan / SUV / Truck",
  engine: "Direct Injection Turbocharged Engine",
  transmission: "Multi-Speed Electronic Automatic",
  drivetrain: "All-Wheel Drive (AWD)",
  fuelType: "Gasoline",
  assemblyCountry: "United States",
  exteriorColor: "Factory Original Finish",
  interiorColor: "Premium Leather Trim",
  originalMsrp: 42500,
  currentMarketValue: { tradeIn: 24500, privateParty: 28200, dealerRetail: 31000, averageDaysOnMarket: 24 },
  ownersCount: 1,
  accidentsCount: 0,
  mileage: 41200,
  titleStatus: "Clean",
  odometerStatus: "Normal & Verified",
  imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  salesHistory: [
    { date: "04/12/2021", price: 42500, sellerType: "Authorized OEM Franchise Dealership", mileage: 15, condition: "Factory Delivery Clean" },
  ],
  ownershipTimeline: [
    {
      ownerNumber: 1,
      yearPurchased: 2021,
      yearEnded: "Present",
      duration: "3+ Years",
      location: "Delaware / Eastern Region",
      usageType: "Personal",
      estimatedMilesPerYear: 10300,
    },
  ],
  serviceRecords: [
    {
      date: "10/18/2021",
      odometer: 8500,
      source: "Certified Service Center",
      description: "Factory scheduled maintenance, synthetic oil replacement, multipoint inspection.",
    },
    {
      date: "06/22/2023",
      odometer: 27400,
      source: "Certified Service Center",
      description: "Cabin air filtration, 4-wheel rotation, computer diagnostic scan passed.",
    },
  ],
  titleBrands: V_OK,
  safetyRecalls: [],
  windowStickerData: {
    vin: "WDDGF5EB3BR183192",
    year: 2021,
    make: "Certified Make",
    model: "Series Model",
    trim: "Touring Edition",
    basePrice: 38900,
    totalOptionsPrice: 2450,
    destinationCharge: 1150,
    totalMSRP: 42500,
    exteriorColor: "Factory Original Finish",
    interiorColor: "Ebony Premium Interior",
    standardFeatures: [
      {
        category: "Safety & Performance",
        items: [
          "Advanced Driver Assistance Suite with Automatic Emergency Braking",
          "Blind Spot Monitoring & Rear Cross-Traffic Alert",
          "Electronic Stability Control & Traction Management",
        ],
      },
      {
        category: "Comfort & Technology",
        items: [
          "High-Resolution Touchscreen Infotainment with Apple CarPlay & Android Auto",
          "Dual-Zone Automatic Climate Control",
          "Keyless Entry & Push-Button Start",
        ],
      },
    ],
    optionalEquipment: [
      { name: "Technology & Sound Package", code: "TECH", price: 1850 },
      { name: "All-Weather Floor Protection", code: "AWP", price: 600 },
    ],
    fuelEconomy: { cityMpg: 26, highwayMpg: 34, combinedMpg: 29, annualFuelCost: 1750 },
    safetyRatings: { overall: 5, frontalCrash: 5, sideCrash: 5, rollover: 5 },
    warranty: [
      "3 Year / 36,000 Mile Comprehensive Bumper-to-Bumper",
      "5 Year / 60,000 Mile Powertrain Limited Warranty",
    ],
  },
};

export const REPORTS: Record<string, Report> = {
  [AUDI_REPORT.vin]: AUDI_REPORT,
  [FORD_REPORT.vin]: FORD_REPORT,
  [GLA_REPORT.vin]: GLA_REPORT,
  [TUNDRA_REPORT.vin]: TUNDRA_REPORT,
  [ACCORD_REPORT.vin]: ACCORD_REPORT,
};

export const SAMPLE_VEHICLES: Report[] = [AUDI_REPORT, FORD_REPORT, GLA_REPORT];

import { SITE } from "./config/site";

export const STICKER_LINKS: Record<string, string> = {
  WAUFFAFC5HN007408: `${SITE.url}/sticker/vin/WAUFFAFC5HN007408-E323E323-C5C5-4A45-31B5-C95F9EB7CBEC`,
  "1FTFW1RG6LFA12962": `${SITE.url}/sticker/vin/1FTFW1RG6LFA12962-A839A839-4848-4C2A-64E7-90517C0A1DC1`,
  W1N4N4HB1NJ342468: `${SITE.url}/sticker/vin/W1N4N4HB1NJ342468-8F748F74-6D6D-2406-1E54-BD17CA2AD529`,
  "2T1BURHE0FC320645": `${SITE.url}/sticker/vin/2T1BURHE0FC320645-D545D545-6F6F-920B-CEEB-88FEC90D8B36`,
  "1HGFA15547L116880": `${SITE.url}/sticker/vin/1HGFA15547L116880-70107010-CFCF-D86C-D3E3-5D29064203B9`,
  WDDGF5EB3BR183192: `${SITE.url}/sticker/vin/WDDGF5EB3BR183192-6CBF6CBF-CCCC-7022-B733-E2EF76995F78`,
  "5TFDW5F14FX419868": `${SITE.url}/sticker/vin/5TFDW5F14FX419868-BD26BD26-FFFF-4837-5594-FBFA9E6E4E3A`,
};

export const REPORT_LINKS: Record<string, string> = {
  "2T1BURHE0FC320645": `${SITE.url}/report/vin/2T1BURHE0FC320645`,
  "1HGFA15547L116880": `${SITE.url}/report/vin/1HGFA15547L116880`,
  WDDGF5EB3BR183192: `${SITE.url}/report/vin/WDDGF5EB3BR183192`,
  "5TFDW5F14FX419868": `${SITE.url}/report/vin/5TFDW5F14FX419868`,
};

export function buildSheetFrom(report: Report): BuildSheet {
  return {
    vin: report.vin,
    year: report.year,
    make: report.make,
    model: report.model,
    trim: report.trim,
    bodyStyle: report.bodyStyle,
    engine: report.engine,
    transmission: report.transmission,
    drivetrain: report.drivetrain,
    fuelType: report.fuelType,
    assemblyCountry: report.assemblyCountry,
    exteriorColor: report.exteriorColor,
    interiorColor: report.interiorColor,
    originalMsrp: report.originalMsrp,
    optionalEquipment: report.windowStickerData.optionalEquipment,
  };
}

export const usd = (n: number) => "$" + n.toLocaleString("en-US");
