<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-semibold text-center text-gray-700">Register</h2>
        <form @submit.prevent="handleRegister" class="mt-4">
          <div class="mb-4">
            <input 
              v-model="name" 
              type="text" 
              placeholder="Name" 
              required
              class="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="mb-4">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Email" 
              required
              class="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="mb-4">
            <input 
              v-model="password" 
              type="password" 
              placeholder="Password" 
              required
              class="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
          >
            Register
          </button>
          <p v-if="errorMessage" class="mt-2 text-red-500 text-sm text-center">{{ errorMessage }}</p>
          <p v-if="successMessage" class="mt-2 text-green-500 text-sm text-center">{{ successMessage }}</p>
        </form>
        <p class="mt-4 text-center text-gray-600">
          Already have an account? 
          <NuxtLink to="/login" class="text-blue-500 hover:underline">Login here</NuxtLink>
        </p>
      </div>
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
  