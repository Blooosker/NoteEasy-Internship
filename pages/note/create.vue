<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const topic = ref('')
const note = ref('')
const category = ref('')
const errorMessage = ref('')
const loading = ref(false)
const router = useRouter()

const handleSubmit = async () => {
  errorMessage.value = ''
  loading.value = true


  const userData = localStorage.getItem('user')
  const user = ref(null)

  if (userData) {
    try {
      user.value = JSON.parse(userData) 
    } catch (e) {
      console.error("Error parsing user data from localStorage:", e)
      errorMessage.value = "Invalid user data"
      loading.value = false
      return
    }
  }

  if (!user.value || !user.value.id) {
    errorMessage.value = "User not found"
    loading.value = false
    return
  }

  try {
    const response = await $fetch('/api/users/note', {
      method: 'POST',
      body: { 
        userId: user.value.id, 
        topic: topic.value, 
        note: note.value, 
        category: category.value
      }
    })

    console.log("Response:", response)

    router.push('/')
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || 'Create note failed'
  } finally {
    loading.value = false
  }
}
</script>




<template>
    <div class="p-6">
        <NuxtLink to="/" class="btn btn-primary mb-4 text-center">Back</NuxtLink>
    </div>
    <div class="flex justify-center items-center min-h-screen">
      <div class="w-full max-w-lg bg-base-300 p-6 rounded-2xl shadow-lg">

    <form @submit.prevent="handleSubmit">
        <fieldset class="fieldset space-y-4">
            <div class="fieldset-legend text-lg font-semibold text-white">Select Category</div>
            <select v-model="category" class="select validator p-2 border rounded-lg" required>
            <option disabled selected value="">Choose:</option>
            <option>To Do List</option>
            <option>Note My Day</option>
            <option>Reminder</option>
            <option>None</option>
            </select>
            <p class="validator-hint text-sm text-gray-500">Required</p>

            <fieldset class="fieldset space-y-2">
            <legend class="fieldset-legend text-lg font-semibold text-white">Your topic</legend>
            <textarea v-model="topic" class="textarea h-24 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300" placeholder="Enter your topic"></textarea>
            </fieldset>

            <fieldset class="fieldset space-y-2">
            <legend class="fieldset-legend text-lg font-semibold text-white">Your note</legend>
            <textarea v-model="note" class="textarea h-24 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300" placeholder="What are you thinking?"></textarea>
            </fieldset>

            <button class="btn btn-secondary w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" type="submit">
            Save
            </button>
        </fieldset>
    </form>

      </div>
    </div>
  </template>



  <style scoped>

  .btn-primary {
    @apply bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition;
  }
  </style>
  



