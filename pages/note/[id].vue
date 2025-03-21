<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '#app'

const route = useRoute()
const noteId = route.params.id
const note = ref(null)
const error = ref(null)

const fetchNote = async () => {
  try {
    const { data, error: fetchError } = await useFetch(`/api/users/note/${noteId}`)
    
    if (fetchError.value) {
      console.error('Error fetching note:', fetchError.value)
      error.value = fetchError.value
    } else {
      note.value = data.value
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    error.value = 'An unexpected error occurred.'
  }
}

onMounted(fetchNote)

const getBadgeClass = (category) => {
  return {
    "To Do List": "badge-warning",
    "Note My Day": "badge-success",
    "Reminder": "badge-error",
  }[category] || "badge-secondary"
}

</script>

<template>
  <div class="p-6">
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-else-if="note" class="card bg-base-300 shadow-lg p-6">
      <span class="badge badge-xs" :class="getBadgeClass(note.category)">{{ note.category }}</span>
      <h1 class="text-2xl font-bold">{{ note.topic }}</h1>
      <p class="mt-2 text-gray-700">{{ note.note }}</p>
    </div>

    <p v-else class="text-center text-gray-500">Loading...</p>
  </div>
</template>

