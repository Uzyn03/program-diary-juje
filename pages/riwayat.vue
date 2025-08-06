<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Riwayat Mood</h1>
      <p class="text-gray-600">Lihat perjalanan mood harianmu</p>
    </div>

    <!-- Stats Cards -->
    <div v-if="moodStats" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="mood-card text-center">
        <div class="text-2xl font-bold text-gray-900">{{ moodHistory.length }}</div>
        <div class="text-sm text-gray-600">Total Entri</div>
      </div>
      <div class="mood-card text-center">
        <div class="text-2xl">😊</div>
        <div class="text-lg font-semibold text-bahagia-600">{{ moodStats.bahagia }}</div>
        <div class="text-sm text-gray-600">Bahagia</div>
      </div>
      <div class="mood-card text-center">
        <div class="text-2xl">😢</div>
        <div class="text-lg font-semibold text-sedih-600">{{ moodStats.sedih }}</div>
        <div class="text-sm text-gray-600">Sedih</div>
      </div>
      <div class="mood-card text-center">
        <div class="text-2xl">😠</div>
        <div class="text-lg font-semibold text-marah-600">{{ moodStats.marah }}</div>
        <div class="text-sm text-gray-600">Marah</div>
      </div>
    </div>

    <!-- Filter -->
    <div class="mood-card mb-8">
      <div class="flex flex-wrap items-center gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Filter Mood:</label>
          <select 
            v-model="filterMood" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Semua</option>
            <option value="bahagia">😊 Bahagia</option>
            <option value="sedih">😢 Sedih</option>
            <option value="marah">😠 Marah</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Urutkan:</label>
          <select 
            v-model="sortOrder" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="mood-card text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Memuat riwayat mood...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredHistory.length === 0" class="mood-card text-center py-12">
      <div class="text-6xl mb-4">📝</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Belum Ada Riwayat</h3>
      <p class="text-gray-600 mb-6">Mulai tulis diary pertamamu untuk melihat analisis mood di sini!</p>
      <NuxtLink to="/" class="btn-primary">
        Tulis Diary Sekarang
      </NuxtLink>
    </div>

    <!-- History List -->
    <div v-else class="space-y-6">
      <TransitionGroup name="history" tag="div" class="space-y-6">
        <article 
          v-for="entry in filteredHistory" 
          :key="entry.id"
          class="mood-card hover:shadow-xl transition-all duration-300"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div class="flex-1">
              <!-- Mood and Timestamp -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <span 
                    class="mood-indicator"
                    :class="getMoodClass(entry.mood)"
                  >
                    {{ getMoodEmoji(entry.mood) }}
                    {{ getMoodText(entry.mood) }}
                  </span>
                  <span class="text-sm text-gray-500">
                    {{ entry.confidence }}% confidence
                  </span>
                </div>
                <time class="text-sm text-gray-500">
                  {{ formatDate(entry.timestamp) }}
                </time>
              </div>
              
              <!-- Diary Text -->
              <div class="mb-4">
                <p class="text-gray-800 leading-relaxed">
                  {{ entry.text }}
                </p>
              </div>
              
              <!-- Suggestion -->
              <div v-if="entry.suggestions" class="p-3 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-700">
                  <span class="font-medium">💡 Saran: </span>
                  {{ entry.suggestions }}
                </p>
              </div>
            </div>
          </div>
        </article>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// SEO
useHead({
  title: 'Riwayat Mood - Mood Diary',
  meta: [
    { name: 'description', content: 'Lihat riwayat analisis mood dari diary harianmu' }
  ]
})

// Composables
const { getMoodHistory } = useFirestore()

// State
const moodHistory = ref([])
const isLoading = ref(true)
const filterMood = ref('')
const sortOrder = ref('newest')
let unsubscribeFirestore = null

// Computed
const filteredHistory = computed(() => {
  let filtered = moodHistory.value

  // Filter by mood
  if (filterMood.value) {
    filtered = filtered.filter(entry => entry.mood === filterMood.value)
  }

  // Sort
  filtered.sort((a, b) => {
    const dateA = a.timestamp?.toDate() || new Date(0)
    const dateB = b.timestamp?.toDate() || new Date(0)
    
    return sortOrder.value === 'newest' 
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime()
  })

  return filtered
})

const moodStats = computed(() => {
  if (moodHistory.value.length === 0) return null
  
  const stats = {
    bahagia: 0,
    sedih: 0,
    marah: 0
  }
  
  moodHistory.value.forEach(entry => {
    if (stats.hasOwnProperty(entry.mood)) {
      stats[entry.mood]++
    }
  })
  
  return stats
})

// Methods
const loadMoodHistory = async () => {
  try {
    isLoading.value = true
    const result = await getMoodHistory()
    moodHistory.value = result.data
    unsubscribeFirestore = result.unsubscribe
  } catch (error) {
    console.error('Error loading mood history:', error)
  } finally {
    isLoading.value = false
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'Tanggal tidak diketahui'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'Hari ini, ' + date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  } else if (diffDays === 1) {
    return 'Kemarin, ' + date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  } else if (diffDays < 7) {
    return `${diffDays} hari lalu`
  } else {
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

const getMoodEmoji = (mood) => {
  const emojis = {
    bahagia: '😊',
    sedih: '😢',
    marah: '😠'
  }
  return emojis[mood] || '😐'
}

const getMoodText = (mood) => {
  const texts = {
    bahagia: 'Bahagia',
    sedih: 'Sedih',
    marah: 'Marah'
  }
  return texts[mood] || 'Netral'
}

const getMoodClass = (mood) => {
  return `mood-${mood}`
}

// Lifecycle
onMounted(() => {
  loadMoodHistory()
})

onUnmounted(() => {
  if (unsubscribeFirestore) {
    unsubscribeFirestore()
  }
})
</script>

<style scoped>
.history-enter-active,
.history-leave-active {
  transition: all 0.5s ease;
}

.history-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.history-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.history-move {
  transition: transform 0.5s ease;
}
</style>