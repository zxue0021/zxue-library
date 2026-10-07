<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">
      Book Counter
    </h1>

    <div class="text-center">
      <button
        class="btn btn-primary"
        @click="getBookCount"
      >
        Get Book Count
      </button>

      <p
        v-if="count !== null"
        class="mt-3"
      >
        Total number of books: {{ count }}
      </p>

      <p
        v-if="error"
        class="text-danger mt-3"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const count = ref(null)
const error = ref('')

const getBookCount = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-fit5032-e6211.cloudfunctions.net/countBooks'
    )

    count.value = response.data.count
    error.value = ''
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = 'Error fetching book count'
    count.value = null
  }
}
</script>