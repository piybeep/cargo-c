import {
  FileOutlined,
  BuildOutlined,
  CarOutlined,
  ControlOutlined
} from '@ant-design/icons'

type LinkTypes = {
  id: number
  text: string
  link: string
  icon: any
}[]

export const LINKS:LinkTypes = [
  {
    id: 1,
    text: 'Выбор проекта',
    link: '/projects',
    icon: FileOutlined
  },
  {
    id: 2,
    text: 'Выбор груза',
    link: '/cargo',
    icon: BuildOutlined
  },
  {
    id: 3,
    text: 'Выбор транспорта',
    link: '/transport',
    icon: CarOutlined
  },
  {
    id: 4,
    text: 'Расчет загрузки',
    link: '/visualization',
    icon: ControlOutlined
  }
]
