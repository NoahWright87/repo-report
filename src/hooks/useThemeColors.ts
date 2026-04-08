import { useState, useEffect } from 'react';

function readColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    primary: style.getPropertyValue('--primary').trim() || '#2563eb',
    secondary: style.getPropertyValue('--secondary').trim() || '#7c3aed',
    confirm: style.getPropertyValue('--confirm').trim() || '#16a34a',
    danger: style.getPropertyValue('--danger').trim() || '#dc2626',
    foreground: style.getPropertyValue('--foreground').trim() || '#1a1a2e',
    background: style.getPropertyValue('--background').trim() || '#ffffff',
  };
}

export function useThemeColors() {
  const [colors, setColors] = useState(readColors);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Small delay to let CSS variables update
      requestAnimationFrame(() => setColors(readColors()));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}
