import { fallbackAnswers, fallbackNotFound } from "@/content/ask";

/*
  Sawaal se pehle se likha jawab dhoondhna.

  Ye tab chalta hai jab API kaam na kare — key na ho, OpenAI down ho,
  ya limit lag jaye. Reader ko tab bhi ek asli jawab milta hai.

  Matching jaan-boojh ke bewakoof hai: lowercase karo, keyword dhoondho,
  pehla match lelo. Isme koi NLP nahi hai aur honi bhi nahi chahiye —
  ye raasta kabhi-kabhi chalta hai, aur jab chalta hai to bina fail hona chahiye.
*/
export function findFallbackAnswer(question: string) {
  const lowerCaseQuestion = question.toLowerCase();

  for (const entry of fallbackAnswers) {
    for (const keyword of entry.keywords) {
      if (lowerCaseQuestion.includes(keyword)) {
        return entry.answer;
      }
    }
  }

  // Kuch bhi match na hua. Jhooth bolne se behtar hai saaf keh dena —
  // ZUNO ka asli rule bhi yahi hai.
  return fallbackNotFound;
}
