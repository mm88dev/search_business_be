exports.formatOpeningHours = openningHours => {
  const dayMap = {
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

  const formattedHours = [];

  // Helper function to format time ranges
  function formatTimeRange(ranges) {
    return ranges.map(range => `${range.start} - ${range.end}`);
  }

  // Combine opening hours for weekdays
  const weekdayHours = weekdays.map(day => {
    return openningHours.days[day]
      ? formatTimeRange(openningHours.days[day])
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
    let currentRange = [];
    let currentHours = [];

    weekdays.forEach((day, index) => {
      const hours = openningHours.days[day]
        ? formatTimeRange(openningHours.days[day])
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
    if (openningHours.days[day]) {
      formattedHours.push({
        [dayMap[day]]: formatTimeRange(openningHours.days[day])
      });
    } else {
      formattedHours.push({ [dayMap[day]]: ['closed'] });
    }
  });

  return formattedHours;
};
