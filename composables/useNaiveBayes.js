export const useNaiveBayes = () => {
  // Training data yang lebih seimbang dan representatif
  const trainingData = {
    bahagia: [
      "senang sekali hari ini",
      "bahagia banget",
      "suka dengan kegiatan ini",
      "gembira rasanya",
      "tertawa lepas",
      "excited banget",
      "amazing day",
      "wonderful moment",
      "love this",
      "fantastic experience",
      "great time",
      "so happy",
      "luar biasa hari ini",
      "sempurna banget",
      "indah sekali",
      "menyenangkan",
      "menggembirakan",
      "fantastis",
      "hebat",
      "menakjubkan",
      "beruntung",
      "syukur",
      "puas",
      "bangga",
      "optimis",
      "ceria",
      "antusias",
      "semangat",
      "energik",
      "positif",
      "cerah",
      "fresh",
      "rileks",
      "tenang",
      "damai",
      "sukses",
      "berhasil",
      "menang",
      "prestasi",
      "keren abis",
      "mantap jiwa",
      "asik poll",
      "seru abis",
      "happy banget",
      "seneng poll",
      "mantul",
      "jos gandos",
      "terbaik",
      "juara banget",
      "dahsyat",
      "mengagumkan",
      "memukau",
      "menghibur",
      "menyegarkan",
      "memuaskan",
      "lega rasanya",
      "nikmat sekali",
      "enak banget",
      "adem ayem",
      "berkah",
      "untung besar",
      "victory",
      "celebration",
      "fun",
      "enjoy",
      "smile",
      "laugh",
      "bright",
      "beautiful",
      "excellent",
      "outstanding",
      "brilliant",
      "superb",
      "incredible",
      "extraordinary",
      "spectacular",
      "inspiring",
      "uplifting",
      "hopeful",
      "confident",
      "comfortable",
      "peaceful",
      "blissful",
      "content",
      "satisfied",
      "fulfilled",
    ],

    sedih: [
      "sedih sekali",
      "kecewa dengan hasil",
      "menangis terus",
      "galau banget",
      "down banget mood",
      "patah hati",
      "lonely feeling",
      "feeling blue",
      "heartbroken",
      "disappointed",
      "sorrowful",
      "gloomy",
      "upset",
      "frustrated",
      "hopeless",
      "miserable",
      "devastated",
      "kesepian",
      "sepi",
      "hancur hati",
      "terpuruk",
      "lemah",
      "lelah jiwa",
      "capek mental",
      "putus asa",
      "menyerah total",
      "gagal lagi",
      "kalah terus",
      "kehilangan harapan",
      "ditinggal pergi",
      "diabaikan semua",
      "dilupakan orang",
      "sendirian terus",
      "terisolasi",
      "terbuang",
      "kosong hati",
      "hampa jiwa",
      "baper banget",
      "galau tingkat tinggi",
      "sedih poll",
      "nangis bombay",
      "drop banget",
      "bad mood parah",
      "suram banget",
      "murung terus",
      "merana",
      "duka mendalam",
      "derita batin",
      "menderita sekali",
      "terluka dalam",
      "sakit hati",
      "perih rasanya",
      "pilu banget",
      "miris sekali",
      "terpukul berat",
      "terhantam keras",
      "terbebani berat",
      "tertekan jiwa",
      "void inside",
      "empty heart",
      "hollow feeling",
      "numb completely",
      "lifeless",
      "boring life",
      "jenuh hidup",
      "stuck nowhere",
      "lost direction",
      "confused life",
      "hopeless future",
      "meaningless day",
      "broken inside",
      "hurt deeply",
      "pain inside",
      "weak soul",
      "fragile heart",
      "helpless feeling",
      "useless person",
      "worthless life",
    ],

    marah: [
      "kesal banget",
      "marah besar",
      "geram sekali",
      "annoying banget",
      "stress level tinggi",
      "emosi naik",
      "furious feeling",
      "irritated so much",
      "pissed off",
      "outraged",
      "fuming mad",
      "livid anger",
      "enraged completely",
      "heated argument",
      "aggravated mood",
      "indignant feeling",
      "pusing banget",
      "pusing berat",
      "sakit kepala",
      "mumet parah",
      "pening terus",
      "marah besar sekali",
      "kesal besar",
      "dongkol banget",
      "sewot parah",
      "jengkel tinggi",
      "gondok berat",
      "berang sekali",
      "murka besar",
      "gusar banget",
      "sebel parah",
      "bete banget",
      "badmood parah",
      "emosi memuncak",
      "naik pitam",
      "naik darah",
      "kesel abis",
      "sebel tingkat tinggi",
      "bete parah banget",
      "dongkol berat",
      "jengkel poll",
      "gregetan banget",
      "pengen ngamuk",
      "mau marah besar",
      "siap meledak",
      "hampir explode",
      "udah limit",
      "overwhelmed banget",
      "frustrasi berat",
      "kecewa marah",
      "upset parah",
      "disturbed banget",
      "bothered sekali",
      "agitated mood",
      "restless banget",
      "tense sekali",
      "pressured tinggi",
      "benci banget",
      "muak sekali",
      "jijik parah",
      "anti banget",
      "ogah total",
      "males banget",
      "explosive mood",
      "boiling mad",
      "burning anger",
      "hot temper",
      "rage mode",
      "fury unleashed",
      "wrath activated",
      "angry explosion",
      "mad completely",
      "crazy mad",
      "wild anger",
      "brutal mood",
      "violent feeling",
      "aggressive mode",
      "hostile attitude",
      "cruel mood",
    ],
  };

  // Stopwords yang lebih fokus
  const stopwords = new Set([
    "yang",
    "dan",
    "di",
    "ke",
    "dari",
    "untuk",
    "pada",
    "dengan",
    "dalam",
    "oleh",
    "adalah",
    "akan",
    "telah",
    "sudah",
    "ada",
    "tidak",
    "atau",
    "juga",
    "dapat",
    "seperti",
    "karena",
    "jika",
    "saya",
    "aku",
    "kamu",
    "dia",
    "kita",
    "mereka",
    "ini",
    "itu",
    "nya",
    "mu",
    "ku",
    "lah",
    "kah",
    "pun",
    "hari",
    "waktu",
    "the",
    "is",
    "at",
    "which",
    "on",
    "and",
    "a",
    "to",
    "as",
    "are",
    "was",
    "were",
    "been",
    "be",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "should",
    "could",
    "can",
    "may",
    "might",
    "must",
    "of",
    "in",
    "for",
    "with",
    "by",
    "about",
    "into",
    "through",
    "before",
    "after",
    "above",
    "below",
    "up",
    "down",
    "out",
    "off",
    "over",
    "under",
    "again",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "just",
    "now",
  ]);

  // Validasi input yang lebih ketat
  const validateInput = (text) => {
    if (!text || typeof text !== "string") {
      return { isValid: false, reason: "Input harus berupa teks yang valid" };
    }

    const cleanText = text.trim();
    if (cleanText.length < 2) {
      return {
        isValid: false,
        reason: "Teks terlalu pendek (minimal 2 karakter)",
      };
    }

    if (cleanText.length > 1000) {
      return {
        isValid: false,
        reason: "Teks terlalu panjang (maksimal 1000 karakter)",
      };
    }

    // Cek apakah hanya berisi karakter khusus atau angka
    const hasLetters = /[a-zA-Z\u0080-\uFFFF]/.test(cleanText);
    if (!hasLetters) {
      return { isValid: false, reason: "Teks harus mengandung huruf" };
    }

    return { isValid: true };
  };

  // Preprocessing yang lebih baik
  const preprocessText = (text) => {
    if (!text) return [];

    let processed = text.toLowerCase().trim();

    // Hapus karakter khusus tapi pertahankan spasi
    processed = processed.replace(/[^\w\s\u0080-\uFFFF]/g, " ");

    // Split dan filter
    let tokens = processed
      .split(/\s+/)
      .filter((token) => token.length > 0)
      .filter((token) => !stopwords.has(token))
      .filter((token) => token.length >= 2); // Minimal 2 karakter

    return tokens;
  };

  // Build model dengan smoothing yang tepat
  const buildModelWithDetails = () => {
    const vocabulary = new Set();
    const classWordCounts = {};
    const classTotalWords = {};
    const classPriors = {};

    let totalDocuments = 0;

    // Hitung total dokumen
    Object.keys(trainingData).forEach((className) => {
      totalDocuments += trainingData[className].length;
    });

    // Process setiap class
    Object.keys(trainingData).forEach((className) => {
      classWordCounts[className] = {};
      classTotalWords[className] = 0;

      // Prior probability
      classPriors[className] = trainingData[className].length / totalDocuments;

      // Process setiap dokumen dalam class
      trainingData[className].forEach((text) => {
        const tokens = preprocessText(text);

        tokens.forEach((token) => {
          vocabulary.add(token);
          classWordCounts[className][token] =
            (classWordCounts[className][token] || 0) + 1;
          classTotalWords[className]++;
        });
      });
    });

    return {
      vocabulary: Array.from(vocabulary),
      classWordCounts,
      classTotalWords,
      classPriors,
      vocabularySize: vocabulary.size,
    };
  };

  // Klasifikasi dengan perhitungan yang benar
  const classifyTextWithDetails = (text) => {
    const validation = validateInput(text);
    if (!validation.isValid) {
      return {
        error: true,
        message: validation.reason,
        mood: null,
        confidence: 0,
      };
    }

    const model = buildModelWithDetails();
    const tokens = preprocessText(text);

    if (tokens.length === 0) {
      return {
        error: true,
        message: "Tidak ada kata yang dapat dianalisis setelah preprocessing",
        mood: null,
        confidence: 0,
      };
    }

    const scores = {};
    const details = {};

    // Hitung score untuk setiap class
    Object.keys(trainingData).forEach((className) => {
      let logScore = Math.log(model.classPriors[className]);
      const tokenDetails = [];

      tokens.forEach((token) => {
        const wordCount = model.classWordCounts[className][token] || 0;
        // Laplace smoothing dengan alpha = 1
        const probability =
          (wordCount + 1) /
          (model.classTotalWords[className] + model.vocabularySize);
        const logProb = Math.log(probability);

        logScore += logProb;

        tokenDetails.push({
          word: token,
          count: wordCount,
          probability: probability,
          logProbability: logProb,
        });
      });

      scores[className] = logScore;
      details[className] = {
        prior: model.classPriors[className],
        logPrior: Math.log(model.classPriors[className]),
        tokens: tokenDetails,
        finalScore: logScore,
      };
    });

    // Konversi ke probabilitas normal (softmax)
    const maxScore = Math.max(...Object.values(scores));
    const expScores = {};

    Object.keys(scores).forEach((className) => {
      expScores[className] = Math.exp(scores[className] - maxScore);
    });

    const sumExp = Object.values(expScores).reduce((sum, val) => sum + val, 0);
    const probabilities = {};

    Object.keys(expScores).forEach((className) => {
      probabilities[className] = expScores[className] / sumExp;
    });

    // Prediksi class dengan score tertinggi
    const predictedClass = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    const confidence = Math.round(probabilities[predictedClass] * 100);

    return {
      error: false,
      mood: predictedClass,
      confidence: confidence,
      probabilities: probabilities,
      model: model,
      details: details,
      tokens: tokens,
      rawScores: scores,
    };
  };

  // Saran mood yang lebih personal
  const getMoodSuggestion = (mood, confidence) => {
    const suggestions = {
      bahagia: [
        "Terus pertahankan mood positif ini! 😊",
        "Bagikan kebahagiaan ini dengan orang lain!",
        "Syukuri kebahagiaan yang kamu rasakan hari ini!",
        "Jadikan hari ini sebagai motivasi untuk hari-hari berikutnya!",
        "Semoga kebahagiaan ini terus berlanjut!",
      ],
      sedih: [
        "Tidak apa-apa merasa sedih, ini bagian dari hidup 💙",
        "Cobalah berbicara dengan teman atau keluarga terdekat",
        "Lakukan aktivitas yang biasanya membuatmu senang",
        "Ingat bahwa perasaan ini akan berlalu",
        "Luangkan waktu untuk merawat diri sendiri",
      ],
      marah: [
        "Tarik napas dalam-dalam dan tenangkan diri 🧘‍♀️",
        "Cobalah untuk memahami akar dari kemarahan ini",
        "Mungkin perlu waktu untuk merenung sejenak",
        "Olahraga ringan bisa membantu melepaskan emosi negatif",
        "Bicarakan masalahmu dengan orang yang dipercaya",
      ],
    };

    const moodSuggestions = suggestions[mood] || [
      "Tetap jaga kesehatan mental dan emosionalmu!",
    ];
    return moodSuggestions[Math.floor(Math.random() * moodSuggestions.length)];
  };

  // Fungsi untuk debugging
  const debugClassification = (text) => {
    const result = classifyTextWithDetails(text);
    console.log("=== DEBUG CLASSIFICATION ===");
    console.log("Input:", text);
    console.log("Tokens:", result.tokens);
    console.log("Raw Scores:", result.rawScores);
    console.log("Probabilities:", result.probabilities);
    console.log("Predicted:", result.mood);
    console.log("Confidence:", result.confidence);
    return result;
  };

  return {
    classifyTextWithDetails,
    getMoodSuggestion,
    preprocessText,
    validateInput,
    buildModelWithDetails,
    trainingData,
    debugClassification,
  };
};
