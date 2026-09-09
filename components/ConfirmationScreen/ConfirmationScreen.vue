<template>
  <transition name="fade" appear>
    <div class="confirmation-screen">
      <div class="confirmation-screen__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 class="confirmation-screen__title">Бронирование подтверждено!</h2>
      <p class="confirmation-screen__subtitle">Мы ждем вас в ресторане</p>

      <div class="confirmation-screen__card">
        <div class="confirmation-screen__detail">
          <span class="confirmation-screen__detail-icon">👨🏻‍💼</span>
          <div class="confirmation-screen__detail-content">
            <span class="confirmation-screen__detail-label">Гость</span>
            <span class="confirmation-screen__detail-value">{{ bookingData?.name }}</span>
          </div>
        </div>

        <div class="confirmation-screen__detail">
          <span class="confirmation-screen__detail-icon">📆</span>
          <div class="confirmation-screen__detail-content">
            <span class="confirmation-screen__detail-label">Дата</span>
            <span class="confirmation-screen__detail-value">{{ formattedDate }}</span>
          </div>
        </div>

        <div class="confirmation-screen__detail">
          <span class="confirmation-screen__detail-icon">🕓</span>
          <div class="confirmation-screen__detail-content">
            <span class="confirmation-screen__detail-label">Время</span>
            <span class="confirmation-screen__detail-value">{{ bookingData?.time }}</span>
          </div>
        </div>

        <div class="confirmation-screen__detail">
          <span class="confirmation-screen__detail-icon">👨‍👩‍👧‍👦</span>
          <div class="confirmation-screen__detail-content">
            <span class="confirmation-screen__detail-label">Количество гостей</span>
            <span class="confirmation-screen__detail-value">
              {{ bookingData?.guests }} {{ getGuestsWord(bookingData?.guests || 0) }}
            </span>
          </div>
        </div>
      </div>

      <div class="confirmation-screen__actions">
        <ButtonUI @click="handleReset" class="confirmation-screen__button">
          Забронировать ещё
        </ButtonUI>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBookingForm } from '~/composables/useBookingForm';

const emit = defineEmits<{
  (e: 'reset'): void;
}>();

const { bookingData } = useBookingForm();

// Форматирование даты
const formattedDate = computed(() => {
  if (!bookingData.value?.date) return '';
  const date = new Date(bookingData.value.date);
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
  const weekdays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
  ];

  return `${date.getDate()} ${months[date.getMonth()]}, ${weekdays[date.getDay()]}`;
});

// Склонение слова "гость"
const getGuestsWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'гостей';
  if (lastDigit === 1) return 'гость';
  if (lastDigit >= 2 && lastDigit <= 4) return 'гостя';
  return 'гостей';
};

// Обработчик сброса
const handleReset = () => {
  emit('reset');
};
</script>

<style lang="scss" scoped>
.confirmation-screen {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 40px;
  text-align: center;
  background: #fafaf8;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    background: #c8963e;
    color: #fff;
    border-radius: 50%;
    margin-bottom: 20px;

    svg {
      width: 36px;
      height: 36px;
    }
  }

  &__title {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
  }

  &__subtitle {
    margin: 0 0 32px 0;
    font-size: 16px;
    color: #666666;
  }

  &__card {
    text-align: left;
    background: #ffffff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 32px;
    border: 1px solid #e0e0e0;
  }

  &__detail {
    display: flex;
    align-items: center;
    padding: 12px 0;
    gap: 12px;
    border-bottom: 1px solid #e0e0e0;
    overflow: hidden;

    &:last-child {
      border-bottom: none;
    }
  }

  &__detail-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    font-size: 20px;
  }

  &__detail-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__detail-label {
    font-size: 12px;
    font-weight: 500;
    color: #999999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__detail-value {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-top: 2px;
  }

  &__actions {
    display: flex;
    justify-content: center;
  }

  &__button {
    min-width: 200px;
  }
}

/* Vue Transition анимация */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

@media (max-width: 480px) {
  .confirmation-screen {
    padding: 32px 20px;
    border-radius: 16px;

    &__title {
      font-size: 24px;
    }

    &__button {
      width: 100%;
      min-width: unset;
    }
  }
}
</style>
