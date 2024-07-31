import { ApiContact, ApiOpeningHours } from '../types/api.types';
import { FormattedOpeningHours } from '../types/data.types';

export const formatPhoneNumbers = (contacts: ApiContact[]) => {
  return contacts
    .filter(contact => contact.contact_type === 'phone')
    .map(contact =>
      contact.formatted_service_code
        ? `+41 ${contact.formatted_service_code}`
        : ''
    );
};

export const formatWebsites = (contacts: ApiContact[]) => {
  return contacts
    .filter(contact => contact.contact_type === 'url')
    .map(contact => contact.url || '');
};

const formatTimeRange = (
  ranges: { start: string; end: string }[]
): string[] => {
  return ranges.length > 0
    ? ranges.map(range => `${range.start} - ${range.end}`)
    : ['closed'];
};

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

  // Combine opening hours for weekdays
  const weekdayHours: string[][] = weekdays.map(day => {
    return openingHours.days[day] && openingHours.days[day].length > 0
      ? formatTimeRange(openingHours.days[day])
      : ['closed'];
  });

  // Check if all weekdays have the same hours
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
      const hours =
        openingHours.days[day] && openingHours.days[day].length > 0
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
    if (openingHours.days[day] && openingHours.days[day].length > 0) {
      formattedHours.push({
        [dayMap[day]]: formatTimeRange(openingHours.days[day])
      });
    } else {
      formattedHours.push({ [dayMap[day]]: ['closed'] });
    }
  });

  return formattedHours;
};
