import { cargoEntity } from "@/api/cargo/type"

export interface GroupElProps {
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>, id: string) => void
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>, id: string) => void
  handleTouchEnd: (id: string) => void
  handleClick: () => void
  el: cargoEntity
  groupIndex: string
  elId: string
  removeProject: ({ id }: { id: string }) => void
}
