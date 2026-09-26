export const BASE_PRICE = 28000

export const OPTIONS = {
  exterior: {
    label: 'Exterior Color',
    choices: [
      { id: 'midnight', label: 'Midnight Black', price: 0,    hex: '#111417' },
      { id: 'crimson',  label: 'Crimson Red',    price: 800,  hex: '#8b0000' },
      { id: 'bolt',     label: 'Bolt Yellow',    price: 1200, hex: '#f5c518' },
      { id: 'arctic',   label: 'Arctic White',   price: 500,  hex: '#e8e8e8' },
      { id: 'electric', label: 'Electric Blue',  price: 1500, hex: '#1e90ff' }
    ]
  },
  wheels: {
    label: 'Wheels',
    choices: [
      { id: 'stock',   label: 'Stock Alloys',    price: 0,    accent: '#888',    radius: 30 },
      { id: 'sport',   label: 'Sport 5-Spoke',   price: 1200, accent: '#cc0000', radius: 32 },
      { id: 'chrome',  label: 'Chrome Dubs',     price: 2000, accent: '#e0e0e0', radius: 34 },
      { id: 'offroad', label: 'Off-Road Knobby', price: 1800, accent: '#3a2a1a', radius: 36 }
    ]
  },
  spoiler: {
    label: 'Spoiler',
    choices: [
      { id: 'none', label: 'No Spoiler',  price: 0 },
      { id: 'lip',  label: 'Lip Spoiler', price: 600 },
      { id: 'wing', label: 'GT Wing',     price: 2400 }
    ]
  },
  interior: {
    label: 'Interior',
    choices: [
      { id: 'cloth',   label: 'Cloth',          price: 0,    hex: '#3a3a3a' },
      { id: 'leather', label: 'Leather',        price: 1800, hex: '#6b3e26' },
      { id: 'racing',  label: 'Racing Buckets', price: 3200, hex: '#cc0000' }
    ]
  },
  engine: {
    label: 'Engine',
    choices: [
      { id: 'v6',       label: 'V6',       price: 0,    badge: 'V6' },
      { id: 'v8',       label: 'V8',       price: 4500, badge: 'V8' },
      { id: 'electric', label: 'Electric', price: 6000, badge: 'EV' }
    ]
  }
}

export const findChoice = (feature, id) =>
  OPTIONS[feature]?.choices.find(c => c.id === id)

export const calculatePrice = (build) => {
  let total = BASE_PRICE
  for (const feature of Object.keys(OPTIONS)) {
    const choice = findChoice(feature, build[feature])
    if (choice) total += choice.price
  }
  return total
}

export const IMPOSSIBLE_COMBOS = [
  { when: b => b.wheels === 'offroad' && b.spoiler === 'wing',
    message: 'Off-road wheels are incompatible with the GT Wing.' },
  { when: b => b.engine === 'electric' && b.spoiler === 'wing',
    message: 'The GT Wing is not available on the Electric drivetrain.' },
  { when: b => b.interior === 'racing' && b.engine === 'v6',
    message: 'Racing bucket seats require a V8 or Electric engine.' }
]

export const validateBuild = (build) => {
  for (const feature of Object.keys(OPTIONS)) {
    if (!findChoice(feature, build[feature])) {
      return `Invalid choice for ${OPTIONS[feature].label}.`
    }
  }
  for (const combo of IMPOSSIBLE_COMBOS) {
    if (combo.when(build)) return combo.message
  }
  return null
}