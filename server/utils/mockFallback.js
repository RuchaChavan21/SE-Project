export const getMockResponse = (type) => {
  switch (type) {
    case 'explain':
      return {
        explanation: "This is a mocked explanation generated locally because the AI services are currently unavailable or rate-limited. It simulates an intelligent breakdown of the concept tailored to your learning style.",
        summary: "A local mocked summary of the topic.",
        keyTerms: ["Mock AI", "Fallback Mechanism", "Resilience"],
        examples: ["Imagine you ask for a pizza, but the shop is closed, so your mom makes you a sandwich. This is a fallback."],
        nextTopic: "Advanced Fallback Systems"
      };
      
    case 'chat':
      return "I'm currently operating in offline mode! I can still help you review basic concepts, but my advanced AI brain is taking a quick nap.";
      
    case 'revise':
      return {
        summary: "I've analyzed your notes locally (mock mode). Here is a quick review quiz.",
        questions: [
          {
            question: "What happens when an AI API fails?",
            options: [
              "The app crashes",
              "A fallback handler provides mock data",
              "The user gets an error",
              "The server restarts"
            ],
            correctIndex: 1,
            explanation: "In our robust architecture, the fallback handler kicks in to ensure a seamless experience."
          }
        ]
      };

    case 'recommend':
      return {
        recommendations: ["Error Handling", "API Integration", "System Architecture"]
      };

    default:
      return { message: "Mock data fallback executed." };
  }
};
