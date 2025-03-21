<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 text-black">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold text-center text-gray-700">Login</h2>
      <form @submit.prevent="handleLogin" class="mt-4">
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
          class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          Login
        </button>
        <p v-if="errorMessage" class="mt-2 text-red-500 text-sm text-center">{{ errorMessage }}</p>
      </form>
      <p class="mt-4 text-center text-gray-600">
        Don't have an account? 
        <router-link to="/register" class="text-blue-500 hover:underline">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
    layout: 'login',
    })

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await $fetch('/api/users/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })


    localStorage.setItem('user', JSON.stringify(response))

    router.push('/')
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
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
</style>
