'use client';

import { useRecurringDate } from './RecurringDateContext';

export default function IntervalSelector() {
  const { state, dispatch } = useRecurringDate();

  const getFrequencyLabel = () => {
    switch (state.frequency) {
      case 'daily': return 'day(s)';
      case 'weekly': return 'week(s)';
      case 'monthly': return 'month(s)';
      case 'yearly': return 'year(s)';
      default: return 'time(s)';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Repeat every
      </label>
      <div className="flex items-center space-x-3">
        <input
          type="number"
          min="1"
          max="999"
          value={state.interval}
          onChange={(e) => dispatch({ type: 'SET_INTERVAL', payload: parseInt(e.target.value) || 1 })}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center"
        />
        <span className="text-gray-700 font-medium">
          {getFrequencyLabel()}
        </span>
      </div>
    </div>
  );
}