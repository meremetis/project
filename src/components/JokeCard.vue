<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  joke: Object,
  isFavorite: Boolean,
})

const emit = defineEmits(['addToFavorites', 'removeFromFavorites', 'updateRating'])

const addToFavorites = () => {
  emit('addToFavorites', props.joke)
}

const removeFromFavorites = () => {
  emit('removeFromFavorites', props.joke.id)
}

const updateRating = (rating) => {
  emit('updateRating', props.joke.id, rating)
}
</script>

<template>
  <li
    class="card card w-[400px] rounded-[20px] border border-[rgba(242,200,201,255)] transition-shadow duration-500 ease-in-out text-black bg-white hover:shadow-[rgba(0,0,0,0.35)_0px_5px_15px] p-4 gap-2 flex flex-col justify-between scale-up-center"
  >
    <div>
      <p class="bold">{{ joke.setup }}</p>
      <p class="punchline mt-3">{{ joke.punchline }} 🤣</p>
      <p v-if="!isFavorite" class="mt-5">Type: {{ joke.type }}</p>
    </div>

    <button v-if="!isFavorite" class="!text-black mt-3" @click="addToFavorites">
      Add to Favorites 💖
    </button>

    <button v-else class="!text-black mt-3" @click="removeFromFavorites">
      Remove from Favorites ❌
    </button>

    <div v-if="!isFavorite" class="rate-container mt-3">
      Rate joke:
      <span>
        <span>
          <button
            class="!border-none bg-transparent !text-black hover:!text-[#F2C8C9] hover:!bg-transparent"
            v-for="n in 5"
            :key="n"
            @click="updateRating(n)"
          >
            {{ n }}
          </button>
        </span>
      </span>
    </div>

    <!-- Display stars based on rating -->
    <span>
      Rating:
      <span v-for="n in joke.rating" :key="n">⭐</span>
    </span>
  </li>
</template>

<style scoped>
.punchline {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.card:hover .punchline {
  opacity: 1;
}
</style>
