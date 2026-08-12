import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { classNames } from '@/utils/format';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 sm:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={classNames(
              'h-20 w-16 flex-shrink-0 overflow-hidden border-2 transition-all sm:h-24 sm:w-20',
              activeIndex === i ? 'border-ink-900' : 'border-transparent opacity-60 hover:opacity-100'
            )}
            aria-label={`View image ${i + 1}`}
          >
            <img src={img} alt={`${name} - view ${i + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1">
        <div
          className="relative aspect-[3/4] overflow-hidden bg-cream-200"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={images[activeIndex]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300"
            style={
              zoom
                ? {
                    transform: 'scale(2)',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }
                : undefined
            }
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-cream-50/90 px-2.5 py-1.5 text-2xs text-ink-500 backdrop-blur-sm">
            <ZoomIn size={12} />
            Hover to zoom
          </div>
        </div>
      </div>
    </div>
  );
}
