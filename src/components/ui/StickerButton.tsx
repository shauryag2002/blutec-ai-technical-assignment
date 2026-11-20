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
 * Tactile, physical pill button with 2px espresso border,
 * unblurred hard offset shadow, and pressed-down physical feedback.
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
    "inline-flex items-center justify-center gap-2 font-display font-bold rounded-full border-2 border-espresso transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-honey";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs shadow-hard-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
    md: "px-6 py-3 text-sm sm:text-base shadow-hard-md hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-press",
    lg: "px-8 py-3.5 text-base sm:text-lg shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-xl active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-press"
  }[size];

  const variantStyles = {
    // Terracotta fill with cream text -> inverts on dark
    primary: "bg-terracotta text-cream-light hover:bg-terracotta-hover",
    // Cream outline that fills with cream on dark or terracotta on light
    ghost: "bg-transparent text-espresso hover:bg-cream-soft",
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

