export const useNaiveBayes = () => {
  // Training data sederhana untuk mood classification
  const trainingData = {
    bahagia: [
      "senang sekali hari ini",
      "bahagia banget",
      "suka dengan kegiatan ini",
      "gembira rasanya",
      "lucu banget",
      "tertawa lepas",
      "excited banget",
      "amazing day",
      "wonderful moment",
      "love this",
      "fantastic experience",
      "great time",
      "so happy",
      "cheerful",
      "delighted",
      "joyful",
      "pleased",
      "grateful",
      "blessed",
      "awesome",
    ],
    sedih: [
      "sedih sekali",
      "kecewa dengan hasil",
      "menangis terus",
      "galau banget",
      "down banget mood",
      "patah hati",
      "lonely feeling",
      "depression hits",
      "feeling blue",
      "heartbroken",
      "disappointed",
      "melancholy",
      "sorrowful",
      "gloomy",
      "upset",
      "frustrated",
      "hopeless",
      "miserable",
      "distressed",
      "devastated",
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
      "angry mode on",
      "pissed off",
      "outraged",
      "fuming",
      "livid",
      "enraged",
      "irate",
      "incensed",
      "heated",
      "aggravated",
      "exasperated",
      "indignant",
    ],
  };

  // Stopwords bahasa Indonesia dan Inggris
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
    "shall",
    "of",
    "in",
    "for",
    "with",
    "by",
    "about",
    "into",
    "through",
    "during",
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
    "further",
    "then",
    "once",
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
    "s",
    "t",
    "just",
    "now",
  ]);

  // Preprocessing text
  const preprocessText = (text) => {
    // Case folding
    let processed = text.toLowerCase();

    // Remove punctuation and special characters
    processed = processed.replace(/[^\w\s]/g, " ");

    // Tokenization
    let tokens = processed.split(/\s+/).filter((token) => token.length > 0);

    // Remove stopwords
    tokens = tokens.filter((token) => !stopwords.has(token));

    return tokens;
  };

  // Build vocabulary and calculate probabilities
  const buildModel = () => {
    const vocabulary = new Set();
    const classWordCounts = {};
    const classTotalCounts = {};
    const classPriors = {};

    let totalDocuments = 0;

    // Process training data
    Object.keys(trainingData).forEach((className) => {
      classWordCounts[className] = {};
      classTotalCounts[className] = 0;

      trainingData[className].forEach((text) => {
        const tokens = preprocessText(text);
        totalDocuments++;

        tokens.forEach((token) => {
          vocabulary.add(token);
          classWordCounts[className][token] =
            (classWordCounts[className][token] || 0) + 1;
          classTotalCounts[className]++;
        });
      });

      // Calculate class priors
      classPriors[className] = trainingData[className].length / totalDocuments;
    });

    return {
      vocabulary: Array.from(vocabulary),
      classWordCounts,
      classTotalCounts,
      classPriors,
      vocabularySize: vocabulary.size,
    };
  };

  // Classify text using Naive Bayes
  const classifyText = (text) => {
    const model = buildModel();
    const tokens = preprocessText(text);
    const scores = {};

    Object.keys(trainingData).forEach((className) => {
      // Start with class prior (log probability)
      let logProbability = Math.log(model.classPriors[className]);

      tokens.forEach((token) => {
        // Laplace smoothing
        const tokenCount = model.classWordCounts[className][token] || 0;
        const probability =
          (tokenCount + 1) /
          (model.classTotalCounts[className] + model.vocabularySize);
        logProbability += Math.log(probability);
      });

      scores[className] = logProbability;
    });

    // Find class with highest probability
    const predictedClass = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    // Convert log probabilities to normalized probabilities
    const maxScore = Math.max(...Object.values(scores));
    const expScores = {};
    Object.keys(scores).forEach((className) => {
      expScores[className] = Math.exp(scores[className] - maxScore);
    });

    const sumExpScores = Object.values(expScores).reduce(
      (sum, score) => sum + score,
      0
    );
    const normalizedScores = {};
    Object.keys(expScores).forEach((className) => {
      normalizedScores[className] = expScores[className] / sumExpScores;
    });

    const confidence = normalizedScores[predictedClass];

    return {
      mood: predictedClass,
      confidence: Math.round(confidence * 100),
      probabilities: normalizedScores,
    };
  };

  // Get mood suggestion
  const getMoodSuggestion = (mood, confidence) => {
    const suggestions = {
      bahagia: [
        "Terus pertahankan mood positif ini! 😊",
        "Bagikan kebahagiaan ini dengan orang lain!",
        "Moment bahagia ini layak untuk diingat selamanya!",
        "Syukuri kebahagiaan yang kamu rasakan hari ini!",
      ],
      sedih: [
        "Tidak apa-apa merasa sedih, ini adalah bagian dari hidup 💙",
        "Cobalah berbicara dengan teman atau keluarga",
        "Lakukan aktivitas yang biasanya membuatmu senang",
        "Ingat bahwa perasaan ini akan berlalu",
      ],
      marah: [
        "Tarik napas dalam-dalam dan tenangkan diri 🧘‍♀️",
        "Cobalah untuk memahami akar dari kemarahan ini",
        "Ekspresikan perasaanmu dengan cara yang sehat",
        "Mungkin perlu waktu untuk merenung sejenak",
      ],
    };

    const moodSuggestions = suggestions[mood] || [];
    return moodSuggestions[Math.floor(Math.random() * moodSuggestions.length)];
  };

  return {
    classifyText,
    getMoodSuggestion,
    preprocessText,
  };
};
