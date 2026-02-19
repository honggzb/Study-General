import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from OpenAI Chat Routes" });
});

// Chat completion endpoint
router.route('/chat').post(async (req, res) => {
  try {
    const { prompt, systemPrompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const messages = [
      {
        role: 'system',
        content: systemPrompt || 'You are a helpful assistant. Provide clear and concise responses.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const responseMessage = completion.choices[0].message.content;
    
    res.status(200).json({ 
      response: responseMessage,
      usage: completion.usage 
    });
  } catch (error) {
    console.error('OpenAI Chat Error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Streaming chat completion endpoint
router.route('/chat/stream').post(async (req, res) => {
  try {
    const { prompt, systemPrompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const messages = [
      {
        role: 'system',
        content: systemPrompt || 'You are a helpful assistant. Provide clear and concise responses.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('OpenAI Stream Error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

export default router;
