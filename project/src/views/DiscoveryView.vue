<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import apiService from '../core/services/api.service'
import jokesService from '../core/services/jokes.service'

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

// Function to filter jokes by type
const filterByType = (type) => {
  selectedFilterType.value = type
}

const resetFilter = () => {
  selectedFilterType.value = ''
}

const hideToast = () => {
  hasAPIError.value = false
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
  <main class="relative">
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
        class="search-input px-3 py-2"
        v-model="searchQuery"
        placeholder="Search jokes..."
      /><br />
    </div>
    <br />

    <div class="flex justify-center">
      <select v-model="selectedRating" class="dropdown p-2 px-3">
        <option value="">All Ratings</option>
        <option v-for="n in 4" :key="n" :value="n">{{ n }} Stars</option>
      </select>
    </div>

    <div class="absolute statistic p-3">
      <h3>Collection Statistics</h3>
      <p>
        Total Jokes Saved: <span>{{ totalJokesSaved }}</span>
      </p>
      <p>
        Average Rating: <span>{{ averageRating }}</span>
      </p>
    </div>

    <div v-if="hasAPIError">
      <div class="toast warning">{{ apiErrorMessage }} <button @click="hideToast()">X</button></div>
    </div>

    <div v-if="isLoading">
      <div class="flex justify-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="pt-4">
      <p class="text-center">*Hover to see the joke!!</p>

      <ul class="flex justify-center flex-wrap gap-4">
        <li v-for="joke in sortedJokes" :key="joke.id" class="card p-4 gap-2 scale-up-center">
          <p class="bold">{{ joke.setup }}</p>
          <p class="punchline">{{ joke.punchline }}</p>
          <p>Type: {{ joke.type }}</p>

          <button @click="addToFavorites(joke)">Add to Favorites 💖</button>

          <div class="rate-container">
            Rate joke:<span
              ><span>
                <button
                  class="border-none"
                  v-for="n in 5"
                  :key="n"
                  @click="updateRating(joke.id, n)"
                >
                  {{ n }}
                </button>
              </span></span
            >
          </div>

          <!-- Display stars based on rating -->
          <span>
            Rating:
            <span v-for="n in joke.rating" :key="n">⭐</span>
          </span>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.dropdown {
  border-color: green;
  border-radius: 10px;
}

.rate-container button {
  background-color: transparent;
  color: green;
}

.rate-container button:hover {
  background-color: transparent;
  color: black;
}

.punchline {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.card {
  width: 400px;
  border-radius: 20px;
  border: green;
  border-style: solid;
  transition: box-shadow 0.5s ease-in-out;
}

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.card:hover .punchline {
  opacity: 1;
}

.statistic {
  right: 0;
  top: 0;
  background-color: green;
  border-radius: 20px;
  color: white;
}

.statistic span {
  font-size: 20px;
  font-weight: bold;
}

.search-input {
  min-width: 300px;
  border-radius: 10px;
}

.toast {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
}

.toast.warning {
  background-color: #ffc107;
}

.toast button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
}

.scale-up-center {
  -webkit-animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2025-6-10 21:18:15
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
