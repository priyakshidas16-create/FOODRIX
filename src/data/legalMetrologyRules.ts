/**
 * Legal Metrology (Packaged Commodities) Rules, 2011 & Legal Metrology Act, 2009
 * Codified Statutory Provisions, Font Size Tables, and MPE Matrix
 */

export interface RuleDefinition {
  ruleCode: string;
  ruleTitle: string;
  ruleDescription: string;
  mandatoryRequirements: string[];
  commonViolations: string[];
  penaltySection: string;
  penaltySummary: string;
}

export const LEGAL_RULES: Record<string, RuleDefinition> = {
  'RULE_6_1_A': {
    ruleCode: 'Rule 6(1)(a)',
    ruleTitle: 'Manufacturer / Packer / Importer Details',
    ruleDescription: 'Every package must bear the name and complete address of the manufacturer, or where the manufacturer is not the packer, the name and address of the manufacturer and packer, or for imported goods, the name and address of the importer.',
    mandatoryRequirements: [
      'Complete registered address including premises number, street, city, pin code and state',
      'Clear indication whether entity is Manufacturer, Packer, or Importer',
      'For e-commerce marketplace sellers, name and address of manufacturer and packer must be clearly declared'
    ],
    commonViolations: [
      'Declaring only city/state without street or premises address',
      'Ambiguous phrasing such as "Marketed by" without manufacturer or packer details',
      'Missing pin code or incomplete address preventing consumer or enforcement contact'
    ],
    penaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    penaltySummary: 'Fine up to ₹25,000 for first offence, ₹50,000 for second offence, and up to ₹1,00,000 or imprisonment up to 1 year for subsequent offences.'
  },
  'RULE_6_1_B': {
    ruleCode: 'Rule 6(1)(b)',
    ruleTitle: 'Generic or Common Name of Commodity',
    ruleDescription: 'The common or generic names of the commodity contained in the package and where the package contains more than one product, the name and quantity of each product shall be mentioned.',
    mandatoryRequirements: [
      'Standard generic name recognized in trade or FSSAI/BIS classifications',
      'Must not mislead consumer through fancy trademark without generic descriptor',
      'In multi-pack/combos, exact name and quantity of each distinct item'
    ],
    commonViolations: [
      'Using only a brand name (e.g. "SUPERCRISP") without generic declaration (e.g. "Potato Chips")',
      'Misleading descriptors that do not reflect actual composition'
    ],
    penaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    penaltySummary: 'Fine up to ₹25,000 for first offence; compoundable under Section 48.'
  },
  'RULE_6_1_C': {
    ruleCode: 'Rule 6(1)(c) & Rule 13',
    ruleTitle: 'Net Quantity & Standard Unit of Measure',
    ruleDescription: 'The net quantity in terms of the standard unit of weight or measure or number shall be declared on the principal display panel.',
    mandatoryRequirements: [
      'Standard International (SI) units only: "g" or "kg" for mass, "ml" or "l" / "L" for volume, "m" / "cm" for length, "N" or "U" for number',
      'No plural symbols: "g" (not "gms" or "gm"), "kg" (not "kgs"), "ml" (not "mls" or "ml."), "l" (not "ltr" or "ltrs")',
      'Symbol must not be followed by a period or dot unless at the end of a sentence',
      'Weight shall be declared in gross weight only when specifically permissible'
    ],
    commonViolations: [
      'Illegal non-standard unit symbols such as "gms", "kgs", "ltr", "ml.", "pcs"',
      'Declaring net weight with qualifiers like "when packed" or "approximate weight"',
      'Using symbols in upper case inappropriately (e.g. "KG" or "GMS")'
    ],
    penaltySection: 'Section 36(1) & Section 39 of Legal Metrology Act, 2009',
    penaltySummary: 'Fine up to ₹25,000 for first offence. Non-standard unit use attracts immediate compounding notices.'
  },
  'RULE_6_1_D': {
    ruleCode: 'Rule 6(1)(d)',
    ruleTitle: 'Month & Year of Manufacture / Packing / Import',
    ruleDescription: 'The month and year in which the commodity is manufactured or packed or imported shall be declared.',
    mandatoryRequirements: [
      'Standard format: "MM/YYYY" or "Month YYYY" (e.g. "04/2026" or "April 2026")',
      'Words "Mfg. Date", "Packed on", or "Import Date" preceding the declaration',
      'Must be clearly legible and distinct from batch or lot numbering'
    ],
    commonViolations: [
      'Only declaring year without month',
      'Smudged or faint dot-matrix printing that is illegible to consumers',
      'Concealing manufacturing date behind folds or seals'
    ],
    penaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    penaltySummary: 'Fine up to ₹25,000 for first offence; notice under Rule 27.'
  },
  'RULE_6_1_DA': {
    ruleCode: 'Rule 6(1)(da)',
    ruleTitle: 'Maximum Retail Price (MRP) & Inclusive of All Taxes',
    ruleDescription: 'The retail sale price of the package shall be stated in Indian Rupees as Maximum or Max. Retail Price Rs. ...... / ₹ ...... inclusive of all taxes or MRP Rs. ...... / ₹ ...... incl. of all taxes.',
    mandatoryRequirements: [
      'Exact statutory phrase: "incl. of all taxes" or "inclusive of all taxes"',
      'Currency symbol "₹" or "Rs."',
      'No overriding sticker over original printed price unless authorized under notification during duty revision',
      'No conditional pricing like "+ local taxes extra" or "GST extra"'
    ],
    commonViolations: [
      'Missing "inclusive of all taxes" or "incl. of all taxes" qualification',
      'Dual MRP printing for different outlets or airports without statutory exemption',
      'Smudged or illegible price overprinting'
    ],
    penaltySection: 'Section 36(1) & Section 36(2) of Legal Metrology Act, 2009',
    penaltySummary: 'Selling above MRP attracts fine up to ₹50,000 or imprisonment. Declaratory non-compliance fine up to ₹25,000.'
  },
  'RULE_6_1_E': {
    ruleCode: 'Rule 6(1)(e)',
    ruleTitle: 'Consumer Care & Grievance Redressal Details',
    ruleDescription: 'Every package shall bear the name, address, telephone number, and e-mail address of the person or office which can be contacted in case of consumer complaints.',
    mandatoryRequirements: [
      'Name of the designated consumer care officer / executive / department',
      'Complete postal address of the grievance office',
      'Working telephone number / toll-free helpline',
      'Valid email address for consumer grievances'
    ],
    commonViolations: [
      'Declaring only a phone number with no email address (or only email with no telephone)',
      'Declaring generic website URL without explicit email or customer care contact',
      'Illegible micro-text tucked inside seam or fold'
    ],
    penaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    penaltySummary: 'Fine up to ₹25,000 for first offence; seizure of non-conforming batch.'
  },
  'RULE_6_1_F': {
    ruleCode: 'Rule 6(1)(f)',
    ruleTitle: 'Country of Origin',
    ruleDescription: 'The name of the country of origin or manufacture or assembly shall be declared on every package, whether imported or domestic.',
    mandatoryRequirements: [
      'Clear statement: "Country of Origin: [Country]" or "Made in [Country]"',
      'For imported goods, name of the importing country and manufacturing country',
      'Must be conspicuously displayed on the Principal Display Panel or declaration panel'
    ],
    commonViolations: [
      'Complete omission of Country of Origin declaration',
      'Ambiguous statements like "Engineered in Germany" without disclosing country of manufacture'
    ],
    penaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    penaltySummary: 'Fine up to ₹25,000 for first offence.'
  },
  'RULE_6_1_N': {
    ruleCode: 'Rule 6(1)(n)',
    ruleTitle: 'Unit Sale Price (USP)',
    ruleDescription: 'Mandatory declaration of Unit Sale Price in Rupees per g/ml or per kg/L for packages containing more than 1 kg or 1 L, or items containing multiple discrete units.',
    mandatoryRequirements: [
      'For commodities <= 1 kg or 1 L: price per 100 g or per 100 ml',
      'For commodities > 1 kg or 1 L: price per 1 kg or per 1 L',
      'For items sold by length: price per 1 meter or per 100 cm',
      'For items sold by number: price per piece / number'
    ],
    commonViolations: [
      'Failure to declare USP on packages > 1kg/1L',
      'Incorrect calculation of unit sale price',
      'Declaring USP with non-standard units'
    ],
    penaltySection: 'Rule 6(1)(n) read with Section 36(1)',
    penaltySummary: 'Fine up to ₹25,000 for first offence.'
  },
  'SCHEDULE_II_FONT': {
    ruleCode: 'Rule 9 & Schedule II',
    ruleTitle: 'Minimum Height of Numerals & Letters on PDP',
    ruleDescription: 'The minimum height of numerals and letters for declarations on the Principal Display Panel (PDP) depends on net quantity and area of the display panel.',
    mandatoryRequirements: [
      'Net quantity <= 50g/ml: Minimum font height 1.0 mm (Blown/Moulded/Perforated: 2.0 mm)',
      'Net quantity 50g/ml to 200g/ml: Minimum font height 2.0 mm (Blown/Moulded/Perforated: 4.0 mm)',
      'Net quantity 200g/ml to 1kg/L: Minimum font height 4.0 mm (Blown/Moulded/Perforated: 6.0 mm)',
      'Net quantity > 1kg/L: Minimum font height 6.0 mm (Blown/Moulded/Perforated: 8.0 mm)',
      'Adequate contrast between declaration lettering and background'
    ],
    commonViolations: [
      'Using font height below statutory minimum (e.g. 1.2mm for 500g package requiring 4mm)',
      'Poor contrast (e.g. light gray text on silver metallic background)',
      'Narrow condensed fonts that compress letter width below 1/3 of height'
    ],
    penaltySection: 'Rule 9 & Rule 32 of Legal Metrology (PC) Rules, 2011',
    penaltySummary: 'Fine up to ₹25,000 for first offence; compoundable under Section 48.'
  },
  'SECOND_SCHEDULE_MPE': {
    ruleCode: 'Second Schedule (Rule 24)',
    ruleTitle: 'Maximum Permissible Error (MPE) in Net Quantity',
    ruleDescription: 'The maximum permissible error (short-weight / deficiency) allowed on net quantity of packaged commodities during inspection.',
    mandatoryRequirements: [
      'Actual net weight/volume must not fall below Nominal Quantity minus MPE',
      'Average net quantity of sample batch must equal or exceed declared net quantity'
    ],
    commonViolations: [
      'Deficiency exceeding the Maximum Permissible Error limit',
      'Systematic short-weighting across batch packages'
    ],
    penaltySection: 'Section 36(2) & Section 30 of Legal Metrology Act, 2009',
    penaltySummary: 'Quoting short weight: fine up to ₹50,000 or imprisonment up to 1 year for second or subsequent offence.'
  }
};

