import React from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'ghost' | 'whatsapp' | 'cream' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StickerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  to?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * StickerButton Component
 * 
 * Tactile, physical pill button with thin 1.5px espresso border,
 * soft bottom-lip shadow (0 3.5px 0 #23170F), and responsive press depression.
 * Typography: Clean geometric sans-serif (Plus Jakarta Sans, weight 600).
 */
export const StickerButton: React.FC<StickerButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  to,
  isExternal,
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 
    "inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-full border-[1.5px] border-espresso-border transition-all duration-150 select-none cursor-pointer focus:outline-none";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs shadow-lip-sm active:translate-y-[1px] active:shadow-lip-press",
    md: "px-6 py-2.5 text-sm sm:text-base shadow-lip-md hover:shadow-lip-lg hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-lip-press",
    lg: "px-8 py-3 text-base sm:text-lg shadow-lip-md hover:shadow-lip-lg hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-lip-press"
  }[size];

  const variantStyles = {
    // Terracotta fill with cream text
    primary: "bg-terracotta text-cream-light hover:bg-terracotta-hover",
    // Cream outlined ghost button
    ghost: "bg-cream-light/80 text-espresso hover:bg-cream-soft",
    // Emerald green for WhatsApp CTA
    whatsapp: "bg-emerald text-white hover:bg-emerald-hover",
    // Cream pill for dark backgrounds
    cream: "bg-cream-light text-espresso hover:bg-honey-soft",
    // Espresso dark pill
    dark: "bg-espresso text-cream-light hover:bg-espresso-soft"
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
};
