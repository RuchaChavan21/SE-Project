export async function getGeminiMentorInsight(context) {
  const response = await fetch('/api/ai/mentor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(context),
  });

  if (!response.ok) {
    throw new Error('Gemini mentor request failed');
  }

  return response.json();
}

export async function generateAdaptiveQuiz(topic) {
  const response = await fetch('/api/ai/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error('Adaptive quiz request failed');
  }

  return response.json();
}
