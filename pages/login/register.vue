<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister" class="text-black">
        <input v-model="name" type="text" placeholder="Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" :disabled="loading">Register</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>
      <p>Already have an account? <NuxtLink to="/login">Login here</NuxtLink></p>
    </div>
  </template>
  
  <script setup>

  definePageMeta({
    layout: 'login',
    })

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const successMessage = ref('')
  const loading = ref(false)
  const router = useRouter()
  
  const handleRegister = async () => {
    errorMessage.value = ''
    successMessage.value = ''
    loading.value = true
  
    try {
      const response = await $fetch('/api/users/register', {
        method: 'POST',
        body: { name: name.value, email: email.value, password: password.value }
      })
  
      successMessage.value = 'Register successful! Redirecting to login...'
  
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      errorMessage.value = error?.data?.statusMessage || 'Registration failed'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .register-container {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
  }
  button {
    padding: 10px;
    width: 100%;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  </style>
  