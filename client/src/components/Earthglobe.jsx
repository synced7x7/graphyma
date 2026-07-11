import { useEffect, useState, useRef } from 'react'
import './styles/Earthglobe.css'

// European/Mediterranean data point coordinates
const DATA_POINTS = [
  { lat: 51.5, lon: 0,    label: 'ESA HQ' },
  { lat: 48.8, lon: 2.3,  label: 'Paris' },
  { lat: 52.5, lon: 13.4, label: 'Berlin' },
  { lat: 41.9, lon: 12.5, label: 'Rome' },
  { lat: 59.9, lon: 10.7, label: 'Oslo' },
]


const THEME_PALETTES = {
  /* Teal
  dark: {
    accentRgb: '13, 255, 196',
    accent2Rgb: '0, 196, 154',
    accent3Rgb: '0, 122, 96',
    bgRgb: '5, 12, 11',
    surfaceRgb: '11, 24, 21',
  }, */
  /* Lavender */
  dark: {
    accentRgb: '210, 160, 245',
    accent2Rgb: '225, 185, 250',
    accent3Rgb: '181, 126, 220',
    bgRgb: '5, 12, 11',
    surfaceRgb: '11, 24, 21',
  },
  light: {
    accentRgb: '47, 107, 255',
    accent2Rgb: '95, 134, 255',
    accent3Rgb: '31, 79, 214',
    bgRgb: '245, 248, 255',
    surfaceRgb: '255, 255, 255',
  },
}

// Satellite dictionary
const SATELLITES = [
  {
    id: 'sentinel-2a',
    name: 'Sentinel-2A',
    owner: 'ESA / Copernicus',
    mission: 'Multispectral Earth Observation',
    launch: '23 June 2015',
    applications: ['Land cover monitoring', 'Agriculture & vegetation', 'Forest monitoring', 'Disaster response'],
    orbitTilt: Math.PI * 0.22,
    orbitScaleX: 1.22,
    orbitScaleY: 0.30,
    speed: 0.005,
    phaseOffset: 0,
  },
  {
    id: 'mtg-i1',
    name: 'MTG-I1',
    owner: 'EUMETSAT',
    mission: 'Next-gen Meteorological Imaging',
    launch: '13 December 2022',
    applications: ['Severe storm tracking', 'Weather forecasting', 'Lightning detection', 'Climate monitoring'],
    orbitTilt: -Math.PI * 0.18,
    orbitScaleX: 1.28,
    orbitScaleY: 0.26,
    speed: 0.003,
    phaseOffset: Math.PI * 0.75,
  },
  {
    id: 'metop-c',
    name: 'Metop-C',
    owner: 'EUMETSAT / ESA',
    mission: 'Polar Meteorological Observation',
    launch: '7 November 2018',
    applications: ['Numerical weather prediction', 'Climate research', 'Ocean wind monitoring', 'Atmospheric sounding'],
    orbitTilt: Math.PI * 0.48,
    orbitScaleX: 1.15,
    orbitScaleY: 0.36,
    speed: 0.007,
    phaseOffset: Math.PI * 1.4,
  },
]

function latlonTo3D(lat, lon, R) {
  const phi = (lat * Math.PI) / 180
  const lambda = (lon * Math.PI) / 180
  return {
    x: R * Math.cos(phi) * Math.cos(lambda),
    y: -R * Math.sin(phi),
    z: R * Math.cos(phi) * Math.sin(lambda),
  }
}

function readThemePalette() {
  const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  return THEME_PALETTES[theme]
}

