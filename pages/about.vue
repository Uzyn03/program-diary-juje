<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Tentang Mood Diary Analysis
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Aplikasi analisis mood menggunakan algoritma Naive Bayes untuk membantu memahami emosi dari teks diary Anda
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <!-- Apa itu Mood Diary Analysis -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">Apa itu Aplikasi Ini?</h2>
          </div>
          <p class="text-gray-600 leading-relaxed mb-4">
            Mood Diary Analysis adalah aplikasi web yang menggunakan teknologi Machine Learning dengan algoritma Naive Bayes untuk menganalisis mood atau suasana hati dari teks yang Anda tulis.
          </p>
          <p class="text-gray-600 leading-relaxed">
            Aplikasi ini dapat mengidentifikasi tiga kategori mood utama: <span class="font-semibold text-green-600">Bahagia</span>, <span class="font-semibold text-blue-600">Sedih</span>, dan <span class="font-semibold text-red-600">Marah</span> berdasarkan kata-kata yang Anda gunakan.
          </p>
        </div>

        <!-- Bagaimana Cara Kerja -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">Bagaimana Cara Kerja?</h2>
          </div>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">1</div>
              <p class="text-gray-600">Anda mengetik teks diary atau perasaan Anda</p>
            </div>
            <div class="flex items-start">
              <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">2</div>
              <p class="text-gray-600">Sistem memproses teks dan menganalisis kata-kata kunci</p>
            </div>
            <div class="flex items-start">
              <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">3</div>
              <p class="text-gray-600">Algoritma Naive Bayes menghitung probabilitas setiap mood</p>
            </div>
            <div class="flex items-start">
              <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">4</div>
              <p class="text-gray-600">Hasil analisis ditampilkan dengan tingkat kepercayaan</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Algoritma Naive Bayes -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">Tentang Algoritma Naive Bayes</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Apa itu Naive Bayes?</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Naive Bayes adalah algoritma machine learning yang berdasarkan teorema Bayes. Algoritma ini "naive" karena mengasumsikan bahwa setiap kata dalam teks bersifat independen satu sama lain.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Meskipun asumsi ini tidak selalu benar dalam bahasa natural, Naive Bayes tetap sangat efektif untuk klasifikasi teks dan analisis sentimen.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Keunggulan Algoritma</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Cepat dan efisien
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Mudah diimplementasi
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Bekerja baik dengan data kecil
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Memberikan probabilitas hasil
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Fitur Aplikasi -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Fitur-Fitur Aplikasi</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Analisis Real-time</h3>
            <p class="text-gray-600 text-sm">Analisis mood langsung saat Anda mengetik</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Visualisasi Detail</h3>
            <p class="text-gray-600 text-sm">Lihat proses perhitungan dengan diagram</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13m0-13C10.832 18.477 9.246 18 7.5 18s4.168-.477 3-1.253m0 13C13.168 18.477 14.754 18 16.5 18c1.746 0 3.332-.477 4.5-1.253v-13C19.832 5.477 18.246 5 16.5 5c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Dataset Lengkap</h3>
            <p class="text-gray-600 text-sm">Lihat data training dan statistik vocabulary</p>
          </div>
        </div>
      </div>

      <!-- Cara Penggunaan -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Cara Penggunaan</h2>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">1</div>
            <div>
              <h3 class="font-semibold text-gray-700 mb-1">Tulis Diary Anda</h3>
              <p class="text-gray-600">Ketik perasaan atau pengalaman Anda di halaman utama. Gunakan bahasa yang natural dan ekspresif.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">2</div>
            <div>
              <h3 class="font-semibold text-gray-700 mb-1">Lihat Hasil Analisis</h3>
              <p class="text-gray-600">Sistem akan menampilkan mood yang terdeteksi beserta tingkat kepercayaannya dalam bentuk persentase.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">3</div>
            <div>
              <h3 class="font-semibold text-gray-700 mb-1">Eksplorasi Detail</h3>
              <p class="text-gray-600">Klik "Lihat Detail Perhitungan" untuk memahami bagaimana algoritma bekerja dan mengapa menghasilkan prediksi tersebut.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">4</div>
            <div>
              <h3 class="font-semibold text-gray-700 mb-1">Pelajari Dataset</h3>
              <p class="text-gray-600">Kunjungi halaman Dataset untuk melihat kata-kata yang digunakan dalam training dan statistik vocabulary.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="text-center mt-12">
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Mulai Analisis
          </NuxtLink>
          <NuxtLink to="/dataset" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Lihat Dataset
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
