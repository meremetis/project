<template>
  <header class="py-4 px-5">
      <nav class="flex gap-5 justify-center">
        <RouterLink to="/" class="link !font-bold">Discovery</RouterLink>
        <RouterLink to="/favorite" class="link !font-bold">Favorite</RouterLink>
      </nav>
  </header>

  <div class="p-4">
    <RouterView />

  </div>
</template>

<style scoped>

  header {
    background-color: green;
  }

  .link {
    color: white;
    font-weight: bold;
  }
</style>
