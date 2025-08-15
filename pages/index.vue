<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Analisis Mood Diary Enhanced
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Tulis diary harianmu dan biarkan AI menganalisis mood-mu secara real-time menggunakan algoritma Naive Bayes dengan dataset yang diperluas
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
          <div class="mt-2 flex justify-between text-sm text-gray-500">
            <span>{{ diaryText.length }} karakter</span>
            <span v-if="inputValidation && !inputValidation.isValid" class="text-red-500">
              ⚠️ {{ inputValidation.reason }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <button
            @click="analyzeMood"
            :disabled="!diaryText.trim() || isAnalyzing || (inputValidation && !inputValidation.isValid)"
            class="btn-primary flex-1"
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
          
          <button
            v-if="analysisResult && !analysisResult.error"
            @click="showCalculationDetails = true"
            class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            📊 Lihat Perhitungan
          </button>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="analysisResult && analysisResult.error" class="mood-card bg-red-50 border-red-200">
      <div class="flex items-center space-x-3">
        <div class="text-red-500 text-2xl">⚠️</div>
        <div>
          <h3 class="text-lg font-semibold text-red-800">Input Tidak Valid</h3>
          <p class="text-red-700">{{ analysisResult.message }}</p>
          <p class="text-sm text-red-600 mt-2">
            Silakan tulis dengan kata-kata yang lebih jelas dan bermakna.
          </p>
        </div>
      </div>
    </div>

    <!-- Analysis Result -->
    <Transition name="fade" appear>
      <div v-if="analysisResult && !analysisResult.error" class="mood-card">
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

        <!-- Processed Tokens -->
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 class="font-medium text-blue-900 mb-2">🔤 Kata-kata yang Dianalisis</h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="token in analysisResult.tokens" 
              :key="token"
              class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
            >
              {{ token }}
            </span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Calculation Details Modal -->
    <div v-if="showCalculationDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Detail Perhitungan Naive Bayes</h2>
            <button 
              @click="showCalculationDetails = false"
              class="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <CalculationDetails 
            v-if="analysisResult && !analysisResult.error" 
            :analysis-result="analysisResult" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useNaiveBayes } from '~/composables/useNaiveBayes'
import CalculationDetails from '~/components/CalculationDetails.vue'

// SEO
useHead({
  title: 'Enhanced Mood Diary - Analisis Mood dengan AI',
  meta: [
    { name: 'description', content: 'Aplikasi diary digital dengan analisis mood menggunakan algoritma Naive Bayes yang ditingkatkan' }
  ]
})

// Composables
const { classifyTextWithDetails, getMoodSuggestion, validateInput } = useNaiveBayes()

// State
const diaryText = ref('')
const isAnalyzing = ref(false)
const analysisResult = ref(null)
const inputValidation = ref(null)
const showCalculationDetails = ref(false)

// Watch input untuk validasi real-time
watch(diaryText, (newText) => {
  if (newText.trim().length > 0) {
    inputValidation.value = validateInput(newText)
  } else {
    inputValidation.value = null
  }
}, { debounce: 500 })

// Methods
const analyzeMood = async () => {
  if (!diaryText.value.trim()) return
  
  isAnalyzing.value = true
  
  try {
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Analyze mood with enhanced algorithm
    const result = classifyTextWithDetails(diaryText.value)
    
    if (result.error) {
      analysisResult.value = result
    } else {
      const suggestion = getMoodSuggestion(result.mood, result.confidence)
      
      analysisResult.value = {
        ...result,
        suggestion,
        text: diaryText.value
      }
    }
    
  } catch (error) {
    console.error('Error analyzing mood:', error)
    analysisResult.value = {
      error: true,
      message: 'Terjadi kesalahan saat menganalisis mood. Silakan coba lagi.'
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
    bahagia: 'bg-green-100 border-green-200 border',
    sedih: 'bg-purple-100 border-purple-200 border',
    marah: 'bg-red-100 border-red-200 border'
  }
  return classes[mood] || 'bg-gray-100'
}

const getMoodProgressClass = (mood) => {
  const classes = {
    bahagia: 'bg-green-500',
    sedih: 'bg-purple-500',
    marah: 'bg-red-500'
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