/**
 * Calculates statutory minimum font height based on nominal quantity
 */
export function getStatutoryFontHeight(nominalQtyGramsOrMl: number, isBlownMoulded: boolean = false): {
  minNumeralHeightMm: number;
  minLetterHeightMm: number;
  ruleCitation: string;
} {
  if (nominalQtyGramsOrMl <= 50) {
    return {
      minNumeralHeightMm: isBlownMoulded ? 2.0 : 1.0,
      minLetterHeightMm: isBlownMoulded ? 2.0 : 1.0,
      ruleCitation: 'Schedule II, Table I (Nominal Qty <= 50g)'
    };
  } else if (nominalQtyGramsOrMl <= 200) {
    return {
      minNumeralHeightMm: isBlownMoulded ? 4.0 : 2.0,
      minLetterHeightMm: isBlownMoulded ? 2.0 : 1.0,
      ruleCitation: 'Schedule II, Table I (Nominal Qty 50g - 200g)'
    };
  } else if (nominalQtyGramsOrMl <= 1000) {
    return {
      minNumeralHeightMm: isBlownMoulded ? 6.0 : 4.0,
      minLetterHeightMm: isBlownMoulded ? 3.0 : 2.0,
      ruleCitation: 'Schedule II, Table I (Nominal Qty 200g - 1kg)'
    };
  } else {
    return {
      minNumeralHeightMm: isBlownMoulded ? 8.0 : 6.0,
      minLetterHeightMm: isBlownMoulded ? 4.0 : 3.0,
      ruleCitation: 'Schedule II, Table I (Nominal Qty > 1kg)'
    };
  }
}

