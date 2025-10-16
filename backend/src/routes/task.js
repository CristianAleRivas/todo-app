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

// POST /tasks
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ error: 'title es requerido' });

    const { rows } = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING id, title, completed, created_at',
      [title.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

module.exports = router;