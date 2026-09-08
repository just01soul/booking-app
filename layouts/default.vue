<template>
  <div class="layout">
    <NuxtLoadingIndicator />
    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafaf8;
  padding: 20px;

  &__main {
    width: 100%;
    max-width: 800px;
  }
}
</style>
