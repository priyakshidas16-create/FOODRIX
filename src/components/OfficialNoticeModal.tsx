import React, { useRef, useState } from 'react';
import { X, Printer, Download, CheckCircle, AlertTriangle, ShieldAlert, FileDown, Loader2 } from 'lucide-react';
import { InspectionRecord, UserRole } from '../types/compliance';
import { generateOfficialNoticePdf } from '../utils/exportNoticePdf';

interface OfficialNoticeModalProps {
  record: InspectionRecord;
  currentOfficer: UserRole;
  onClose: () => void;
}

export const OfficialNoticeModal: React.FC<OfficialNoticeModalProps> = ({
  record,
  currentOfficer,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = async () => {
    try {
      setIsExportingPdf(true);
      await generateOfficialNoticePdf(record, currentOfficer);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${record.caseNumber.replace(/\//g, '_')}_compliance_report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const isCompliant = record.overallStatus === 'COMPLIANT';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Action Bar (Hidden during print) */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Official Document</span>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold text-slate-800">
              {isCompliant ? 'Certificate of Compliance' : 'Notice of Violation & Inspection Memo'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-400 rounded-md transition-colors cursor-pointer shadow-2xs"
              title="Download branded official PDF with seal and statutory tables"
            >
              {isExportingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-amber-400" />
                  <span>Export Official PDF</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Browser Print</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div ref={printRef} className="p-8 sm:p-12 overflow-y-auto font-sans text-slate-900 text-sm leading-relaxed bg-white">
          
          {/* Official Letterhead Header */}
          <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
            <div className="inline-block p-2 rounded-full border-2 border-slate-800 mb-2">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-900">GOVERNMENT OF INDIA</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-950 uppercase">
              DEPARTMENT OF CONSUMER AFFAIRS
            </h1>
            <h2 className="text-base font-semibold text-slate-800">
              STATE LEGAL METROLOGY ENFORCEMENT WING
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Statutory Inspection under Section 15 & 18 of the Legal Metrology Act, 2009 read with Legal Metrology (Packaged Commodities) Rules, 2011
            </p>
          </div>

          {/* Reference Meta Table */}
          <div className="grid grid-cols-2 gap-4 text-xs border border-slate-300 p-4 rounded-md mb-6 bg-slate-50/50">
            <div>
              <p><strong className="text-slate-700">Notice / Memo Ref:</strong> <span className="font-mono">{record.noticeNumber || record.caseNumber}</span></p>
              <p><strong className="text-slate-700">Inspection Case ID:</strong> <span className="font-mono">{record.caseNumber}</span></p>
              <p><strong className="text-slate-700">Inspection Date & Time:</strong> {new Date(record.inspectionDate).toLocaleString('en-IN')}</p>
              <p><strong className="text-slate-700">Inspection Location:</strong> {record.location}</p>
            </div>
            <div>
              <p><strong className="text-slate-700">Inspecting Officer:</strong> {record.inspectorName}</p>
              <p><strong className="text-slate-700">Inspector ID / Badge:</strong> <span className="font-mono">{record.inspectorId}</span></p>
              <p><strong className="text-slate-700">Jurisdiction:</strong> {record.jurisdiction}</p>
              <p><strong className="text-slate-700">Compliance Status:</strong> 
                <span className={`ml-1.5 font-bold ${isCompliant ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {record.overallStatus.replace(/_/g, ' ')}
                </span>
              </p>
            </div>
          </div>

          {/* Commodity Details */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              1. Details of Sample Packaged Commodity Inspected
            </h3>
            <table className="w-full text-xs border-collapse border border-slate-300">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-semibold bg-slate-50 w-1/4 border-r border-slate-200">Product / Commodity:</td>
                  <td className="p-2 w-1/4 border-r border-slate-200">{record.productName}</td>
                  <td className="p-2 font-semibold bg-slate-50 w-1/4 border-r border-slate-200">Brand Name:</td>
                  <td className="p-2 w-1/4">{record.brandName}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-semibold bg-slate-50 border-r border-slate-200">Category:</td>
                  <td className="p-2 border-r border-slate-200">{record.category.replace(/_/g, ' ')}</td>
                  <td className="p-2 font-semibold bg-slate-50 border-r border-slate-200">Batch / Lot No:</td>
                  <td className="p-2 font-mono">{record.batchNumber || 'N/A'}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-semibold bg-slate-50 border-r border-slate-200">Declared Net Quantity:</td>
                  <td className="p-2 font-mono border-r border-slate-200">{record.weightVerification.declaredNetQuantity}</td>
                  <td className="p-2 font-semibold bg-slate-50 border-r border-slate-200">Packaging Type:</td>
                  <td className="p-2">{record.pdpAnalysis.packagingType.replace(/_/g, ' ')}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold bg-slate-50 border-r border-slate-200">Barcode / GTIN:</td>
                  <td className="p-2 font-mono border-r border-slate-200">{record.barcode || 'N/A'}</td>
                  <td className="p-2 font-semibold bg-slate-50 border-r border-slate-200">Compliance Score:</td>
                  <td className="p-2 font-semibold">{record.complianceScore} / 100</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Physical Weight & MPE Verification */}
          {record.weightVerification.status !== 'NOT_TESTED' && (
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                2. Gravimetric Verification & Second Schedule Maximum Permissible Error (MPE)
              </h3>
              <div className="border border-slate-300 p-3 rounded-md text-xs">
                <div className="grid grid-cols-4 gap-3 text-center mb-3">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <div className="text-slate-500">Gross Weight</div>
                    <div className="text-sm font-bold font-mono">{record.weightVerification.grossWeightG} g</div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <div className="text-slate-500">Tare Weight</div>
                    <div className="text-sm font-bold font-mono">{record.weightVerification.tareWeightG} g</div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <div className="text-slate-500">Actual Net Weight</div>
                    <div className="text-sm font-bold font-mono">{record.weightVerification.actualNetWeightG} g</div>
                  </div>
                  <div className={`p-2 rounded border ${record.weightVerification.isWithinMpe ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
                    <div className="text-xs">Deficiency / Excess</div>
                    <div className="text-sm font-bold font-mono">
                      {record.weightVerification.differenceG !== undefined && record.weightVerification.differenceG > 0 ? `+${record.weightVerification.differenceG}` : record.weightVerification.differenceG} g
                    </div>
                  </div>
                </div>
                <p className="text-slate-700">
                  <strong>Verification Scale Calib. No:</strong> <span className="font-mono">{record.weightVerification.scaleCertificateNumber}</span> (Class III Verified Scale)
                </p>
                <p className="text-slate-700 mt-1">
                  <strong>Statutory MPE Threshold:</strong> Allowable negative error is {record.weightVerification.mpeAllowedG} g ({record.weightVerification.mpePercentage}% of declared quantity).
                </p>
                <p className={`mt-1 font-semibold ${record.weightVerification.isWithinMpe ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {record.weightVerification.verdictNotes}
                </p>
              </div>
            </div>
          )}

          {/* Statutory Violations Table (if any) */}
          {record.violations.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-800 border-b border-rose-300 pb-1 mb-3">
                3. Summary of Statutory Violations & Non-Compliances Noted
              </h3>
              <table className="w-full text-xs border border-rose-200 border-collapse mb-3">
                <thead className="bg-rose-50 text-rose-950 font-bold">
                  <tr>
                    <th className="p-2 border border-rose-200 text-left w-12">#</th>
                    <th className="p-2 border border-rose-200 text-left w-48">Rule & Section Citation</th>
                    <th className="p-2 border border-rose-200 text-left">Specific Non-Compliance</th>
                    <th className="p-2 border border-rose-200 text-left w-48">Statutory Penalty Section</th>
                  </tr>
                </thead>
                <tbody>
                  {record.violations.map((violation, index) => (
                    <tr key={violation.id} className="border-b border-rose-100">
                      <td className="p-2 border border-rose-200 font-mono text-center">{index + 1}</td>
                      <td className="p-2 border border-rose-200 font-semibold text-rose-900">{violation.ruleCitation}</td>
                      <td className="p-2 border border-rose-200">{violation.description}</td>
                      <td className="p-2 border border-rose-200 text-slate-800 font-medium">{violation.penaltySection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-950 leading-relaxed">
                <strong>DIRECTIONS TO PERSON RESPONSIBLE:</strong> You are hereby given notice to show cause within <strong>14 (fourteen) days</strong> from the receipt of this memo as to why prosecution should not be initiated against you under Section 36 of the Legal Metrology Act, 2009. Alternatively, you may apply in writing for compounding of the offence under Section 48 of the Act upon depositing the prescribed composition sum and submitting an undertaking of compliance.
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-md text-xs text-emerald-950">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900 mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>CERTIFICATE OF COMPLIANCE</span>
              </div>
              <p>
                The sample packaged commodity was inspected for all 8 mandatory declarations under Rule 6(1) of the Legal Metrology (Packaged Commodities) Rules, 2011 and physical gravimetric tolerance under the Second Schedule. No statutory infractions or label deficiencies were observed.
              </p>
            </div>
          )}

          {/* Declaration Verification Checklist */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              4. Mandatory Declarations Audit Matrix (Rule 6(1))
            </h3>
            <table className="w-full text-xs border border-slate-300 border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-semibold">
                <tr>
                  <th className="p-2 border border-slate-300 text-left w-28">Rule</th>
                  <th className="p-2 border border-slate-300 text-left w-36">Declaration</th>
                  <th className="p-2 border border-slate-300 text-left">Text Extracted from Package</th>
                  <th className="p-2 border border-slate-300 text-center w-28">Status</th>
                </tr>
              </thead>
              <tbody>
                {record.declarations.map((dec) => (
                  <tr key={dec.id} className="border-b border-slate-200">
                    <td className="p-2 border border-slate-300 font-mono text-slate-600">{dec.ruleCitation}</td>
                    <td className="p-2 border border-slate-300 font-medium">{dec.fieldName}</td>
                    <td className="p-2 border border-slate-300 text-slate-700 italic">"{dec.extractedText}"</td>
                    <td className="p-2 border border-slate-300 text-center font-bold">
                      <span className={dec.status === 'COMPLIANT' ? 'text-emerald-700' : 'text-rose-700'}>
                        {dec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Endorsement and Signatures */}
          <div className="mt-12 pt-6 border-t border-slate-400 grid grid-cols-2 gap-8 text-xs">
            <div>
              <p className="font-semibold text-slate-700">Receipt Acknowledged by:</p>
              <div className="mt-8 border-b border-slate-400 w-48"></div>
              <p className="text-slate-500 mt-1">Signature of Manufacturer / Packer / Retailer Representative</p>
              <p className="text-slate-500">Name & Designation:</p>
              <p className="text-slate-500">Date:</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-700">Issued by Authorized Enforcement Officer:</p>
              <div className="mt-8 border-b border-slate-400 w-48 ml-auto"></div>
              <p className="font-bold text-slate-900 mt-1">{record.inspectorName}</p>
              <p className="text-slate-600">Legal Metrology Inspector (Badge: {record.inspectorId})</p>
              <p className="text-slate-600">{record.jurisdiction}</p>
              <p className="text-slate-500 mt-1 font-mono">Digital Signature Stamp Verified: {record.caseNumber}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
