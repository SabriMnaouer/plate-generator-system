import React, { useEffect } from 'react'
import { Plate } from '../../types'
import { drawCanvas } from '../../utils'

interface CanvasDisplayProps {
  plates: Plate[]
  imageLoaded: boolean
  customImage: string | null
  canvasRef: React.RefObject<HTMLCanvasElement>
  imageRef: React.RefObject<HTMLImageElement>
  designMotif: string
  onImageLoad: () => void
}

export const CanvasDisplay: React.FC<CanvasDisplayProps> = ({
  plates,
  imageLoaded,
  customImage,
  canvasRef,
  imageRef,
  designMotif,
  onImageLoad
}) => {
  // Redraw canvas when dependencies change
  useEffect(() => {
    if (imageLoaded && plates.length > 0 && canvasRef.current && imageRef.current) {
      drawCanvas(canvasRef.current, imageRef.current, plates, imageLoaded)
    }
  }, [plates, imageLoaded, customImage, canvasRef, imageRef])

  return (
    <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
      <div className="bg-gray-100 rounded-lg p-4 overflow-auto">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto border border-gray-200"
          style={{ minHeight: '200px' }}
        />
        <img
          ref={imageRef}
          src={customImage || designMotif}
          alt="Design Motif"
          className="hidden"
          onLoad={onImageLoad}
        />
      </div>
    </div>
  )
}

