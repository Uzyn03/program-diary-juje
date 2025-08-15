<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <nav class="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">📝</span>
            </div>
            <h1 class="text-xl font-bold text-gray-900">Enhanced Mood Diary</h1>
          </NuxtLink>
          
          <div class="flex items-center space-x-4">
            <NuxtLink 
              to="/" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Beranda
            </NuxtLink>
            <NuxtLink 
              to="/dataset" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dataset
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Tentang
            </NuxtLink>
            <NuxtLink 
              to="/riwayat" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Riwayat
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <NuxtPage />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600">
          <p>&copy; 2025 Enhanced Mood Diary. Analisis mood menggunakan Enhanced Naive Bayes Algorithm.</p>
          <p class="text-sm mt-2">Dengan dataset yang diperluas, validasi input, dan visualisasi perhitungan detail.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
