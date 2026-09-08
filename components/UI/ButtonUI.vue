<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="ui-button"
    :class="{
      'ui-button--loading': loading,
      'ui-button--disabled': disabled || loading
    }"
    @click="handleClick"
  >
    <span v-if="loading" class="ui-button__loader">
      {{ loadingText }}
      <span class="ui-button__loader-dot"></span>
      <span class="ui-button__loader-dot"></span>
      <span class="ui-button__loader-dot"></span>
    </span>
    <span v-else class="ui-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button', // Тип кнопки
  disabled: false, // Отключена ли кнопка
  loading: false, //  Идет ли загрузка
  loadingText: 'Загрузка...' // Текст во время загрузки
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click');
  }
};
</script>

<style lang="scss" scoped>
.ui-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  min-width: 140px;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  color: #fff;
  background: #c8963e;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #c8963e;
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: 12px;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(200, 150, 62, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(200, 150, 62, 0.2);
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  &--loading {
    cursor: wait;
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__loader {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 8px;
    align-items: center;
    font-weight: 500;
  }

  &__loader-dot {
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
    &:nth-child(3) {
      animation-delay: 0;
    }
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.6;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .ui-button {
    width: 100%;
    padding: 12px 20px;
    min-width: unset;
    height: 46px;
    font-size: 15px;
  }
}
</style>
