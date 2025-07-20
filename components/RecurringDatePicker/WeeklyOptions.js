'use client';

import { useRecurringDate } from './RecurringDateContext';

const daysOfWeek = [
  { value: 'monday', label: 'Mon', fullLabel: 'Monday' },
  { value: 'tuesday', label: 'Tue', fullLabel: 'Tuesday' },
  { value: 'wednesday', label: 'Wed', fullLabel: 'Wednesday' },
  { value: 'thursday', label: 'Thu', fullLabel: 'Thursday' },
  { value: 'friday', label: 'Fri', fullLabel: 'Friday' },
  { value: 'saturday', label: 'Sat', fullLabel: 'Saturday' },
  { value: 'sunday', label: 'Sun', fullLabel: 'Sunday' }
];

export default function WeeklyOptions() {
  const { state, dispatch } = useRecurringDate();

  const toggleDay = (day) => {
    const newDays = state.daysOfWeek.includes(day)
      ? state.daysOfWeek.filter(d => d !== day)
      : [...state.daysOfWeek, day];
    dispatch({ type: 'SET_DAYS_OF_WEEK', payload: newDays });
  };

  return (
    <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <label className="block text-sm font-medium text-gray-700">
        Select days of the week
      </label>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <button
            key={day.value}
            onClick={() => toggleDay(day.value)}
            className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
              state.daysOfWeek.includes(day.value)
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
            title={day.fullLabel}
          >
            {day.label}
          </button>
        ))}
      </div>
      {state.daysOfWeek.length === 0 && (
        <p className="text-xs text-gray-500 italic">
          Select at least one day for weekly recurrence
        </p>
      )}
    </div>
  );
}