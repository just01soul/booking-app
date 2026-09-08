import { ZodError } from 'zod';
import { bookingSchema } from './schema';
import type { BookingFormData, ValidationErrors } from '~/types/booking';

// Нормализация телефона
export const normalizePhone = (phone: string): string => {
  return phone.replace(/[\s()\-]/g, '');
};

// Валидация отдельного поля
export const validateField = (
  field: keyof BookingFormData,
  value: BookingFormData[keyof BookingFormData]
): string | undefined => {
  try {
    const schema = bookingSchema.pick({ [field]: true } as any);
    schema.parse({ [field]: value });
    return undefined;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.issues[0]?.message;
    }
    return 'Неверное значение';
  }
};

// Валидация всей формы
export const validateForm = (form: BookingFormData): ValidationErrors => {
  try {
    const normalizedForm = {
      ...form,
      phone: normalizePhone(form.phone)
    };
    bookingSchema.parse(normalizedForm);
    return {};
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: ValidationErrors = {};
      error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof BookingFormData;
        errors[path] = issue.message;
      });
      return errors;
    }
    return {};
  }
};

// Валидация для отправки
export const validateFormForSubmit = (
  form: BookingFormData
): {
  valid: boolean;
  errors: ValidationErrors;
  data?: BookingFormData;
} => {
  const normalizedForm = {
    ...form,
    phone: normalizePhone(form.phone)
  };

  try {
    const validated = bookingSchema.parse(normalizedForm);
    return {
      valid: true,
      errors: {},
      data: validated
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: ValidationErrors = {};
      error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof BookingFormData;
        errors[path] = issue.message;
      });
      return {
        valid: false,
        errors
      };
    }
    return {
      valid: false,
      errors: {}
    };
  }
};
