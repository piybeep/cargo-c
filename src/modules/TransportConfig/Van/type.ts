import { Control } from 'react-hook-form'
import { createTrasportInput } from '../type'

export interface VanProps {
  control: Control<createTrasportInput, any>
  height: string
  width: string
}
