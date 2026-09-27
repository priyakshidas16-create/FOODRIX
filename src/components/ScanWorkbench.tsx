import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  Scan,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Scale,
  FileText,
  Printer,
  ShieldAlert,
  Info,
  Layers,
  Sparkles,
  Maximize2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { InspectionRecord, MandatoryDeclaration, UserRole } from '../types/compliance';
import { SAMPLE_INSPECTION_RECORDS } from '../data/sampleProducts';
import { calculateSecondScheduleMpe } from '../data/legalMetrologyRules';

interface ScanWorkbenchProps {
  currentRecord: InspectionRecord;
  onRecordChange: (record: InspectionRecord) => void;
  onOpenNotice: (record: InspectionRecord) => void;
  currentOfficer: UserRole;
  allRecords: InspectionRecord[];
}

export const ScanWorkbench: React.FC<ScanWorkbenchProps> = ({
  currentRecord,
  onRecordChange,
  onOpenNotice,
  currentOfficer,
  allRecords
}) => {
  const [selectedDeclarationId, setSelectedDeclarationId] = useState<string | null>(null);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanTab, setScanTab] = useState<'declarations' | 'violations' | 'weight' | 'pdp'>('declarations');

  // Input states for custom inspection / scale test
  const [productNameInput, setProductNameInput] = useState<string>(currentRecord.productName);
  const [brandNameInput, setBrandNameInput] = useState<string>(currentRecord.brandName);
  const [categoryInput, setCategoryInput] = useState<string>(currentRecord.category);
  const [grossWeightInput, setGrossWeightInput] = useState<string>(
    currentRecord.weightVerification.grossWeightG?.toString() || '1018'
  );
  const [tareWeightInput, setTareWeightInput] = useState<string>(
    currentRecord.weightVerification.tareWeightG?.toString() || '24'
  );
  const [scaleCertInput, setScaleCertInput] = useState<string>(
    currentRecord.weightVerification.scaleCertificateNumber || 'CAL-STD-2026-001'
  );
  const [customImageUri, setCustomImageUri] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when currentRecord changes
  useEffect(() => {
    setProductNameInput(currentRecord.productName);
    setBrandNameInput(currentRecord.brandName);
    setCategoryInput(currentRecord.category);
    if (currentRecord.weightVerification.grossWeightG) {
      setGrossWeightInput(currentRecord.weightVerification.grossWeightG.toString());
    }
    if (currentRecord.weightVerification.tareWeightG) {
      setTareWeightInput(currentRecord.weightVerification.tareWeightG.toString());
    }
    if (currentRecord.declarations.length > 0) {
      setSelectedDeclarationId(currentRecord.declarations[0].id);
    }
  }, [currentRecord.id]);

  const handleSelectSample = (sample: InspectionRecord) => {
    onRecordChange(sample);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCustomImageUri(base64);
        runAuditScan(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAuditScan = async (imgOverride?: string) => {
    setIsScanning(true);
    try {
      const targetImage = imgOverride || customImageUri || currentRecord.imageUrl;
      const response = await fetch('/api/analyze-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: targetImage,
          productName: productNameInput,
          brandName: brandNameInput,
          category: categoryInput,
          grossWeightG: grossWeightInput ? parseFloat(grossWeightInput) : undefined,
          tareWeightG: tareWeightInput ? parseFloat(tareWeightInput) : undefined,
          scaleCertificateNumber: scaleCertInput
        })
      });

      const data = await response.json();
      if (data.success && data.record) {
        onRecordChange(data.record);
      }
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const isCompliant = currentRecord.overallStatus === 'COMPLIANT';
  const isShortWeight = currentRecord.weightVerification.status === 'SHORT_WEIGHT_VIOLATION';

  const selectedDeclaration = currentRecord.declarations.find((d) => d.id === selectedDeclarationId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Sample Product Bar & Quick Audits */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Sample Commodities:
            </span>
            <span className="text-2xs text-slate-400 hidden lg:inline">
              (Curated Legal Metrology inspection cases)
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {SAMPLE_INSPECTION_RECORDS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentRecord.imageUrl === sample.imageUrl
                    ? 'bg-indigo-900 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{sample.productName.split(' ')[0]} {sample.productName.split(' ')[1]}</span>
                <span className={`text-2xs font-mono font-bold ${
                  sample.overallStatus === 'COMPLIANT' ? 'text-emerald-300' : 'text-rose-300'
                }`}>
                  [{sample.overallStatus === 'COMPLIANT' ? 'PASS' : 'FAIL'}]
                </span>
              </button>
            ))}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg transition-colors flex items-center gap-1 border border-indigo-200 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Label Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Inspection Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual Label Inspection & Bounding Box Overlay (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            {/* Visual Canvas Toolbar */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Scan className="w-4 h-4 text-indigo-700" />
                <span>Principal Display Panel (PDP) Visualizer</span>
              </span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={showBoundingBoxes}
                    onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Overlays</span>
                </label>
              </div>
            </div>

            {/* Interactive Image Container with Bounding Boxes */}
            <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[420px] max-h-[560px]">
              <img
                src={customImageUri || currentRecord.imageUrl}
                alt={currentRecord.productName}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[560px] select-none"
              />

              {/* Scanning Laser Animation during AI Processing */}
              {isScanning && (
                <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-2xs flex flex-col items-center justify-center text-white z-30">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse absolute top-1/2 -translate-y-1/2 shadow-lg shadow-cyan-400"></div>
                  <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mb-2" />
                  <span className="text-sm font-bold tracking-wider uppercase text-cyan-200">
                    Scanning Mandatory Declarations...
                  </span>
                  <span className="text-xs text-slate-300 mt-1">
                    Analyzing Rule 6(1), SI units, and font sizes
                  </span>
                </div>
              )}

              {/* SVG Bounding Boxes Overlay */}
              {showBoundingBoxes && !isScanning && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 1000 1000"
                  preserveAspectRatio="none"
                >
                  {currentRecord.declarations.map((dec) => {
                    if (!dec.boundingBox) return null;
                    const { ymin, xmin, ymax, xmax } = dec.boundingBox;
                    const isSelected = selectedDeclarationId === dec.id;
                    const isGood = dec.status === 'COMPLIANT';

                    const strokeColor = isSelected
                      ? '#38bdf8' // bright cyan when selected
                      : isGood
                      ? '#22c55e' // emerald green
                      : '#ef4444'; // rose red

                    const fillColor = isSelected
                      ? 'rgba(56, 189, 248, 0.22)'
                      : isGood
                      ? 'rgba(34, 197, 94, 0.12)'
                      : 'rgba(239, 68, 68, 0.18)';

                    return (
                      <g key={dec.id} className="pointer-events-auto cursor-pointer" onClick={() => setSelectedDeclarationId(dec.id)}>
                        <rect
                          x={xmin}
                          y={ymin}
                          width={Math.max(10, xmax - xmin)}
                          height={Math.max(10, ymax - ymin)}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={isSelected ? 4 : 2}
                          strokeDasharray={isGood ? 'none' : '4,2'}
                          rx={6}
                        />
                        {/* Label Badge on box */}
                        <rect
                          x={xmin}
                          y={Math.max(0, ymin - 32)}
                          width={Math.min(320, Math.max(120, (xmax - xmin) * 0.9))}
                          height={28}
                          fill={isSelected ? '#0284c7' : isGood ? '#15803d' : '#b91c1c'}
                          rx={4}
                        />
                        <text
                          x={xmin + 6}
                          y={Math.max(20, ymin - 12)}
                          fill="#ffffff"
                          fontSize="20"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {dec.ruleCitation.split(' ')[0]}: {dec.fieldName}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Selected Declaration OCR Preview */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Active Bounding Box OCR Extraction:
              </span>
              {selectedDeclaration ? (
                <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-slate-800">
                  <span className="text-2xs font-bold text-indigo-700 font-sans block mb-0.5">
                    {selectedDeclaration.ruleCitation} · {selectedDeclaration.fieldName}
                  </span>
                  "{selectedDeclaration.extractedText}"
                </div>
              ) : (
                <span className="text-slate-400 italic">Click any bounding box above to inspect OCR text</span>
              )}
            </div>
          </div>

          {/* Calibrated Bench Scale / Gravimetric Testing Section */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-indigo-700" />
                <span>Calibrated Bench Scale Testing (Second Schedule MPE)</span>
              </h3>
              <span className="text-2xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                Class III Scale
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Gross Scale Weight (g)
                </label>
                <input
                  type="number"
                  step="any"
                  value={grossWeightInput}
                  onChange={(e) => setGrossWeightInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 1018"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Tare (Packaging) Weight (g)
                </label>
                <input
                  type="number"
                  step="any"
                  value={tareWeightInput}
                  onChange={(e) => setTareWeightInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 24"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-2xs text-slate-400 font-mono">
                Scale Cert: {scaleCertInput}
              </span>
              <button
                onClick={() => runAuditScan()}
                disabled={isScanning}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-400 rounded transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>Re-Audit with Scale Weights</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Statutory Audit & Compliance Verdict (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Statutory Verdict Banner */}
          <div className={`p-5 rounded-xl border shadow-xs ${
            isCompliant
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
              : isShortWeight
              ? 'bg-rose-50/80 border-rose-300 text-rose-950'
              : 'bg-amber-50/80 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-2xs font-bold uppercase tracking-widest text-slate-600">
                  Legal Metrology (PC) Rules, 2011 Assessment
                </span>
                <h2 className="text-lg font-bold tracking-tight mt-0.5 flex items-center gap-2">
                  {isCompliant ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>COMPLIANT COMMODITY</span>
                    </>
                  ) : isShortWeight ? (
                    <>
                      <AlertOctagon className="w-5 h-5 text-rose-600" />
                      <span>CRITICAL SHORT-WEIGHT OFFENCE</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <span>STATUTORY NON-COMPLIANCE DETECTED</span>
                    </>
                  )}
                </h2>
                <p className="text-xs mt-1.5 leading-relaxed text-slate-700">
                  {currentRecord.summary}
                </p>
              </div>

              {/* Compliance Score Gauge */}
              <div className="text-center p-3 bg-white/90 rounded-lg border border-slate-200 shrink-0 shadow-2xs">
                <span className="text-2xs text-slate-500 font-semibold block uppercase">Audit Score</span>
                <span className={`text-2xl font-bold font-mono ${
                  currentRecord.complianceScore >= 90
                    ? 'text-emerald-700'
                    : currentRecord.complianceScore >= 60
                    ? 'text-amber-700'
                    : 'text-rose-700'
                }`}>
                  {currentRecord.complianceScore}%
                </span>
                <span className="text-2xs text-slate-400 block mt-0.5">Rule 6(1)</span>
              </div>
            </div>

            {/* Quick Action Button Bar */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
              <div className="text-2xs text-slate-600 font-mono">
                Case Ref: {currentRecord.caseNumber}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenNotice(currentRecord)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-900 hover:bg-indigo-800 rounded-md transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>
                    {isCompliant ? 'View Compliance Certificate' : 'Issue Official Legal Notice (Sec 15)'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation for Detailed Findings */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center border-b border-slate-200 bg-slate-50 text-xs font-semibold">
              <button
                onClick={() => setScanTab('declarations')}
                className={`px-4 py-2.5 transition-colors cursor-pointer border-b-2 ${
                  scanTab === 'declarations'
                    ? 'border-indigo-700 text-indigo-950 bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Mandatory Declarations ({currentRecord.declarations.length})
              </button>
              <button
                onClick={() => setScanTab('violations')}
                className={`px-4 py-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                  scanTab === 'violations'
                    ? 'border-indigo-700 text-indigo-950 bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Violations</span>
                {currentRecord.violations.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 text-2xs font-bold font-mono">
                    {currentRecord.violations.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setScanTab('weight')}
                className={`px-4 py-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                  scanTab === 'weight'
                    ? 'border-indigo-700 text-indigo-950 bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Gravimetric MPE Test</span>
                {isShortWeight && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-2xs font-bold">
                    FAIL
                  </span>
                )}
              </button>
              <button
                onClick={() => setScanTab('pdp')}
                className={`px-4 py-2.5 transition-colors cursor-pointer border-b-2 ${
                  scanTab === 'pdp'
                    ? 'border-indigo-700 text-indigo-950 bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                PDP & Font Analysis
              </button>
            </div>

            {/* Tab 1: Mandatory Declarations Checklist */}
            {scanTab === 'declarations' && (
              <div className="p-4 space-y-3 max-h-[580px] overflow-y-auto">
                <div className="text-2xs text-slate-500 font-medium">
                  Statutory Rule 6(1) declarations inspected for presence, phraseology, and SI compliance:
                </div>
                {currentRecord.declarations.map((dec) => {
                  const isDecCompliant = dec.status === 'COMPLIANT';
                  const isSelected = selectedDeclarationId === dec.id;

                  return (
                    <div
                      key={dec.id}
                      onClick={() => setSelectedDeclarationId(dec.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/40 shadow-xs'
                          : isDecCompliant
                          ? 'border-slate-200 bg-white hover:border-slate-300'
                          : 'border-rose-300 bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-700">
                            {dec.ruleCitation}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs font-semibold text-slate-900">
                            {dec.fieldName}
                          </span>
                        </div>
                        <span
                          className={`text-2xs font-bold px-2 py-0.5 rounded font-mono ${
                            isDecCompliant
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {dec.status}
                        </span>
                      </div>

                      <div className="mt-1.5 bg-slate-50 p-2 rounded text-xs font-mono text-slate-800 border border-slate-100">
                        "{dec.extractedText}"
                      </div>

                      <p className="mt-1.5 text-xs text-slate-600 leading-normal">
                        {dec.findings}
                      </p>

                      {dec.fontAssessment && (
                        <div className="mt-2 text-2xs flex items-center gap-3 text-slate-500 border-t border-slate-100 pt-1.5">
                          <span>
                            Font Height: <strong className="font-mono text-slate-800">{dec.fontAssessment.estimatedHeightMm} mm</strong> (Req: &ge; {dec.fontAssessment.requiredHeightMm} mm)
                          </span>
                          <span>·</span>
                          <span className={dec.fontAssessment.compliant ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                            {dec.fontAssessment.compliant ? 'Statutory Font Met' : 'Undersized Numeral'}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Violations & Statutory Penalties */}
            {scanTab === 'violations' && (
              <div className="p-4 space-y-3 max-h-[580px] overflow-y-auto">
                {currentRecord.violations.length > 0 ? (
                  currentRecord.violations.map((violation) => (
                    <div
                      key={violation.id}
                      className="p-4 rounded-lg border border-rose-300 bg-rose-50/50 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-950 font-mono">
                          {violation.ruleCitation}
                        </span>
                        <span className="px-2 py-0.5 text-2xs font-bold rounded bg-rose-700 text-white">
                          {violation.severity} VIOLATION
                        </span>
                      </div>

                      <div>
                        <strong className="text-slate-800 block text-xs">Infraction Summary:</strong>
                        <p className="text-slate-700 mt-0.5">{violation.description}</p>
                      </div>

                      <div className="bg-white/80 p-2.5 rounded border border-rose-200 text-2xs space-y-1">
                        <div>
                          <strong className="text-rose-900">Penalty Clause:</strong>{' '}
                          <span className="text-slate-800 font-medium">{violation.penaltySection}</span>
                        </div>
                        <p className="text-slate-600">{violation.penaltyDetails}</p>
                        <div className="pt-1 border-t border-rose-100 text-indigo-900 font-semibold">
                          Recommended Action: {violation.recommendedAction}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <span className="font-bold text-slate-800 block">No Violations Found</span>
                    <span>All statutory provisions under Legal Metrology Rules, 2011 are satisfied.</span>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Gravimetric MPE Test */}
            {scanTab === 'weight' && (
              <div className="p-5 space-y-4 text-xs">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Second Schedule Verification Parameters
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <span className="text-2xs text-slate-400 block uppercase">Declared Net</span>
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {currentRecord.weightVerification.declaredNetQuantity}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <span className="text-2xs text-slate-400 block uppercase">Actual Net Measured</span>
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {currentRecord.weightVerification.actualNetWeightG !== undefined
                          ? `${currentRecord.weightVerification.actualNetWeightG} g`
                          : 'Not Tested'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <span className="text-2xs text-slate-400 block uppercase">Allowable Deficiency</span>
                      <span className="text-sm font-bold font-mono text-indigo-700">
                        {currentRecord.weightVerification.mpeAllowedG} g
                      </span>
                      <span className="text-2xs text-slate-400 block">
                        ({currentRecord.weightVerification.mpePercentage}%)
                      </span>
                    </div>
                    <div className={`p-2.5 rounded border ${
                      currentRecord.weightVerification.isWithinMpe
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                    }`}>
                      <span className="text-2xs block uppercase">Verification Status</span>
                      <span className="text-sm font-bold font-mono">
                        {currentRecord.weightVerification.isWithinMpe ? 'PASS' : 'VIOLATION'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-slate-800">
                    Statutory Metrological Findings:
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {currentRecord.weightVerification.verdictNotes}
                  </p>
                  <p className="text-2xs text-slate-500">
                    Verified Scale Certificate Number: <span className="font-mono">{currentRecord.weightVerification.scaleCertificateNumber}</span> (Class III Verified Bench Scale)
                  </p>
                </div>
              </div>
            )}

            {/* Tab 4: PDP & Font Analysis */}
            {scanTab === 'pdp' && (
              <div className="p-5 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-2xs text-slate-400 uppercase block">Estimated PDP Area</span>
                    <span className="text-base font-bold font-mono text-slate-900">
                      {currentRecord.pdpAnalysis.estimatedAreaSqCm} cm²
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-2xs text-slate-400 uppercase block">Lettering Contrast</span>
                    <span className="text-base font-bold text-indigo-700">
                      {currentRecord.pdpAnalysis.contrastRating}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-800">Schedule II Font Height Rule Evaluation:</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {currentRecord.pdpAnalysis.findings}
                  </p>
                  <div className="mt-3 p-3 bg-indigo-50/60 rounded border border-indigo-100 text-2xs text-indigo-950 space-y-1">
                    <p><strong>Rule 9 Mandate:</strong> The height of numerals declaring net quantity shall not be less than the minimum statutory height specified in Schedule II.</p>
                    <p>Packaging Type Identified: <strong>{currentRecord.pdpAnalysis.packagingType.replace(/_/g, ' ')}</strong></p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
