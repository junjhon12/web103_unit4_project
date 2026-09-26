import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import CarsApi from '../services/CarsApi'
import { OPTIONS, calculatePrice, IMPOSSIBLE_COMBOS } from '../utils/options'
import '../css/pages.css'

const EditCar = ({ title }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [build, setBuild] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => { document.title = title }, [title])

  useEffect(() => {
    (async () => {
      try {
        const car = await CarsApi.getCarById(id)
        setNickname(car.nickname)
        setBuild({
          exterior: car.exterior,
          wheels:   car.wheels,
          spoiler:  car.spoiler,
          interior: car.interior,
          engine:   car.engine
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const setFeature = (feature, value) =>
    setBuild(prev => ({ ...prev, [feature]: value }))

  const blockedReasons = build
    ? IMPOSSIBLE_COMBOS.filter(c => c.when(build)).map(c => c.message)
    : []

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!nickname.trim()) return setError('Give your build a nickname first.')
    if (blockedReasons.length > 0) return setError(blockedReasons[0])
    try {
      setSaving(true)
      await CarsApi.updateCar(id, { nickname: nickname.trim(), ...build })
      navigate(`/customcars/${id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <main className='page'><h2>Loading…</h2></main>
  if (!build)  return <main className='page'><h2>{error}</h2></main>

  const total = calculatePrice(build)

  return (
    <main className='page'>
      <section className='preview-panel'>
        <CarPreview build={build} />
        <h2 className='price'>${total.toLocaleString()}</h2>
        {blockedReasons.length > 0 && <p className='warning'>{blockedReasons[0]}</p>}
      </section>

      <section className='form-panel'>
        <h2>Edit Build</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nickname
            <input
              type='text'
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              maxLength={60}
            />
          </label>

          {Object.entries(OPTIONS).map(([feature, config]) => (
            <label key={feature}>
              {config.label}
              <select
                value={build[feature]}
                onChange={e => setFeature(feature, e.target.value)}
              >
                {config.choices.map(choice => (
                  <option key={choice.id} value={choice.id}>
                    {choice.label}
                    {choice.price > 0 ? ` (+$${choice.price.toLocaleString()})` : ''}
                  </option>
                ))}
              </select>
            </label>
          ))}

          {error && <p className='error'>{error}</p>}

          <button type='submit' disabled={saving || blockedReasons.length > 0}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default EditCar