import React from 'react'
import { findChoice } from '../utils/options'
import '../css/CarPreview.css'

const CarPreview = ({ build }) => {
  const exterior    = findChoice('exterior', build.exterior)
  const wheels      = findChoice('wheels',   build.wheels)
  const spoiler     = findChoice('spoiler',  build.spoiler)
  const interior    = findChoice('interior', build.interior)
  const engine      = findChoice('engine',   build.engine)

  const bodyColor   = exterior?.hex     || '#111417'
  const wheelAccent = wheels?.accent    || '#888'
  const wheelRadius = wheels?.radius    || 30
  const seatColor   = interior?.hex     || '#3a3a3a'
  const engineBadge = engine?.badge     || ''

  return (
    <div className='car-preview'>
      <svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="310" cy="230" rx="250" ry="12" fill="rgba(0,0,0,0.35)" />

        {spoiler?.id === 'wing' && (
          <g>
            <rect x="480" y="70" width="12" height="50" fill={bodyColor} stroke="#000" strokeWidth="2" />
            <rect x="560" y="70" width="12" height="50" fill={bodyColor} stroke="#000" strokeWidth="2" />
            <rect x="470" y="58" width="115" height="14" fill={bodyColor} stroke="#000" strokeWidth="2" />
          </g>
        )}

        {spoiler?.id === 'lip' && (
          <rect x="545" y="118" width="40" height="10" fill={bodyColor} stroke="#000" strokeWidth="2" />
        )}

        <path
          d="M50 180 L50 145 Q50 125 80 125 L160 125 L220 70 Q245 55 275 55 L420 55 Q450 55 470 75 L520 125 L570 135 Q590 140 590 165 L590 180 Q590 190 580 190 L60 190 Q50 190 50 180 Z"
          fill={bodyColor}
          stroke="#000"
          strokeWidth="3"
        />

        <path
          d="M235 68 L275 68 L415 68 Q435 68 450 82 L485 118 L235 118 Z"
          fill="rgba(140,200,255,0.45)"
          stroke="#000"
          strokeWidth="2"
        />

        <rect x="270" y="95" width="30" height="22" rx="4" fill={seatColor} stroke="#000" strokeWidth="1.5" />
        <rect x="320" y="95" width="30" height="22" rx="4" fill={seatColor} stroke="#000" strokeWidth="1.5" />

        <rect x="50"  y="140" width="18" height="18" rx="3" fill="#fff8c8" stroke="#000" strokeWidth="2" />
        <rect x="575" y="145" width="14" height="20" rx="2" fill="#ff3040" stroke="#000" strokeWidth="2" />

        <g>
          <circle cx="170" cy="192" r={wheelRadius}      fill="#1a1a1a" stroke="#000" strokeWidth="2" />
          <circle cx="170" cy="192" r={wheelRadius - 6}  fill={wheelAccent} />
          <circle cx="170" cy="192" r={wheelRadius - 16} fill="#1a1a1a" />
          <circle cx="170" cy="192" r="4"                fill="#aaa" />
        </g>

        <g>
          <circle cx="470" cy="192" r={wheelRadius}      fill="#1a1a1a" stroke="#000" strokeWidth="2" />
          <circle cx="470" cy="192" r={wheelRadius - 6}  fill={wheelAccent} />
          <circle cx="470" cy="192" r={wheelRadius - 16} fill="#1a1a1a" />
          <circle cx="470" cy="192" r="4"                fill="#aaa" />
        </g>

        <g>
          <rect x="520" y="155" width="58" height="24" rx="4" fill="#000" stroke="#fff" strokeWidth="1.5" />
          <text x="549" y="172" fontSize="14" fontWeight="700" fill="#fff" textAnchor="middle">
            {engineBadge}
          </text>
        </g>
      </svg>
    </div>
  )
}

export default CarPreview