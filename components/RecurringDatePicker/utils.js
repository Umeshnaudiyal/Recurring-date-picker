export function generateUpcomingDates(config) {
  const {
    startDate,
    frequency,
    interval,
    daysOfWeek,
    monthlyType,
    endType,
    endDate,
    endCount
  } = config;

  if (!startDate || !frequency) return [];
  
  const dates = [];
  const start = new Date(startDate);
  const maxDates = endType === 'count' ? endCount : 10;
  const endDateObj = endType === 'date' && endDate ? new Date(endDate) : null;
  
  let currentDate = new Date(start);
  let count = 0;

  while (count < maxDates) {
    let nextDate = null;

    switch (frequency) {
      case 'daily':
        if (count === 0) {
          nextDate = new Date(currentDate);
        } else {
          currentDate.setDate(currentDate.getDate() + interval);
          nextDate = new Date(currentDate);
        }
        break;

      case 'weekly':
        if (daysOfWeek.length === 0) return [];
        
        if (count === 0) {
          // Find the first occurrence from start date
          const startDayOfWeek = getDayOfWeekNumber(currentDate);
          const startDayName = getDayName(startDayOfWeek);
          
          if (daysOfWeek.includes(startDayName)) {
            nextDate = new Date(currentDate);
          } else {
            // Find next occurrence
            const daysUntilNext = findNextDayInWeek(startDayOfWeek, daysOfWeek);
            currentDate.setDate(currentDate.getDate() + daysUntilNext);
            nextDate = new Date(currentDate);
          }
        } else {
          nextDate = findNextWeeklyOccurrence(currentDate, daysOfWeek, interval);
          currentDate = new Date(nextDate);
        }
        break;

      case 'monthly':
        if (count === 0) {
          nextDate = new Date(currentDate);
        } else {
          if (monthlyType === 'date') {
            currentDate.setMonth(currentDate.getMonth() + interval);
            nextDate = new Date(currentDate);
          } else {
            // Monthly by day (e.g., 3rd Tuesday)
            const nextMonthlyByDay = getNextMonthlyByDay(currentDate, interval);
            currentDate = nextMonthlyByDay;
            nextDate = new Date(currentDate);
          }
        }
        break;

      case 'yearly':
        if (count === 0) {
          nextDate = new Date(currentDate);
        } else {
          currentDate.setFullYear(currentDate.getFullYear() + interval);
          nextDate = new Date(currentDate);
        }
        break;
    }

    if (nextDate) {
      // Check if we've passed the end date
      if (endDateObj && nextDate > endDateObj) {
        break;
      }

      dates.push(nextDate.toISOString().split('T')[0]);
      count++;
    } else {
      break;
    }
  }

  return dates;
}

function getDayOfWeekNumber(date) {
  // Convert to Monday = 0, Tuesday = 1, etc.
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

function getDayName(dayNumber) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return days[dayNumber];
}

function findNextDayInWeek(currentDay, selectedDays) {
  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  for (let i = 1; i <= 7; i++) {
    const checkDay = (currentDay + i) % 7;
    if (selectedDays.includes(dayOrder[checkDay])) {
      return i;
    }
  }
  return 7; // Fallback
}

function findNextWeeklyOccurrence(currentDate, daysOfWeek, interval) {
  const currentDay = getDayOfWeekNumber(currentDate);
  const currentDayName = getDayName(currentDay);
  
  // Check if there's another occurrence this week
  const remainingDaysThisWeek = daysOfWeek.filter(day => {
    const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayIndex = dayOrder.indexOf(day);
    return dayIndex > currentDay;
  });

  if (remainingDaysThisWeek.length > 0) {
    // Next occurrence is this week
    const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const nextDayIndex = dayOrder.indexOf(remainingDaysThisWeek[0]);
    const daysToAdd = nextDayIndex - currentDay;
    
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    return nextDate;
  } else {
    // Next occurrence is in a future week
    const weeksToSkip = interval - 1;
    const nextDate = new Date(currentDate);
    
    // Go to next week(s)
    nextDate.setDate(nextDate.getDate() + (7 * (weeksToSkip + 1)));
    
    // Find first day of the week that matches
    const nextWeekStart = new Date(nextDate);
    nextWeekStart.setDate(nextWeekStart.getDate() - getDayOfWeekNumber(nextWeekStart));
    
    const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const firstSelectedDay = daysOfWeek.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))[0];
    const firstDayIndex = dayOrder.indexOf(firstSelectedDay);
    
    nextWeekStart.setDate(nextWeekStart.getDate() + firstDayIndex);
    return nextWeekStart;
  }
}

function getNextMonthlyByDay(currentDate, interval) {
  const currentDayOfWeek = currentDate.getDay();
  const currentWeekOfMonth = Math.ceil(currentDate.getDate() / 7);
  
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(nextMonth.getMonth() + interval);
  nextMonth.setDate(1);
  
  // Find the same week and day in the next month
  let targetDate = new Date(nextMonth);
  
  // Find first occurrence of the day in the month
  while (targetDate.getDay() !== currentDayOfWeek) {
    targetDate.setDate(targetDate.getDate() + 1);
  }
  
  // Move to the correct week
  targetDate.setDate(targetDate.getDate() + (7 * (currentWeekOfMonth - 1)));
  
  // Check if this date exists in the target month
  if (targetDate.getMonth() !== nextMonth.getMonth()) {
    // The date rolled over to next month, so find the last occurrence in the target month
    targetDate.setDate(targetDate.getDate() - 7);
  }
  
  return targetDate;
}

export function createRecurringRule(config) {
  const {
    startDate,
    frequency,
    interval,
    daysOfWeek,
    monthlyType,
    endType,
    endDate,
    endCount
  } = config;

  const rule = {
    startDate,
    frequency,
    interval: interval || 1
  };

  if (frequency === 'weekly' && daysOfWeek.length > 0) {
    rule.daysOfWeek = daysOfWeek;
  }

  if (frequency === 'monthly') {
    rule.monthlyType = monthlyType;
  }

  if (endType !== 'never') {
    rule.endType = endType;
    if (endType === 'date' && endDate) {
      rule.endDate = endDate;
    }
    if (endType === 'count' && endCount) {
      rule.endCount = endCount;
    }
  }

  return rule;
}