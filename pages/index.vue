<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Analisis Mood Diary
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Tulis diary harianmu dan biarkan AI menganalisis mood-mu secara real-time menggunakan algoritma Naive Bayes
      </p>
    </div>

    <!-- Main Form -->
    <div class="mood-card mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">Tulis Diary Hari Ini</h2>
      
      <div class="space-y-4">
        <div>
          <label for="diary-text" class="block text-sm font-medium text-gray-700 mb-2">
            Bagaimana perasaanmu hari ini?
          </label>
          <textarea
            id="diary-text"
            v-model="diaryText"
            :disabled="isAnalyzing"
            placeholder="Tulis tentang hari ini, perasaanmu, atau hal yang terjadi..."
            rows="8"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none disabled:opacity-50"
          ></textarea>
          <div class="mt-2 text-sm text-gray-500">
            {{ diaryText.length }} karakter
          </div>
        </div>

        <button
          @click="analyzeMood"
          :disabled="!diaryText.trim() || isAnalyzing"
          class="btn-primary w-full sm:w-auto"
        >
          <span v-if="isAnalyzing" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Menganalisis Mood...
          </span>
          <span v-else>🔍 Analisis Mood</span>
        </button>
      </div>
    </div>

    <!-- Analysis Result -->
    <Transition name="fade" appear>
      <div v-if="analysisResult" class="mood-card">
        <h3 class="text-xl font-semibold text-gray-900 mb-6">Hasil Analisis Mood</h3>
        
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Main Result -->
          <div class="space-y-4">
            <div class="text-center p-6 rounded-xl" :class="getMoodBgClass(analysisResult.mood)">
              <div class="text-4xl mb-2">{{ getMoodEmoji(analysisResult.mood) }}</div>
              <div class="text-2xl font-bold text-gray-900 mb-1">
                {{ getMoodText(analysisResult.mood) }}
              </div>
              <div class="text-lg text-gray-600">
                Confidence: {{ analysisResult.confidence }}%
              </div>
            </div>
            
            <div class="p-4 bg-gray-50 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-2">💡 Saran</h4>
              <p class="text-gray-700">{{ analysisResult.suggestion }}</p>
            </div>
          </div>

          <!-- Confidence Breakdown -->
          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">Breakdown Analisis</h4>
            <div class="space-y-3">
              <div 
                v-for="(prob, mood) in analysisResult.probabilities" 
                :key="mood"
                class="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div class="flex items-center space-x-2">
                  <span class="text-lg">{{ getMoodEmoji(mood) }}</span>
                  <span class="font-medium">{{ getMoodText(mood) }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-1000"
                      :class="getMoodProgressClass(mood)"
                      :style="{ width: (prob * 100) + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-600 w-12">
                    {{ Math.round(prob * 100) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Save Status -->
        <div v-if="saveStatus" class="mt-4 p-3 rounded-lg" :class="saveStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          {{ saveStatus.message }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// SEO
useHead({
  title: 'Mood Diary - Analisis Mood dengan AI',
  meta: [
    { name: 'description', content: 'Aplikasi diary digital dengan analisis mood menggunakan algoritma Naive Bayes' }
  ]
})

// Composables
const { classifyText, getMoodSuggestion } = useNaiveBayes()
const { saveMoodAnalysis } = useFirestore()

// State
const diaryText = ref('')
const isAnalyzing = ref(false)
const analysisResult = ref(null)
const saveStatus = ref(null)

// Methods
const analyzeMood = async () => {
  if (!diaryText.value.trim()) return
  
  isAnalyzing.value = true
  saveStatus.value = null
  
  try {
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Analyze mood
    const result = classifyText(diaryText.value)
    const suggestion = getMoodSuggestion(result.mood, result.confidence)
    
    analysisResult.value = {
      ...result,
      suggestion,
      text: diaryText.value
    }
    
    // Save to Firestore
    const saveResult = await saveMoodAnalysis({
      text: diaryText.value,
      mood: result.mood,
      confidence: result.confidence,
      suggestions: suggestion
    })
    
    if (saveResult.success) {
      saveStatus.value = {
        success: true,
        message: '✅ Hasil analisis berhasil disimpan ke riwayat!'
      }
    } else {
      saveStatus.value = {
        success: false,
        message: '⚠️ Analisis berhasil, tapi gagal menyimpan ke riwayat.'
      }
    }
    
  } catch (error) {
    console.error('Error analyzing mood:', error)
    saveStatus.value = {
      success: false,
      message: '❌ Terjadi kesalahan saat menganalisis mood.'
    }
  } finally {
    isAnalyzing.value = false
  }
}

// Helper methods
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

const getMoodBgClass = (mood) => {
  const classes = {
    bahagia: 'bg-bahagia-100 border-bahagia-200 border',
    sedih: 'bg-sedih-100 border-sedih-200 border',
    marah: 'bg-marah-100 border-marah-200 border'
  }
  return classes[mood] || 'bg-gray-100'
}

const getMoodProgressClass = (mood) => {
  const classes = {
    bahagia: 'bg-bahagia-500',
    sedih: 'bg-sedih-500',
    marah: 'bg-marah-500'
  }
  return classes[mood] || 'bg-gray-500'
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>