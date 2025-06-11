<script setup lang="ts">
import { ref, onMounted } from 'vue'
import jokesService from './../core/services/jokes.service'

const favoriteJokes = ref<any>([])

onMounted(async () => {
  populateJokes()
})

const removeFromFavorites = (jokeId: string) => {
  jokesService.removeFavorite(jokeId)
  populateJokes()
}

const populateJokes = () => {
  favoriteJokes.value = jokesService.getFavoriteJokes()
}
</script>

<template>
  <p class="text-center info">*Hover to see the joke!!</p>
  <ul class="flex justify-center flex-wrap gap-4">
    <li v-for="joke in favoriteJokes" :key="joke.id" class="card p-4 gap-2 flex-col justify-between scale-up-center">
      <p class="bold">{{ joke.setup }}</p>
      <p class="punchline">{{ joke.punchline }}</p>

      <button class="remove-from-favorite" @click="removeFromFavorites(joke.id)">Remove from favorite ❌</button>

      <span>
        Rating:
        <span v-for="n in joke.rating" :key="n">⭐</span>
      </span>
    </li>
  </ul>

</template>

<style>
.info {
  color: white;
}

.remove-from-favorite{
  color: black;
}
</style>
