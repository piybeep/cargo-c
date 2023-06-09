import { cargoEntity } from "@/api/cargo/type"

export interface TemplateProps {
  groupId: string
  projectId: string
  data: cargoEntity[] | undefined
}
