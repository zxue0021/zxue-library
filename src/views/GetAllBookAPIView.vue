<template>
  <div class="container mt-4">
    <h1>GetAllBookAPI</h1>

    <pre>{{ jsonData }}</pre>
  </div>
</template>

<script setup>
import {
  onMounted,
  ref
} from 'vue'
import axios from 'axios'

const jsonData = ref(null)

const getAllBooks = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-fit5032-e6211.cloudfunctions.net/getAllBooks'
    )

    jsonData.value = JSON.stringify(
      response.data,
      null,
      2
    )
  } catch (error) {
    console.error(
      'Error fetching books:',
      error
    )

    jsonData.value = JSON.stringify(
      {
        error: 'Error fetching books'
      },
      null,
      2
    )
  }
}

onMounted(() => {
  getAllBooks()
})
</script>