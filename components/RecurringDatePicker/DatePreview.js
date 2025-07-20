'use client';

import { useRecurringDate } from './RecurringDateContext';

export default function DatePreview() {
  const { state } = useRecurringDate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 flex items-center space-x-2">
        <span>📋</span>
        <span>Upcoming Dates Preview</span>
      </h3>
      
      {state.upcomingDates.length > 0 ? (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {state.upcomingDates.map((date, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-white rounded border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <span className="text-sm text-gray-700">
                {formatDate(date)}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                #{index + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="text-2xl mb-2">📅</div>
          <p className="text-sm">
            {state.frequency === 'weekly' && state.daysOfWeek.length === 0
              ? 'Select days of the week to see preview'
              : 'No upcoming dates to show'}
          </p>
        </div>
      )}
      
      {state.upcomingDates.length >= 10 && (
        <p className="text-xs text-gray-500 text-center">
          Showing first 10 occurrences
        </p>
      )}
    </div>
  );
}