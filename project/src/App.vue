<template>
  <header class="py-4 px-5">
    <nav class="flex gap-5 justify-center">
      <RouterLink to="/" class="!text-white !font-bold">Discovery</RouterLink>
      <RouterLink to="/favorite" class="!text-white !font-bold">Favorite</RouterLink>
    </nav>
  </header>

  <div class="p-4 main">
    <RouterView />
  </div>
</template>

<style scoped>
  header {
    background-image: url('./assets/images/blackground.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .main {
    background-color: #383644;
  }
</style>
