<template>
  <div class="mt-5">
    <h2 class="text-center mb-3">
      Firestore Books
    </h2>

    <p class="text-center">
      Query: ISBN &gt; 1000, ordered by ISBN, limited to 5 results
    </p>

    <div
      v-if="books.length === 0"
      class="alert alert-secondary"
    >
      No matching books found.
    </div>

    <div
      v-for="book in books"
      :key="book.id"
      class="card mb-3"
    >
      <div class="card-body">
        <h5 class="card-title">
          {{ book.name }}
        </h5>

        <p class="card-text">
          ISBN: {{ book.isbn }}
        </p>

        <button
          class="btn btn-warning me-2"
          @click="updateBook(book)"
        >
          Update
        </button>

        <button
          class="btn btn-danger"
          @click="deleteBook(book.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

import { onMounted, ref } from 'vue'
import db from '../firebase/init'

const books = ref([])

const fetchBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(5)
    )

    const querySnapshot = await getDocs(q)

    books.value = querySnapshot.docs.map((bookDoc) => ({
      id: bookDoc.id,
      ...bookDoc.data()
    }))
  } catch (error) {
    console.error('Error retrieving books:', error)
  }
}

const updateBook = async (book) => {
  const newName = window.prompt(
    'Enter a new book name:',
    book.name
  )

  if (!newName) {
    return
  }

  try {
    await updateDoc(
      doc(db, 'books', book.id),
      {
        name: newName
      }
    )

    await fetchBooks()
  } catch (error) {
    console.error('Error updating book:', error)
  }
}

const deleteBook = async (bookId) => {
  const confirmed = window.confirm(
    'Delete this book?'
  )

  if (!confirmed) {
    return
  }

  try {
    await deleteDoc(
      doc(db, 'books', bookId)
    )

    await fetchBooks()
  } catch (error) {
    console.error('Error deleting book:', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>