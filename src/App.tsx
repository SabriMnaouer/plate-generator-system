import React, { useState, useEffect, useRef } from 'react'
// @ts-ignore
import designMotif from '@/assets/design-motif.png'
import { ImportExportControls } from './components/ImportExportControls'
import { CanvasDisplay } from './components/CanvasDisplay'
import { PlateList } from './components/PlateList'
import { usePlateInputs } from './hooks'
// @ts-ignore
import { Plate, ErrorState } from './types'
import { validateDimensions } from './utils'
import './App.css'

const App: React.FC = () => {
  const [plates, setPlates] = useState<Plate[]>([])
  const [errors, setErrors] = useState<ErrorState>({})
  const [imageLoaded, setImageLoaded] = useState(false)
  const [customImage, setCustomImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const { inputs, setInput } = usePlateInputs(plates)

  // Initialize plates
  useEffect(() => {
    const savedPlates = localStorage.getItem('plates')
    if (savedPlates) {
      try {
        setPlates(JSON.parse(savedPlates))
      } catch {
        setPlates([
          { id: 1, width: 250, height: 128 },
          { id: 2, width: 30, height: 30 }
        ])
      }
    } else {
      setPlates([
        { id: 1, width: 250, height: 128 },
        { id: 2, width: 30, height: 30 }
      ])
    }

    const savedImage = localStorage.getItem('customImage')
    if (savedImage) {
      setCustomImage(savedImage)
    }
  }, [])

  // Save plates when they change
  useEffect(() => {
    if (plates.length > 0) {
      localStorage.setItem('plates', JSON.stringify(plates))
    }
  }, [plates])

  const updatePlate = (id: number, field: keyof Omit<Plate, 'id'>, value: number): void => {
    setPlates(prev => prev.map(plate =>
      plate.id === id ? { ...plate, [field]: value } : plate
    ))
  }

  const handleDimensionChange = (id: number, field: keyof Omit<Plate, 'id'>, value: string): void => {
    setInput(id, field, value) // keep raw string while typing
  }

  const handleDimensionBlur = (id: number, field: keyof Omit<Plate, 'id'>, value: string): void => {
    const otherField = field === 'width' ? 'height' : 'width'
    const plate = plates.find(p => p.id === id)
    if (!plate) return

    const otherValue = plate[otherField]

    const validation = validateDimensions(
      field === 'width' ? value : otherValue,
      field === 'height' ? value : otherValue
    )

    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        [`${id}-${field}`]: validation.errors[field] || null
      }))
    } else {
      const parsedValue = field === 'width' ? validation.width : validation.height
      if (parsedValue !== null) {
        updatePlate(id, field, parsedValue)
      }
      setErrors(prev => ({
        ...prev,
        [`${id}-${field}`]: null
      }))
    }
  }

  const addPlate = (): void => {
    if (plates.length < 10) {
      const newId = Math.max(...plates.map(p => p.id)) + 1
      setPlates(prev => [...prev, { id: newId, width: 250, height: 128 }])
    }
  }

  const removePlate = (id: number): void => {
    if (plates.length > 1) {
      setPlates(prev => prev.filter(p => p.id !== id))
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[`${id}-width`]
        delete newErrors[`${id}-height`]
        return newErrors
      })
    }
  }

  const handleImageLoad = (): void => {
    setImageLoaded(true)
  }

  // Handle uploaded image
  const handleImageUpload = (imageUrl: string) => {
    setCustomImage(imageUrl)
    localStorage.setItem('customImage', imageUrl)
    setImageLoaded(false)
  }

  // Export canvas as PNG
  const handleExportCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'design.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-normal text-gray-800 mb-6">Maße. Eingeben.</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas Panel */}
          <CanvasDisplay
            plates={plates}
            imageLoaded={imageLoaded}
            customImage={customImage}
            // @ts-ignore
            canvasRef={canvasRef}
            // @ts-ignore
            imageRef={imageRef}
            designMotif={designMotif}
            onImageLoad={handleImageLoad}
          />

          {/* Controls Panel */}
          <div className="space-y-6">
            <PlateList
              plates={plates}
              inputs={inputs}
              errors={errors}
              // @ts-ignore
              onDimensionChange={handleDimensionChange}// @ts-ignore
              onDimensionBlur={handleDimensionBlur}
              onRemove={removePlate}
              onAdd={addPlate}
            />

            {/* Import/Export Controls */}
            <ImportExportControls
              onImageUpload={handleImageUpload}
              onExportCanvas={handleExportCanvas}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

