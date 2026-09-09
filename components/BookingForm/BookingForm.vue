<template>
  <form @submit.prevent="handleSubmit" class="booking-form">
    <div class="booking-form__header">
      <h2 class="booking-form__title">Бронирование столика</h2>
      <p class="booking-form__subtitle">Заполните форму, и мы ждем вас</p>
    </div>

    <div class="booking-form__fields">
      <InputUI
        v-model="form.name"
        label="Имя гостя"
        id="name"
        type="text"
        placeholder="Иван Иванов"
        :error="errors.name"
        :touched="touched.name"
        required
        @blur="validateField('name')"
      />

      <InputUI
        v-model="form.phone"
        label="Телефон"
        id="phone"
        type="tel"
        placeholder="+7 (900) 123-45-67"
        :error="errors.phone"
        :touched="touched.phone"
        required
        @blur="validateField('phone')"
      />

      <div class="booking-form__row">
        <InputUI
          v-model="form.date"
          label="Дата"
          id="date"
          type="date"
          :error="errors.date"
          :touched="touched.date"
          required
          @blur="validateField('date')"
        />

        <div class="booking-form__time-wrapper">
          <label for="time" class="booking-form__time-label">
            Время
            <span class="booking-form__required">*</span>
          </label>
          <select
            id="time"
            v-model="form.time"
            class="booking-form__select"
            :class="{
              'booking-form__select--error': errors.time && touched.time,
              'booking-form__select--filled': form.time
            }"
            @blur="validateField('time')"
          >
            <option value="">Выберите время</option>
            <option v-for="slot in TIME_SLOTS" :key="slot.value" :value="slot.value">
              {{ slot.label }}
            </option>
          </select>
          <transition name="slide">
            <p v-if="errors.time && touched.time" class="booking-form__error">
              {{ errors.time }}
            </p>
          </transition>
        </div>

        <InputUI
          v-model.number="form.guests"
          label="Количество гостей"
          id="guests"
          type="number"
          placeholder="1"
          :error="errors.guests"
          :touched="touched.guests"
          required
          @blur="validateField('guests')"
        />
      </div>
    </div>

    <div class="booking-form__actions">
      <div v-if="hasData" class="booking-form__summary">
        <span class="booking-form__summary-label">Вы бронируете столик на</span>
        <span class="booking-form__summary-value">
          {{ form.guests }} {{ getGuestsWord(form.guests) }}
          <span v-if="form.date">на {{ formatDate(form.date) }}</span>
          <span v-if="form.time"> в {{ form.time }}</span>
        </span>
      </div>

      <ButtonUI
        type="submit"
        :loading="status === 'loading'"
        loading-text="Бронирую..."
        :disabled="status === 'loading' || !isValid"
        class="booking-form__submit"
      >
        Забронировать
      </ButtonUI>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TIME_SLOTS } from '~/constants/time';
import { useBookingForm } from '~/composables/useBookingForm';

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const { form, errors, touched, status, isValid, validateField, submit } = useBookingForm();

// Проверка наличия данных
const hasData = computed(() => {
  return form.name || form.phone || form.date || form.time || form.guests > 1;
});

// Функция склонения слова "гость"
const getGuestsWord = (count: number): string => {

  if (count >= 1 && count <= 4) return 'гостя';
  return 'гостей';
};

// Форматирование даты
const formatDate = (date: string): string => {
  const d = new Date(date);
  const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];

  return `${d.getDate()} ${months[d.getMonth()]} (${days[d.getDay()]})`;
};

// Обработчик отправки
const handleSubmit = async () => {
  const success = await submit();
  if (success) {
    emit('success');
  }
};
</script>

<style lang="scss" scoped>
.booking-form {
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 36px;
  background: #fafaf8;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &__header {
    margin-bottom: 32px;
    text-align: center;
  }

  &__title {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
    letter-spacing: -0.5px;
  }

  &__subtitle {
    margin: 0;
    font-size: 16px;
    color: #666666;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  &__time-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__time-label {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
  }

  &__required {
    color: #c8963e;
    margin-left: 2px;
  }

  &__select {
    width: 100%;
    min-height: 46px;
    padding: 12px 16px;
    font-size: 16px;
    font-family: inherit;
    color: #1a1a1a;
    background: #ffffff;
    border: 2px solid #fafaf8;
    border-radius: 10px;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C8963E' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;

    &:hover:not(:disabled) {
      border-color: #c8963e;
    }

    &:focus {
      border-color: #c8963e;
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(200, 150, 62, 0.1);
    }

    &--error {
      border-color: #f35d62;
      background-color: #fff5f5;

      &:focus {
        border-color: #f35d62;
        box-shadow: 0 0 0 3px rgba(243, 93, 98, 0.1);
      }
    }

    &--filled {
      background-color: #ffffff;
    }

    & option {
      color: #1a1a1a;
    }

    & option[value=''] {
      color: #999999;
    }
  }

  &__error {
    margin-top: 2px;
    font-size: 13px;
    color: #f35d62;
  }

  &__actions {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  &__summary {
    width: 100%;
    padding: 14px 20px;
    background: #fafaf8;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    color: #1a1a1a;
    border: 1px dashed #e0e0e0;
  }

  &__summary-label {
    opacity: 0.7;
  }

  &__summary-value {
    font-weight: 600;
    color: #1a1a1a;
    margin-left: 6px;
  }

  &__submit {
    width: 100%;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 480px) {
  .booking-form {
    padding: 24px 20px;
    border-radius: 16px;

    &__title {
      font-size: 24px;
    }

    &__row {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    &__actions {
      margin-top: 24px;
    }
  }
}
</style>
