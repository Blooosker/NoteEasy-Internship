
<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" class="text-black">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
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
