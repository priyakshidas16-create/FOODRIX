import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertOctagon, Info, ArrowRight } from 'lucide-react';
import { calculateSecondScheduleMpe } from '../data/legalMetrologyRules';

interface MpeCalculatorModalProps {
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export const MpeCalculatorModal: React.FC<MpeCalculatorModalProps> = ({
  onClose,
  isStandalonePage = false
}) => {
  const [nominalQuantity, setNominalQuantity] = useState<string>('500');
  const [unit, setUnit] = useState<string>('g');
  const [grossWeight, setGrossWeight] = useState<string>('520');
  const [tareWeight, setTareWeight] = useState<string>('24');

  const nominalNum = parseFloat(nominalQuantity) || 0;
  const mpeResult = calculateSecondScheduleMpe(nominalNum, unit);

  const grossNum = parseFloat(grossWeight) || 0;
  const tareNum = parseFloat(tareWeight) || 0;
  const actualNetWeight = Number((grossNum - tareNum).toFixed(2));
  const deficiency = Number((actualNetWeight - nominalNum).toFixed(2));
  const isCompliant = actualNetWeight >= mpeResult.minimumAcceptableWeightG;

  const content = (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-xl flex items-start gap-4">
        <div className="p-2.5 bg-indigo-800 rounded-lg text-amber-400 shrink-0">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Second Schedule: Maximum Permissible Error (MPE) Verification Engine
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Under Rule 24 and the Second Schedule of the Legal Metrology (Packaged Commodities) Rules, 2011, individual packages must not have a negative error exceeding the prescribed tolerance limit. Packaged commodities with deficiencies beyond MPE are liable for seizure under Section 15 and penalty under Section 36(2).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Interactive Inputs */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span>1. Nominal Package Specifications</span>
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Declared Net Quantity
              </label>
              <input
                type="number"
                min="1"
                step="any"
                value={nominalQuantity}
                onChange={(e) => setNominalQuantity(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. 500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Unit (Rule 13)
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
              >
                <option value="g">g (grams)</option>
                <option value="kg">kg (kilograms)</option>
                <option value="ml">ml (millilitres)</option>
                <option value="l">l / L (litres)</option>
              </select>
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-xs text-slate-500 font-medium">Quick Presets: </span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {[
                { label: '50 g (Spice/Cream)', val: '50', u: 'g' },
                { label: '150 g (Biscuits)', val: '150', u: 'g' },
                { label: '250 g (Tea/Snack)', val: '250', u: 'g' },
                { label: '500 g (Pulses/Ghee)', val: '500', u: 'g' },
                { label: '1000 g / 1 kg (Flour)', val: '1000', u: 'g' },
                { label: '5000 g / 5 kg (Rice)', val: '5000', u: 'g' },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setNominalQuantity(p.val);
                    setUnit(p.u);
                  }}
                  className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Calibrated Physical Scale Measurement
            </h3>
            <p className="text-xs text-slate-500">
              Enter verification weights measured on verified Class II or Class III scale.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gross Weight (Package + Content)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={grossWeight}
                    onChange={(e) => setGrossWeight(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono pr-8 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. 520"
                  />
                  <span className="absolute right-2.5 top-2.5 text-xs text-slate-400 font-mono">g</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tare Weight (Packaging Material)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={tareWeight}
                    onChange={(e) => setTareWeight(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono pr-8 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. 24"
                  />
                  <span className="absolute right-2.5 top-2.5 text-xs text-slate-400 font-mono">g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Statutory Verdict & Calculations */}
        <div className="space-y-4">
          {/* Statutory Tolerance Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Second Schedule Statutory Tolerance
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 block">Nominal Net</span>
                <span className="text-base font-bold font-mono text-slate-900">
                  {nominalNum} {unit}
                </span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 block">Allowable Deficiency</span>
                <span className="text-base font-bold font-mono text-indigo-700">
                  {mpeResult.allowedDeficiencyG} {unit}
                </span>
                <span className="text-2xs text-slate-600 block mt-0.5">({mpeResult.percentageEquivalent}%)</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-500 block">Min. Acceptable Net</span>
                <span className="text-base font-bold font-mono text-slate-900">
                  {mpeResult.minimumAcceptableWeightG} {unit}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>{mpeResult.mpeRuleDescription}</span>
            </p>
          </div>

          {/* Test Verification Verdict */}
          <div className={`p-5 rounded-xl border ${isCompliant ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/70 border-rose-200'}`}>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Inspection Scale Verdict
                </span>
                <h3 className={`text-lg font-bold mt-0.5 flex items-center gap-2 ${isCompliant ? 'text-emerald-900' : 'text-rose-900'}`}>
                  {isCompliant ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>COMPLIANT (WITHIN MPE)</span>
                    </>
                  ) : (
                    <>
                      <AlertOctagon className="w-5 h-5 text-rose-600" />
                      <span>SHORT-WEIGHT VIOLATION</span>
                    </>
                  )}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xs text-slate-500 uppercase">Actual Net Weight</span>
                <div className="text-xl font-bold font-mono text-slate-900">
                  {actualNetWeight} {unit}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600">Net Deficiency / Excess:</span>
                <span className={`font-mono font-bold ${deficiency >= 0 ? 'text-emerald-700' : isCompliant ? 'text-slate-700' : 'text-rose-700'}`}>
                  {deficiency > 0 ? `+${deficiency}` : deficiency} {unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Statutory MPE Limit:</span>
                <span className="font-mono text-slate-800">
                  - {mpeResult.allowedDeficiencyG} {unit}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Enforcement Determination:</span>
                <span className={isCompliant ? 'text-emerald-700' : 'text-rose-700'}>
                  {isCompliant
                    ? 'Within legal tolerance. No prosecution warranted.'
                    : `Exceeds allowable tolerance by ${Math.abs(Number((deficiency + mpeResult.allowedDeficiencyG).toFixed(2)))} ${unit}. Liable for prosecution under Section 36(2).`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Reference Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
          Statutory Schedule: Maximum Permissible Error (MPE) Limits on Net Quantity
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-semibold">
              <tr>
                <th className="p-2.5 border border-slate-200">Nominal Quantity (g or ml)</th>
                <th className="p-2.5 border border-slate-200 text-center">Maximum Permissible Error (as % of q)</th>
                <th className="p-2.5 border border-slate-200 text-center">Maximum Permissible Error (g or ml)</th>
                <th className="p-2.5 border border-slate-200">Statutory Rule Citation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
              <tr className={nominalNum <= 50 ? 'bg-indigo-50/70 font-bold text-indigo-950' : ''}>
                <td className="p-2.5 border border-slate-200 font-sans">Up to 50 g / ml</td>
                <td className="p-2.5 border border-slate-200 text-center">9.0 %</td>
                <td className="p-2.5 border border-slate-200 text-center">-</td>
                <td className="p-2.5 border border-slate-200 font-sans">Second Schedule, Entry 1</td>
              </tr>
              <tr className={nominalNum > 50 && nominalNum <= 100 ? 'bg-indigo-50/70 font-bold text-indigo-950' : ''}>
                <td className="p-2.5 border border-slate-200 font-sans">50 to 100 g / ml</td>
                <td className="p-2.5 border border-slate-200 text-center">-</td>
                <td className="p-2.5 border border-slate-200 text-center">4.5 g / ml</td>
                <td className="p-2.5 border border-slate-200 font-sans">Second Schedule, Entry 2</td>
              </tr>
              <tr className={nominalNum > 100 && nominalNum <= 200 ? 'bg-indigo-50/70 font-bold text-indigo-950' : ''}>
                <td className="p-2.5 border border-slate-200 font-sans">100 to 200 g / ml</td>
                <td className="p-2.5 border border-slate-200 text-center">4.5 %</td>
                <td className="p-2.5 border border-slate-200 text-center">-</td>
                <td className="p-2.5 border border-slate-200 font-sans">Second Schedule, Entry 3</td>
              </tr>
              <tr className={nominalNum > 200 && nominalNum <= 300 ? 'bg-indigo-50/70 font-bold text-indigo-950' : ''}>
                <td className="p-2.5 border border-slate-200 font-sans">200 to 300 g / ml</td>
                <td className="p-2.5 border border-slate-200 text-center">-</td>
                <td className="p-2.5 border border-slate-200 text-center">9.0 g / ml</td>
                <td className="p-2.5 border border-slate-200 font-sans">Second Schedule, Entry 4</td>
              </tr>
              <tr className={nominalNum > 300 && nominalNum <= 500 ? 'bg-indigo-50/70 font-bold text-indigo-950' : ''}>
                <td className="p-2.5 border border-slate-200 font-sans">300 to 500 g / ml</td>
                <td className="p-2.5 border border-slate-200 text-center">3.0 %</td>
                <td className="p-2.5 border border-slate-200 text-center">-</td>
                <td className="p-2.5 border border-slate-200 font-sans">Second Schedule, Entry 5</td>
              </tr>
              <tr className={nominalNum > 500 && nominalNum <= 1000 ? 'bg-indigo-50/70 font-bold text-indigo-950' : ''}>
                <td className="p-2.5 border border-slate-200 font-sans">500 to 1000 g / ml (1 kg / 1 L)</td>
                <td className="p-2.5 border border-slate-200 text-center">-</td>
                <td className="p-2.5 border border-slate-200 text-center">15.0 g / ml</td>
                <td className="p-2.5 border border-slate-200 font-sans">Second Schedule, Entry 6</td>
              </tr>
              <tr className={nominalNum > 1000 && nominalNum <= 10000 ? 'bg-indigo-50/70 font-bold text-indigo-950' : ''}>
                <td className="p-2.5 border border-slate-200 font-sans">1 kg to 10 kg / 1 L to 10 L</td>
                <td className="p-2.5 border border-slate-200 text-center">1.5 %</td>
                <td className="p-2.5 border border-slate-200 text-center">-</td>
                <td className="p-2.5 border border-slate-200 font-sans">Second Schedule, Entry 7</td>
              </tr>
              <tr className={nominalNum > 10000 && nominalNum <= 15000 ? 'bg-indigo-50/70 font-bold text-indigo-950' : ''}>
                <td className="p-2.5 border border-slate-200 font-sans">10 kg to 15 kg</td>
                <td className="p-2.5 border border-slate-200 text-center">-</td>
                <td className="p-2.5 border border-slate-200 text-center">150.0 g</td>
                <td className="p-2.5 border border-slate-200 font-sans">Second Schedule, Entry 8</td>
              </tr>
              <tr className={nominalNum > 15000 ? 'bg-indigo-50/70 font-bold text-indigo-950' : ''}>
                <td className="p-2.5 border border-slate-200 font-sans">More than 15 kg</td>
                <td className="p-2.5 border border-slate-200 text-center">1.0 %</td>
                <td className="p-2.5 border border-slate-200 text-center">-</td>
                <td className="p-2.5 border border-slate-200 font-sans">Second Schedule, Entry 9</td>
              </tr>
            </tbody>
          </table>
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
          <span className="text-sm font-bold text-slate-800">Second Schedule MPE Calculator</span>
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
