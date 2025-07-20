'use client';

import { useRecurringDate } from './RecurringDateContext';

export default function MonthlyOptions() {
  const { state, dispatch } = useRecurringDate();

  return (
    <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-200">
      <label className="block text-sm font-medium text-gray-700">
        Monthly recurrence type
      </label>
      <div className="space-y-2">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="monthlyType"
            value="date"
            checked={state.monthlyType === 'date'}
            onChange={(e) => dispatch({ type: 'SET_MONTHLY_TYPE', payload: e.target.value })}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            Monthly on date (e.g., 15th of every month)
          </span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="monthlyType"
            value="day"
            checked={state.monthlyType === 'day'}
            onChange={(e) => dispatch({ type: 'SET_MONTHLY_TYPE', payload: e.target.value })}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            Monthly on day (e.g., 3rd Tuesday of every month)
          </span>
        </label>
      </div>
    </div>
  );
}