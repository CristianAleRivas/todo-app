const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /tasks
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, title, completed, created_at FROM tasks ORDER BY id');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

module.exports = router;