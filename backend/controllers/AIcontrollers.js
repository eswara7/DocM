import { generateText, summarizeText } from "./aiFeatures.js";


const summerize = async (req, res) => {
    try {
      const { content } = req.body;
      const summary = await summarizeText(content);
      res.json({ success: true, summary });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
}

const generate = async(req,res)=>{
        try {
          const { prompt } = req.body;
          const generatedText = await generateText(prompt);
          res.json({ success: true, generatedText });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
      }

export {summerize,generate}
