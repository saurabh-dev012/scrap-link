import React from 'react';
import { motion } from 'framer-motion';

export type IconVariant = 'emerald' | 'teal' | 'indigo' | 'amber' | 'cyan' | 'purple' | 'slate' | 'dark';
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface IconPlateProps {
  icon: React.ReactNode;
  variant?: IconVariant;
  size?: IconSize;
  className?: string;
  animateHover?: boolean;
}

const variantStyles: Record<IconVariant, { container: string; iconColor: string; glow: string }> = {
  emerald: {
    container: 'bg-gradient-to-b from-emerald-50 to-emerald-100/60 border-emerald-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(16,185,129,0.08)]',
    iconColor: 'text-emerald-700',
    glow: 'group-hover:ring-emerald-500/20'
  },
  teal: {
    container: 'bg-gradient-to-b from-teal-50 to-teal-100/60 border-teal-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(20,184,166,0.08)]',
    iconColor: 'text-teal-700',
    glow: 'group-hover:ring-teal-500/20'
  },
  indigo: {
    container: 'bg-gradient-to-b from-indigo-50 to-indigo-100/60 border-indigo-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(99,102,241,0.08)]',
    iconColor: 'text-indigo-700',
    glow: 'group-hover:ring-indigo-500/20'
  },
  amber: {
    container: 'bg-gradient-to-b from-amber-50 to-amber-100/60 border-amber-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(245,158,11,0.08)]',
    iconColor: 'text-amber-700',
    glow: 'group-hover:ring-amber-500/20'
  },
  cyan: {
    container: 'bg-gradient-to-b from-cyan-50 to-cyan-100/60 border-cyan-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(6,182,212,0.08)]',
    iconColor: 'text-cyan-700',
    glow: 'group-hover:ring-cyan-500/20'
  },
  purple: {
    container: 'bg-gradient-to-b from-purple-50 to-purple-100/60 border-purple-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(168,85,247,0.08)]',
    iconColor: 'text-purple-700',
    glow: 'group-hover:ring-purple-500/20'
  },
  slate: {
    container: 'bg-gradient-to-b from-slate-50 to-slate-100/70 border-slate-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(15,23,42,0.06)]',
    iconColor: 'text-slate-700',
    glow: 'group-hover:ring-slate-400/20'
  },
  dark: {
    container: 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)]',
    iconColor: 'text-emerald-400',
    glow: 'group-hover:ring-emerald-500/30'
  }
};

const sizeStyles: Record<IconSize, { box: string; iconSize: string; radius: string }> = {
  sm: { box: 'w-7 h-7', iconSize: '[&>svg]:w-3.5 [&>svg]:h-3.5', radius: 'rounded-lg' },
  md: { box: 'w-9 h-9', iconSize: '[&>svg]:w-4.5 [&>svg]:h-4.5', radius: 'rounded-xl' },
  lg: { box: 'w-11 h-11', iconSize: '[&>svg]:w-5.5 [&>svg]:h-5.5', radius: 'rounded-2xl' },
  xl: { box: 'w-13 h-13', iconSize: '[&>svg]:w-6 [&>svg]:h-6', radius: 'rounded-2xl' }
};

export const IconPlate: React.FC<IconPlateProps> = ({
  icon,
  variant = 'emerald',
  size = 'md',
  className = '',
  animateHover = true
}) => {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <motion.div
      whileHover={animateHover ? { scale: 1.06, y: -1 } : undefined}
      whileTap={animateHover ? { scale: 0.96 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        relative inline-flex items-center justify-center shrink-0 border select-none
        ${v.container} 
        ${s.box} 
        ${s.radius} 
        ${s.iconSize} 
        ${v.iconColor}
        ${className}
      `}
    >
      {/* Specular highlight rim */}
      <span className="absolute inset-0 rounded-[inherit] pointer-events-none ring-1 ring-inset ring-white/30" />
      
      {/* Centered rendered Lucide SVG */}
      <div className="relative z-10 flex items-center justify-center">
        {icon}
      </div>
    </motion.div>
  );
};

