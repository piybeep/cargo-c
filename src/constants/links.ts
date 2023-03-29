import svgProjects from '../../public/svg/projects'
import svgCargo from '../../public/svg/cargo'
import svgTransport from '../../public/svg/transport'
import svgvisualization from '../../public/svg/visualization'

type LinkTypes = {
  id: number
  text: string
  link: string
  icon: any
}[]

export const LINKS: LinkTypes = [
  {
    id: 1,
    text: 'Выбор проекта',
    link: '/projects',
    icon: svgProjects
  },
  {
    id: 2,
    text: 'Выбор груза',
    link: '/cargo',
    icon: svgCargo
  },
  {
    id: 3,
    text: 'Выбор транспорта',
    link: '/transport',
    icon: svgTransport
  },
  {
    id: 4,
    text: 'Расчет загрузки',
    link: '/visualization',
    icon: svgvisualization
  }
]
