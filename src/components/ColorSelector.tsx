import { Check } from 'lucide-react';
import { classNames } from '@/utils/format';

interface ColorSelectorProps {
  colors: { name: string; hex: string }[];
  selected: string | null;
  onChange: (color: string) => void;
}

export default function ColorSelector({ colors, selected, onChange }: ColorSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm font-medium uppercase tracking-wider">Select Color</span>
        {selected && <span className="text-sm text-ink-400">· {selected}</span>}
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onChange(color.name)}
            title={color.name}
            aria-label={`Color: ${color.name}`}
            className={classNames(
              'relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
              selected === color.name
                ? 'border-ink-900 ring-1 ring-ink-900 ring-offset-2 ring-offset-cream-50'
                : 'border-ink-200 hover:border-ink-400'
            )}
          >
            <span
              className="h-7 w-7 rounded-full"
              style={{ backgroundColor: color.hex }}
            />
            {selected === color.name && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check
                  size={16}
                  className={color.name === 'White' || color.name === 'Cream' || color.name === 'Sky Blue' || color.name === 'Beige' || color.name === 'Sage' ? 'text-ink-900' : 'text-cream-50'}
                  strokeWidth={2.5}
                />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
