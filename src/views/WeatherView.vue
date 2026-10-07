<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-7">
        <h1 class="text-center mb-4">
          Weather App
        </h1>

        <div class="input-group mb-4">
          <input
            v-model="city"
            type="text"
            class="form-control"
            placeholder="Enter city name"
            @keyup.enter="searchByCity"
          >

          <button
            class="btn btn-primary"
            @click="searchByCity"
          >
            Search
          </button>
        </div>

        <div
          v-if="weatherData"
          class="card text-center"
        >
          <div class="card-body">
            <h2 class="card-title">
              {{ weatherData.name }},
              {{ weatherData.sys.country }}
            </h2>

            <img
              :src="iconUrl"
              alt="Weather Icon"
            >

            <h3>
              {{ temperature }} °C
            </h3>

            <p class="text-capitalize">
              {{ weatherData.weather[0].description }}
            </p>
          </div>
        </div>

        <div
          v-if="error"
          class="alert alert-danger mt-3"
        >
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref
} from 'vue'
import axios from 'axios'

const apiKey =
  import.meta.env.VITE_OPENWEATHER_API_KEY

const city = ref('')
const weatherData = ref(null)
const error = ref('')

const temperature = computed(() => {
  return weatherData.value
    ? Math.floor(
        weatherData.value.main.temp - 273
      )
    : null
})

const iconUrl = computed(() => {
  if (!weatherData.value) {
    return ''
  }

  const icon =
    weatherData.value.weather[0].icon

  return `https://openweathermap.org/img/wn/${icon}@2x.png`
})

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)

    weatherData.value = response.data
    error.value = ''
  } catch (err) {
    console.error(
      'Error fetching weather data:',
      err
    )

    weatherData.value = null
    error.value =
      'Unable to retrieve weather data.'
  }
}

const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    error.value =
      'Geolocation is not supported by this browser.'
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const {
        latitude,
        longitude
      } = position.coords

      const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

      await fetchWeatherData(url)
    },
    () => {
      error.value =
        'Unable to access current location.'
    }
  )
}

const searchByCity = async () => {
  if (!city.value.trim()) {
    return
  }

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.value)}&appid=${apiKey}`

  await fetchWeatherData(url)
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>