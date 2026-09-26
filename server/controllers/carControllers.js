import { pool } from '../config/database.js'
import { calculatePrice, validateBuild } from '../utils/options.js'

export const getAllCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM custom_items ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCarById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM custom_items WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createCar = async (req, res) => {
  try {
    const { nickname, exterior, wheels, spoiler, interior, engine } = req.body
    if (!nickname || !nickname.trim()) {
      return res.status(400).json({ error: 'Nickname is required.' })
    }

    const build = { exterior, wheels, spoiler, interior, engine }
    const error = validateBuild(build)
    if (error) return res.status(400).json({ error })

    const total_price = calculatePrice(build)
    const result = await pool.query(
      `INSERT INTO custom_items
        (nickname, exterior, wheels, spoiler, interior, engine, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nickname.trim(), exterior, wheels, spoiler, interior, engine, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateCar = async (req, res) => {
  try {
    const { nickname, exterior, wheels, spoiler, interior, engine } = req.body
    if (!nickname || !nickname.trim()) {
      return res.status(400).json({ error: 'Nickname is required.' })
    }

    const build = { exterior, wheels, spoiler, interior, engine }
    const error = validateBuild(build)
    if (error) return res.status(400).json({ error })

    const total_price = calculatePrice(build)
    const result = await pool.query(
      `UPDATE custom_items
       SET nickname = $1, exterior = $2, wheels = $3, spoiler = $4,
           interior = $5, engine = $6, total_price = $7
       WHERE id = $8 RETURNING *`,
      [nickname.trim(), exterior, wheels, spoiler, interior, engine, total_price, req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteCar = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM custom_items WHERE id = $1 RETURNING *',
      [req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
    res.json({ message: 'Deleted', car: result.rows[0] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}