import React from 'react'
// @ts-ignore
import { Button } from '@/components/ui/button'// @ts-ignore
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { Plate, ErrorState } from '../../types'

interface PlateInputProps {
  plate: Plate
  index: number
  inputs: { [key: string]: string }
  errors: ErrorState
  canRemove: boolean
  onDimensionChange: (id: number, field: keyof Omit<Plate, 'id'>, value: string) => void
  onDimensionBlur: (id: number, field: keyof Omit<Plate, 'id'>, value: string) => void
  onRemove: (id: number) => void
}

export const PlateInput: React.FC<PlateInputProps> = ({
  plate,
  index,
  inputs,
  errors,
  canRemove,
  onDimensionChange,
  onDimensionBlur,
  onRemove
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
            {index + 1}
          </div>
        </div>
        {canRemove && (
          <Button
            onClick={() => onRemove(plate.id)}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>Breite <span className="text-gray-400">20 - 300 cm</span></div>
          <div>Höhe <span className="text-gray-400">30 - 128 cm</span></div>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={inputs[`${plate.id}-width`] ?? ''}// @ts-ignore
            onChange={(e) => onDimensionChange(plate.id, 'width', e.target.value)}// @ts-ignore
            onBlur={(e) => onDimensionBlur(plate.id, 'width', e.target.value)}
            className={`w-20 text-center ${errors[`${plate.id}-width`] ? 'border-red-500' : ''}`}
          />
          <span className="text-gray-600">cm</span>
          <X className="w-4 h-4 text-gray-400" />
          <Input
            type="text"
            value={inputs[`${plate.id}-height`] ?? ''}
            // @ts-ignore
            onChange={(e) => onDimensionChange(plate.id, 'height', e.target.value)}// @ts-ignore
            onBlur={(e) => onDimensionBlur(plate.id, 'height', e.target.value)}
            className={`w-20 text-center ${errors[`${plate.id}-height`] ? 'border-red-500' : ''}`}
          />
          <span className="text-gray-600">cm</span>
        </div>

        <div className="flex space-x-8 text-xs text-gray-500">
          <span>{plate.width * 10} mm</span>
          <span>{plate.height * 10} mm</span>
        </div>

        {(errors[`${plate.id}-width`] || errors[`${plate.id}-height`]) && (
          <div className="text-red-500 text-sm">
            {errors[`${plate.id}-width`] || errors[`${plate.id}-height`]}
          </div>
        )}
      </div>
    </div>
  )
}

