<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import apiService from '../core/services/api.service'
import jokesService from '../core/services/jokes.service'
import Loader from './../components/loader.vue'
import Toast from './../components/Toast.vue'
import JokeCard from './../components/JokeCard.vue'

const jokes = ref([])
const isLoading = ref(false)
const hasAPIError = ref(false)
const apiErrorMessage = ref('Oops, something went wrong!')
const selectedFilterType = ref('')
const selectedRating = ref('')
const favoriteJokesLength = ref(0)
const searchQuery = ref('')
const sortedJokes = computed(() => {
  let filteredJokes = [...jokes.value]

  // Apply type filter if needed
  if (selectedFilterType.value) {
    filteredJokes = filteredJokes.filter((joke) => joke.type === selectedFilterType.value)
  }

  // Apply search filter
  if (searchQuery.value) {
    filteredJokes = filteredJokes.filter(
      (joke) =>
        joke.type.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        joke.setup.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        joke.punchline.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  // Apply rating filter
  if (selectedRating.value) {
    filteredJokes = filteredJokes.filter((joke) => joke.rating === Number(selectedRating.value))
  }

  return filteredJokes
})
onMounted(() => {
  favoriteJokesLength.value = jokesService.getFavoriteJokes().length
  isLoading.value = true
  apiService
    .get()
    .then((response) => {
      jokes.value = response
      jokes.value = response.map((user) => ({
        ...user,
        rating: 0, // Initialize rating for each user
      }))
      jokesService.saveJokes(jokes.value)
      console.log('jokes.value', jokes.value)
      sortedJokes.value = [...jokes.value]
    })
    .catch((error) => {
      console.error('Error fetching users:', error)
      apiErrorMessage.value = error.message
      hasAPIError.value = true
      setTimeout(() => {
        hasAPIError.value = false
      }, 3000)
    })
    .finally(() => {
      isLoading.value = false // Hide loader after fetching data
    })
})

const hasJokes = () => {
  return jokes.value.length > 0
}

// Function to filter jokes by type
const filterByType = (type) => {
  selectedFilterType.value = type
}

const resetFilter = () => {
  selectedFilterType.value = ''
}

const addToFavorites = (joke: any) => {
  jokesService.addFavorite(joke)
  console.log('favorites', jokesService.getFavoriteJokes())
  favoriteJokesLength.value = jokesService.getFavoriteJokes().length
}

const updateRating = (jokeId: number, rating: number) => {
  const jokeIndex = jokes.value.findIndex((joke) => joke.id === jokeId)
  if (jokeIndex !== -1) {
    jokes.value[jokeIndex].rating = rating
    jokesService.updateJokeRating(jokeId, rating) // Update rating in service
  }

  console.log('sorted', jokes.value)
}

const sortByRating = () => {
  jokes.value.sort((a, b) => b.rating - a.rating)
}

const sortAlphabetically = () => {
  jokes.value.sort((a, b) => a.setup.localeCompare(b.setup))
}

const totalJokesSaved = computed(() => favoriteJokesLength.value)

const averageRating = computed(() => {
  const ratedJokes = jokes.value.filter((joke) => joke.rating > 0) // Exclude jokes with rating 0
  if (ratedJokes.length === 0) return 0

  const totalRating = ratedJokes.reduce((sum, joke) => sum + joke.rating, 0)
  return (totalRating / ratedJokes.length).toFixed(2) // Round to 2 decimal places
})
</script>

<template>
  <main class="relative min-h-screen">
    <div class="flex gap-2 justify-center">
      <button @click="sortByRating">Sort by Rating</button>
      <button @click="sortAlphabetically">Sort Alphabetically</button>
      <button @click="filterByType('general')">General jokes</button>
      <button @click="filterByType('programming')">Programming</button>
      <button @click="resetFilter">Show All</button>
    </div>
    <br />

    <div class="flex justify-center">
      <!-- search -->
      <input
        class="text-white min-w-[300px] rounded-[10px] border border-[#F2C8C9] px-3 py-2"
        v-model="searchQuery"
        placeholder="Search jokes..."
      /><br />
    </div>
    <br />

    <div class="flex justify-center">
      <select
        v-model="selectedRating"
        class="border-[#F2C8C9] border-solid rounded-[10px] text-[#F2C8C9] p-2 px-3"
      >
        <option value="">All Ratings</option>
        <option v-for="n in 4" :key="n" :value="n" class="bg-white !text-black">
          {{ n }} Stars
        </option>
      </select>
    </div>

    <div class="absolute right-0 top-0 bg-[#F2C8C9] rounded-[20px] text-black p-4 scale-up-center">
      <h3 class="font-bold">Collection Statistics</h3>
      <p>
        Total Jokes Saved: <span class="text-[20px] font-bold">{{ totalJokesSaved }}</span>
      </p>
      <p>
        Average Rating: <span class="text-[20px] font-bold">{{ averageRating }}</span>
      </p>
    </div>

    <div v-if="hasAPIError">
      <Toast class="absolute top-5 left-5" :message="apiErrorMessage" />
    </div>

    <div>
      <div v-if="isLoading">
        <div class="flex justify-center mt-3">
          <Loader />
        </div>
      </div>
      <div v-if="!isLoading" class="pt-4">
        <p v-if="!hasAPIError && hasJokes()" class="text-center text-white info mb-3">
          *Hover to see the punchline!!
        </p>
        <ul class="flex justify-center flex-wrap gap-4">
          <JokeCard
            v-for="joke in sortedJokes"
            :key="joke.id"
            :joke="joke"
            @addToFavorites="addToFavorites"
            @updateRating="updateRating"
          />
        </ul>
      </div>
    </div>
  </main>
</template>
