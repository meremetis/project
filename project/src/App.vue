<template>
  <header class="py-4 px-5">
      <nav class="flex gap-5 justify-center">
        <RouterLink to="/" class="link !font-bold">Discovery</RouterLink>
        <RouterLink to="/favorite" class="link !font-bold">Favorite</RouterLink>
      </nav>


       <div class="p-4 bg-blue-500 text-white">
    Hello, Tailwind in Vue!
  </div>
  </header>

  <div class="p-4 menu">
    <RouterView />

  </div>
</template>

<style scoped>

  header {
    /* background-color: green; */

  background-image: url("./assets/images/blackground.jpg");
  background-size: cover;
  background-repeat: no-repeat;

 
  }

  .link {
    color: white;
    font-weight: bold;
  }

  .menu {
  background-color: #383644;
}
</style>
