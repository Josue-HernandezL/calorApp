import { memo, useMemo } from 'react';

interface ProgressCircleProps {
  current: number;
  goal: number;
  size?: number;
}

export const ProgressCircle = memo(function ProgressCircle({
  current,
  goal,
  size = 200
}: ProgressCircleProps) {
  const { percentage, strokeDashoffset, color, radius, circumference } = useMemo(() => {
    const pct = Math.min(current / goal * 100, 100);
    const r = (size - 20) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - pct / 100 * circ;
    
    let clr = '#3b82f6';
    if (pct >= 100) clr = '#ef4444';
    else if (pct >= 80) clr = '#22c55e';
    
    return {
      percentage: pct,
      strokeDashoffset: offset,
      color: clr,
      radius: r,
      circumference: circ
    };
  }, [current, goal, size]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={radius} 
          stroke="currentColor" 
          strokeWidth="10" 
          fill="none" 
          className="text-gray-200 dark:text-gray-700" 
        />
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={radius} 
          stroke={color} 
          strokeWidth="10" 
          fill="none" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round" 
          className="transition-all duration-500 ease-out" 
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {Math.round(percentage)}%
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {current} / {goal}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-500">kcal</span>
      </div>
    </div>
  );
});