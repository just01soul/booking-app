<template>
  <div class="booking-page">
    <div class="booking-page__container">
      <transition name="fade" mode="out-in">
        <BookingForm v-if="!isSuccess" @success="handleSuccess" key="form" />
        <ConfirmationScreen v-else @reset="handleReset" key="confirmation" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isSuccess = ref(false); // Реактивная переменная состояния

// Обработчик успешной отправки
const handleSuccess = () => {
  isSuccess.value = true;
};

// Обработчик сброса
const handleReset = () => {
  isSuccess.value = false;
};
</script>

<style lang="scss" scoped>
.booking-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fafaf8;

  &__container {
    width: 100%;
    max-width: 640px;
    padding: 20px;
  }
}

/* Vue Transition анимация */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(24px);
}

/* Адаптивность для мобильных */
@media (max-width: 480px) {
  .booking-page {
    padding: 12px;

    &__container {
      padding: 0;
    }
  }
}
</style>
