import { useState, useEffect } from 'react'
import { Plate } from '../types'

// Hook: manage inputs
export const usePlateInputs = (plates: Plate[]) => {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const initial: { [key: string]: string } = {}
    plates.forEach(p => {
      initial[`${p.id}-width`] = p.width.toString()
      initial[`${p.id}-height`] = p.height.toString()
    })
    setInputs(initial)
  }, [plates])

  const setInput = (id: number, field: 'width' | 'height', value: string) => {
    setInputs(prev => ({ ...prev, [`${id}-${field}`]: value }))
  }

  return { inputs, setInput }
}

