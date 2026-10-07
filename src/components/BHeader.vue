<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            active-class="active"
          >
            Home (Week 5)
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
            active-class="active"
          >
            About
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/fire-register"
            class="nav-link"
            active-class="active"
          >
            Firebase Register
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/fire-login"
            class="nav-link"
            active-class="active"
          >
            Firebase Sign In
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/addbook"
            class="nav-link"
            active-class="active"
          >
            Add Book
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/book-counter"
            class="nav-link"
            active-class="active"
          >
            Book Counter
          </router-link>
        </li>

        <li
          v-if="!isAuthenticated"
          class="nav-item"
        >
          <router-link
            to="/login"
            class="nav-link"
            active-class="active"
          >
            Login
          </router-link>
        </li>

        <li
          v-else
          class="nav-item"
        >
          <button
            type="button"
            class="nav-link"
            @click="handleLogout"
          >
            Logout
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  isAuthenticated,
  logout
} from '../auth'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>