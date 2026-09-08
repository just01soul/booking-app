import { ref, reactive, computed, readonly } from 'vue';
import type { BookingFormData, BookingStatus, ValidationErrors } from '~/types/booking';
import { validateField, validateFormForSubmit } from '~/utils/validators';

// Синглтон для хранения состояния бронирования (аналог store)
const bookingDataSingleton = ref<BookingFormData | null>(null);

export function useBookingForm() {
  const status = ref<BookingStatus>('idle'); // Состояние отправки
  const errors = reactive<ValidationErrors>({}); // Ошибки валидации
  const touched = reactive<Record<keyof BookingFormData, boolean>>({
    // Заполненные поля
    name: false,
    phone: false,
    date: false,
    time: false,
    guests: false
  });

  const form = reactive<BookingFormData>({
    // Данные формы
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 1
  });

  // Валидация формы
  const isValid = computed(() => {
    return Object.values(errors).every((error) => !error);
  });

  // Валидация поля при потере фокуса
  const validateFieldHandler = (field: keyof BookingFormData) => {
    touched[field] = true;
    const error = validateField(field, form[field]);
    errors[field] = error || '';
  };

  // Отправка формы
  const submit = async (): Promise<boolean> => {
    const result = validateFormForSubmit(form); // Валидация всей формы

    if (!result.valid) {
      Object.keys(result.errors).forEach((key) => {
        const fieldKey = key as keyof BookingFormData;
        errors[fieldKey] = result.errors[fieldKey] || '';
        touched[fieldKey] = true;
      });
      return false;
    }

    status.value = 'loading';

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Имитация отправки (1.5 секунды)

      if (result.data) {
        bookingDataSingleton.value = { ...result.data };
      }

      status.value = 'success';

      return true;
    } catch (error) {
      status.value = 'idle';

      return false;
    }
  };

  // Сброс формы
  const reset = () => {
    status.value = 'idle';
    Object.assign(form, {
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: 1
    });
    Object.keys(errors).forEach((key) => {
      errors[key as keyof BookingFormData] = '';
    });
    Object.keys(touched).forEach((key) => {
      touched[key as keyof BookingFormData] = false;
    });
    bookingDataSingleton.value = null;
  };

  // Получение данных бронирования
  const getBookingData = computed(() => bookingDataSingleton.value);

  return {
    form,
    errors: readonly(errors),
    touched: readonly(touched),
    status: readonly(status),
    isValid,
    bookingData: getBookingData,
    validateField: validateFieldHandler,
    submit,
    reset
  };
}
