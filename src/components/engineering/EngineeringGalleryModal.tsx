import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { EngineeringProjectGalleryItem } from '../../types/engineeringProject';
import { useTranslation } from '../../hooks/useTranslation';

interface EngineeringGalleryModalProps {
  items: EngineeringProjectGalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const EngineeringGalleryModal: React.FC<EngineeringGalleryModalProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const { isBangla } = useTranslation();

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onSelectIndex(currentIndex + 1);
    } else {
      onSelectIndex(0);
    }
  }, [currentIndex, items.length, onSelectIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectIndex(currentIndex - 1);
    } else {
      onSelectIndex(items.length - 1);
    }
  }, [currentIndex, items.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];
  const title = isBangla ? currentItem.titleBn || currentItem.titleEn : currentItem.titleEn;
  const caption = isBangla ? currentItem.captionBn || currentItem.captionEn : currentItem.captionEn;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Engineering Drawing and Image Lightbox"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Lightbox Frame */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col bg-[#070e1b] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Top Header / CAD Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
            <span className="font-semibold text-sky-400">
              {currentItem.type.toUpperCase().replace('_', ' ')}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Close image viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Image Display Area */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] max-h-[65vh] flex items-center justify-center p-4 bg-black/40 overflow-hidden">
          <img 
            src={currentItem.url} 
            alt={title || 'Engineering Drawing Sheet'} 
            className="max-h-full max-w-full object-contain mx-auto rounded shadow-lg select-none"
          />

          {/* Previous Button */}
          {items.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/60 shadow-lg transition-transform hover:scale-105"
              aria-label="Previous drawing"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next Button */}
          {items.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/60 shadow-lg transition-transform hover:scale-105"
              aria-label="Next drawing"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Bottom Metadata Bar */}
        {(title || caption) && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-300 space-y-1">
            {title && (
              <h4 className={`font-bold text-slate-100 ${isBangla ? 'font-bangla-serif' : ''}`}>
                {title}
              </h4>
            )}
            {caption && (
              <p className={`text-slate-400 ${isBangla ? 'font-bangla-sans' : ''}`}>
                {caption}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
