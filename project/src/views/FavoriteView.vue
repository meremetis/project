<script setup lang="ts">
import { ref, onMounted } from 'vue'
import jokesService from './../core/services/jokes.service'
import JokeCard from './../components/JokeCard.vue'

const favoriteJokes = ref<any>([])

onMounted(() => {
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
  <p class="text-center text-white mb-3">*Hover over the card to reveal the punchline!</p>
  <ul class="flex justify-center flex-wrap gap-4">
    <JokeCard
      v-for="joke in favoriteJokes"
      :key="joke.id"
      :joke="joke"
      :isFavorite="true"
      @removeFromFavorites="removeFromFavorites"
    />
  </ul>
</template>
