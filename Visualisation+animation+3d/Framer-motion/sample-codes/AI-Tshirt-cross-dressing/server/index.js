import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import dalleRoutes from './routes/dalle.routes.js';
import openaiRoutes from './routes/openai.routes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/openai', openaiRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E App" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});