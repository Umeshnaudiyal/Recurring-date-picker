'use client';

import { useRecurringDate } from './RecurringDateContext';

const frequencies = [
  { value: 'daily', label: 'Daily', icon: '📅' },
  { value: 'weekly', label: 'Weekly', icon: '📆' },
  { value: 'monthly', label: 'Monthly', icon: '🗓️' },
  { value: 'yearly', label: 'Yearly', icon: '📊' }
];

export default function FrequencySelector() {
  const { state, dispatch } = useRecurringDate();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Frequency
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {frequencies.map((freq) => (
          <button
            key={freq.value}
            onClick={() => dispatch({ type: 'SET_FREQUENCY', payload: freq.value })}
            className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              state.frequency === freq.value
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="text-lg mb-1">{freq.icon}</div>
            <div className="text-sm font-medium">{freq.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}