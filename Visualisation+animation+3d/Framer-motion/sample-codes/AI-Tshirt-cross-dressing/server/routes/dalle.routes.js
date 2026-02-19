import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
});

router.route('/').post(async (req, res) => {
  try {
    const prompt = req.body;
    console.log("prompt", req.body);
    const aiResponse = await openai.responses.create({
      model: "gpt-5",
      input: "design a simple modern logo icon using geometry shapes and a minimalistic color scheme, without any text or lettering",
      tools: [{
        type: "image_generation",
        //size: "1024x1024",
        //action: "generate",
      }],
    });
    const imageData =
      aiResponse.output
                .filter((output) => output.type === "image_generation_call")
                .map((output) => output.result);
    const imageBase64 = imageData[0];
    res.status(200).json({ photo: imageBase64 });
  //    const response = await openai.createImage({
  //     prompt,
  //     n: 1,
  //     size: '1024x1024',
  //     response_format: 'b64_json'
  //   });
  //   console.log(response.data.data[0].b64_json);
  //   const image = response.data.data[0].b64_json;
  //  res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;

