export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { problem } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert AI sales consultant. Provide smart solutions using analytics, automation and AI insights."
        },
        {
          role: "user",
          content: problem
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({ result: data.choices[0].message.content });
}
