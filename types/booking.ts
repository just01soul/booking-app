export interface BookingFormData {
  name: string; // Имя гостя
  phone: string; // Номер телефона
  date: string; // Дата бронирования
  time: string; // Время бронирования
  guests: number; // Количество гостей
}

export type BookingStatus = 'idle' | 'loading' | 'success';

export type ValidationErrors = Partial<Record<keyof BookingFormData, string>>;

export interface TimeSlot {
  value: string; // Отправляется на сервер
  label: string; // Отображается пользователю
}
