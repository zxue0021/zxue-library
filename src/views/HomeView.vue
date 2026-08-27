<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
        <h1 class="text-center">
          W5. Library Registration Form
        </h1>

        <p class="text-center">
          Let's build some more advanced features into our form.
        </p>

        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-6 col-sm-6 mb-3">
              <label for="username" class="form-label">
                Username
              </label>

              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              >

              <div
                v-if="errors.username"
                class="text-danger"
              >
                {{ errors.username }}
              </div>
            </div>

            <div class="col-md-6 col-sm-6 mb-3">
              <label for="gender" class="form-label">
                Gender
              </label>

              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @change="() => validateGender(true)"
              >
                <option value="">Please select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>

              <div
                v-if="errors.gender"
                class="text-danger"
              >
                {{ errors.gender }}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-sm-6 mb-3">
              <label for="password" class="form-label">
                Password
              </label>

              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              >

              <div
                v-if="errors.password"
                class="text-danger"
              >
                {{ errors.password }}
              </div>
            </div>

            <div class="col-md-6 col-sm-6 mb-3">
              <label for="confirm-password" class="form-label">
                Confirm password
              </label>

              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              >

              <div
                v-if="errors.confirmPassword"
                class="text-danger"
              >
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="isAustralian"
              v-model="formData.isAustralian"
              @change="() => validateResident(true)"
            >

            <label
              for="isAustralian"
              class="form-check-label"
            >
              Australian Resident?
            </label>

            <div
              v-if="errors.resident"
              class="text-danger"
            >
              {{ errors.resident }}
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">
              Reason for joining
            </label>

            <textarea
              class="form-control"
              id="reason"
              rows="4"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>

            <div
              v-if="errors.reason"
              class="text-danger"
            >
              {{ errors.reason }}
            </div>

            <div
              v-if="friendMessage"
              class="text-success"
            >
              {{ friendMessage }}
            </div>
          </div>

          <div class="mb-3">
            <label for="suburb" class="form-label">
              Suburb
            </label>

            <input
              type="text"
              class="form-control"
              id="suburb"
              v-bind:value="formData.suburb"
            >
          </div>

          <div class="text-center">
            <button
              type="submit"
              class="btn btn-primary me-2"
            >
              Submit
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              @click="clearForm"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      class="row mt-5"
      v-if="submittedCards.length"
    >
      <div class="col-12">
        <h4>This is a PrimeVue Datatable.</h4>

        <DataTable
          :value="submittedCards"
          style="width: 100%"
        >
          <Column
            field="username"
            header="Username"
          ></Column>

          <Column
            field="password"
            header="Password"
          ></Column>

          <Column header="Australian Resident">
            <template #body="slotProps">
              {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
            </template>
          </Column>

          <Column
            field="gender"
            header="Gender"
          ></Column>

          <Column
            field="reason"
            header="Reason"
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

const submittedCards = ref([])

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
})

const friendMessage = computed(() => {
  if (formData.value.reason.toLowerCase().includes('friend')) {
    return 'Great to have a friend'
  }

  return ''
})

const validateName = (blur) => {
  const username = formData.value.username

  if (username.length < 3) {
    if (blur) {
      errors.value.username = 'Name must be at least 3 characters'
    }
  } else if (/\d/.test(username)) {
    if (blur) {
      errors.value.username = 'Username cannot contain numbers'
    }
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) {
      errors.value.password =
        `Password must be at least ${minLength} characters long.`
    }
  } else if (!hasUppercase) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one uppercase letter.'
    }
  } else if (!hasLowercase) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one lowercase letter.'
    }
  } else if (!hasNumber) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one number.'
    }
  } else if (!hasSpecialChar) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one special character.'
    }
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (
    formData.value.password !==
    formData.value.confirmPassword
  ) {
    if (blur) {
      errors.value.confirmPassword =
        'Passwords do not match.'
    }
  } else {
    errors.value.confirmPassword = null
  }
}

const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) {
      errors.value.resident =
        'Australian residency is required'
    }
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (formData.value.gender === '') {
    if (blur) {
      errors.value.gender =
        'Please select a gender'
    }
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const reason = formData.value.reason

  if (reason.length < 10) {
    if (blur) {
      errors.value.reason =
        'Reason must be at least 10 characters'
    }
  } else if (reason.length > 100) {
    if (blur) {
      errors.value.reason =
        'Reason must be no more than 100 characters'
    }
  } else {
    errors.value.reason = null
  }
}

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    submittedCards.value.push({
      username: formData.value.username,
      password: formData.value.password,
      isAustralian: formData.value.isAustralian,
      gender: formData.value.gender,
      reason: formData.value.reason
    })

    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton'
  }

  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null
  }
}
</script>