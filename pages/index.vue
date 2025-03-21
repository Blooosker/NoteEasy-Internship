<template>
  <div class="p-6">

    <div class="flex justify-between items-center mb-6">
      <NuxtLink to="/note/create" class="btn btn-secondary">New Note</NuxtLink>
      
  
      <div class="flex space-x-4">
        <button class="btn" @click="filterNotes('All')">All</button>
        <button class="btn" @click="filterNotes('To Do List')">To Do List</button>
        <button class="btn" @click="filterNotes('Note My Day')">Note My Day</button>
        <button class="btn" @click="filterNotes('Reminder')">Reminder</button>
      </div>
    </div>


    <div v-if="filteredNotes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="note in filteredNotes" :key="note.id" class="card bg-base-300 shadow-lg w-full">
        <div class="card-body">
          <span class="badge badge-xs" :class="getBadgeClass(note.category)">{{ note.category }}</span>
          <h2 class="card-title">{{ note.topic }}</h2>
          
          <div class="flex justify-between text-sm text-gray-500">

            <span>{{ note.createdAt }}</span>
          </div>

          <p class="text-gray-700">{{ note.note }}</p>

        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-500">No notes found.</p>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFetch } from '#app' 

const user = ref(null)
const notes = ref([]) 
const selectedCategory = ref('All')
const router = useRouter()


const loadUser = () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
}


const fetchNotes = async () => {
  try {
    if (!user.value?.id) return 
    
    const { data, error } = await useFetch(`/api/users/note/user/${user.value.id}`)

    if (error.value) {
      console.error('Failed to fetch notes:', error.value)
    } else {
      notes.value = data.value || [] 
    }
  } catch (err) {
    console.error('Error fetching notes:', err)
  }
}


onMounted(async () => {
  loadUser()
  await fetchNotes()
})

const filteredNotes = computed(() => {
  if (selectedCategory.value === 'All') return notes.value
  return notes.value.filter(note => note.category === selectedCategory.value)
})


const filterNotes = (category) => {
  selectedCategory.value = category
}


const getBadgeClass = (category) => {
  return {
    "To Do List": "badge-warning",
    "Note My Day": "badge-success",
    "Reminder": "badge-error",
  }[category] || "badge-secondary"
}
</script>

