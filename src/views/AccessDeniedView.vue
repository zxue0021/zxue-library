<template>
  <div class="container mt-5 text-center">
    <div class="alert alert-danger">
      <h2>Access Denied</h2>

      <p>
        The username or password is incorrect.
      </p>

      <router-link
        to="/login"
        class="btn btn-primary"
      >
        Back to Login
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>