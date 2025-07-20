'use client';

import { useRecurringDate } from './RecurringDateContext';

export default function EndOptions() {
  const { state, dispatch } = useRecurringDate();

  return (
    <div className="space-y-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
      <label className="block text-sm font-medium text-gray-700">
        End recurrence
      </label>
      <div className="space-y-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="endType"
            value="never"
            checked={state.endType === 'never'}
            onChange={(e) => dispatch({ type: 'SET_END_TYPE', payload: e.target.value })}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Never</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="endType"
            value="date"
            checked={state.endType === 'date'}
            onChange={(e) => dispatch({ type: 'SET_END_TYPE', payload: e.target.value })}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">On date</span>
        </label>
        {state.endType === 'date' && (
          <input
            type="date"
            value={state.endDate}
            onChange={(e) => dispatch({ type: 'SET_END_DATE', payload: e.target.value })}
            className="ml-7 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        )}

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="endType"
            value="count"
            checked={state.endType === 'count'}
            onChange={(e) => dispatch({ type: 'SET_END_TYPE', payload: e.target.value })}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">After</span>
        </label>
        {state.endType === 'count' && (
          <div className="ml-7 flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={state.endCount}
              onChange={(e) => dispatch({ type: 'SET_END_COUNT', payload: parseInt(e.target.value) || 1 })}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center"
            />
            <span className="text-sm text-gray-700">occurrences</span>
          </div>
        )}
      </div>
    </div>
  );
}