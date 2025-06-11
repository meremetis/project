<template>
  <header class="py-4 px-5 bg-cover bg-no-repeat bg-[url('./assets/images/blackground.jpg')]">
    <nav class="flex gap-5 justify-center">
      <RouterLink to="/" class="!text-white !font-bold">Discovery</RouterLink>
      <RouterLink to="/favorite" class="!text-white !font-bold">Favorite</RouterLink>
    </nav>
  </header>

  <div class="p-4 bg-[#383644]">
    <RouterView />
  </div>
</template>
