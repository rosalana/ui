import type { PublicColorFormat } from '../../../composables/useColorConverter'
import type { ClassValue } from 'tailwind-variants'

export type { PublicColorFormat }

export interface ColorPickerProps {
  modelValue?: string | null
  format?: PublicColorFormat
  placeholder?: string
  class?: ClassValue
  palette?: boolean
  input?: boolean
}
