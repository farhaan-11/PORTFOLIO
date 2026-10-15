import { askPanel } from "@/content/ask";
import { findFallbackAnswer } from "@/lib/ask-fallback";
import { buildKnowledge, systemPrompt } from "@/lib/ask-knowledge";
import {
  countLiveAnswer,
  isVisitorWithinLimit,
  isWithinDailyBudget,
  readCachedAnswer,
  readVisitorId,
  writeCachedAnswer,
} from "@/lib/ask-limits";




const SOURCE_HEADER = "x-ask-source";


const MODEL = process.env.ASK_MODEL ?? "gpt-4o-mini";


const MAX_ANSWER_TOKENS = 400;


const REQUEST_TIMEOUT_MS = 60 * 1000;

function textResponse(body: string, source: "live" | "cached" | "fallback") {
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      [SOURCE_HEADER]: source,
      
      "cache-control": "no-store",
    },
  });
}


type StreamFrame = {
  choices?: { delta?: { content?: string } }[];
};

export async function POST(request: Request) {
  let question = "";

  try {
    const body = (await request.json()) as { question?: unknown };
    if (typeof body.question === "string") {
      question = body.question.trim();
    }
  } catch {
    
  }

  if (question.length === 0) {
    return textResponse("Ask a question first.", "fallback");
  }

  
  if (question.length > askPanel.maxQuestionLength) {
    question = question.slice(0, askPanel.maxQuestionLength);
  }


  const cachedAnswer = readCachedAnswer(question);
  if (cachedAnswer) {
    return textResponse(cachedAnswer, "cached");
  }


  if (!isVisitorWithinLimit(readVisitorId(request))) {
    return textResponse(findFallbackAnswer(question), "fallback");
  }


  if (!isWithinDailyBudget()) {
    return textResponse(findFallbackAnswer(question), "fallback");
  }

 
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return textResponse(findFallbackAnswer(question), "fallback");
  }


  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  request.signal.addEventListener("abort", () => controller.abort());

  let upstream: Response;

  try {
    upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.2,
        max_completion_tokens: MAX_ANSWER_TOKENS,
        messages: [
          {
            role: "system",
            content: `${systemPrompt}\n\n# Context\n\n${buildKnowledge()}`,
          },
          { role: "user", content: question },
        ],
      }),
      signal: controller.signal,
    });
  } catch {
   
    clearTimeout(timeoutId);
    return textResponse(findFallbackAnswer(question), "fallback");
  }

  if (!upstream.ok || !upstream.body) {

    clearTimeout(timeoutId);
    return textResponse(findFallbackAnswer(question), "fallback");
  }

  countLiveAnswer();

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(streamController) {
      const reader = upstream.body!.getReader();

      // Poora jawab jama karte jao, taaki aakhir mein cache mein daal sakein.
      let completeAnswer = "";
      // Adhoori line jo abhi aayi hai. Agli chunk ke saath joad kar padhenge.
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer = buffer + decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          // Aakhri tukda adhoora ho sakta hai — usey wapas buffer mein rakho.
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;

            const payload = line.slice("data: ".length).trim();
            if (payload === "[DONE]") continue;

            // Har frame ka apna try/catch. ZUNO mein ek kharab frame
            // poora stream maar deta tha — ek frame chhod dena theek hai,
            // poora jawab gira dena nahi.
            try {
              const frame = JSON.parse(payload) as StreamFrame;
              const piece = frame.choices?.[0]?.delta?.content;

              if (piece) {
                completeAnswer = completeAnswer + piece;
                streamController.enqueue(encoder.encode(piece));
              }
            } catch {
              // Adhoora ya anjaan frame. Agle pe badho.
            }
          }
        }

        // Pehla poora jawab cache mein — agla visitor wahi sawaal poochhe
        // to usey muft aur turant milega.
        if (completeAnswer.length > 0) {
          writeCachedAnswer(question, completeAnswer);
        }
      } catch {
        /*
          Stream beech mein toot gaya. Yahan tak reader ne aadha jawab
          padh liya hai, isliye ab pehle se likha jawab chipkana galat hoga —
          do adhoore jawab ek saath sabse bura nateeja hai.

          Isliye ek saaf line jodi jaati hai, aur adhoora jawab cache
          mein nahi jata.
        */
        streamController.enqueue(
          encoder.encode(
            " … that answer was cut off. Ask again, or email farhanraza2239@gmail.com.",
          ),
        );
      } finally {
        clearTimeout(timeoutId);
        reader.releaseLock();
        streamController.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      [SOURCE_HEADER]: "live",
      "cache-control": "no-store",
    },
  });
}
