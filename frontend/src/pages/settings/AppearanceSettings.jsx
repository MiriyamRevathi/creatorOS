import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Sun, Moon } from 'lucide-react';

export const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card title="Appearance & Workspace Theme" subtitle="Customize design modes and workspace visual density">
      <div className="space-y-6 max-w-lg">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-3">Theme Selection</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                theme === 'light' ? 'border-brand-purple bg-brand-purple/5 font-bold' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <Sun className="w-6 h-6 text-amber-500" />
              <span className="text-xs text-slate-900 dark:text-white">Light Mode</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                theme === 'dark' ? 'border-brand-lavender bg-brand-purple/20 font-bold' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <Moon className="w-6 h-6 text-brand-lavender" />
              <span className="text-xs text-slate-900 dark:text-white">Dark Mode</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">Brand Palette Guarantee:</p>
          <p>Locked to #412653 Deep Purple, #3F567F Slate Blue, #D174D2 Lavender, #E0563F Coral.</p>
        </div>
      </div>
    </Card>
  );
};
