import { z } from 'zod';

export const bookingSchema = z.object({
  name: z
    .string()
    .min(1, 'Обязательно укажите имя')
    .min(2, 'Минимум 2 символа')
    .regex(/^[а-яА-Яa-zA-Z\s\-]+$/, 'Только буквы, пробелы и дефис'),

  phone: z
    .string()
    .min(1, 'Обязательное укажите номер телефона')
    .regex(/^(\+7|8)\d{10}$/, 'Введите номер в формате +7XXXXXXXXXXX или 8XXXXXXXXXX'),

  date: z
    .string()
    .min(1, 'Обязательно укажите дату')
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(date);
      selected.setHours(0, 0, 0, 0);
      return selected >= today;
    }, 'Дата не может быть раньше сегодня')
    .refine((date) => {
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 90);
      maxDate.setHours(0, 0, 0, 0);
      const selected = new Date(date);
      selected.setHours(0, 0, 0, 0);
      return selected <= maxDate;
    }, 'Дата не может быть позже 90 дней'),

  time: z
    .string()
    .min(1, 'Обязательно укажите время')
    .refine((time) => {
      const [hours] = time.split(':').map(Number);
      return hours >= 12 && hours <= 22;
    }, 'Время должно быть от 12:00 до 22:00'),

  guests: z
    .number({
      message: 'Количество гостей обязательно'
    })
    .min(1, 'Минимум 1 гость')
    .max(12, 'Максимум 12 гостей')
    .int('Должно быть целое число')
});
