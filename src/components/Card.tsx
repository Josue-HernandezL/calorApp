import { memo, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const PADDING_STYLES = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
} as const;

export const Card = memo(function Card({
  children,
  className = '',
  padding = 'md'
}: CardProps) {
  return (
    <div 
      className={`
        bg-white dark:bg-[#161b22] 
        rounded-lg shadow-md 
        border border-gray-200 dark:border-[#30363d]
        ${PADDING_STYLES[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
});