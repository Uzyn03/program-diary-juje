import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
} from "firebase/firestore";

export const useFirestore = () => {
  const { $db } = useNuxtApp();

  // Save mood analysis result to Firestore
  const saveMoodAnalysis = async (data) => {
    try {
      const docRef = await addDoc(collection($db, "mood_history"), {
        text: data.text,
        mood: data.mood,
        confidence: data.confidence,
        timestamp: serverTimestamp(),
        suggestions: data.suggestions || null,
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error saving mood analysis:", error);
      return { success: false, error: error.message };
    }
  };

  // Get mood history from Firestore
  const getMoodHistory = () => {
    return new Promise((resolve, reject) => {
      const q = query(
        collection($db, "mood_history"),
        orderBy("timestamp", "desc"),
        limit(50)
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const history = [];
          querySnapshot.forEach((doc) => {
            history.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          resolve({ data: history, unsubscribe });
        },
        (error) => {
          console.error("Error getting mood history:", error);
          reject(error);
        }
      );
    });
  };

  return {
    saveMoodAnalysis,
    getMoodHistory,
  };
};
