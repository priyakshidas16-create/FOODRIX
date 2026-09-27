import React, { useState } from 'react';
import { BookOpen, ShieldAlert, FileText, CheckCircle2, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import { LEGAL_RULES } from '../data/legalMetrologyRules';

interface RulesReferenceModalProps {
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export const RulesReferenceModal: React.FC<RulesReferenceModalProps> = ({
  onClose,
  isStandalonePage = false
}) => {
  const [selectedRuleKey, setSelectedRuleKey] = useState<string>('RULE_6_1_A');

  const selectedRule = LEGAL_RULES[selectedRuleKey] || LEGAL_RULES['RULE_6_1_A'];

  const content = (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-indigo-950 text-white p-6 rounded-xl flex items-start gap-4 shadow-sm">
        <div className="p-3 bg-indigo-900 rounded-lg text-amber-400 shrink-0">
          <BookOpen className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Legal Metrology (Packaged Commodities) Rules, 2011 & Legal Metrology Act, 2009
          </h2>
          <p className="text-xs text-indigo-200 mt-1 max-w-3xl leading-relaxed">
            Statutory compendium of mandatory declarations, Principal Display Panel font size thresholds, and prosecution penalties for enforcement officers and quality compliance auditors in India.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Rule Selector Navigation */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
            Statutory Rules & Provisions
          </h3>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 shadow-2xs">
            {Object.entries(LEGAL_RULES).map(([key, rule]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedRuleKey(key)}
                className={`w-full text-left p-3.5 transition-colors flex items-center justify-between cursor-pointer ${
                  selectedRuleKey === key
                    ? 'bg-indigo-50/80 text-indigo-950 font-bold border-l-4 border-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50 font-medium'
                }`}
              >
                <div>
                  <span className="text-xs text-indigo-700 block font-mono">{rule.ruleCode}</span>
                  <span className="text-xs line-clamp-1">{rule.ruleTitle}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </button>
            ))}
          </div>

          {/* Schedule II Font Height Quick Guide Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Schedule II: Font Height Matrix
            </h4>
            <div className="text-xs text-slate-600 space-y-1.5 font-sans">
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>&le; 50 g / ml:</span>
                <span className="font-mono font-bold text-slate-900">&ge; 1.0 mm</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>50 g to 200 g:</span>
                <span className="font-mono font-bold text-slate-900">&ge; 2.0 mm</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>200 g to 1 kg:</span>
                <span className="font-mono font-bold text-slate-900">&ge; 4.0 mm</span>
              </div>
              <div className="flex justify-between">
                <span>&gt; 1 kg / 1 L:</span>
                <span className="font-mono font-bold text-slate-900">&ge; 6.0 mm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Rule Specification */}
        <div className="md:col-span-2 space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">
                {selectedRule.ruleCode}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">
                {selectedRule.ruleTitle}
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                {selectedRule.ruleDescription}
              </p>
            </div>

            {/* Mandatory Statutory Requirements */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mandatory Legal Compliance Checklist</span>
              </h4>
              <ul className="space-y-2">
                {selectedRule.mandatoryRequirements.map((req, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50/70 p-2.5 rounded border border-slate-100">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Observed Violations */}
            <div>
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Frequently Detected Non-Compliances & Violations</span>
              </h4>
              <ul className="space-y-2">
                {selectedRule.commonViolations.map((viol, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-rose-50/50 p-2.5 rounded border border-rose-100">
                    <span className="text-rose-600 font-bold mt-0.5">•</span>
                    <span>{viol}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Statutory Penalty Section */}
            <div className="p-4 bg-slate-900 text-white rounded-lg">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Prosecution & Penalty Under Legal Metrology Act, 2009</span>
              </div>
              <p className="text-xs font-bold text-white mt-1">
                {selectedRule.penaltySection}
              </p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedRule.penaltySummary}
              </p>
            </div>
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
          <span className="text-sm font-bold text-slate-800">Legal Metrology Rules & Penalties Handbook</span>
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