export default function EarthGlobe({ onSatelliteHover}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const [selectedSat, setSelectedSat] = useState(null)
  const [panelPos, setPanelPos] = useState({ x: 0, y: 0 })
  const selectedSatRef = useRef(null)
  const satPositionsRef = useRef([])
  const PANEL_W = 252
  const PANEL_H = 295

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const paletteRef = { current: readThemePalette() }
    const DPR = window.devicePixelRatio || 1
    const SIZE = 600
    canvas.width = SIZE * DPR
    canvas.height = SIZE * DPR
    canvas.style.width = SIZE + 'px'
    canvas.style.height = SIZE + 'px'
    ctx.scale(DPR, DPR)

    const syncPalette = () => {
      paletteRef.current = readThemePalette()
    }

    const themeObserver = new MutationObserver(syncPalette)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })



    const isTouchDevice = () => window.matchMedia('(hover: none)').matches

    const computePanelPos = (hit) => {
      let px = hit.screenX + 18
      let py = hit.screenY - PANEL_H / 2
      if (px + PANEL_W > SIZE - 8) px = hit.screenX - PANEL_W - 18
      if (py < 8) py = 8
      if (py + PANEL_H > SIZE - 8) py = SIZE - PANEL_H - 8
      return { x: px, y: py }
    }

    const resolveCoords = (e) => {
      const rect = canvas.getBoundingClientRect()
      const scale = SIZE / rect.width
      const src = e.touches ? e.touches[0] : e
      return {
        mx: (src.clientX - rect.left) * scale,
        my: (src.clientY - rect.top) * scale,
      }
    }

    const handleMouseMove = (e) => {
      if (isTouchDevice()) return
      const { mx, my } = resolveCoords(e)
      const hit = satPositionsRef.current.find(({ screenX, screenY }) => {
        const dx = mx - screenX, dy = my - screenY
        return Math.sqrt(dx * dx + dy * dy) < 22
      })
      if (hit) {
        const sat = SATELLITES.find(s => s.id === hit.id)
        selectedSatRef.current = sat
        setSelectedSat(sat)
        onSatelliteHover?.()
        setPanelPos(computePanelPos(hit))
      }
      // no hit → keep last panel visible
    }

    const handleMouseLeave = () => {
      if (!isTouchDevice()) {
        selectedSatRef.current = null
        setSelectedSat(null)
      }
    }

    const handleClick = (e) => {
      if (!isTouchDevice()) return
      const { mx, my } = resolveCoords(e)
      const hit = satPositionsRef.current.find(({ screenX, screenY }) => {
        const dx = mx - screenX, dy = my - screenY
        return Math.sqrt(dx * dx + dy * dy) < 28 // larger touch target
      })
      if (hit) {
        const sat = SATELLITES.find(s => s.id === hit.id)
        if (selectedSatRef.current?.id === sat?.id) {
          selectedSatRef.current = null
          setSelectedSat(null)
        } else {
          selectedSatRef.current = sat
          setSelectedSat(sat)
          setPanelPos(computePanelPos(hit))
        }
      } else {
        selectedSatRef.current = null
        setSelectedSat(null)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('touchstart', handleClick, { passive: true })

    const cx = SIZE / 2
    const cy = SIZE / 2
    const R = SIZE * 0.36
    let t = 0
    let rotation = 0

    function drawFrame() {
      ctx.clearRect(0, 0, SIZE, SIZE)
      const palette = paletteRef.current

      // ── Outer atmospheric halo ────────────────────────────
      const halo = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.28)
      halo.addColorStop(0, `rgba(${palette.accentRgb},0)`)
      halo.addColorStop(0.5, `rgba(${palette.accentRgb},0.06)`)
      halo.addColorStop(1, `rgba(${palette.accentRgb},0)`)
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.28, 0, Math.PI * 2)
      ctx.fill()

      // // ── Pulsing outer glow ────────────────────────────────
      // const pulseAlpha = 0.04 + 0.02 * Math.sin(t * 0.02)
      // const outerGlow = ctx.createRadialGradient(cx, cy, R, cx, cy, R * 1.8)
      // outerGlow.addColorStop(0, `rgba(${palette.accentRgb},${pulseAlpha})`)
      // outerGlow.addColorStop(1, 'transparent')
      // ctx.fillStyle = outerGlow
      // ctx.fillRect(cx - R * 1.8, cy - R * 1.8, R * 3.6, R * 3.6)

      // ── Globe clip ────────────────────────────────────────
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()

      // Base sphere gradient
      const baseGrad = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.28, R * 0.05, cx + R * 0.1, cy + R * 0.15, R * 1.2)
      baseGrad.addColorStop(0, `rgba(${palette.accentRgb},0.26)`)
      baseGrad.addColorStop(0.22, `rgba(${palette.surfaceRgb},0.9)`)
      baseGrad.addColorStop(0.65, `rgba(${palette.bgRgb},0.98)`)
      baseGrad.addColorStop(1, `rgba(${palette.bgRgb},1)`)
      ctx.fillStyle = baseGrad
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      // Ocean texture: subtle deep dark patches
      const oceanPatches = [
        { x: cx + R * 0.4, y: cy - R * 0.1, r: R * 0.55 },
        { x: cx - R * 0.35, y: cy + R * 0.3, r: R * 0.45 },
        { x: cx + R * 0.05, y: cy + R * 0.6, r: R * 0.4 },
        { x: cx - R * 0.6, y: cy - R * 0.25, r: R * 0.38 },
      ]
      oceanPatches.forEach(({ x, y, r }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, `rgba(${palette.accent3Rgb},0.2)`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2)
      })

      // ── Latitude lines ────────────────────────────────────
      for (let lat = -75; lat <= 75; lat += 15) {
        const phi = (lat * Math.PI) / 180
        const ry = R * Math.sin(phi)
        const rx = R * Math.cos(phi)
        const isEquator = lat === 0

        ctx.beginPath()
        ctx.ellipse(cx, cy + ry, rx, rx * 0.1, 0, 0, Math.PI * 2)
        ctx.strokeStyle = isEquator
          ? `rgba(${palette.accentRgb},0.35)`
          : `rgba(${palette.accentRgb},0.12)`
        ctx.lineWidth = isEquator ? 1 : 0.5
        ctx.stroke()
      }

      // ── Longitude lines (rotating) ────────────────────────
      const MERIDIANS = 24
      for (let i = 0; i < MERIDIANS; i++) {
        const lon = (i / MERIDIANS) * 360
        const eff = ((lon + rotation) % 360) * (Math.PI / 180)
        const cosEff = Math.cos(eff)
        const xR = Math.abs(cosEff) * R
        if (xR < 4) continue
        const alpha = 0.06 + 0.16 * Math.abs(cosEff)
        ctx.beginPath()
        ctx.ellipse(cx, cy, xR, R, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${palette.accentRgb},${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Light reflection (highlight)
      const light = ctx.createRadialGradient(cx - R * 0.45, cy - R * 0.45, 0, cx, cy, R * 1.1)
      light.addColorStop(0, `rgba(${palette.accentRgb},0.14)`)
      light.addColorStop(0.45, `rgba(${palette.accent2Rgb},0.06)`)
      light.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = light
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      // Night shadow terminator
      const shadow = ctx.createLinearGradient(cx + R * 0.05, cy - R, cx + R, cy + R)
      shadow.addColorStop(0, 'rgba(0,0,0,0)')
      shadow.addColorStop(0.45, 'rgba(0,0,0,0)')
      shadow.addColorStop(1, 'rgba(0,0,0,0.72)')
      ctx.fillStyle = shadow
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      // Atmospheric glow at limb
      const limb = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R)
      limb.addColorStop(0, `rgba(${palette.accentRgb},0)`)
      limb.addColorStop(0.7, `rgba(${palette.accentRgb},0)`)
      limb.addColorStop(1, `rgba(${palette.accentRgb},0.18)`)
      ctx.fillStyle = limb
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      ctx.restore()

      // ── Globe outline ─────────────────────────────────────
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${palette.accentRgb},0.55)`
      ctx.lineWidth = 1.2
      ctx.stroke()

      // ── Satellites ────────────────────────────────────────
      const newPositions = []

      SATELLITES.forEach((sat) => {
        const orx = R * sat.orbitScaleX
        const ory = R * sat.orbitScaleY
        const cosT = Math.cos(sat.orbitTilt)
        const sinT = Math.sin(sat.orbitTilt)
        const isSelected = selectedSatRef.current?.id === sat.id

        // Orbit ring
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(sat.orbitTilt)
        ctx.beginPath()
        ctx.ellipse(0, 0, orx, ory, 0, 0, Math.PI * 2)
        ctx.setLineDash([5, 8])
        ctx.strokeStyle = `rgba(${palette.accentRgb},${isSelected ? 0.35 : 0.18})`
        ctx.lineWidth = isSelected ? 1.2 : 1
        ctx.stroke()
        ctx.setLineDash([])

        // Satellite position
        const angle = t * sat.speed + sat.phaseOffset
        const satX = Math.cos(angle) * orx
        const satY = Math.sin(angle) * ory

        // Screen coords for hit-testing (CSS px space)
        const screenX = cx + satX * cosT - satY * sinT
        const screenY = cy + satX * sinT + satY * cosT
        newPositions.push({ id: sat.id, screenX, screenY })

        // Draw satellite body
        ctx.save()
        ctx.translate(satX, satY)
        ctx.rotate(angle + Math.PI * 0.25)

        const satGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, isSelected ? 30 : 22)
        satGlow.addColorStop(0, `rgba(${palette.accentRgb},${isSelected ? 0.65 : 0.4})`)
        satGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = satGlow
        ctx.fillRect(-30, -30, 60, 60)

        ctx.fillStyle = isSelected ? `rgba(255,255,255,0.95)` : `rgb(${palette.accentRgb})`
        ctx.fillRect(-5, -3.5, 10, 7)

        ctx.fillStyle = `rgba(${palette.accentRgb},0.5)`
        ctx.fillRect(-20, -2, 13, 4)
        ctx.fillRect(7, -2, 13, 4)

        ctx.strokeStyle = `rgb(${palette.accentRgb})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(0, -3.5)
        ctx.lineTo(0, -9)
        ctx.stroke()

        ctx.restore()
        ctx.restore() // orbit

        // Label (in screen coords, stays horizontal)
        ctx.save()
        ctx.font = `500 9px monospace`
        ctx.fillStyle = `rgba(${palette.accentRgb},${isSelected ? 1 : 0.6})`
        ctx.fillText(sat.name, screenX + 14, screenY - 8)
        ctx.restore()
      })

      satPositionsRef.current = newPositions

      // ── Data points on globe ──────────────────────────────
      DATA_POINTS.forEach(({ lat, lon }) => {
        const lonAdj = lon - rotation * 0.8
        const { x: dx, y: dy, z: dz } = latlonTo3D(lat, lonAdj, R)
        if (dz < -R * 0.1) return // behind globe

        const screenX = cx + dx
        const screenY = cy + dy
        const visibility = (dz / R + 0.1) * 1.2
        const pulse = (Math.sin(t * 0.04 + lat) + 1) / 2

        // Ripple ring
        ctx.beginPath()
        ctx.arc(screenX, screenY, 3 + pulse * 9, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${palette.accentRgb},${0.35 * visibility * (1 - pulse * 0.8)})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Core dot
        ctx.beginPath()
        ctx.arc(screenX, screenY, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${palette.accentRgb},${0.9 * visibility})`
        ctx.fill()

        // Inner bright dot
        ctx.beginPath()
        ctx.arc(screenX, screenY, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.8 * visibility})`
        ctx.fill()
      })

      // ── Connection lines between points ───────────────────
      const visible = DATA_POINTS.filter(({ lat, lon }) => {
        const { z } = latlonTo3D(lat, lon - rotation * 0.8, R)
        return z > 0
      })

      if (visible.length >= 2) {
        for (let i = 0; i < visible.length - 1; i++) {
          const a = visible[i], b = visible[i + 1]
          const { x: ax, y: ay } = latlonTo3D(a.lat, a.lon - rotation * 0.8, R)
          const { x: bx, y: by } = latlonTo3D(b.lat, b.lon - rotation * 0.8, R)
          const lineAlpha = 0.08 + 0.04 * Math.sin(t * 0.02 + i)
          ctx.beginPath()
          ctx.moveTo(cx + ax, cy + ay)
          ctx.lineTo(cx + bx, cy + by)
          ctx.strokeStyle = `rgba(${palette.accentRgb},${lineAlpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      t++
      rotation += 0.25
      rafRef.current = requestAnimationFrame(drawFrame)
    }

    drawFrame()
    return () => {
      themeObserver.disconnect()
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('touchstart', handleClick)
    }
  }, [])

  return (
    <div className="earth-globe-wrapper">
      <canvas
        ref={canvasRef}
        className="earth-globe-canvas"
        style={{ cursor: 'crosshair', display: 'block' }}
      />
      {selectedSat && (
        <div
          className="sat-panel"
          style={{ left: panelPos.x, top: panelPos.y }}
        >
      
          <div className="sat-panel-name">{selectedSat.name}</div>
          <div className="sat-panel-owner">{selectedSat.owner}</div>
          <div className="sat-panel-row">
            <div className="sat-panel-label">Mission</div>
            <div className="sat-panel-value">{selectedSat.mission}</div>
          </div>
          <div className="sat-panel-row">
            <div className="sat-panel-label">Launch</div>
            <div className="sat-panel-value">{selectedSat.launch}</div>
          </div>
          <div className="sat-panel-row">
            <div className="sat-panel-label">Applications</div>
            <div className="sat-panel-tags">
              {selectedSat.applications.map(a => (
                <span key={a} className="sat-panel-tag">{a}</span>
              ))}
            </div>
          </div>
          <div className="sat-panel-disclaimer">
            Real satellite — not affiliated with or owned by GRAPHYMA.
          </div>
        </div>
      )}
    </div>
  )
}