/**
 * Second Schedule: Maximum Permissible Error (MPE) Calculation
 * Under Legal Metrology (Packaged Commodities) Rules, 2011
 */
export interface MpeResult {
  declaredQuantity: number;
  unit: string;
  allowedDeficiencyG: number;
  percentageEquivalent: number;
  minimumAcceptableWeightG: number;
  mpeRuleDescription: string;
}

export function calculateSecondScheduleMpe(nominalQuantityG: number, unit: string = 'g'): MpeResult {
  let allowedDeficiencyG = 0;
  let percentageEquivalent = 0;
  let ruleDesc = '';

  const q = nominalQuantityG;

  if (q <= 50) {
    // Up to 50g: 9%
    allowedDeficiencyG = (q * 9.0) / 100;
    percentageEquivalent = 9.0;
    ruleDesc = 'Second Schedule: 9.0% for <= 50g/ml';
  } else if (q <= 100) {
    // 50g to 100g: 4.5g
    allowedDeficiencyG = 4.5;
    percentageEquivalent = Number(((4.5 / q) * 100).toFixed(2));
    ruleDesc = 'Second Schedule: 4.5g fixed for 50g to 100g';
  } else if (q <= 200) {
    // 100g to 200g: 4.5%
    allowedDeficiencyG = (q * 4.5) / 100;
    percentageEquivalent = 4.5;
    ruleDesc = 'Second Schedule: 4.5% for 100g to 200g';
  } else if (q <= 300) {
    // 200g to 300g: 9.0g
    allowedDeficiencyG = 9.0;
    percentageEquivalent = Number(((9.0 / q) * 100).toFixed(2));
    ruleDesc = 'Second Schedule: 9.0g fixed for 200g to 300g';
  } else if (q <= 500) {
    // 300g to 500g: 3.0%
    allowedDeficiencyG = (q * 3.0) / 100;
    percentageEquivalent = 3.0;
    ruleDesc = 'Second Schedule: 3.0% for 300g to 500g';
  } else if (q <= 1000) {
    // 500g to 1000g: 15.0g
    allowedDeficiencyG = 15.0;
    percentageEquivalent = Number(((15.0 / q) * 100).toFixed(2));
    ruleDesc = 'Second Schedule: 15.0g fixed for 500g to 1000g';
  } else if (q <= 10000) {
    // 1kg to 10kg: 1.5%
    allowedDeficiencyG = (q * 1.5) / 100;
    percentageEquivalent = 1.5;
    ruleDesc = 'Second Schedule: 1.5% for 1kg to 10kg';
  } else if (q <= 15000) {
    // 10kg to 15kg: 150g
    allowedDeficiencyG = 150.0;
    percentageEquivalent = Number(((150.0 / q) * 100).toFixed(2));
    ruleDesc = 'Second Schedule: 150.0g fixed for 10kg to 15kg';
  } else {
    // Above 15kg: 1.0%
    allowedDeficiencyG = (q * 1.0) / 100;
    percentageEquivalent = 1.0;
    ruleDesc = 'Second Schedule: 1.0% for > 15kg';
  }

  // Round to 2 decimal places
  allowedDeficiencyG = Number(allowedDeficiencyG.toFixed(2));
  const minimumAcceptableWeightG = Number((q - allowedDeficiencyG).toFixed(2));

  return {
    declaredQuantity: q,
    unit,
    allowedDeficiencyG,
    percentageEquivalent,
    minimumAcceptableWeightG,
    mpeRuleDescription: ruleDesc
  };
}

