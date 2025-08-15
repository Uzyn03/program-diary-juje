<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dataset Training</h1>
      <p class="text-gray-600">Lihat dan pahami data yang digunakan untuk melatih algoritma Naive Bayes</p>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="mood-card text-center">
        <div class="text-2xl font-bold text-gray-900">{{ totalSentences }}</div>
        <div class="text-sm text-gray-600">Total Kalimat</div>
      </div>
      <div class="mood-card text-center">
        <div class="text-2xl">😊</div>
        <div class="text-lg font-semibold text-green-600">{{ trainingData.bahagia.length }}</div>
        <div class="text-sm text-gray-600">Bahagia</div>
      </div>
      <div class="mood-card text-center">
        <div class="text-2xl">😢</div>
        <div class="text-lg font-semibold text-purple-600">{{ trainingData.sedih.length }}</div>
        <div class="text-sm text-gray-600">Sedih</div>
      </div>
      <div class="mood-card text-center">
        <div class="text-2xl">😠</div>
        <div class="text-lg font-semibold text-red-600">{{ trainingData.marah.length }}</div>
        <div class="text-sm text-gray-600">Marah</div>
      </div>
    </div>

    <!-- Dataset Display -->
    <div class="space-y-6">
      <div 
        v-for="(sentences, mood) in trainingData" 
        :key="mood"
        class="mood-card"
      >
        <div class="flex items-center space-x-3 mb-4">
          <span class="text-2xl">{{ getMoodEmoji(mood) }}</span>
          <h2 class="text-xl font-semibold text-gray-900">
            Dataset {{ getMoodText(mood) }} ({{ sentences.length }} kalimat)
          </h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div 
            v-for="(sentence, index) in sentences" 
            :key="index"
            class="p-3 rounded-lg border text-sm"
            :class="getMoodBgClass(mood)"
          >
            "{{ sentence }}"
          </div>
        </div>
      </div>
    </div>

    <!-- Vocabulary Analysis -->
    <div class="mood-card mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">📚 Analisis Vocabulary</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-medium text-gray-900 mb-3">Statistik Vocabulary</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Total Unique Words:</span>
              <span class="font-mono">{{ vocabularyStats.totalWords }}</span>
            </div>
            <div class="flex justify-between">
              <span>Rata-rata kata per kalimat:</span>
              <span class="font-mono">{{ vocabularyStats.avgWordsPerSentence.toFixed(1) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Kata terpendek:</span>
              <span class="font-mono">{{ vocabularyStats.shortestWord }}</span>
            </div>
            <div class="flex justify-between">
              <span>Kata terpanjang:</span>
              <span class="font-mono">{{ vocabularyStats.longestWord }}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="font-medium text-gray-900 mb-3">Top 10 Kata Paling Sering</h3>
          <div class="space-y-1 text-sm">
            <div 
              v-for="(word, index) in vocabularyStats.topWords.slice(0, 10)" 
              :key="word.word"
              class="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span class="flex items-center space-x-2">
                <span class="text-xs text-gray-500 w-4">{{ index + 1 }}.</span>
                <span class="font-mono">{{ word.word }}</span>
              </span>
              <span class="text-xs text-gray-600">{{ word.count }}x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNaiveBayes } from '~/composables/useNaiveBayes'

// SEO
useHead({
  title: 'Dataset Training - Enhanced Mood Diary',
  meta: [
    { name: 'description', content: 'Lihat dataset training yang digunakan untuk algoritma Naive Bayes' }
  ]
})

// Composables
const { trainingData, preprocessText } = useNaiveBayes()

// Computed
const totalSentences = computed(() => {
  return Object.values(trainingData).reduce((total, sentences) => total + sentences.length, 0)
})

const vocabularyStats = computed(() => {
  const allWords = []
  const wordCounts = {}
  let totalTokens = 0
  
  Object.values(trainingData).forEach(sentences => {
    sentences.forEach(sentence => {
      const tokens = preprocessText(sentence)
      totalTokens += tokens.length
      tokens.forEach(token => {
        allWords.push(token)
        wordCounts[token] = (wordCounts[token] || 0) + 1
      })
    })
  })
  
  const uniqueWords = [...new Set(allWords)]
  const sortedWords = Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
  
  const wordLengths = uniqueWords.map(word => word.length)
  const shortestWord = uniqueWords.reduce((a, b) => a.length <= b.length ? a : b, uniqueWords[0])
  const longestWord = uniqueWords.reduce((a, b) => a.length >= b.length ? a : b, uniqueWords[0])
  
  return {
    totalWords: uniqueWords.length,
    avgWordsPerSentence: totalTokens / totalSentences.value,
    shortestWord,
    longestWord,
    topWords: sortedWords
  }
})

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
    bahagia: 'bg-green-50 border-green-200',
    sedih: 'bg-purple-50 border-purple-200',
    marah: 'bg-red-50 border-red-200'
  }
  return classes[mood] || 'bg-gray-50'
}
</script>
