import { useState } from 'react';
import { X } from 'lucide-react';
import { classNames } from '@/utils/format';

interface SizeSelectorProps {
  sizes: string[];
  unavailableSizes?: string[];
  selected: string | null;
  onChange: (size: string) => void;
}

const SIZE_GUIDE = [
  { size: 'S', chest: '96-101', waist: '80-85', length: '27' },
  { size: 'M', chest: '101-106', waist: '85-90', length: '28' },
  { size: 'L', chest: '106-111', waist: '90-95', length: '29' },
  { size: 'XL', chest: '111-116', waist: '95-100', length: '30' },
  { size: 'XXL', chest: '116-121', waist: '100-105', length: '31' },
];

export default function SizeSelector({ sizes, unavailableSizes = [], selected, onChange }: SizeSelectorProps) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium uppercase tracking-wider">Select Size</span>
          {selected && <span className="text-sm text-ink-400">· {selected}</span>}
        </div>
        <button
          onClick={() => setShowGuide(true)}
          className="text-xs text-ink-500 underline underline-offset-2 transition-colors hover:text-ink-900"
        >
          Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {sizes.map((size) => {
          const unavailable = unavailableSizes.includes(size);
          return (
            <button
              key={size}
              disabled={unavailable}
              onClick={() => onChange(size)}
              className={classNames(
                'flex h-12 min-w-12 items-center justify-center border px-4 text-sm font-medium transition-all',
                unavailable
                  ? 'cursor-not-allowed border-ink-200 text-ink-300 line-through'
                  : selected === size
                    ? 'border-ink-900 bg-ink-900 text-cream-50'
                    : 'border-ink-200 text-ink-900 hover:border-ink-900'
              )}
              aria-label={`Size ${size}${unavailable ? ' - unavailable' : ''}`}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Size guide modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowGuide(false)} />
          <div className="relative w-full max-w-md border border-ink-200 bg-cream-50 p-6 animate-scale-in">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-medium">Size Guide</h3>
              <button onClick={() => setShowGuide(false)} aria-label="Close size guide">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <p className="mb-4 text-xs text-ink-400">All measurements in cm</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-left">
                  <th className="py-2 font-medium">Size</th>
                  <th className="py-2 font-medium">Chest</th>
                  <th className="py-2 font-medium">Waist</th>
                  <th className="py-2 font-medium">Length</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.size} className="border-b border-ink-100">
                    <td className="py-2.5 font-medium">{row.size}</td>
                    <td className="py-2.5 text-ink-500">{row.chest}</td>
                    <td className="py-2.5 text-ink-500">{row.waist}</td>
                    <td className="py-2.5 text-ink-500">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-ink-400">
              Tip: If you are between sizes, size up for a relaxed fit or size down for a tailored fit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