/**
 * Validates Net Quantity unit symbol for standard compliance under Rule 13
 */
export function validateUnitSymbol(unitStr: string): { isValid: boolean; normalized: string; message: string } {
  const clean = unitStr.trim().toLowerCase();
  
  const illegalSymbols: Record<string, string> = {
    'gms': 'g',
    'gm': 'g',
    'g.': 'g',
    'kgs': 'kg',
    'kg.': 'kg',
    'ltr': 'l',
    'ltrs': 'l',
    'litres': 'l',
    'liter': 'l',
    'ml.': 'ml',
    'mls': 'ml',
    'pcs': 'N',
    'pc': 'N',
    'nos': 'N',
    'no.': 'N',
    'units': 'U'
  };

  if (illegalSymbols[clean]) {
    return {
      isValid: false,
      normalized: illegalSymbols[clean],
      message: `Violation under Rule 13: Non-standard unit symbol "${unitStr}" used. Mandatory standard symbol is "${illegalSymbols[clean]}". Plural forms or trailing dots are prohibited.`
    };
  }

  const validSymbols = ['g', 'kg', 'mg', 'ml', 'l', 'm', 'cm', 'mm', 'n', 'u'];
  if (validSymbols.includes(clean)) {
    return {
      isValid: true,
      normalized: clean,
      message: 'Compliant with Rule 13 standard SI unit notation.'
    };
  }

  return {
    isValid: true,
    normalized: clean,
    message: 'Unit recognized.'
  };
}
