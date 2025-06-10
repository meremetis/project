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
  <ul>
    <li v-for="joke in favoriteJokes" :key="joke.id">
      {{ joke.id }} - {{ joke.type }}

      <button @click="removeFromFavorites(joke.id)">Remove from favorite</button>

      <span>
        Rating:
        <span v-for="n in joke.rating" :key="n">⭐</span>
      </span>
    </li>
  </ul>
</template>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
