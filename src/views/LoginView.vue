<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h1 class="text-center mb-4">
          Member Login
        </h1>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label
              for="loginUsername"
              class="form-label"
            >
              Username
            </label>

            <input
              id="loginUsername"
              v-model="username"
              type="text"
              class="form-control"
            >
          </div>

          <div class="mb-3">
            <label
              for="loginPassword"
              class="form-label"
            >
              Password
            </label>

            <input
              id="loginPassword"
              v-model="password"
              type="password"
              class="form-control"
            >
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
          >
            Login
          </button>
        </form>

        <p class="text-muted mt-3 text-center">
          Test account: student / library123
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../auth'

const username = ref('')
const password = ref('')

const route = useRoute()
const router = useRouter()

const handleLogin = () => {
  if (login(username.value, password.value)) {
    const redirectPath =
      typeof route.query.redirect === 'string'
        ? route.query.redirect
        : '/about'

    router.push(redirectPath)
  } else {
    router.push('/access-denied')
  }
}
</script>