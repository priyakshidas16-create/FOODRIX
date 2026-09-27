/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScanWorkbench } from './components/ScanWorkbench';
import { EnforcementDashboard } from './components/EnforcementDashboard';
import { MpeCalculatorModal } from './components/MpeCalculatorModal';
import { RulesReferenceModal } from './components/RulesReferenceModal';
import { ArchitectureDocModal } from './components/ArchitectureDocModal';
import { OfficialNoticeModal } from './components/OfficialNoticeModal';
import { SAMPLE_INSPECTION_RECORDS, DEFAULT_OFFICERS } from './data/sampleProducts';
import { InspectionRecord, UserRole } from './types/compliance';

export default function App() {
  const [activeTab, setActiveTab] = useState<'workbench' | 'dashboard' | 'mpe-calc' | 'rules' | 'architecture'>('workbench');
  const [currentOfficer, setCurrentOfficer] = useState<UserRole>(DEFAULT_OFFICERS[0]);
  const [inspections, setInspections] = useState<InspectionRecord[]>(SAMPLE_INSPECTION_RECORDS);
  const [currentRecord, setCurrentRecord] = useState<InspectionRecord>(SAMPLE_INSPECTION_RECORDS[0]);
  const [noticeModalRecord, setNoticeModalRecord] = useState<InspectionRecord | null>(null);

  // Fetch persisted/live inspections from backend on mount
  useEffect(() => {
    fetch('/api/inspections')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setInspections(data);
          setCurrentRecord(data[0]);
        }
      })
      .catch((err) => {
        console.warn('Backend not ready or offline, using sample records:', err);
      });
  }, []);

  const handleRecordChange = (updatedRecord: InspectionRecord) => {
    setCurrentRecord(updatedRecord);
    setInspections((prev) => {
      const idx = prev.findIndex((i) => i.id === updatedRecord.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updatedRecord;
        return copy;
      } else {
        return [updatedRecord, ...prev];
      }
    });
  };

  const handleSelectFromDashboard = (record: InspectionRecord) => {
    setCurrentRecord(record);
    setActiveTab('workbench');
  };

  const handleOpenNotice = (record: InspectionRecord) => {
    setNoticeModalRecord(record);
  };

  const handleNewScan = () => {
    setActiveTab('workbench');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header compliant with Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentOfficer={currentOfficer}
        setCurrentOfficer={setCurrentOfficer}
        onNewScan={handleNewScan}
      />

      {/* Main Viewport Content based on active tab */}
      <main className="flex-1">
        {activeTab === 'workbench' && (
          <ScanWorkbench
            currentRecord={currentRecord}
            onRecordChange={handleRecordChange}
            onOpenNotice={handleOpenNotice}
            currentOfficer={currentOfficer}
            allRecords={inspections}
          />
        )}

        {activeTab === 'dashboard' && (
          <EnforcementDashboard
            inspections={inspections}
            onSelectInspection={handleSelectFromDashboard}
            onOpenNotice={handleOpenNotice}
            currentOfficer={currentOfficer}
          />
        )}

        {activeTab === 'mpe-calc' && (
          <MpeCalculatorModal isStandalonePage={true} />
        )}

        {activeTab === 'rules' && (
          <RulesReferenceModal isStandalonePage={true} />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureDocModal isStandalonePage={true} />
        )}
      </main>

      {/* Official Notice / Inspection Memo Modal (print-ready) */}
      {noticeModalRecord && (
        <OfficialNoticeModal
          record={noticeModalRecord}
          currentOfficer={currentOfficer}
          onClose={() => setNoticeModalRecord(null)}
        />
      )}

      {/* Quiet Government Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 tracking-tight">FOODRIX</span>
            <span aria-hidden="true">·</span>
            <span>Legal Metrology (Packaged Commodities) Rules, 2011</span>
            <span aria-hidden="true">·</span>
            <span>Legal Metrology Act, 2009</span>
          </div>
          <div className="text-slate-400 text-2xs">
            Ministry of Consumer Affairs, Food and Public Distribution, Government of India
          </div>
        </div>
      </footer>
    </div>
  );
}
