import { ref } from 'vue'

export const isAuthenticated = ref(
  localStorage.getItem('isAuthenticated') === 'true'
)

export const login = (username, password) => {
  if (
    username === 'student' &&
    password === 'library123'
  ) {
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
    return true
  }

  return false
}

export const logout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('isAuthenticated')
}