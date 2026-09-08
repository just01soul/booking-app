import type { TimeSlot } from '~/types/booking';

export const TIME_SLOTS: TimeSlot[] = Array.from({ length: 11 }, (_, i) => {
  const hour = i + 12;
  return {
    value: `${hour.toString()}:00`,
    label: `${hour.toString()}:00`
  };
});
