<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h1 class="text-center mb-4">
          Firebase Sign In
        </h1>

        <form
          v-if="!currentUser"
          @submit.prevent="signIn"
        >
          <div class="mb-3">
            <label for="email" class="form-label">
              Email
            </label>

            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              required
            >
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>

            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              required
            >
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
          >
            Sign In
          </button>
        </form>

        <div
          v-if="currentUser"
          class="card mt-3"
        >
          <div class="card-body">
            <h4 class="card-title">
              Signed In User
            </h4>

            <p>
              <strong>Email:</strong>
              {{ currentUser.email }}
            </p>

            <p>
              <strong>Role:</strong>
              {{ role }}
            </p>

            <button
              type="button"
              class="btn btn-danger w-100"
              @click="signOutUser"
            >
              Sign Out
            </button>
          </div>
        </div>

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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { auth } from '../firebase'

const email = ref('')
const password = ref('')
const message = ref('')
const errorMessage = ref('')
const currentUser = ref(null)
const role = ref('')

const roleMap = {
  'admin1@example.com': 'Admin',
  'member1@example.com': 'Member'
}

const signIn = async () => {
  message.value = ''
  errorMessage.value = ''

  try {
    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      )

    currentUser.value = userCredential.user

    role.value =
      roleMap[userCredential.user.email] || 'Member'

    console.log(
      'Current user:',
      userCredential.user
    )

    console.log(
      'Current role:',
      role.value
    )

    message.value =
      'Firebase sign in successful.'
  } catch (error) {
    console.log(error.code)
    errorMessage.value = error.code
  }
}

const signOutUser = async () => {
  try {
    await signOut(auth)

    currentUser.value = null
    role.value = ''
    message.value = 'Firebase sign out successful.'

    console.log(
      'Current user after logout:',
      auth.currentUser
    )
  } catch (error) {
    console.log(error.code)
    errorMessage.value = error.code
  }
}
</script>