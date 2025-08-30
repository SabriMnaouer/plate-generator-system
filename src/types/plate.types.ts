// Type definitions
export interface Plate {
  id: number
  width: number
  height: number
}

export interface ValidationResult {
  isValid: boolean
  errors: { [key: string]: string }
  width: number | null
  height: number | null
}

export interface ErrorState {
  [key: string]: string | null
}

