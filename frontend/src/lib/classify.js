// Client for the Python inference API.
//
// Expected backend contract (see backend/app.py for a minimal Flask
// implementation you can adapt to your existing project):
//
//   POST /api/classify
//   Content-Type: multipart/form-data
//   field "image": the uploaded file
//
//   200 response body:
//   {
//     "label": "dog" | "cat",
//     "confidence": 0.9995,          // 0..1
//     "description": "Golden retrievers are..."
//   }

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Set to true to develop the UI without a running backend.
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

function mockClassify(file) {
  const isDog = file.name.toLowerCase().includes("dog") || Math.random() > 0.5;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        label: isDog ? "dog" : "cat",
        confidence: isDog ? 0.9995 : 0.9823,
        description: isDog
          ? "This looks like a friendly, medium-to-large dog with a short coat. Dogs are highly social, trainable mammals that have lived alongside humans for thousands of years, valued for companionship, work, and their keen sense of smell."
          : "This appears to be a domestic cat with a calm, alert posture. Cats are independent, agile carnivores known for their sharp senses, retractable claws, and a wide range of vocal and body-language cues used to communicate.",
      });
    }, 1400);
  });
}

/**
 * Sends an image file to the classification API and returns the parsed result.
 * @param {File} file
 * @returns {Promise<{label: string, confidence: number, description: string}>}
 */
export async function classifyImage(file) {
  if (USE_MOCK) {
    return mockClassify(file);
  }

  const formData = new FormData();
  formData.append("image", file);

  let response;
  try {
    response = await fetch(`${API_BASE}/api/classify`, {
      method: "POST",
      body: formData,
    });
  } catch (err) {
    throw new Error(
      "Could not reach the classification API. Is the Python backend running?"
    );
  }

  if (!response.ok) {
    let detail = "";
    try {
      const errBody = await response.json();
      detail = errBody?.error ? `: ${errBody.error}` : "";
    } catch {
      /* ignore parse errors */
    }
    throw new Error(`Classification failed${detail}`);
  }

  return response.json();
}
