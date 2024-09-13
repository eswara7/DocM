
const fetchFromHuggingFace = async (model, prompt) => {
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: prompt })
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data[0].generated_text.trim();
};

const summarizeText = async (text) => {
  const prompt = `Summarize the following text:\n\n${text}`;
  return await fetchFromHuggingFace("IlyaGusev/mbart_ru_sum_gazeta", prompt);
};



const generateText = async (input) => {
  const prompt = `${input}`;
  return await fetchFromHuggingFace("google/gemma-2-2b-it", prompt);
}; 

export{ summarizeText, generateText };
