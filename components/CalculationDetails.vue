<template>
  <div class="space-y-6">
    <!-- Overview -->
    <div class="bg-blue-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">📋 Ringkasan Perhitungan</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span class="font-medium">Total Kata Dianalisis:</span>
          <span class="ml-2">{{ analysisResult.tokens.length }}</span>
        </div>
        <div>
          <span class="font-medium">Ukuran Vocabulary:</span>
          <span class="ml-2">{{ analysisResult.model.vocabularySize }}</span>
        </div>
        <div>
          <span class="font-medium">Total Dokumen Training:</span>
          <span class="ml-2">{{ analysisResult.model.totalDocuments }}</span>
        </div>
      </div>
    </div>

    <!-- Prior Probabilities -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">📊 Prior Probabilities (P(Class))</h3>
      <div class="space-y-2">
        <div 
          v-for="(prior, className) in analysisResult.model.classPriors" 
          :key="className"
          class="flex justify-between items-center p-2 bg-white rounded"
        >
          <span class="flex items-center space-x-2">
            <span class="text-lg">{{ getMoodEmoji(className) }}</span>
            <span class="font-medium">P({{ getMoodText(className) }})</span>
          </span>
          <div class="text-right">
            <div class="font-mono text-sm">
              {{ analysisResult.model.classDocCounts[className] }} / {{ analysisResult.model.totalDocuments }} = {{ prior.toFixed(4) }}
            </div>
            <div class="text-xs text-gray-600">
              Log: {{ Math.log(prior).toFixed(4) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Token Analysis -->
    <div class="bg-green-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold text-green-900 mb-4">🔤 Analisis Per Kata (Likelihood)</h3>
      
      <div class="space-y-4">
        <div 
          v-for="(calc, className) in analysisResult.calculations" 
          :key="className"
          class="bg-white p-4 rounded-lg border"
        >
          <h4 class="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <span class="text-lg">{{ getMoodEmoji(className) }}</span>
            <span>Kelas: {{ getMoodText(className) }}</span>
          </h4>
          
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-100">
                  <th class="text-left p-2">Kata</th>
                  <th class="text-right p-2">Count</th>
                  <th class="text-right p-2">P(word|class)</th>
                  <th class="text-right p-2">Log P(word|class)</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="token in calc.tokens" 
                  :key="token.token"
                  class="border-t"
                >
                  <td class="p-2 font-mono">{{ token.token }}</td>
                  <td class="p-2 text-right">{{ token.count }}</td>
                  <td class="p-2 text-right font-mono">{{ token.probability.toFixed(6) }}</td>
                  <td class="p-2 text-right font-mono">{{ token.logProbability.toFixed(4) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-3 p-2 bg-gray-50 rounded">
            <div class="text-sm">
              <strong>Total Log Probability:</strong>
              <span class="font-mono ml-2">{{ calc.totalLogProbability.toFixed(4) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Final Calculation -->
    <div class="bg-yellow-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold text-yellow-900 mb-4">🎯 Perhitungan Final</h3>
      
      <div class="space-y-3">
        <div class="text-sm text-gray-700 mb-4">
          <p><strong>Formula Naive Bayes:</strong></p>
          <p class="font-mono bg-white p-2 rounded mt-1">
            P(class|text) ∝ P(class) × ∏P(word|class)
          </p>
          <p class="mt-2">Dalam log space: log P(class|text) = log P(class) + Σlog P(word|class)</p>
        </div>
        
        <div 
          v-for="(score, className) in analysisResult.rawScores" 
          :key="className"
          class="flex justify-between items-center p-3 bg-white rounded border"
        >
          <span class="flex items-center space-x-2">
            <span class="text-lg">{{ getMoodEmoji(className) }}</span>
            <span class="font-medium">{{ getMoodText(className) }}</span>
          </span>
          <div class="text-right">
            <div class="font-mono text-sm">
              Raw Score: {{ score.toFixed(4) }}
            </div>
            <div class="font-mono text-sm text-green-600">
              Normalized: {{ (analysisResult.probabilities[className] * 100).toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualization -->
    <div class="bg-purple-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold text-purple-900 mb-4">📈 Visualisasi Hasil</h3>
      
      <div class="space-y-4">
        <div 
          v-for="(prob, className) in analysisResult.probabilities" 
          :key="className"
          class="space-y-2"
        >
          <div class="flex justify-between items-center">
            <span class="flex items-center space-x-2">
              <span class="text-lg">{{ getMoodEmoji(className) }}</span>
              <span class="font-medium">{{ getMoodText(className) }}</span>
            </span>
            <span class="font-mono text-sm">{{ (prob * 100).toFixed(2) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div 
              class="h-4 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
              :class="getMoodProgressClass(className)"
              :style="{ width: (prob * 100) + '%' }"
            >
              <span v-if="prob > 0.1" class="text-white text-xs font-bold">
                {{ (prob * 100).toFixed(0) }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Training Data Info -->
    <div class="bg-indigo-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold text-indigo-900 mb-4">📚 Informasi Dataset Training</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          v-for="(count, className) in analysisResult.model.classDocCounts" 
          :key="className"
          class="bg-white p-3 rounded border text-center"
        >
          <div class="text-2xl mb-1">{{ getMoodEmoji(className) }}</div>
          <div class="font-semibold">{{ getMoodText(className) }}</div>
          <div class="text-sm text-gray-600">{{ count }} kalimat training</div>
          <div class="text-xs text-gray-500">
            {{ analysisResult.model.classTotalCounts[className] }} total kata
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  analysisResult: {
    type: Object,
    required: true
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

const getMoodProgressClass = (mood) => {
  const classes = {
    bahagia: 'bg-green-500',
    sedih: 'bg-purple-500',
    marah: 'bg-red-500'
  }
  return classes[mood] || 'bg-gray-500'
}
</script>
