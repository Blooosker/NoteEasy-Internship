
<template>
    <div class="profile-container" v-if="user">
 
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>ID:</strong> {{ user.id }}</p>

      <button btn btn-primary @click="logout"><strong>Logout</strong></button>

    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const user = ref(null)
  const router = useRouter()
  
  const loadUser = () => {
    const userData = localStorage.getItem('user')
    if (userData) {
      user.value = JSON.parse(userData)
    } else {
      router.push('/login') 
    }
  }
  
  onMounted(loadUser)

  const logout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }
  </script>
  


