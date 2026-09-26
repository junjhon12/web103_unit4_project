const BASE_URL = '/api/cars'

const getAllCars = async () => {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error('Failed to load cars')
  return response.json()
}

const getCarById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to load car')
  return response.json()
}

const createCar = async (build) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(build)
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Failed to create car')
  return data
}

const updateCar = async (id, build) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(build)
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Failed to update car')
  return data
}

const deleteCar = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Failed to delete car')
  return data
}

export default { getAllCars, getCarById, createCar, updateCar, deleteCar }