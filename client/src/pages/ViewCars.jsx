import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import CarsApi from '../services/CarsApi'
import '../css/pages.css'

const ViewCars = ({ title }) => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { document.title = title }, [title])

  useEffect(() => {
    (async () => {
      try {
        setCars(await CarsApi.getAllCars())
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this build?')) return
    try {
      await CarsApi.deleteCar(id)
      setCars(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <main className='page'><h2>Loading…</h2></main>
  if (error)   return <main className='page'><h2>{error}</h2></main>

  return (
    <main className='page view-cars'>
      <h2>Your Custom Cars</h2>

      {cars.length === 0 ? (
        <p>No builds yet. <Link to='/'>Create one</Link>.</p>
      ) : (
        <div className='car-grid'>
          {cars.map(car => (
            <article key={car.id} className='car-card'>
              <CarPreview build={car} />
              <h3>{car.nickname}</h3>
              <p>${Number(car.total_price).toLocaleString()}</p>
              <footer>
                <Link to={`/customcars/${car.id}`} role='button'>View</Link>
                <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                <button onClick={() => handleDelete(car.id)}>Delete</button>
              </footer>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default ViewCars