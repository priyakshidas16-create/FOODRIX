export type ComplianceStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'WARNING' | 'PENDING';
export type DeclarationStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'MISSING' | 'WARNING';
export type ViolationSeverity = 'CRITICAL' | 'MAJOR' | 'MINOR';

export interface BoundingBox {
  ymin: number; // 0 to 1000
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface FontAssessment {
  estimatedHeightMm: number;
  requiredHeightMm: number;
  compliant: boolean;
  readability: 'EXCELLENT' | 'ADEQUATE' | 'POOR';
  notes?: string;
}

export interface MandatoryDeclaration {
  id: string;
  ruleCitation: string;
  fieldName: string;
  extractedText: string;
  status: DeclarationStatus;
  findings: string;
  boundingBox?: BoundingBox;
  fontAssessment?: FontAssessment;
  isRequired: boolean;
}

export interface Violation {
  id: string;
  ruleCitation: string;
  severity: ViolationSeverity;
  declarationField: string;
  description: string;
  penaltySection: string;
  penaltyDetails: string;
  recommendedAction: string;
}

export interface WeightVerification {
  declaredNetQuantity: string;
  declaredNetValue: number;
  unit: string;
  grossWeightG?: number;
  tareWeightG?: number;
  actualNetWeightG?: number;
  differenceG?: number;
  mpeAllowedG?: number;
  mpePercentage?: number;
  isWithinMpe?: boolean;
  scaleCertificateNumber?: string;
  status: 'VERIFIED_COMPLIANT' | 'SHORT_WEIGHT_VIOLATION' | 'EXCESS_WEIGHT' | 'NOT_TESTED';
  verdictNotes?: string;
}

export interface PdpAnalysis {
  estimatedAreaSqCm: number;
  packagingType: 'RECTANGULAR_BOX' | 'CYLINDRICAL_BOTTLE' | 'POUCH_BAG' | 'OTHER';
  contrastRating: 'HIGH' | 'MEDIUM' | 'POOR';
  placementCompliant: boolean;
  findings: string;
}

export interface InspectionRecord {
  id: string;
  caseNumber: string;
  productName: string;
  brandName: string;
  category: 'FOOD_AND_BEVERAGE' | 'PERSONAL_CARE' | 'HOUSEHOLD_GOODS' | 'ELECTRONICS' | 'PHARMACEUTICAL_NON_DRUG' | 'GENERAL_COMMODITY';
  batchNumber?: string;
  barcode?: string;
  inspectionDate: string;
  inspectorName: string;
  inspectorId: string;
  jurisdiction: string;
  location: string;
  imageUrl: string;
  overallStatus: ComplianceStatus;
  complianceScore: number; // 0 - 100
  summary: string;
  declarations: MandatoryDeclaration[];
  violations: Violation[];
  weightVerification: WeightVerification;
  pdpAnalysis: PdpAnalysis;
  noticeIssued: boolean;
  noticeNumber?: string;
  inspectorNotes?: string;
  evidencePhotos?: string[];
}

export interface UserRole {
  id: string;
  name: string;
  role: 'LEGAL_METROLOGY_INSPECTOR' | 'ENFORCEMENT_DIRECTOR' | 'MANUFACTURER_AUDITOR' | 'ECOMMERCE_COMPLIANCE';
  department: string;
  badgeNumber: string;
}
