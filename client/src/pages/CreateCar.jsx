import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import CarsApi from '../services/CarsApi'
import { OPTIONS, calculatePrice, IMPOSSIBLE_COMBOS } from '../utils/options'
import '../css/pages.css'

const DEFAULT_BUILD = {
  exterior: 'midnight',
  wheels: 'stock',
  spoiler: 'none',
  interior: 'cloth',
  engine: 'v6'
}

const CreateCar = ({ title }) => {
  const [nickname, setNickname] = useState('')
  const [build, setBuild] = useState(DEFAULT_BUILD)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => { document.title = title }, [title])

  const setFeature = (feature, value) =>
    setBuild(prev => ({ ...prev, [feature]: value }))

  const blockedReasons = IMPOSSIBLE_COMBOS
    .filter(c => c.when(build))
    .map(c => c.message)

  const total = calculatePrice(build)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!nickname.trim()) return setError('Give your build a nickname first.')
    if (blockedReasons.length > 0) return setError(blockedReasons[0])
    try {
      setSaving(true)
      const created = await CarsApi.createCar({ nickname: nickname.trim(), ...build })
      navigate(`/customcars/${created.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className='page'>
      <section className='preview-panel'>
        <CarPreview build={build} />
        <h2 className='price'>${total.toLocaleString()}</h2>
        {blockedReasons.length > 0 && <p className='warning'>{blockedReasons[0]}</p>}
      </section>

      <section className='form-panel'>
        <h2>Build Your Bolt</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nickname
            <input
              type='text'
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder='e.g. The Midnight Bolt'
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
            {saving ? 'Saving…' : 'Save Build'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default CreateCar