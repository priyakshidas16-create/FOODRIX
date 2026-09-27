import { InspectionRecord } from '../types/compliance';

export const SAMPLE_INSPECTION_RECORDS: InspectionRecord[] = [
  {
    id: 'case-lm-2026-0891',
    caseNumber: 'DL-LM/WZ/2026/0891',
    productName: 'Shree Annapurna Shudh Chakki Atta 1 kg',
    brandName: 'Annapurna Foods',
    category: 'FOOD_AND_BEVERAGE',
    batchNumber: 'AF-ATT-0926',
    barcode: '8901234567890',
    inspectionDate: '2026-09-24T10:30:00Z',
    inspectorName: 'Devendra Kumar Sharma',
    inspectorId: 'LM-INS-7042',
    jurisdiction: 'West Zone, Delhi State Legal Metrology Division',
    location: 'Reliance Smart Superstore, Rajouri Garden, New Delhi',
    imageUrl: '/src/assets/images/packaged_flour_pouch_1790527613273.jpg',
    overallStatus: 'NON_COMPLIANT',
    complianceScore: 68,
    summary: 'Non-compliant under Rule 6(1)(da) and Rule 6(1)(e). The MRP declaration fails to specify "inclusive of all taxes" or "incl. of all taxes". Consumer Care panel omits mandatory grievance redressal email address.',
    declarations: [
      {
        id: 'dec-1',
        ruleCitation: 'Rule 6(1)(a)',
        fieldName: 'Manufacturer Details',
        extractedText: 'Mfd. & Pkd. by: Annapurna Agro Processing Pvt. Ltd., Plot No. 42-44, Sector 8, Industrial Estate, Kundli, Sonipat, Haryana - 131028',
        status: 'COMPLIANT',
        findings: 'Complete premises address with industrial estate, city, district and 6-digit pin code.',
        boundingBox: { ymin: 710, xmin: 120, ymax: 860, xmax: 880 },
        isRequired: true
      },
      {
        id: 'dec-2',
        ruleCitation: 'Rule 6(1)(b)',
        fieldName: 'Generic Name',
        extractedText: 'Whole Wheat Flour (Chakki Atta)',
        status: 'COMPLIANT',
        findings: 'Unambiguous generic commodity declaration.',
        boundingBox: { ymin: 240, xmin: 200, ymax: 310, xmax: 800 },
        isRequired: true
      },
      {
        id: 'dec-3',
        ruleCitation: 'Rule 6(1)(c) & Rule 13',
        fieldName: 'Net Quantity',
        extractedText: 'Net Weight: 1 kg',
        status: 'COMPLIANT',
        findings: 'Standard SI unit symbol "kg" used correctly without trailing dot or pluralization.',
        boundingBox: { ymin: 480, xmin: 350, ymax: 550, xmax: 650 },
        fontAssessment: {
          estimatedHeightMm: 6.4,
          requiredHeightMm: 6.0,
          compliant: true,
          readability: 'EXCELLENT',
          notes: 'Height 6.4 mm satisfies statutory threshold of >= 6.0 mm for > 1kg nominal qty.'
        },
        isRequired: true
      },
      {
        id: 'dec-4',
        ruleCitation: 'Rule 6(1)(d)',
        fieldName: 'Month & Year of Packing',
        extractedText: 'Packed on: 09/2026',
        status: 'COMPLIANT',
        findings: 'Conforming standard MM/YYYY date declaration.',
        boundingBox: { ymin: 560, xmin: 150, ymax: 620, xmax: 450 },
        isRequired: true
      },
      {
        id: 'dec-5',
        ruleCitation: 'Rule 6(1)(da)',
        fieldName: 'Maximum Retail Price (MRP)',
        extractedText: 'MRP Rs. 55.00',
        status: 'NON_COMPLIANT',
        findings: 'VIOLATION: Omission of mandatory statutory qualification "inclusive of all taxes" or "incl. of all taxes".',
        boundingBox: { ymin: 560, xmin: 550, ymax: 620, xmax: 850 },
        isRequired: true
      },
      {
        id: 'dec-6',
        ruleCitation: 'Rule 6(1)(e)',
        fieldName: 'Consumer Care Redressal',
        extractedText: 'For complaints: Customer Support Executive, Tel: 1800-200-4455, Address: Same as mfg. premises',
        status: 'NON_COMPLIANT',
        findings: 'VIOLATION: Missing mandatory registered email address for consumer grievances.',
        boundingBox: { ymin: 880, xmin: 120, ymax: 960, xmax: 880 },
        isRequired: true
      },
      {
        id: 'dec-7',
        ruleCitation: 'Rule 6(1)(f)',
        fieldName: 'Country of Origin',
        extractedText: 'Country of Origin: India',
        status: 'COMPLIANT',
        findings: 'Clearly declared.',
        boundingBox: { ymin: 650, xmin: 150, ymax: 700, xmax: 450 },
        isRequired: true
      },
      {
        id: 'dec-8',
        ruleCitation: 'Rule 6(1)(n)',
        fieldName: 'Unit Sale Price (USP)',
        extractedText: 'Unit Sale Price: ₹ 55.00 / kg',
        status: 'COMPLIANT',
        findings: 'Standard unit rate stated for >= 1kg commodity.',
        boundingBox: { ymin: 650, xmin: 550, ymax: 700, xmax: 850 },
        isRequired: true
      }
    ],
    violations: [
      {
        id: 'v-101',
        ruleCitation: 'Rule 6(1)(da) of Legal Metrology (PC) Rules, 2011',
        severity: 'MAJOR',
        declarationField: 'Maximum Retail Price (MRP)',
        description: 'MRP declared as "MRP Rs. 55.00" without the compulsory wording "inclusive of all taxes" or "incl. of all taxes".',
        penaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
        penaltyDetails: 'Punishable with fine up to ₹25,000 for the first offence, and up to ₹50,000 for second offence.',
        recommendedAction: 'Issue Form V Notice under Section 15 to manufacturer with 14-day compliance ultimatum.'
      },
      {
        id: 'v-102',
        ruleCitation: 'Rule 6(1)(e) of Legal Metrology (PC) Rules, 2011',
        severity: 'MAJOR',
        declarationField: 'Consumer Care Details',
        description: 'Customer grievance redressal panel contains telephone number but fails to declare an e-mail address as mandated by 2017 & 2021 amendments.',
        penaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
        penaltyDetails: 'Punishable with fine up to ₹25,000; compounding permissible under Section 48.',
        recommendedAction: 'Serve notice for rectification and compoundable penalty.'
      }
    ],
    weightVerification: {
      declaredNetQuantity: '1 kg',
      declaredNetValue: 1000,
      unit: 'g',
      grossWeightG: 1018,
      tareWeightG: 24,
      actualNetWeightG: 994,
      differenceG: -6,
      mpeAllowedG: 15,
      mpePercentage: 1.5,
      isWithinMpe: true,
      scaleCertificateNumber: 'CAL-DL-LM-2026-904',
      status: 'VERIFIED_COMPLIANT',
      verdictNotes: 'Physical net weight 994g represents a 6g deficiency (-0.6%), which is well within Second Schedule Maximum Permissible Error limit of 15g (1.5%). Weight test passed.'
    },
    pdpAnalysis: {
      estimatedAreaSqCm: 320,
      packagingType: 'POUCH_BAG',
      contrastRating: 'HIGH',
      placementCompliant: true,
      findings: 'Principal Display Panel occupies > 40% of front face, lettering clear against natural kraft background.'
    },
    noticeIssued: true,
    noticeNumber: 'NOT-DL-LM-2026-0891',
    inspectorNotes: 'Routine market audit. Sealed sample preserved in department evidence locker. Recommended compounding under Section 48 upon written undertaking.'
  },
  {
    id: 'case-lm-2026-0892',
    caseNumber: 'MH-LM/NZ/2026/1402',
    productName: 'NutriBake Crunchy Cashew Cookies 150g',
    brandName: 'NutriBake Delights',
    category: 'FOOD_AND_BEVERAGE',
    batchNumber: 'NB-CC-2608',
    barcode: '8909876543210',
    inspectionDate: '2026-09-25T14:15:00Z',
    inspectorName: 'Anjali Deshmukh',
    inspectorId: 'LM-INS-3319',
    jurisdiction: 'Mumbai Suburban District, Maharashtra Legal Metrology',
    location: 'Nature Basket Gourmet Outlet, Bandra West, Mumbai',
    imageUrl: '/src/assets/images/packaged_snack_biscuit_1790527626634.jpg',
    overallStatus: 'NON_COMPLIANT',
    complianceScore: 54,
    summary: 'Non-compliant under Rule 13 and Rule 9 (Schedule II). Packaging employs unlawful unit abbreviation "gms" instead of standard "g", and font height for net weight numeral is only 1.1 mm (statutory minimum is 2.0 mm).',
    declarations: [
      {
        id: 'dec-11',
        ruleCitation: 'Rule 6(1)(a)',
        fieldName: 'Manufacturer Details',
        extractedText: 'Manufactured by: NutriBake Foods Ltd., G-14, MIDC Industrial Area, Turbhe, Navi Mumbai - 400705',
        status: 'COMPLIANT',
        findings: 'Full manufacturing address present.',
        boundingBox: { ymin: 780, xmin: 100, ymax: 920, xmax: 900 },
        isRequired: true
      },
      {
        id: 'dec-12',
        ruleCitation: 'Rule 6(1)(b)',
        fieldName: 'Generic Name',
        extractedText: 'Cashew Butter Cookies',
        status: 'COMPLIANT',
        findings: 'Generic trade name declared.',
        boundingBox: { ymin: 180, xmin: 150, ymax: 270, xmax: 850 },
        isRequired: true
      },
      {
        id: 'dec-13',
        ruleCitation: 'Rule 6(1)(c) & Rule 13',
        fieldName: 'Net Quantity',
        extractedText: 'Net Wt: 150 gms',
        status: 'NON_COMPLIANT',
        findings: 'VIOLATION: Unlawful non-standard unit "gms". Rule 13 mandates SI unit symbol "g" without pluralization.',
        boundingBox: { ymin: 440, xmin: 600, ymax: 520, xmax: 880 },
        fontAssessment: {
          estimatedHeightMm: 1.1,
          requiredHeightMm: 2.0,
          compliant: false,
          readability: 'POOR',
          notes: 'Height 1.1 mm violates Schedule II statutory minimum of 2.0 mm for nominal quantity 50g-200g.'
        },
        isRequired: true
      },
      {
        id: 'dec-14',
        ruleCitation: 'Rule 6(1)(d)',
        fieldName: 'Month & Year of Mfg.',
        extractedText: 'Mfg. Date: 08/2026',
        status: 'COMPLIANT',
        findings: 'Compliant MM/YYYY format.',
        boundingBox: { ymin: 530, xmin: 120, ymax: 590, xmax: 420 },
        isRequired: true
      },
      {
        id: 'dec-15',
        ruleCitation: 'Rule 6(1)(da)',
        fieldName: 'MRP Declaration',
        extractedText: 'MRP Rs. 30.00 (incl. of all taxes)',
        status: 'COMPLIANT',
        findings: 'Correct statutory wording and Indian Rupee notation.',
        boundingBox: { ymin: 530, xmin: 520, ymax: 590, xmax: 880 },
        isRequired: true
      },
      {
        id: 'dec-16',
        ruleCitation: 'Rule 6(1)(e)',
        fieldName: 'Consumer Care',
        extractedText: 'Consumer Feedback: feedback@nutribake.in, Ph: 022-27891234, Address: Customer Desk, NutriBake Foods, Turbhe, Navi Mumbai',
        status: 'COMPLIANT',
        findings: 'Complete contact information with email, landline and physical desk address.',
        boundingBox: { ymin: 920, xmin: 100, ymax: 980, xmax: 900 },
        isRequired: true
      },
      {
        id: 'dec-17',
        ruleCitation: 'Rule 6(1)(f)',
        fieldName: 'Country of Origin',
        extractedText: 'Country of Origin: India',
        status: 'COMPLIANT',
        findings: 'Compliant.',
        boundingBox: { ymin: 610, xmin: 120, ymax: 670, xmax: 450 },
        isRequired: true
      },
      {
        id: 'dec-18',
        ruleCitation: 'Rule 6(1)(n)',
        fieldName: 'Unit Sale Price',
        extractedText: 'USP: ₹ 20.00 per 100 g',
        status: 'COMPLIANT',
        findings: 'Compliant unit price declaration for <= 1kg package.',
        boundingBox: { ymin: 610, xmin: 520, ymax: 670, xmax: 880 },
        isRequired: true
      }
    ],
    violations: [
      {
        id: 'v-201',
        ruleCitation: 'Rule 13 read with Rule 6(1)(c)',
        severity: 'MAJOR',
        declarationField: 'Net Quantity Unit Symbol',
        description: 'Package uses unlawful unit abbreviation "gms". Rule 13 explicitly states standard symbol for gram is "g", and plural symbols like "gms" or "gms." are strictly prohibited.',
        penaltySection: 'Section 36(1) & Section 39 of Legal Metrology Act, 2009',
        penaltyDetails: 'Punishable with fine up to ₹25,000.',
        recommendedAction: 'Issue notice requiring recall or stickering correction of market batch.'
      },
      {
        id: 'v-202',
        ruleCitation: 'Rule 9 read with Schedule II (Table I)',
        severity: 'MAJOR',
        declarationField: 'Principal Display Panel Font Size',
        description: 'Numeral "150" in net quantity declaration measures only 1.1 mm in height, falling 45% below the statutory minimum requirement of 2.0 mm for nominal quantities between 50g and 200g.',
        penaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
        penaltyDetails: 'Punishable with fine up to ₹25,000.',
        recommendedAction: 'Direct manufacturer to submit redesign proof with compliant font height.'
      }
    ],
    weightVerification: {
      declaredNetQuantity: '150 g',
      declaredNetValue: 150,
      unit: 'g',
      grossWeightG: 158.4,
      tareWeightG: 8.2,
      actualNetWeightG: 150.2,
      differenceG: 0.2,
      mpeAllowedG: 6.75,
      mpePercentage: 4.5,
      isWithinMpe: true,
      scaleCertificateNumber: 'CAL-MH-LM-2026-4421',
      status: 'VERIFIED_COMPLIANT',
      verdictNotes: 'Actual net content 150.2g meets nominal weight specification.'
    },
    pdpAnalysis: {
      estimatedAreaSqCm: 145,
      packagingType: 'POUCH_BAG',
      contrastRating: 'MEDIUM',
      placementCompliant: true,
      findings: 'Font size on net quantity too small despite sufficient PDP real estate.'
    },
    noticeIssued: false,
    inspectorNotes: 'Case flagged for preliminary inquiry hearing. Manufacturer notified to submit written explanation.'
  },
  {
    id: 'case-lm-2026-0893',
    caseNumber: 'KA-LM/BLR/2026/0512',
    productName: 'BioRadiance Botanical Hydra-Moisturizer 50g',
    brandName: 'BioRadiance Organics',
    category: 'PERSONAL_CARE',
    batchNumber: 'BRO-HM-50-88',
    barcode: '8905556667778',
    inspectionDate: '2026-09-26T11:00:00Z',
    inspectorName: 'Ramesh Balakrishnan',
    inspectorId: 'LM-INS-5108',
    jurisdiction: 'Bengaluru Urban District, Karnataka Legal Metrology Department',
    location: 'Sephora Beauty Store, Phoenix Marketcity, Whitefield, Bengaluru',
    imageUrl: '/src/assets/images/packaged_cosmetic_box_1790527642517.jpg',
    overallStatus: 'COMPLIANT',
    complianceScore: 100,
    summary: 'Exemplary compliance. All 8 mandatory declarations under Rule 6(1) are prominently displayed with accurate statutory phraseology, standard SI unit symbols, compliant numeral heights (>= 2.0 mm), and fully verified net quantity.',
    declarations: [
      {
        id: 'dec-21',
        ruleCitation: 'Rule 6(1)(a)',
        fieldName: 'Manufacturer / Packer',
        extractedText: 'Manufactured & Packed by: BioRadiance Cosmeceuticals Pvt. Ltd., Plot 18, Peenya 3rd Phase, Bengaluru, Karnataka - 560058',
        status: 'COMPLIANT',
        findings: 'Complete address with industrial phase and pin code.',
        boundingBox: { ymin: 750, xmin: 100, ymax: 880, xmax: 900 },
        isRequired: true
      },
      {
        id: 'dec-22',
        ruleCitation: 'Rule 6(1)(b)',
        fieldName: 'Generic Name',
        extractedText: 'Skin Moisturizing Face Cream',
        status: 'COMPLIANT',
        findings: 'Clear commodity description.',
        boundingBox: { ymin: 220, xmin: 150, ymax: 290, xmax: 850 },
        isRequired: true
      },
      {
        id: 'dec-23',
        ruleCitation: 'Rule 6(1)(c) & Rule 13',
        fieldName: 'Net Quantity',
        extractedText: 'Net Qty: 50 g',
        status: 'COMPLIANT',
        findings: 'Standard unit "g" used without dot or pluralization.',
        boundingBox: { ymin: 460, xmin: 300, ymax: 530, xmax: 700 },
        fontAssessment: {
          estimatedHeightMm: 2.4,
          requiredHeightMm: 2.0,
          compliant: true,
          readability: 'EXCELLENT',
          notes: 'Height 2.4 mm satisfies Schedule II requirement (>= 2.0 mm).'
        },
        isRequired: true
      },
      {
        id: 'dec-24',
        ruleCitation: 'Rule 6(1)(d)',
        fieldName: 'Month & Year of Mfg.',
        extractedText: 'Mfg. Date: 08/2026',
        status: 'COMPLIANT',
        findings: 'Standard MM/YYYY format.',
        boundingBox: { ymin: 550, xmin: 120, ymax: 610, xmax: 450 },
        isRequired: true
      },
      {
        id: 'dec-25',
        ruleCitation: 'Rule 6(1)(da)',
        fieldName: 'Maximum Retail Price (MRP)',
        extractedText: 'MRP ₹ 349.00 (inclusive of all taxes)',
        status: 'COMPLIANT',
        findings: 'Rupee symbol and mandatory statutory phrase "inclusive of all taxes" correctly printed.',
        boundingBox: { ymin: 550, xmin: 520, ymax: 610, xmax: 900 },
        isRequired: true
      },
      {
        id: 'dec-26',
        ruleCitation: 'Rule 6(1)(e)',
        fieldName: 'Consumer Care',
        extractedText: 'Consumer Cell: care@bioradiance.com, Toll Free: 1800-419-8800, Address: BioRadiance Cosmeceuticals, Peenya, Bengaluru - 560058',
        status: 'COMPLIANT',
        findings: 'Full contact details including toll-free helpline and dedicated email.',
        boundingBox: { ymin: 890, xmin: 100, ymax: 970, xmax: 900 },
        isRequired: true
      },
      {
        id: 'dec-27',
        ruleCitation: 'Rule 6(1)(f)',
        fieldName: 'Country of Origin',
        extractedText: 'Made in India',
        status: 'COMPLIANT',
        findings: 'Clearly displayed.',
        boundingBox: { ymin: 630, xmin: 120, ymax: 690, xmax: 450 },
        isRequired: true
      },
      {
        id: 'dec-28',
        ruleCitation: 'Rule 6(1)(n)',
        fieldName: 'Unit Sale Price',
        extractedText: 'USP: ₹ 6.98 / g',
        status: 'COMPLIANT',
        findings: 'Exact unit rate stated.',
        boundingBox: { ymin: 630, xmin: 520, ymax: 690, xmax: 900 },
        isRequired: true
      }
    ],
    violations: [],
    weightVerification: {
      declaredNetQuantity: '50 g',
      declaredNetValue: 50,
      unit: 'g',
      grossWeightG: 88.5,
      tareWeightG: 37.8,
      actualNetWeightG: 50.7,
      differenceG: 0.7,
      mpeAllowedG: 4.5,
      mpePercentage: 9.0,
      isWithinMpe: true,
      scaleCertificateNumber: 'CAL-KA-LM-2026-1188',
      status: 'VERIFIED_COMPLIANT',
      verdictNotes: 'Actual net contents 50.7g exceeds nominal weight of 50g. Full compliance.'
    },
    pdpAnalysis: {
      estimatedAreaSqCm: 160,
      packagingType: 'RECTANGULAR_BOX',
      contrastRating: 'HIGH',
      placementCompliant: true,
      findings: 'Crisp high-contrast typography, distinct declaration quadrant.'
    },
    noticeIssued: false,
    inspectorNotes: 'Certified fully compliant with Legal Metrology (PC) Rules, 2011. Inspection certificate issued to retailer.'
  },
  {
    id: 'case-lm-2026-0894',
    caseNumber: 'TN-LM/CH/2026/2205',
    productName: 'SunGold Refined Sunflower Oil 1 L',
    brandName: 'SunGold Agrotech',
    category: 'FOOD_AND_BEVERAGE',
    batchNumber: 'SGA-OIL-09A',
    barcode: '8904321987654',
    inspectionDate: '2026-09-27T08:45:00Z',
    inspectorName: 'Senthil V. Murugan',
    inspectorId: 'LM-INS-9811',
    jurisdiction: 'Chennai Central Zone, Tamil Nadu Legal Metrology Department',
    location: 'Koyambedu Wholesale Market, Chennai',
    imageUrl: '/src/assets/images/packaged_oil_bottle_1790527660217.jpg',
    overallStatus: 'NON_COMPLIANT',
    complianceScore: 42,
    summary: 'CRITICAL SHORT-WEIGHT OFFENCE under Section 36(2) and Second Schedule. Package declares 1 L net volume (nominally 910 g at specified density), but actual net weight is only 860 g (shortfall of 50 g, or 5.5%). Exceeds allowable Maximum Permissible Error (MPE) limit of 15 g / 1.5% by more than 330%.',
    declarations: [
      {
        id: 'dec-31',
        ruleCitation: 'Rule 6(1)(a)',
        fieldName: 'Manufacturer / Packer',
        extractedText: 'Packed by: SunGold Agrotech Oils Ltd., Survey 104, Madhavaram High Road, Chennai - 600060',
        status: 'COMPLIANT',
        findings: 'Premises address complete.',
        boundingBox: { ymin: 730, xmin: 150, ymax: 860, xmax: 850 },
        isRequired: true
      },
      {
        id: 'dec-32',
        ruleCitation: 'Rule 6(1)(b)',
        fieldName: 'Generic Name',
        extractedText: 'Refined Sunflower Cooking Oil',
        status: 'COMPLIANT',
        findings: 'Generic commodity stated.',
        boundingBox: { ymin: 250, xmin: 200, ymax: 320, xmax: 800 },
        isRequired: true
      },
      {
        id: 'dec-33',
        ruleCitation: 'Rule 6(1)(c) & Second Schedule',
        fieldName: 'Net Quantity & Physical Verification',
        extractedText: 'Net Volume: 1 L (Net Quantity: 910 g when packed)',
        status: 'NON_COMPLIANT',
        findings: 'CRITICAL VIOLATION: Actual physical net content verified on calibrated bench scale is only 860 g. Deficiency of 50 g (5.5%) far exceeds Second Schedule allowable MPE of 15 g (1.5%).',
        boundingBox: { ymin: 480, xmin: 300, ymax: 560, xmax: 700 },
        fontAssessment: {
          estimatedHeightMm: 4.8,
          requiredHeightMm: 4.0,
          compliant: true,
          readability: 'EXCELLENT',
          notes: 'Font height 4.8 mm is compliant, but underlying physical quantity violates statutory limits.'
        },
        isRequired: true
      },
      {
        id: 'dec-34',
        ruleCitation: 'Rule 6(1)(d)',
        fieldName: 'Month & Year of Packing',
        extractedText: 'Packed: 09/2026',
        status: 'COMPLIANT',
        findings: 'Compliant MM/YYYY format.',
        boundingBox: { ymin: 580, xmin: 150, ymax: 640, xmax: 450 },
        isRequired: true
      },
      {
        id: 'dec-35',
        ruleCitation: 'Rule 6(1)(da)',
        fieldName: 'Maximum Retail Price (MRP)',
        extractedText: 'MRP ₹ 165.00 incl. of all taxes',
        status: 'COMPLIANT',
        findings: 'Compliant phrasing.',
        boundingBox: { ymin: 580, xmin: 550, ymax: 640, xmax: 850 },
        isRequired: true
      },
      {
        id: 'dec-36',
        ruleCitation: 'Rule 6(1)(e)',
        fieldName: 'Consumer Care',
        extractedText: 'Grievance Desk: customercare@sungoldagro.com, Helpline: 044-25556677, SunGold Agrotech, Madhavaram, Chennai',
        status: 'COMPLIANT',
        findings: 'Compliant.',
        boundingBox: { ymin: 880, xmin: 150, ymax: 950, xmax: 850 },
        isRequired: true
      },
      {
        id: 'dec-37',
        ruleCitation: 'Rule 6(1)(f)',
        fieldName: 'Country of Origin',
        extractedText: 'Country of Origin: India',
        status: 'COMPLIANT',
        findings: 'Compliant.',
        boundingBox: { ymin: 660, xmin: 150, ymax: 710, xmax: 450 },
        isRequired: true
      },
      {
        id: 'dec-38',
        ruleCitation: 'Rule 6(1)(n)',
        fieldName: 'Unit Sale Price',
        extractedText: 'USP: ₹ 165.00 / L',
        status: 'COMPLIANT',
        findings: 'Compliant unit rate.',
        boundingBox: { ymin: 660, xmin: 550, ymax: 710, xmax: 850 },
        isRequired: true
      }
    ],
    violations: [
      {
        id: 'v-401',
        ruleCitation: 'Section 36(2) read with Second Schedule (Rule 24)',
        severity: 'CRITICAL',
        declarationField: 'Net Quantity Discrepancy (Short-Weight)',
        description: 'Physical weighing on Class III verified scale revealed actual net oil content of 860 g against declared 910 g (1 Litre). Shortfall of 50 g (5.5%) exceeds the statutory Maximum Permissible Error (MPE) limit of 15 g (1.5%) by 35 grams. Constitutes systematic consumer short-weighting.',
        penaltySection: 'Section 36(2) of Legal Metrology Act, 2009',
        penaltyDetails: 'Punishable with fine up to ₹50,000 for first offence, and with imprisonment up to 1 year and fine for second or subsequent offence.',
        recommendedAction: 'Immediate seizure of entire wholesale stock (240 cartons) under Section 15(1)(c); issue Show Cause Notice to Managing Director.'
      }
    ],
    weightVerification: {
      declaredNetQuantity: '1 L (910 g)',
      declaredNetValue: 910,
      unit: 'g',
      grossWeightG: 892,
      tareWeightG: 32,
      actualNetWeightG: 860,
      differenceG: -50,
      mpeAllowedG: 15,
      mpePercentage: 1.5,
      isWithinMpe: false,
      scaleCertificateNumber: 'CAL-TN-LM-2026-7789',
      status: 'SHORT_WEIGHT_VIOLATION',
      verdictNotes: 'CRITICAL SHORT-WEIGHT: Actual net weight 860g is 50g below declared quantity. Permissible MPE is 15g. Non-permissible deficit of 35g. Serious non-compliance.'
    },
    pdpAnalysis: {
      estimatedAreaSqCm: 220,
      packagingType: 'CYLINDRICAL_BOTTLE',
      contrastRating: 'HIGH',
      placementCompliant: true,
      findings: 'Label printed clearly on PET bottle, but contents severely short-filled.'
    },
    noticeIssued: true,
    noticeNumber: 'SEIZURE-TN-LM-2026-2205',
    inspectorNotes: 'Seizure Memo Form VI executed on-site. 240 cases quarantined at Koyambedu warehouse. Sample bottles sent to Regional Metrological Laboratory for certified gravimetric verification.'
  }
];

export const DEFAULT_OFFICERS = [
  {
    id: 'off-1',
    name: 'Devendra Kumar Sharma',
    role: 'LEGAL_METROLOGY_INSPECTOR' as const,
    department: 'Delhi State Legal Metrology Division',
    badgeNumber: 'DL-LM-7042'
  },
  {
    id: 'off-2',
    name: 'Dr. Meenakshi Ramanathan',
    role: 'ENFORCEMENT_DIRECTOR' as const,
    department: 'Central Consumer Protection & Legal Metrology Wing',
    badgeNumber: 'CCPA-DIR-0019'
  },
  {
    id: 'off-3',
    name: 'Vikramjit Singh',
    role: 'MANUFACTURER_AUDITOR' as const,
    department: 'FMCG Packaging Quality & Statutory Compliance',
    badgeNumber: 'QA-CORP-4881'
  },
  {
    id: 'off-4',
    name: 'Pooja Iyer',
    role: 'ECOMMERCE_COMPLIANCE' as const,
    department: 'Marketplace Seller Verification Directorate',
    badgeNumber: 'ECOM-AUD-9912'
  }
];
