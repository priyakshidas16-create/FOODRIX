import React from 'react';
import { Layers, Server, ShieldCheck, Database, Cpu, Eye, CloudUpload, Scale } from 'lucide-react';

export const ArchitectureDocModal: React.FC<{ isStandalonePage?: boolean; onClose?: () => void }> = ({
  isStandalonePage = false,
  onClose,
}) => {
  const content = (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xs">
        <span className="text-2xs font-mono uppercase tracking-widest text-indigo-400">Statutory Compliance System</span>
        <h2 className="text-xl font-bold text-white mt-1">
          Technical Architecture & Deployment Framework
        </h2>
        <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Comprehensive software architecture, machine-vision OCR pipeline, rule-based legal metrology verification engine, and cloud deployment framework designed for the Ministry of Consumer Affairs and State Legal Metrology Enforcement Directorates.
        </p>
      </div>

      {/* 4-Tier Pipeline Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="text-xs font-bold text-slate-900 uppercase">Input & Ingestion Tier</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            High-resolution camera capture, file upload, or e-commerce listing scraping. Calibrated bench scale data integration via serial/bluetooth (Gross and Tare weights).
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="text-xs font-bold text-slate-900 uppercase">Multimodal AI & OCR Tier</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Gemini 3.8 Flash multimodal vision model analyzing the Principal Display Panel (PDP), localizing text regions with normalized bounding boxes [ymin, xmin, ymax, xmax].
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="text-xs font-bold text-slate-900 uppercase">Statutory Rule Engine</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Deterministic validation against Rules 6(1)(a)-(n), Rule 13 (SI units), Schedule II (font height thresholds), and Second Schedule (MPE short-weight analysis).
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            4
          </div>
          <h3 className="text-xs font-bold text-slate-900 uppercase">Enforcement & Notice Tier</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automated Form V Inspection Memos, Section 15 Seizure Notices, Section 48 compounding workflows, digital officer signature stamps, and departmental analytics.
          </p>
        </div>
      </div>

      {/* Deep-Dive Architectural Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Machine Vision & OCR Analysis */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-900">
            <Eye className="w-5 h-5 text-indigo-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Multimodal Vision & Declaration Extraction
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The machine vision tier ingests packaging imagery across curved bottles, flexible pouches, and rectangular cartons. It decomposes the Principal Display Panel (PDP) into semantic zones:
          </p>
          <ul className="text-xs text-slate-700 space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <li><strong>Manufacturer & Packer Zone:</strong> Parses premises numbers, industrial plot IDs, pin codes, and validates against postal master data.</li>
            <li><strong>Net Quantity & Unit Evaluator:</strong> Performs regex syntax tokenization to detect banned abbreviations ('gms', 'kgs', 'ltr', 'ml.') as distinct from statutory SI symbols ('g', 'kg', 'ml', 'l').</li>
            <li><strong>MRP Tax Phrasing Checker:</strong> Natural language parser verifying the presence of "inclusive of all taxes" or "incl. of all taxes" and flagging deceptive "+ local taxes" disclaimers.</li>
            <li><strong>Font Size Estimator:</strong> Calibrates pixel pitch against package dimensions to calculate real-world numeral heights in millimetres and matches against Schedule II requirements.</li>
          </ul>
        </div>

        {/* Second Schedule Gravimetric Verification */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-900">
            <Scale className="w-5 h-5 text-indigo-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Gravimetric MPE Computation Engine
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Integrates directly with Class II and Class III certified electronic weighing instruments to verify actual physical net quantity against declared nominal quantity:
          </p>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
            <p>1. Actual Net Weight (W_net) = Gross Weight - Tare Weight</p>
            <p>2. Deficiency (ΔW) = W_net - W_nominal</p>
            <p>3. Permissible Tolerance = SecondSchedule_Lookup(W_nominal)</p>
            <p>4. Short-Weight Flag: If ΔW &lt; -MPE_allowed &rarr; Section 36(2) Offence</p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The algorithm factors in liquid commodity densities where volumetric declarations (ml/L) are evaluated gravimetrically in accordance with National Physical Laboratory (NPL) gravimetric testing standards.
          </p>
        </div>

      </div>

      {/* Deployment & Security Framework */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-indigo-900">
          <Server className="w-5 h-5 text-indigo-700" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Cloud Deployment & Operational Framework
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CloudUpload className="w-4 h-4 text-indigo-600" />
              <span>Containerized Cloud Deployment</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Packaged as an OCI-compliant container orchestrated on Google Cloud Run or Kubernetes with automatic scale-to-zero during off-peak inspection hours and sub-second auto-scaling during field raids.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Role-Based Access Control (RBAC)</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Strict multi-tier privilege isolation between Field Inspectors (scan & issue notice), Enforcement Directors (approval & compounding under Sec 48), and Enterprise Packers (self-audit pre-dispatch).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-600" />
              <span>Audit Trail & Chain of Custody</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Cryptographically timestamped inspection logs, SHA-256 evidence photo hashes, calibrated scale certificate linking, and exportable legal memos admissible under Section 65B of the Indian Evidence Act.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isStandalonePage) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <span className="text-sm font-bold text-slate-800">System Technical Architecture</span>
          {onClose && (
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
              ✕
            </button>
          )}
        </div>
        <div className="p-6 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};
