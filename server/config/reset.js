import 'dotenv/config'
import { pool } from './database.js'

const reset = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS custom_items')

    await pool.query(`
      CREATE TABLE custom_items (
        id          SERIAL PRIMARY KEY,
        nickname    VARCHAR(100) NOT NULL,
        exterior    VARCHAR(50)  NOT NULL,
        wheels      VARCHAR(50)  NOT NULL,
        spoiler     VARCHAR(50)  NOT NULL,
        interior    VARCHAR(50)  NOT NULL,
        engine      VARCHAR(50)  NOT NULL,
        total_price NUMERIC(10,2) NOT NULL,
        created_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await pool.query(`
      INSERT INTO custom_items
        (nickname, exterior, wheels, spoiler, interior, engine, total_price) VALUES
      ('The Midnight Bolt', 'midnight', 'sport',  'lip',  'leather', 'v8',       36500),
      ('Sunset Cruiser',    'crimson',  'chrome', 'none', 'cloth',   'v6',       31300),
      ('Grid Runner',       'electric', 'sport',  'lip',  'racing',  'electric', 42000)
    `)

    console.log('✅ Database reset complete')
  } catch (error) {
    console.error('❌ Reset failed:', error)
  } finally {
    await pool.end()
  }
}

reset()