import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import CarsApi from '../services/CarsApi'
import { OPTIONS, findChoice } from '../utils/options'
import '../css/pages.css'

const CarDetails = ({ title }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { document.title = title }, [title])

  useEffect(() => {
    (async () => {
      try {
        setCar(await CarsApi.getCarById(id))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this build?')) return
    try {
      await CarsApi.deleteCar(id)
      navigate('/customcars')
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <main className='page'><h2>Loading…</h2></main>
  if (error)   return <main className='page'><h2>{error}</h2></main>
  if (!car)    return null

  return (
    <main className='page'>
      <section className='preview-panel'>
        <CarPreview build={car} />
        <h2 className='price'>${Number(car.total_price).toLocaleString()}</h2>
      </section>

      <section className='details-panel'>
        <h2>{car.nickname}</h2>
        <ul className='spec-list'>
          {Object.entries(OPTIONS).map(([feature, config]) => (
            <li key={feature}>
              <strong>{config.label}:</strong>{' '}
              {findChoice(feature, car[feature])?.label}
            </li>
          ))}
        </ul>

        <footer className='details-actions'>
          <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
          <Link to='/customcars' role='button'>Back to List</Link>
        </footer>
      </section>
    </main>
  )
}

export default CarDetails