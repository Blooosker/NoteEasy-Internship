<template>
    <div class="flex items-center justify-center min-h-screen">
      <div class="card card-side bg-white shadow-sm w-1/2 text-black" v-if="user">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Profile Image"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Name: {{ user.name }}</h2>
          <div>
            <p>Email: {{ user.email }}</p>
            <p>User ID: {{ user.id }}</p>
          </div>
          <div class="mt-20 card-actions justify-end">
            <button class="btn btn-error" @click="logout">Logout</button>
          </div>
        </div>
      </div>
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
  


