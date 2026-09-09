<template>
  <div class="ui-input">
    <label v-if="label" :for="id" class="ui-input__label">
      {{ label }}
      <span v-if="required" class="ui-input__required">*</span>
    </label>

    <div
      class="ui-input__wrapper"
      :class="{
        'ui-input__wrapper--error': error && touched,
        'ui-input__wrapper--focus': isFocused,
        'ui-input__wrapper--filled': hasValue
      }"
    >
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="type === 'number' ? 1 : undefined"
        :max="type === 'number' ? 12 : undefined"
        @input="handleInput"
        @blur="handleBlur"
        @focus="isFocused = true"
        class="ui-input__field"
      />
      <slot name="suffix" />
    </div>

    <transition name="slide">
      <p v-if="error && touched" class="ui-input__error">
        {{ error }}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  modelValue: string | number; // Основное значение для v-model
  label?: string; // Текст лейбла
  id?: string; // ID для связи с лейблом
  type?: 'text' | 'number' | 'date' | 'tel'; // Тип поля
  placeholder?: string; // Плейсхолдер
  error?: string; // Текст ошибки
  disabled?: boolean; // Отключено ли поле
  touched?: boolean; // Было ли поле заполнено
  required?: boolean; // Обязательно ли поле
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  touched: false,
  required: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur'): void;
}>();

const isFocused = ref(false); // Хранит состояние фокуса поля

const hasValue = computed(() => {
  return props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined;
});

//Обработчик ввода
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value: string | number = target.value;

  if (props.type === 'number') {
    value = Number(value);
  }

  emit('update:modelValue', value);
};

//Обработчик потери фокуса
const handleBlur = () => {
  isFocused.value = false;
  emit('blur');
};
</script>

<style lang="scss" scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
  }

  &__required {
    color: #c8963e;
  }

  &__wrapper {
    position: relative;
    border-radius: 10px;
    border: 2px solid #fafaf8;
    background: #ffffff;
    transition: all 0.2s ease;

    &:hover:not(:has(.ui-input__field:disabled)) {
      border-color: #c8963e;
    }

    &--focus {
      border-color: #c8963e;
    }

    &--error {
      border-color: #f35d62;

      &.ui-input__wrapper--focus {
        border-color: #f35d62;
      }
    }

    &--filled {
      background: #ffffff;
    }
  }

  &__field {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    font-family: inherit;
    color: #1a1a1a;
    background: transparent;
    border: none;
    border-radius: 10px;
    outline: none;
    transition: all 0.2s;

    &::placeholder {
      color: #a0aec0;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: #edf2f7;
    }

    /* Стили для type="number" */
    &[type='number'] {
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    /* Стили для type="date" */
    &[type='date'] {
       -webkit-appearance: none;
        appearance: none;
        height: 42px;

      &::-webkit-calendar-picker-indicator {
        opacity: 0.5;
        transition: opacity 0.2s;
        cursor: pointer;
       
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  &__error {
    font-size: 13px;
    color: #f35d62;
    margin-top: 2px;
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
</style>
