import { ApiOpeningHours } from '../types/api.types';
import { FormattedOpeningHours } from '../types/data.types';
import { formatOpeningHours } from '../utils/helpers';

describe('formatOpeningHours', () => {
  it('should create range of the days with the same open hours at the beginning of the week', () => {
    const input: ApiOpeningHours = {
      days: {
        monday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        tuesday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        wednesday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        thursday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        friday: [{ start: '09:00', end: '17:00', type: 'OPEN' }]
      }
    };

    const output: FormattedOpeningHours[] = [
      { 'Monday - Friday': ['09:00 - 17:00'] },
      { Saturday: ['closed'] },
      { Sunday: ['closed'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });

  it('should create range of the days with the same open hours in the middle of the week', () => {
    const input: ApiOpeningHours = {
      days: {
        tuesday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        wednesday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        thursday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        friday: [{ start: '09:00', end: '17:00', type: 'OPEN' }]
      }
    };

    const output: FormattedOpeningHours[] = [
      { Monday: ['closed'] },
      { 'Tuesday - Friday': ['09:00 - 17:00'] },
      { Saturday: ['closed'] },
      { Sunday: ['closed'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });

  it('should create range of the days with the same open hours in the middle of the week with the gap in between', () => {
    const input: ApiOpeningHours = {
      days: {
        monday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        wednesday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        thursday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        friday: [{ start: '09:00', end: '17:00', type: 'OPEN' }]
      }
    };

    const output: FormattedOpeningHours[] = [
      { Monday: ['09:00 - 17:00'] },
      { Tuesday: ['closed'] },
      { 'Wednesday - Friday': ['09:00 - 17:00'] },
      { Saturday: ['closed'] },
      { Sunday: ['closed'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });

  it('should format opening hours for weekdays with different hours', () => {
    const input: ApiOpeningHours = {
      days: {
        monday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        tuesday: [{ start: '10:00', end: '18:00', type: 'OPEN' }],
        wednesday: [{ start: '10:00', end: '18:00', type: 'OPEN' }],
        thursday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        friday: [{ start: '09:00', end: '17:00', type: 'OPEN' }]
      }
    };

    const output: FormattedOpeningHours[] = [
      { Monday: ['09:00 - 17:00'] },
      { 'Tuesday - Wednesday': ['10:00 - 18:00'] },
      { 'Thursday - Friday': ['09:00 - 17:00'] },
      { Saturday: ['closed'] },
      { Sunday: ['closed'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });

  it('should handle closed days correctly', () => {
    const input: ApiOpeningHours = {
      days: {
        monday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        tuesday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        wednesday: [],
        thursday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        friday: [{ start: '09:00', end: '17:00', type: 'OPEN' }],
        saturday: [{ start: '10:00', end: '14:00', type: 'OPEN' }],
        sunday: []
      }
    };

    const output: FormattedOpeningHours[] = [
      { 'Monday - Tuesday': ['09:00 - 17:00'] },
      { Wednesday: ['closed'] },
      { 'Thursday - Friday': ['09:00 - 17:00'] },
      { Saturday: ['10:00 - 14:00'] },
      { Sunday: ['closed'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });

  it('should handle weekends correctly', () => {
    const input: ApiOpeningHours = {
      days: {
        saturday: [{ start: '10:00', end: '14:00', type: 'OPEN' }],
        sunday: [{ start: '11:00', end: '15:00', type: 'OPEN' }]
      }
    };

    const output: FormattedOpeningHours[] = [
      { 'Monday - Friday': ['closed'] },
      { Saturday: ['10:00 - 14:00'] },
      { Sunday: ['11:00 - 15:00'] }
    ];

    expect(formatOpeningHours(input)).toEqual(output);
  });
});
