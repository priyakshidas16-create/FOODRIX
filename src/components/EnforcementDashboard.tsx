import React, { useState } from 'react';
import {
  BarChart3,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  FileText,
  Printer,
  Scale,
  ArrowUpDown,
  Download,
  Calendar,
  Building,
  Eye
} from 'lucide-react';
import { InspectionRecord, UserRole } from '../types/compliance';

interface EnforcementDashboardProps {
  inspections: InspectionRecord[];
  onSelectInspection: (record: InspectionRecord) => void;
  onOpenNotice: (record: InspectionRecord) => void;
  currentOfficer: UserRole;
}

export const EnforcementDashboard: React.FC<EnforcementDashboardProps> = ({
  inspections,
  onSelectInspection,
  onOpenNotice,
  currentOfficer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'COMPLIANT' | 'NON_COMPLIANT' | 'SHORT_WEIGHT'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Compute stats
  const totalInspections = inspections.length;
  const compliantCount = inspections.filter((i) => i.overallStatus === 'COMPLIANT').length;
  const nonCompliantCount = inspections.filter((i) => i.overallStatus !== 'COMPLIANT').length;
  const complianceRate = totalInspections > 0 ? Math.round((compliantCount / totalInspections) * 100) : 0;
  const noticesIssuedCount = inspections.filter((i) => i.noticeIssued).length;
  const shortWeightCount = inspections.filter((i) => i.weightVerification.status === 'SHORT_WEIGHT_VIOLATION').length;

  // Filtered list
  const filteredInspections = inspections.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.batchNumber && item.batchNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.barcode && item.barcode.includes(searchQuery));

    let matchesStatus = true;
    if (statusFilter === 'COMPLIANT') {
      matchesStatus = item.overallStatus === 'COMPLIANT';
    } else if (statusFilter === 'NON_COMPLIANT') {
      matchesStatus = item.overallStatus === 'NON_COMPLIANT';
    } else if (statusFilter === 'SHORT_WEIGHT') {
      matchesStatus = item.weightVerification.status === 'SHORT_WEIGHT_VIOLATION';
    }

    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleExportCsv = () => {
    const headers = ['Case Number', 'Product Name', 'Brand', 'Category', 'Status', 'Score', 'Declared Net', 'Actual Net', 'Violations Count', 'Notice Issued', 'Date'];
    const rows = inspections.map((i) => [
      `"${i.caseNumber}"`,
      `"${i.productName}"`,
      `"${i.brandName}"`,
      `"${i.category}"`,
      `"${i.overallStatus}"`,
      i.complianceScore,
      `"${i.weightVerification.declaredNetQuantity}"`,
      i.weightVerification.actualNetWeightG || 'N/A',
      i.violations.length,
      i.noticeIssued ? 'YES' : 'NO',
      `"${new Date(i.inspectionDate).toLocaleDateString('en-IN')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `legal_metrology_inspections_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Legal Metrology Enforcement Directorate
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Central repository of inspected packaged commodities, statutory non-compliance registries, and penalty proceedings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV Registry</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Total Inspected</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {totalInspections}
          </div>
          <span className="text-2xs text-slate-400 mt-1 block">Packaged Commodities</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Compliance Rate</span>
          <div className="text-2xl font-bold font-mono text-indigo-700 mt-1 tabular-nums">
            {complianceRate}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full"
              style={{ width: `${complianceRate}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Non-Compliant</span>
          <div className="text-2xl font-bold font-mono text-rose-600 mt-1 tabular-nums">
            {nonCompliantCount}
          </div>
          <span className="text-2xs text-rose-600/80 mt-1 block">Label / Unit Violations</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Critical Short-Weight</span>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
            {shortWeightCount}
          </div>
          <span className="text-2xs text-amber-600/80 mt-1 block">Exceeds MPE Limit</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs col-span-2 lg:col-span-1">
          <span className="text-xs text-slate-500 font-medium">Statutory Notices</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {noticesIssuedCount}
          </div>
          <span className="text-2xs text-slate-400 mt-1 block">Section 15 / Form V</span>
        </div>

      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product, brand, batch or case ID..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'ALL' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setStatusFilter('COMPLIANT')}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'COMPLIANT' ? 'bg-white text-emerald-800 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Compliant ({compliantCount})
            </button>
            <button
              onClick={() => setStatusFilter('NON_COMPLIANT')}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'NON_COMPLIANT' ? 'bg-white text-rose-800 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Non-Compliant ({nonCompliantCount})
            </button>
            <button
              onClick={() => setStatusFilter('SHORT_WEIGHT')}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'SHORT_WEIGHT' ? 'bg-white text-amber-800 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Short-Weight ({shortWeightCount})
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="FOOD_AND_BEVERAGE">Food & Beverage</option>
              <option value="PERSONAL_CARE">Personal Care & Cosmetics</option>
              <option value="HOUSEHOLD_GOODS">Household Goods</option>
              <option value="ELECTRONICS">Electronics & Appliances</option>
              <option value="GENERAL_COMMODITY">General Commodities</option>
            </select>
          </div>

        </div>
      </div>

      {/* High-Density Data Grid */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 w-36">Case Number</th>
                <th className="p-3">Product & Commodity</th>
                <th className="p-3 w-28">Category</th>
                <th className="p-3 w-28">Declared Qty</th>
                <th className="p-3 w-32">Weight Test</th>
                <th className="p-3 text-center w-28">Score</th>
                <th className="p-3 w-32">Statutory Status</th>
                <th className="p-3 w-28 text-center">Violations</th>
                <th className="p-3 text-right w-44">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInspections.length > 0 ? (
                filteredInspections.map((record) => {
                  const isCompliant = record.overallStatus === 'COMPLIANT';
                  const isShortWeight = record.weightVerification.status === 'SHORT_WEIGHT_VIOLATION';

                  return (
                    <tr
                      key={record.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => onSelectInspection(record)}
                    >
                      {/* Case Number */}
                      <td className="p-3 font-mono font-medium text-slate-800 whitespace-nowrap">
                        {record.caseNumber}
                        <span className="block text-2xs text-slate-400 font-sans mt-0.5">
                          {new Date(record.inspectionDate).toLocaleDateString('en-IN')}
                        </span>
                      </td>

                      {/* Product Name & Brand */}
                      <td className="p-3">
                        <div className="font-semibold text-slate-900 group-hover:text-indigo-900 line-clamp-1">
                          {record.productName}
                        </div>
                        <div className="text-2xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span>{record.brandName}</span>
                          {record.batchNumber && (
                            <>
                              <span>·</span>
                              <span className="font-mono">Batch: {record.batchNumber}</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3 text-slate-600 whitespace-nowrap">
                        {record.category === 'FOOD_AND_BEVERAGE'
                          ? 'Food & Bev'
                          : record.category === 'PERSONAL_CARE'
                          ? 'Personal Care'
                          : record.category.replace(/_/g, ' ')}
                      </td>

                      {/* Declared Qty */}
                      <td className="p-3 font-mono font-medium text-slate-800 whitespace-nowrap">
                        {record.weightVerification.declaredNetQuantity}
                      </td>

                      {/* Weight Test */}
                      <td className="p-3 whitespace-nowrap">
                        {record.weightVerification.status === 'NOT_TESTED' ? (
                          <span className="text-slate-400 font-sans text-2xs">Not Tested</span>
                        ) : (
                          <div>
                            <span className="font-mono font-medium">
                              {record.weightVerification.actualNetWeightG} g
                            </span>
                            <span
                              className={`block text-2xs font-semibold ${
                                isShortWeight ? 'text-rose-600' : 'text-emerald-600'
                              }`}
                            >
                              {record.weightVerification.differenceG !== undefined && record.weightVerification.differenceG > 0
                                ? `+${record.weightVerification.differenceG} g`
                                : `${record.weightVerification.differenceG} g`}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Score */}
                      <td className="p-3 text-center">
                        <span
                          className={`font-mono font-bold text-xs ${
                            record.complianceScore >= 90
                              ? 'text-emerald-700'
                              : record.complianceScore >= 60
                              ? 'text-amber-700'
                              : 'text-rose-700'
                          }`}
                        >
                          {record.complianceScore}%
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 text-2xs font-bold px-2 py-0.5 rounded ${
                            isCompliant
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : isShortWeight
                              ? 'bg-rose-50 text-rose-800 border border-rose-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {isCompliant ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>COMPLIANT</span>
                            </>
                          ) : isShortWeight ? (
                            <>
                              <AlertOctagon className="w-3 h-3 text-rose-600" />
                              <span>SHORT-WEIGHT</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              <span>NON-COMPLIANT</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Violations Count */}
                      <td className="p-3 text-center font-mono font-bold text-slate-800">
                        {record.violations.length}
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectInspection(record)}
                            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                            title="Inspect Label & Bounding Boxes"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => onOpenNotice(record)}
                            className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                            title="View Official Legal Notice"
                          >
                            Notice
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No inspection records found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
