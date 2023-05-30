import { Control } from "react-hook-form"
import { createTrasportInput } from "../type"

export interface TractorTrailerProps {
  control: Control<createTrasportInput, any>
  height: string
  width: string
}
