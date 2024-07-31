import { ApiOpeningHours, FormattedOpeningHours } from '../types';

export const formatOpeningHours = (
  openingHours: ApiOpeningHours
): FormattedOpeningHours[] => {
  const dayMap: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const weekends = ['saturday', 'sunday'];

  const formattedHours: FormattedOpeningHours[] = [];

  // Helper function to format time ranges
  const formatTimeRange = (
    ranges: { start: string; end: string }[]
  ): string[] => {
    return ranges.map(range => `${range.start} - ${range.end}`);
  };

  // Combine opening hours for weekdays
  const weekdayHours: string[][] = weekdays.map(day => {
    return openingHours.days[day]
      ? formatTimeRange(openingHours.days[day])
      : ['closed'];
  });

  const sameHours = weekdayHours.every(
    hours => hours.join(',') === weekdayHours[0].join(',')
  );

  if (sameHours) {
    formattedHours.push({
      [`${dayMap[weekdays[0]]} - ${dayMap[weekdays[weekdays.length - 1]]}`]:
        weekdayHours[0]
    });
  } else {
    let currentRange: string[] = [];
    let currentHours: string[] = [];

    weekdays.forEach((day, index) => {
      const hours = openingHours.days[day]
        ? formatTimeRange(openingHours.days[day])
        : ['closed'];

      if (currentHours.length === 0) {
        currentRange.push(dayMap[day]);
        currentHours = hours;
      } else if (hours.join(',') === currentHours.join(',')) {
        currentRange.push(dayMap[day]);
      } else {
        formattedHours.push({
          [`${currentRange[0]}${
            currentRange.length > 1
              ? ' - ' + currentRange[currentRange.length - 1]
              : ''
          }`]: currentHours
        });
        currentRange = [dayMap[day]];
        currentHours = hours;
      }

      // Handle the last range
      if (index === weekdays.length - 1) {
        formattedHours.push({
          [`${currentRange[0]}${
            currentRange.length > 1
              ? ' - ' + currentRange[currentRange.length - 1]
              : ''
          }`]: currentHours
        });
      }
    });
  }

  // Add weekends
  weekends.forEach(day => {
    if (openingHours.days[day]) {
      formattedHours.push({
        [dayMap[day]]: formatTimeRange(openingHours.days[day])
      });
    } else {
      formattedHours.push({ [dayMap[day]]: ['closed'] });
    }
  });

  return formattedHours;
};
