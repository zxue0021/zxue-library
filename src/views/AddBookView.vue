<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-7">
        <h1 class="text-center mb-4">
          Add Book
        </h1>

        <form @submit.prevent="addBook">
          <div class="mb-3">
            <label
              for="isbn"
              class="form-label"
            >
              ISBN
            </label>

            <input
              id="isbn"
              v-model="isbn"
              type="number"
              class="form-control"
              required
            >
          </div>

          <div class="mb-3">
            <label
              for="name"
              class="form-label"
            >
              Book Name
            </label>

            <input
              id="name"
              v-model="name"
              type="text"
              class="form-control"
              required
            >
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
          >
            Add Book
          </button>
        </form>

        <div
          v-if="message"
          class="alert alert-success mt-3"
        >
          {{ message }}
        </div>

        <div
          v-if="errorMessage"
          class="alert alert-danger mt-3"
        >
          {{ errorMessage }}
        </div>

        <BookList :key="refreshKey" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  addDoc,
  collection
} from 'firebase/firestore'

import db from '../firebase/init'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')
const message = ref('')
const errorMessage = ref('')
const refreshKey = ref(0)

const addBook = async () => {
  message.value = ''
  errorMessage.value = ''

  try {
    const isbnNumber = Number(isbn.value)

    if (Number.isNaN(isbnNumber)) {
      errorMessage.value =
        'ISBN must be a valid number.'
      return
    }

    await addDoc(
      collection(db, 'books'),
      {
        isbn: isbnNumber,
        name: name.value
      }
    )

    message.value =
      'Book added successfully.'

    isbn.value = ''
    name.value = ''

    refreshKey.value++
  } catch (error) {
    console.error(
      'Error adding book:',
      error
    )

    errorMessage.value = error.message
  }
}
</script>