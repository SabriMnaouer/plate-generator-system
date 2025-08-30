// @ts-ignore
import { ValidationResult } from '../types'

// Utility functions for locale-aware number parsing
export const parseNumber = (value: string | number): number | null => {
  if (typeof value === 'number') return value
  if (!value || typeof value !== 'string') return null

  const cleaned = value.replace(/\s/g, '')

  if (cleaned.includes('.') && !cleaned.includes(',')) {
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? null : parsed
  }

  if (cleaned.includes(',') && !cleaned.includes('.')) {
    const parsed = parseFloat(cleaned.replace(',', '.'))
    return isNaN(parsed) ? null : parsed
  }

  const parsed = parseFloat(cleaned.replace(',', '.'))
  return isNaN(parsed) ? null : parsed
}

export const validateDimensions = (width: string | number, height: string | number): ValidationResult => {
  const w = parseNumber(width)
  const h = parseNumber(height)

  const errors: { [key: string]: string } = {}

  if (w === null || w < 20 || w > 300) {
    errors.width = 'Breite muss zwischen 20-300 cm liegen'
  }

  if (h === null || h < 30 || h > 128) {
    errors.height = 'Höhe muss zwischen 30-128 cm liegen'
  }

  return { isValid: Object.keys(errors).length === 0, errors, width: w, height: h }
}

