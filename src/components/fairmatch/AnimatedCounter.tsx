import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  animateOnChange?: boolean;
}

/**
 * AnimatedCounter: smoothly interpolates numeric values from previous (or 0)
 * to target value using requestAnimationFrame and easeOutQuart curve.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 750,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  animateOnChange = true,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(animateOnChange ? 0 : value);
  const startValueRef = useRef<number>(animateOnChange ? 0 : value);
  const targetValueRef = useRef<number>(value);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    targetValueRef.current = value;
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    if (duration <= 0) {
      setDisplayValue(value);
      return;
    }

    const easeOutQuad = (t: number) => t * (2 - t);

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      const current = startValueRef.current + (targetValueRef.current - startValueRef.current) * easedProgress;
      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetValueRef.current);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toString();

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};
