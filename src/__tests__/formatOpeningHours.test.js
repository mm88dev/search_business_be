const { formatOpeningHours } = require('../helpers');

// todo: add mapper test
// todo: add no data test for search
describe('formatOpeningHours', () => {
  it('should format opening hours for weekdays with the same hours', () => {
    const input = {
      days: {
        monday: [{ start: '09:00', end: '17:00' }],
        tuesday: [{ start: '09:00', end: '17:00' }],
        wednesday: [{ start: '09:00', end: '17:00' }],
        thursday: [{ start: '09:00', end: '17:00' }],
        friday: [{ start: '09:00', end: '17:00' }]
      },
      closed_on_holidays: true,
      open_by_arrangement: false
    };

    const output = [
      { 'Monday - Friday': ['09:00 - 17:00'] },
      { Saturday: ['closed'] },
      { Sunday: ['closed'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });

  it('should format opening hours for weekdays with different hours', () => {
    const input = {
      days: {
        monday: [{ start: '09:00', end: '17:00' }],
        tuesday: [{ start: '10:00', end: '18:00' }],
        wednesday: [{ start: '10:00', end: '18:00' }],
        thursday: [{ start: '09:00', end: '17:00' }],
        friday: [{ start: '09:00', end: '17:00' }]
      },
      closed_on_holidays: true,
      open_by_arrangement: false
    };

    const output = [
      { Monday: ['09:00 - 17:00'] },
      { 'Tuesday - Wednesday': ['10:00 - 18:00'] },
      { 'Thursday - Friday': ['09:00 - 17:00'] },
      { Saturday: ['closed'] },
      { Sunday: ['closed'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });

  it('should handle closed days correctly', () => {
    const input = {
      days: {
        monday: [{ start: '09:00', end: '17:00' }],
        tuesday: [{ start: '09:00', end: '17:00' }],
        wednesday: [],
        thursday: [{ start: '09:00', end: '17:00' }],
        friday: [{ start: '09:00', end: '17:00' }],
        saturday: [{ start: '10:00', end: '14:00' }],
        sunday: []
      },
      closed_on_holidays: true,
      open_by_arrangement: false
    };

    const output = [
      { 'Monday - Tuesday': ['09:00 - 17:00'] },
      { Wednesday: ['closed'] },
      { 'Thursday - Friday': ['09:00 - 17:00'] },
      { Saturday: ['10:00 - 14:00'] },
      { Sunday: ['closed'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });

  it('should handle empty opening hours correctly', () => {
    const input = {
      days: {},
      closed_on_holidays: true,
      open_by_arrangement: false
    };

    const output = [
      { Monday: ['closed'] },
      { Tuesday: ['closed'] },
      { Wednesday: ['closed'] },
      { Thursday: ['closed'] },
      { Friday: ['closed'] },
      { Saturday: ['closed'] },
      { Sunday: ['closed'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });

  it('should handle weekends correctly', () => {
    const input = {
      days: {
        saturday: [{ start: '10:00', end: '14:00' }],
        sunday: [{ start: '11:00', end: '15:00' }]
      },
      closed_on_holidays: true,
      open_by_arrangement: false
    };

    const output = [
      { Monday: ['closed'] },
      { Tuesday: ['closed'] },
      { Wednesday: ['closed'] },
      { Thursday: ['closed'] },
      { Friday: ['closed'] },
      { Saturday: ['10:00 - 14:00'] },
      { Sunday: ['11:00 - 15:00'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });
});
