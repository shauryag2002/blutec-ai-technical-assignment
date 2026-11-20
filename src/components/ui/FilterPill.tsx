import React from 'react';

interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

/**
 * FilterPill Component
 * 
 * A tactile toggle pill used in the puppy catalogue filters.
 * Active state switches to vibrant terracotta fill with hard offset shadow.
 */
export const FilterPill: React.FC<FilterPillProps> = ({
  label,
  isActive,
  onClick,
  count
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-display font-bold border-2 border-espresso transition-all duration-150 select-none cursor-pointer ${isActive
          ? 'bg-terracotta text-cream-light shadow-hard-md translate-x-[-1px] translate-y-[-1px]'
          : 'bg-cream-light text-espresso hover:bg-honey-soft shadow-hard-sm'
        } active:translate-x-[1px] active:translate-y-[1px] active:shadow-hard-press`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold ${isActive ? 'bg-white/25 text-white' : 'bg-espresso/10 text-espresso'
            }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};

