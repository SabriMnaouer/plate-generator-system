import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Plate, ErrorState } from '../../types'
import { PlateInput } from '../PlateInput'

interface PlateListProps {
  plates: Plate[]
  inputs: { [key: string]: string }
  errors: ErrorState
  onDimensionChange: (id: number, field: keyof Omit<Plate, 'id'>, value: string) => void
  onDimensionBlur: (id: number, field: keyof Omit<Plate, 'id'>, value: string) => void
  onRemove: (id: number) => void
  onAdd: () => void
}

export const PlateList: React.FC<PlateListProps> = ({
  plates,
  inputs,
  errors,
  onDimensionChange,
  onDimensionBlur,
  onRemove,
  onAdd
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="space-y-6">
        {plates.map((plate, index) => (
          <PlateInput
            key={plate.id}
            plate={plate}
            index={index}
            inputs={inputs}
            errors={errors}
            canRemove={plates.length > 1}
            onDimensionChange={onDimensionChange}
            onDimensionBlur={onDimensionBlur}
            onRemove={onRemove}
          />
        ))}

        <Button
          onClick={onAdd}
          disabled={plates.length >= 10}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Rückwand hinzufügen
        </Button>

        {plates.length >= 10 && (
          <div className="text-yellow-600 text-sm text-center">
            Maximum von 10 Platten erreicht
          </div>
        )}
      </div>
    </div>
  )
}

