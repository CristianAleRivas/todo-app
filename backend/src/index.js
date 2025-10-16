require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/task');
const { initDB } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/tasks', tasksRouter);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
async function start() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Backend corriendo en http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Error iniciando servidor:', err);
    process.exit(1);
  }
}

start();
