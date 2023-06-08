import { cargoEntity } from '@/api/cargo/type'

export interface TemplateElProps {
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>, id: string) => void
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>, id: string) => void
  handleTouchEnd: (id: string) => void
  el: cargoEntity
  deleteCargo: (cargoId: string) => void
}
